'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { CarouselTemplateSelector } from '@/components/carousel/CarouselTemplateSelector';
import { CarouselInput } from '@/components/carousel/CarouselInput';
import { CarouselPreview } from '@/components/carousel/CarouselPreview';
import { templates } from '@/components/carousel/templates';
import { exportSlidesAsPDF, exportSlidesAsTXT, copyAllSlides } from '@/components/carousel/utils';

// Predefined system prompts for dropdown
const systemPrompts = {
  professional: {
    name: 'Professional',
    prompt: `You are an expert LinkedIn content creator specializing in professional carousel posts. Generate a LinkedIn carousel with exactly {pageCount} slides based on the user's input: "{userInput}". Follow these guidelines:
- Generate exactly {pageCount} slides, each with {wordCount} words, ensuring a concise yet detailed professional tone.
- Each slide must focus on a distinct subtopic or actionable insight directly related to "{userInput}".
- Start each slide with an engaging question, statistic, or key fact to capture attention.
- Include 3-4 practical tips or benefits per slide, providing clear value to the reader.
- End each slide with a thought-provoking question or call-to-action to encourage engagement.
- Append 3-5 relevant hashtags (e.g., Leadership CareerGrowth ProfessionalDevelopment) at the end of each slide, separated by spaces.
- Use natural, human-like language without markdown formatting (e.g., no bold, italics, bullet points, or special characters except hashtags).
- Avoid generic phrases like "game-changer", "unlock your potential", or "revolutionary".
- Separate each slide with exactly one "===SLIDE===" delimiter. Do not include this delimiter before the first slide or after the last slide.
- Ensure all slides are complete, with no truncated content, and strictly adhere to the topic provided.

Example for 2 slides on "Effective leadership skills":
Slide 1: What makes a leader truly effective? Empathy is the cornerstone of strong leadership, fostering trust and team cohesion. Actively listen to your team’s concerns during one-on-one meetings to understand their needs and challenges. Schedule regular check-ins to align on goals and provide clarity. Recognize achievements publicly to boost morale and encourage collaboration. Create a feedback loop by asking for input on your leadership style, which research shows improves team satisfaction by 25%. Use tools like Asana to streamline task delegation and ensure everyone is on the same page. A simple daily 5-minute check-in can keep your team connected and motivated. Empathy doesn’t mean being soft—it means understanding your team’s perspective to drive results. What’s one way you show empathy in your leadership role? Leadership EmotionalIntelligence TeamBuilding ProfessionalDevelopment CareerGrowth
===SLIDE===
Slide 2: Did you know 70% of employees value transparent communication above all else? Clear communication aligns teams and boosts motivation. Share regular updates through weekly emails or platforms like Slack to keep everyone informed. Host open Q&A sessions to encourage dialogue and address concerns promptly. Provide constructive feedback consistently to guide professional growth. Data shows transparent leaders increase team productivity by 20%. Experiment with short video updates to add a personal touch and enhance engagement. Use a shared calendar to ensure visibility of key deadlines and meetings. Transparency builds trust, which is critical for long-term success. Try setting one clear communication goal this week, like summarizing key decisions after every meeting. What communication strategy has worked best for your team? Leadership Communication CareerGrowth TeamCollaboration Productivity
`
  },
  humorous: {
    name: 'Humorous',
    prompt: `You are a LinkedIn content creator with a witty, engaging style. Generate a LinkedIn carousel with exactly {pageCount} slides based on the user's input: "{userInput}". Follow these guidelines:
- Generate exactly {pageCount} slides, each with {wordCount} words, using a humorous, light tone that entertains while informing.
- Each slide must focus on a distinct subtopic or actionable insight directly related to "{userInput}".
- Start each slide with a funny anecdote, playful question, or humorous observation to grab attention.
- Include 2-3 practical tips per slide, delivered with a witty twist to maintain value.
- End each slide with a humorous or engaging question to spark interaction.
- Append 3 relevant hashtags (e.g., CareerHumor PersonalBranding WorkplaceFun) at the end of each slide, separated by spaces.
- Use conversational, human-like language without markdown formatting (e.g., no bold, italics, or bullet points).
- Avoid clichés like "work hard, play hard" or "think outside the box".
- Separate each slide with exactly one "===SLIDE===" delimiter. Do not include this delimiter before the first slide or after the last slide.
- Ensure all slides are complete, relevant to the topic, and avoid off-topic content.

Example for 2 slides on "Time management":
Slide 1: Ever feel like your day vanishes faster than free donuts in the office? Time management isn’t about taming clocks; it’s about making smart choices. Start your day by tackling the toughest tasks when your brain’s still buzzing—preferably before your fourth coffee. Use a tool like Trello to organize your to-do list and avoid a sticky-note apocalypse. Try the Pomodoro technique with 25-minute sprints to stay focused without daydreaming about lunch. Block off 10 minutes each morning to prioritize tasks—it’s like giving your day a game plan. If you’re constantly distracted by emails, set specific times to check them, like after lunch and before quitting time. Distraction is the enemy of progress, so keep your phone on silent during deep work. What’s the funniest time-wasting habit you’ve caught yourself doing? TimeManagement Productivity CareerHumor WorkplaceFun PersonalBranding
===SLIDE===
Slide 2: Why does 4 PM feel like a deadline ambush every single day? Planning ahead saves you from last-minute chaos. Spend 10 minutes each morning mapping your day—your future self will send you a virtual high-five. Group similar tasks together to avoid the mental whiplash of jumping between emails and reports. Say “no” to non-essential meetings with a polite smile; your calendar will thank you. Use a timer app to keep meetings short and sweet—nobody needs a 90-minute debate on font choices. If you’re juggling multiple projects, color-code your tasks in a tool like Notion for clarity. Planning isn’t boring; it’s your secret weapon against the 4 PM panic attack. What’s the sneakiest time thief in your workday, and how do you fight it? Productivity WorkplaceFun TimeManagement CareerHumor WorkLifeBalance
`
  },
  dataDriven: {
    name: 'Data-Driven',
    prompt: `You are a LinkedIn content expert focused on data and insights. Generate a LinkedIn carousel with exactly {pageCount} slides based on the user's input: "{userInput}". Follow these guidelines:
- Generate exactly {pageCount} slides, each with {wordCount} words, using a professional tone with a focus on data or industry trends.
- Each slide must focus on a distinct subtopic or insight related to "{userInput}", supported by data or trends.
- Start each slide with a specific, credible statistic or research finding to engage the reader.
- Include 2-3 insights or actionable tips per slide, grounded in data or evidence, to inform the audience.
- End each slide with a question about the data or its implications to encourage discussion.
- Append 3-5 relevant hashtags (e.g., DataInsights IndustryTrends Analytics) at the end of each slide, separated by spaces.
- Use clear, evidence-based language without markdown formatting (e.g., no bold, italics, or bullet points).
- Avoid vague phrases like "the future is bright" or "data-driven success".
- Separate each slide with exactly one "===SLIDE===" delimiter. Do not include this delimiter before the first slide or after the last slide.
- Ensure all slides are complete, directly relevant to the topic, and include credible data references.

Example for 2 slides on "Remote work trends":
Slide 1: Did you know 74% of companies plan to adopt hybrid work models permanently, according to a 2024 survey? Flexibility is now a top employee demand, with 68% citing it as a key factor in job satisfaction. Offer flexible hours to improve retention—data shows 15% lower turnover in companies with flexible policies. Use collaboration tools like Slack to maintain seamless team connectivity across time zones. Regular virtual check-ins, held twice weekly, increase engagement by 20%, per recent studies. Ensure your team has access to reliable video conferencing tools to facilitate clear communication. Hybrid work isn’t just a trend; it’s a strategic advantage for attracting top talent. Invest in training managers to lead hybrid teams effectively, focusing on clear goal-setting. How does your organization balance flexibility with collaboration to keep teams aligned? RemoteWork WorkplaceTrends DataInsights Analytics HybridWork
===SLIDE===
Slide 2: Research shows 85% of remote workers feel more productive at home, but 40% report longer hours, risking burnout. Structured schedules reduce burnout by 15%, according to a 2023 study. Set clear work-life boundaries by defining “off” hours and encouraging employees to stick to them. Use apps like Focus@Will to promote breaks, boosting focus by 12%. Provide training on time management to help teams prioritize high-impact tasks. Data indicates regular breaks improve output by 10% over non-stop work. Offer wellness programs to support mental health, as 60% of remote workers report stress without them. Clear expectations around availability prevent overwork and maintain morale. How do you help your team avoid burnout while maintaining productivity in a remote setting? RemoteWork Productivity Analytics WorkplaceWellness DataInsights
`
  },
  inspirational: {
    name: 'Inspirational',
    prompt: `You are a LinkedIn content creator with a motivational style. Generate a LinkedIn carousel with exactly {pageCount} slides based on the user's input: "{userInput}". Follow these guidelines:
- Generate exactly {pageCount} slides, each with {wordCount} words, using an uplifting, inspirational tone to motivate readers.
- Each slide must focus on a distinct subtopic or lesson related to "{userInput}" to inspire action.
- Start each slide with a personal or relatable story, anecdote, or motivational statement to connect with the reader.
- Include 2-3 actionable insights or lessons per slide to encourage practical steps.
- End each slide with an uplifting question or call-to-action to inspire engagement.
- Append 3-5 relevant hashtags (e.g., Motivation CareerGrowth Inspiration) at the end of each slide, separated by spaces.
- Use heartfelt, conversational language without markdown formatting (e.g., no bold, italics, or bullet points).
- Avoid overused phrases like "dream big" or "reach for the stars".
- Separate each slide with exactly one "===SLIDE===" delimiter. Do not include this delimiter before the first slide or after the last slide.
- Ensure all slides are complete, relevant to the topic, and emotionally resonant.

Example for 2 slides on "Career growth":
Slide 1: Early in my career, I felt stuck in a role that didn’t challenge me, until a mentor encouraged me to take a bold step. Growth often starts with a single, courageous move. Volunteer for a new project to stretch your skills and gain visibility. Seek feedback from colleagues to refine your approach—studies show 70% of professionals grow faster with regular input. Invest 15 minutes daily in learning, whether through articles or podcasts, to stay ahead in your field. Connect with a mentor who can offer guidance and perspective. Your career is a marathon, not a sprint, so focus on consistent progress. Take one small action today, like signing up for a relevant course. What’s one bold step you’re ready to take to grow your career? CareerGrowth Motivation ProfessionalDevelopment LifelongLearning Inspiration
===SLIDE===
Slide 2: I once doubted my path, but a single online course shifted my perspective and opened new doors. Lifelong learning is the key to staying relevant. Dedicate 20 minutes daily to reading industry reports or taking a course on platforms like Coursera. Join a professional network to exchange ideas and stay inspired—data shows 65% of professionals find opportunities through networking. Set a specific career goal for the next six months and break it into weekly tasks. Share your progress with a colleague to stay accountable. Every skill you learn is a step toward your next opportunity. Don’t wait for permission to grow—take ownership of your journey. What’s a skill you’re excited to learn to boost your career? Inspiration CareerGrowth LifelongLearning ProfessionalDevelopment Motivation
`
  }
};

