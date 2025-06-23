const { Groq } = require('groq-sdk');

// Enhanced prompt for LinkedIn short text
const getShortTextPrompt = (userInput) => `
You are a LinkedIn content expert creating professional, informational posts. Write a LinkedIn post based on the user's input: "${userInput}". Follow these guidelines:
- Use a professional, concise tone suitable for LinkedIn.
- Keep the post between 100-150 words.
- Start with a compelling fact, statistic, or question to grab attention.
- Provide 1-2 key insights or benefits about the topic to inform the reader.
- End with a thought-provoking question or suggestion to encourage further exploration of the topic.
- Include 3-5 relevant hashtags at the end, separated by spaces (e.g., Networking CareerGrowth ProfessionalDevelopment).
- Use natural, conversational language as if written by a human.
- Do NOT use markdown formatting like bold, italics, or bullet points.
- Avoid generic phrases like "unleash your potential" or "game-changer."

Example:
"Did you know 85% of jobs are filled through networking? Building professional relationships opens doors to opportunities and insights you might otherwise miss. Focus on authentic connections by engaging in industry discussions or attending virtual events. Start small: reach out to one new contact this week to expand your network. How do you approach networking in your career? Networking CareerGrowth ProfessionalDevelopment"

Generate the post now.
`;

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