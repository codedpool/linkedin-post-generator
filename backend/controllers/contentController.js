const { Groq } = require('groq-sdk');

// Enhanced prompt for LinkedIn short text with strict context usage
const getShortTextPrompt = (userInput) => {
  // Split userInput into topic and context (if context exists)
  const [topic, context] = userInput.includes('\n\nContext:') 
    ? userInput.split('\n\nContext:')
    : [userInput, ''];

  const contextInstruction = context.trim()
    ? `You MUST strictly base the post's insights, examples, and perspective on the following context: "${context.trim()}". All content must directly reflect the specific details provided in the context, such as the user's experience, industry trends, or data mentioned. Do not include generic insights unrelated to the context.`
    : 'Since no context is provided, use general knowledge and industry-standard insights to inform the post, ensuring relevance to the topic.';

  return `
You are a LinkedIn content expert creating professional, informational posts. Write a LinkedIn post based on the user's topic: "${topic.trim()}". ${contextInstruction} Follow these guidelines:
- Use a professional, concise tone suitable for LinkedIn.
- Keep the post between 100-150 words.
- Start with a compelling fact, statistic, or question to grab attention.
- Provide 1-2 key insights or benefits about the topic to inform the reader, strictly adhering to the context when provided.
- End with a thought-provoking question or suggestion to encourage further exploration of the topic.
- Include 3-5 relevant hashtags at the end, separated by spaces (e.g., Networking CareerGrowth ProfessionalDevelopment).
- Use natural, conversational language as if written by a human.
- Do NOT use markdown formatting like bold, italics, or bullet points.
- Avoid generic phrases like "unleash your potential" or "game-changer."

Example (with context):
Context: "Based on my 10 years in project management, I’ve led cross-functional teams to deliver complex projects on time."
"Did you know 90% of successful projects rely on effective team collaboration? Drawing from my 10 years in project management, I’ve seen how aligning cross-functional teams around clear goals drives results. Set up regular check-ins and use tools like Asana to keep everyone on track. How do you foster teamwork in your projects? ProjectManagement TeamCollaboration Leadership"

Example (without context):
"Did you know 85% of jobs are filled through networking? Building professional relationships opens doors to opportunities and insights you might otherwise miss. Focus on authentic connections by engaging in industry discussions or attending virtual events. Start small: reach out to one new contact this week to expand your network. How do you approach networking in your career? Networking CareerGrowth ProfessionalDevelopment"

Generate the post now.
`;
};

exports.generateShortText = async (req, res) => {
  const { userInput } = req.body;

  // Validate input
  if (!userInput || typeof userInput !== 'string' || userInput.trim().length === 0) {
    return res.status(400).json({ error: 'Valid user input is required' });
  }

  // Initialize Groq inside the function
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: getShortTextPrompt(userInput.trim()),
        },
      ],
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      temperature: 0.7,
      max_completion_tokens: 200,
      top_p: 0.9,
      stream: false,
      stop: null,
    });

    const content = chatCompletion.choices[0]?.message?.content?.trim() || '';
    if (!content) {
      throw new Error('No content generated');
    }

    res.json({ content });
  } catch (error) {
    console.error('Error generating short text:', error.message);
    res.status(500).json({ error: 'Failed to generate content' });
  }
};