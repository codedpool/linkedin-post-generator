const { Groq } = require('groq-sdk');

// Prompt handler for LinkedIn short text using context as system prompt
const getShortTextPrompt = (userInput) => {
  // Split userInput into topic and context (if context exists)
  const [topic, context] = userInput.includes('\n\nContext:') 
    ? userInput.split('\n\nContext:')
    : [userInput, ''];

  // Use context as the system prompt, or fall back to minimal prompt if empty
  const systemPrompt = context.trim() 
    ? context.trim()
    : `Write a LinkedIn post based on the topic provided. Keep it professional, concise, and engaging.`;

  return [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: `Topic: ${topic.trim()}`,
    },
  ];
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
      messages: getShortTextPrompt(userInput.trim()),
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