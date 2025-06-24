const { Groq } = require('groq-sdk');

// Prompt for LinkedIn carousel content
const getCarouselPrompt = (userInput, pageCount) => `
You are an expert LinkedIn content creator specializing in professional carousel posts. Generate a LinkedIn carousel with exactly ${pageCount} slides based on the user's input: "${userInput}". Follow these guidelines:
- Each slide is 120-200 words, detailed yet concise, and professional.
- Focus each slide on a unique subtopic or actionable insight related to "${userInput}".
- Start each slide with a question, statistic, or key fact to engage the reader.
- Include 2-3 practical tips or benefits in each slide to inform and inspire.
- End each slide with a question or call-to-action to encourage exploration of the topic.
- Append 3-5 relevant hashtags (e.g., Leadership CareerGrowth ProfessionalDevelopment) at the end of each slide, separated by spaces.
- Use natural, human-like language without markdown formatting (e.g., no bold, italics, or bullet points).
- Avoid generic phrases like "game-changer" or "unlock your potential."
- Clearly separate each slide with the delimiter "===SLIDE===".

Example for 2 slides on "Effective leadership skills":
Slide 1: What defines an exceptional leader? Empathy is the cornerstone of trust and team cohesion. Actively listen to your team’s concerns to understand their perspectives. Schedule regular one-on-ones to address individual goals and challenges, fostering a supportive environment. Recognize achievements publicly to boost morale and encourage collaboration. This approach not only strengthens relationships but also drives team performance. Create a feedback loop by inviting input on your leadership style to grow continuously. Small, consistent actions, like a daily check-in, can transform team dynamics. How do you practice empathy in your leadership role? Leadership EmotionalIntelligence TeamBuilding ProfessionalDevelopment WorkplaceCulture
===SLIDE===
Slide 2: Did you know 70% of employees value clear communication from leaders? Transparency in goals and expectations keeps teams aligned and motivated. Share updates through weekly newsletters or project management tools like Asana to maintain clarity. Encourage two-way communication by hosting open Q&A sessions, allowing team members to voice concerns. Provide constructive feedback regularly to guide growth and prevent misunderstandings. A clear communication strategy reduces errors and empowers employees to excel. Test different methods, like video updates, to find what resonates with your team. What’s your most effective communication technique as a leader? Leadership Communication CareerGrowth WorkplaceSuccess TeamCollaboration

Generate exactly ${pageCount} slides now.
`;

exports.generateCarousel = async (req, res) => {
  const { userInput, pageCount } = req.body;

  // Input validation
  if (!userInput || typeof userInput !== 'string' || userInput.trim().length === 0) {
    return res.status(400).json({ error: 'Valid user input is required' });
  }
  if (!Number.isInteger(pageCount) || pageCount < 1 || pageCount > 10) {
    return res.status(400).json({ error: 'Page count must be an integer between 1 and 10' });
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
          content: getCarouselPrompt(userInput.trim(), pageCount),
        },
      ],
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      temperature: 0.7, // Consistent tone
      max_completion_tokens: pageCount * 450, // Increased buffer for longer slides
      top_p: 0.9, // Balanced creativity
      stream: false, // Non-streaming for simplicity
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