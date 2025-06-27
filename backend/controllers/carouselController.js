const { Groq } = require('groq-sdk');

exports.generateCarousel = async (req, res) => {
  const { userInput, pageCount, systemPrompt } = req.body;

  // Input validation
  if (!userInput || typeof userInput !== 'string' || userInput.trim().length === 0) {
    return res.status(400).json({ error: 'Valid user input is required' });
  }
  if (!Number.isInteger(pageCount) || pageCount < 1 || pageCount > 10) {
    return res.status(400).json({ error: 'Page count must be an integer between 1 and 10' });
  }
  if (!systemPrompt || typeof systemPrompt !== 'string' || systemPrompt.trim().length === 0) {
    return res.status(400).json({ error: 'Valid system prompt is required' });
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
          content: systemPrompt.trim(),
        },
      ],
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      temperature: 0.7,
      max_completion_tokens: pageCount * 450,
      top_p: 0.9,
      stream: false,
      stop: null,
    });

    const content = chatCompletion.choices[0]?.message?.content?.trim() || '';
    if (!content) {
      throw new Error('No content generated');
    }

    // Split content into slides
    const slides = content
      .split('===SLIDE===')
      .map(slide => slide.trim())
      .filter(slide => slide.length > 0)
      .slice(0, pageCount);

    // Validate slide count
    if (slides.length < pageCount) {
      console.warn(`Generated ${slides.length} slides, expected ${pageCount}`);
      return res.status(500).json({ error: `Generated fewer slides (${slides.length}) than requested (${pageCount})` });
    }

    res.json({ slides });
  } catch (error) {
    console.error('Error generating carousel:', error.message);
    res.status(500).json({ error: 'Failed to generate carousel content' });
  }
};