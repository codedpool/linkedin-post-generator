'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { CarouselTemplateSelector } from '@/components/carousel/CarouselTemplateSelector';
import { CarouselInput } from '@/components/carousel/CarouselInput';
import { CarouselPreview } from '@/components/carousel/CarouselPreview';
import { templates } from '@/components/carousel/templates';
import { exportSlidesAsPDF, exportSlidesAsTXT, copyAllSlides } from '@/components/carousel/utils';

export default function CarouselGenerator() {
  const [inputText, setInputText] = useState('');
  const [pageCount, setPageCount] = useState(5);
  const [generatedSlides, setGeneratedSlides] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSlides, setEditedSlides] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const generateCarousel = async () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/carousel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userInput: inputText.trim(),
          pageCount: pageCount
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
          {/* Header */}
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