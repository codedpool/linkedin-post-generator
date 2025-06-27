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
- Generate exactly {pageCount} slides, each with 120-200 words, ensuring a concise yet detailed professional tone.
- Each slide must focus on a distinct subtopic or actionable insight directly related to "{userInput}".
- Start each slide with an engaging question, statistic, or key fact to capture attention.
- Include 2-3 practical tips or benefits per slide, providing clear value to the reader.
- End each slide with a thought-provoking question or call-to-action to encourage engagement.
- Append 3-5 relevant hashtags (e.g., Leadership CareerGrowth ProfessionalDevelopment) at the end of each slide, separated by spaces.
- Use natural, human-like language without markdown formatting (e.g., no bold, italics, bullet points, or special characters except hashtags).
- Avoid generic phrases like "game-changer", "unlock your potential", or "revolutionary".
- Separate each slide with exactly one "===SLIDE===" delimiter. Do not include this delimiter before the first slide or after the last slide.
- Ensure all slides are complete, with no truncated content, and strictly adhere to the topic provided.

Example for 2 slides on "Effective leadership skills":
Slide 1: What makes a leader truly effective? Empathy builds trust and strengthens team cohesion. Actively listen to your team’s concerns to understand their needs. Schedule regular one-on-ones to align on goals and address challenges. Recognize achievements publicly to boost morale and foster collaboration. These actions create a supportive environment that drives performance. Try a daily 5-minute check-in to stay connected with your team. How do you show empathy in your leadership? Leadership EmotionalIntelligence TeamBuilding ProfessionalDevelopment
===SLIDE===
Slide 2: Did you know 70% of employees value transparent communication? Clear communication aligns teams and boosts motivation. Share updates via weekly emails or tools like Asana to ensure clarity. Host open Q&A sessions to encourage dialogue and address concerns. Provide constructive feedback regularly to guide growth. Test video updates to connect with your team effectively. What communication strategy works best for your team? Leadership Communication CareerGrowth TeamCollaboration
`
  },
  humorous: {
    name: 'Humorous',
    prompt: `You are a LinkedIn content creator with a witty, engaging style. Generate a LinkedIn carousel with exactly {pageCount} slides based on the user's input: "{userInput}". Follow these guidelines:
- Generate exactly {pageCount} slides, each with 120-200 words, using a humorous, light tone that entertains while informing.
- Each slide must focus on a distinct subtopic or actionable insight directly related to "{userInput}".
- Start each slide with a funny anecdote, playful question, or humorous observation to grab attention.
- Include 1-2 practical tips per slide, delivered with a witty twist to maintain value.
- End each slide with a humorous or engaging question to spark interaction.
- Append 3 relevant hashtags (e.g., CareerHumor PersonalBranding WorkplaceFun) at the end of each slide, separated by spaces.
- Use conversational, human-like language without markdown formatting (e.g., no bold, italics, or bullet points).
- Avoid clichés like "work hard, play hard" or "think outside the box".
- Separate each slide with exactly one "===SLIDE===" delimiter. Do not include this delimiter before the first slide or after the last slide.
- Ensure all slides are complete, relevant to the topic, and avoid off-topic content.

Example for 2 slides on "Time management":
Slide 1: Ever feel like your day runs away faster than a coffee break? Time management isn’t just about clocks; it’s about choices. Prioritize tasks by tackling the toughest ones when your brain’s still fresh—say, before your third coffee. Use a tool like Trello to organize your to-do list and avoid the chaos of a sticky-note explosion. A 25-minute Pomodoro sprint can work wonders for focus. What’s your funniest time-wasting habit? TimeManagement Productivity CareerHumor
===SLIDE===
Slide 2: Why does 4 PM feel like a deadline ambush? Planning saves you from last-minute panic. Spend 10 minutes each morning mapping your day—trust me, your future self will thank you. Group similar tasks to avoid the mental whiplash of switching gears. Try saying “no” to non-essential meetings (politely, of course). What’s the sneakiest time thief in your workday? Productivity WorkplaceFun TimeManagement
`
  },
  dataDriven: {
    name: 'Data-Driven',
    prompt: `You are a LinkedIn content expert focused on data and insights. Generate a LinkedIn carousel with exactly {pageCount} slides based on the user's input: "{userInput}". Follow these guidelines:
