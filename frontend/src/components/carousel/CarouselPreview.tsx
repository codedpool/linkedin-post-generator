'use client';

import { useState } from 'react';
import { CarouselTemplate } from './types';
import { SlideDisplay } from "./SlideDisplay";
import { CarouselNavigation } from './CarouselNavigation';
import { CarouselActions } from './CarouselActions';

interface CarouselPreviewProps {
  slides: string[];
  template: CarouselTemplate;
  isEditing: boolean;
  editedSlides: string[];
  onSlideEdit: (index: number, content: string) => void;
  onSaveEdits: () => void;
  onCancelEdits: () => void;
  onStartEditing: () => void;
  onGenerate: () => void;
  onExportPDF: () => void;
  onExportTXT: () => void;
  onCopyAll: () => void;
  isExporting: boolean;
}

export function CarouselPreview({
  slides,
  template,
  isEditing,
  editedSlides,
  onSlideEdit,
  onSaveEdits,
  onCancelEdits,
  onStartEditing,
  onGenerate,
  onExportPDF,
  onExportTXT,
  onCopyAll,
  isExporting
}: CarouselPreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (slides.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Your Carousel Preview
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <button
            onClick={onCopyAll}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy All</span>
          </button>
        </div>
      </div>
      
      {/* Slide Display */}
      <div className="relative">
        {isEditing ? (
          <div className={`${template.style} rounded-xl p-8 min-h-[400px] flex items-center justify-center`}>
            <textarea
              value={editedSlides[currentSlide]}
              onChange={(e) => onSlideEdit(currentSlide, e.target.value)}
              className="w-full h-64 p-4 bg-transparent border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800 dark:text-gray-200 font-medium leading-relaxed resize-none"
            />
          </div>
        ) : (
          <SlideDisplay
            content={slides[currentSlide]}
            slideNumber={currentSlide + 1}
            totalSlides={slides.length}
            template={template}
          />
        )}
        
        <CarouselNavigation
          currentSlide={currentSlide}
          totalSlides={slides.length}
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
          onGoToSlide={goToSlide}
        />
      </div>
      
      <CarouselActions
        isEditing={isEditing}
        onSaveEdits={onSaveEdits}
        onCancelEdits={onCancelEdits}
        onStartEditing={onStartEditing}
        onGenerate={onGenerate}
        onExportPDF={onExportPDF}
        onExportTXT={onExportTXT}
        isExporting={isExporting}
      />
    </div>
  );
}