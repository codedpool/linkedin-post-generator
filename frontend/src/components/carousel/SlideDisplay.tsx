'use client';

import React from 'react';
import { CarouselTemplate } from './types';

interface SlideDisplayProps {
  content: string;
  slideNumber: number;
  totalSlides: number;
  template: CarouselTemplate;
  isForPDF?: boolean;
}

export function SlideDisplay({ 
  content, 
  slideNumber, 
  totalSlides, 
  template, 
  isForPDF = false 
}: SlideDisplayProps) {
  const lines = content.split('\n').filter(line => line.trim());
  const title = lines[0] || `Slide ${slideNumber}`;
  const bodyContent = lines.slice(1).join('\n');

  if (isForPDF) {
    return (
      <div 
        style={{
          width: '800px',
          height: '600px',
          background: template.pdfStyle.background,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Header bar */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '8px',
          background: template.pdfStyle.primaryColor,
        }} />
        
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: template.pdfStyle.accentColor,
          opacity: 0.3,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: template.pdfStyle.secondaryColor,
          opacity: 0.2,
        }} />
        
        {/* Slide number */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          fontSize: '14px',
          color: template.pdfStyle.primaryColor,
          fontWeight: 'bold',
        }}>
          {slideNumber}/{totalSlides}
        </div>

        {/* Main content */}
        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: template.pdfStyle.headerColor,
            marginBottom: '30px',
            lineHeight: '1.2',
          }}>
            {title}
          </h1>
          
          {bodyContent && (
            <div style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: template.pdfStyle.textColor,
              whiteSpace: 'pre-wrap',
            }}>
              {bodyContent}
            </div>
          )}
        </div>

        {/* Footer gradient */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '4px',
          background: `linear-gradient(90deg, ${template.pdfStyle.primaryColor} 0%, ${template.pdfStyle.accentColor} 100%)`,
        }} />
      </div>
    );
  }

  return (
    <div className={`${template.style} rounded-xl p-8 min-h-[400px] flex flex-col justify-center items-center relative`}>
      {/* Slide number */}
      <div className="absolute top-4 left-4 text-sm font-bold opacity-70">
        {slideNumber}/{totalSlides}
      </div>

      {/* Main content */}
      <div className="text-center max-w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          {title}
        </h1>
        
        {bodyContent && (
          <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {bodyContent}
          </div>
        )}
      </div>
    </div>
  );
}