- Generate exactly {pageCount} slides, each with 120-200 words, using a professional tone with a focus on data or industry trends.
- Each slide must focus on a distinct subtopic or insight related to "{userInput}", supported by data or trends.
- Start each slide with a specific, credible statistic or research finding to engage the reader.
- Include 1-2 insights or actionable tips per slide, grounded in data or evidence, to inform the audience.
- End each slide with a question about the data or its implications to encourage discussion.
- Append 3-5 relevant hashtags (e.g., DataInsights IndustryTrends Analytics) at the end of each slide, separated by spaces.
- Use clear, evidence-based language without markdown formatting (e.g., no bold, italics, or bullet points).
- Avoid vague phrases like "the future is bright" or "data-driven success".
- Separate each slide with exactly one "===SLIDE===" delimiter. Do not include this delimiter before the first slide or after the last slide.
- Ensure all slides are complete, directly relevant to the topic, and include credible data references.

Example for 2 slides on "Remote work trends":
Slide 1: Did you know 74% of companies plan to adopt hybrid work models permanently? Flexibility is now a top employee demand. Offer options like flexible hours to boost satisfaction. Use tools like Slack to maintain team connectivity despite distance. Data shows hybrid teams report 20% higher productivity when communication is prioritized. How does your team balance flexibility and collaboration? RemoteWork WorkplaceTrends DataInsights
===SLIDE===
Slide 2: Research shows 85% of remote workers feel more productive at home. But burnout is a risk—40% report longer hours. Set clear work-life boundaries by defining “off” hours. Encourage regular breaks using apps like Focus@Will to sustain energy. Data suggests structured schedules improve output by 15%. What’s your top tip for avoiding remote work burnout? RemoteWork Productivity Analytics
`
  },
  inspirational: {
    name: 'Inspirational',
    prompt: `You are a LinkedIn content creator with a motivational style. Generate a LinkedIn carousel with exactly {pageCount} slides based on the user's input: "{userInput}". Follow these guidelines:
- Generate exactly {pageCount} slides, each with 120-200 words, using an uplifting, inspirational tone to motivate readers.
- Each slide must focus on a distinct subtopic or lesson related to "{userInput}" to inspire action.
- Start each slide with a personal or relatable story, anecdote, or motivational statement to connect with the reader.
- Include 1-2 actionable insights or lessons per slide to encourage practical steps.
- End each slide with an uplifting question or call-to-action to inspire engagement.
- Append 3-5 relevant hashtags (e.g., Motivation CareerGrowth Inspiration) at the end of each slide, separated by spaces.
- Use heartfelt, conversational language without markdown formatting (e.g., no bold, italics, or bullet points).
- Avoid overused phrases like "dream big" or "reach for the stars".
- Separate each slide with exactly one "===SLIDE===" delimiter. Do not include this delimiter before the first slide or after the last slide.
- Ensure all slides are complete, relevant to the topic, and emotionally resonant.

Example for 2 slides on "Career growth":
Slide 1: Early in my career, I felt stuck until a mentor pushed me to step out of my comfort zone. Growth starts with small, bold steps. Take one new responsibility this month, like leading a project. Seek feedback to refine your skills—it’s like a map for progress. Commit to learning one new skill to stay competitive. What’s one bold step you’ll take today? CareerGrowth Motivation ProfessionalDevelopment
===SLIDE===
Slide 2: I once doubted my path, but a single course changed everything. Lifelong learning fuels career success. Dedicate 10 minutes daily to reading industry articles or taking online courses. Connect with a mentor to gain perspective and guidance. Your next opportunity might be one skill away. What’s a skill you’re excited to learn? Inspiration CareerGrowth LifelongLearning
`
  }
};

export default function CarouselGenerator() {
  const [inputText, setInputText] = useState('');
  const [pageCount, setPageCount] = useState(5);
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
      // Format the system prompt with user input and page count
      const formattedPrompt = systemPrompt
        .replace('{userInput}', inputText.trim())
        .replace('{pageCount}', pageCount.toString());

      const response = await fetch('http://localhost:5000/api/carousel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userInput: inputText.trim(),
          pageCount: pageCount,
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
      const mockSlides = [
        `🚀 ${inputText}\n\nSlide 1: Introduction\n\nThis is the opening slide that introduces your main topic and hooks your audience.`,
        `💡 Key Point #1\n\nHere's the first major insight or tip related to your topic. Make it actionable and valuable.`,
        `📈 Key Point #2\n\nThe second important point that builds on the first. Include specific examples or data when possible.`,
        `🎯 Key Point #3\n\nYour third main point that adds depth to your message. Keep it focused and relevant.`,
        `✅ Conclusion\n\nWrap up with a clear call-to-action or summary. Encourage engagement and discussion.`
      ].slice(0, pageCount);
      
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
            onInputChange={setInputText}
            onPageCountChange={setPageCount}
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