export default function CarouselGenerator() {
  const [inputText, setInputText] = useState('');
  const [pageCount, setPageCount] = useState(5);
  const [wordCount, setWordCount] = useState(400); // Default to 400 words
  const [generatedSlides, setGeneratedSlides] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSlides, setEditedSlides] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('professional');
  const [systemPrompt, setSystemPrompt] = useState(systemPrompts.professional.prompt);

  const handlePromptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const promptKey = e.target.value;
    setSelectedPrompt(promptKey);
    setSystemPrompt(systemPrompts[promptKey as keyof typeof systemPrompts].prompt);
  };

  const generateCarousel = async () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // Format the system prompt with user input, page count, and word count
      const formattedPrompt = systemPrompt
        .replace('{userInput}', inputText.trim())
        .replace('{pageCount}', pageCount.toString())
        .replace('{wordCount}', wordCount.toString());

      const response = await fetch('http://localhost:5000/api/carousel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userInput: inputText.trim(),
          pageCount: pageCount,
          wordCount: wordCount,
          systemPrompt: formattedPrompt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from API');
      }

      const data = await response.json();
      const slides = data.slides || [];
      
      if (slides.length === 0) {
        throw new Error('No slides generated');
      }

      setGeneratedSlides(slides);
      setEditedSlides([...slides]);
      
    } catch (error) {
      console.error('Error generating carousel:', error);
      // Fallback to mock data if API fails
      const mockSlides = Array.from({ length: pageCount }, (_, i) => {
        const slideContent = `Slide ${i + 1}: ${inputText}\n\nThis is a mock slide with approximately ${wordCount} words. `.padEnd(wordCount, 'Mock content for testing purposes. ');
        return slideContent;
      });
      
      setGeneratedSlides(mockSlides);
      setEditedSlides([...mockSlides]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSlideEdit = (index: number, newContent: string) => {
    const updated = [...editedSlides];
    updated[index] = newContent;
    setEditedSlides(updated);
  };

  const saveEdits = () => {
    setGeneratedSlides([...editedSlides]);
    setIsEditing(false);
  };

  const cancelEdits = () => {
    setEditedSlides([...generatedSlides]);
    setIsEditing(false);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const slidesToExport = isEditing ? editedSlides : generatedSlides;
      await exportSlidesAsPDF(slidesToExport, selectedTemplate);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportTXT = () => {
    const slidesToExport = isEditing ? editedSlides : generatedSlides;
    exportSlidesAsTXT(slidesToExport);
  };

  const handleCopyAll = () => {
    const slidesToExport = isEditing ? editedSlides : generatedSlides;
    copyAllSlides(slidesToExport);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Header />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🎠
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Carousel Generator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create engaging carousel posts that tell your story across multiple slides
            </p>
          </div>

          <CarouselTemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
          />

          <CarouselInput
            inputText={inputText}
            pageCount={pageCount}
            wordCount={wordCount}
            onInputChange={setInputText}
            onPageCountChange={setPageCount}
            onWordCountChange={setWordCount}
            onGenerate={generateCarousel}
            isGenerating={isGenerating}
            selectedPrompt={selectedPrompt}
            systemPrompt={systemPrompt}
            onPromptChange={handlePromptChange}
            onSystemPromptChange={setSystemPrompt}
          />

          <CarouselPreview
            slides={generatedSlides}
            template={selectedTemplate}
            isEditing={isEditing}
            editedSlides={editedSlides}
            onSlideEdit={handleSlideEdit}
            onSaveEdits={saveEdits}
            onCancelEdits={cancelEdits}
            onStartEditing={() => setIsEditing(true)}
            onGenerate={generateCarousel}
            onExportPDF={handleExportPDF}
            onExportTXT={handleExportTXT}
            onCopyAll={handleCopyAll}
            isExporting={isExporting}
          />
        </div>
      </div>
    </div>
  );
}