'use client';

import React, { useRef } from 'react';
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
  
  // Calculate word count for the slide content
  const wordCount = content.split(/\s+/).filter(word => word.trim().length > 0).length;
  
  // Define fixed dimensions
  const pdfDimensions = '1200x1500px'; // Fixed size for PDF export
  const previewDimensions = '800x600px'; // Fixed size for preview
  const slideRef = useRef<HTMLDivElement>(null);

  // Use fixed dimensions based on mode
  const dimensions = isForPDF ? pdfDimensions : previewDimensions;

  if (isForPDF) {
    return (
      <div 
        style={{
          width: '1200px', // Updated PDF width
          height: '1500px', // Updated PDF height
          background: template.pdfStyle.background,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '90px', // Scaled padding for larger dimensions (60px * 1.5)
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Template-specific PDF decorations */}
        {template.id === 'modern' && (
          <>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '9px', // Scaled from 6px
              background: template.pdfStyle.primaryColor,
            }} />
            <div style={{
              position: 'absolute',
              top: '45px', // Scaled from 30px
              right: '45px',
              width: '120px', // Scaled from 80px
              height: '120px',
              border: `4.5px solid ${template.pdfStyle.accentColor}`, // Scaled from 3px
              borderRadius: '50%',
              opacity: 0.3,
            }} />
            <div style={{
              position: 'absolute',
              bottom: '45px',
              left: '45px',
              width: '180px', // Scaled from 120px
              height: '6px', // Scaled from 4px
              background: template.pdfStyle.primaryColor,
              opacity: 0.6,
            }} />
          </>
        )}

        {template.id === 'creative' && (
          <>
            <div style={{
              position: 'absolute',
              top: '30px', // Scaled from 20px
              right: '30px',
              width: '150px', // Scaled from 100px
              height: '150px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '30px', // Scaled from 20px
              transform: 'rotate(15deg)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '30px',
              width: '90px', // Scaled from 60px
              height: '90px',
              background: 'rgba(251,191,36,0.8)',
              borderRadius: '50%',
            }} />
          </>
        )}

        {template.id === 'minimal' && (
          <>
            <div style={{
              position: 'absolute',
              top: '60px', // Scaled from 40px
              right: '60px',
              width: '90px', // Scaled from 60px
              height: '3px', // Scaled from 2px
              background: template.pdfStyle.accentColor,
            }} />
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '60px',
              width: '3px', // Scaled from 2px
              height: '90px', // Scaled from 60px
              background: template.pdfStyle.accentColor,
            }} />
          </>
        )}

        {template.id === 'tech' && (
          <>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              background: 'radial-gradient(circle at 20% 80%, rgba(0,212,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(52,211,153,0.1) 0%, transparent 50%)',
            }} />
            <div style={{
              position: 'absolute',
              top: '45px', // Scaled from 30px
              right: '45px',
              width: '120px', // Scaled from 80px
              height: '120px',
              border: `3px solid ${template.pdfStyle.primaryColor}`, // Scaled from 2px
              borderRadius: '12px', // Scaled from 8px
              opacity: '0.4',
            }} />
          </>
        )}
        
        {/* Slide number */}
        <div style={{
          position: 'absolute',
          top: '45px', // Scaled from 30px
          left: '45px',
          fontSize: '21px', // Scaled from 14px
          color: template.pdfStyle.primaryColor,
          fontWeight: 'bold',
        }}>
          {slideNumber}/{totalSlides}
        </div>

        {/* Main content */}
        <div style={{
          textAlign: 'center',
          maxWidth: '900px', // Scaled from 600px
          zIndex: 10,
        }}>
          <h1 style={{
            fontSize: '54px', // Scaled from 36px
            fontWeight: 'bold',
            color: template.pdfStyle.headerColor,
            marginBottom: '45px', // Scaled from 30px
            lineHeight: '1.2',
          }}>
            {title}
          </h1>
          
          {bodyContent && (
            <div style={{
              fontSize: '27px', // Scaled from 18px
              lineHeight: '1.6',
              color: template.pdfStyle.textColor,
              whiteSpace: 'pre-wrap',
            }}>
              {bodyContent}
            </div>
          )}
        </div>
      </div>
    );
  }

  const getTemplateSpecificElements = () => {
    switch (template.id) {
      case 'modern':
        return (
          <>
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>
            <div className="absolute top-6 right-6 w-20 h-20 border-3 border-blue-500/30 rounded-full"></div>
            <div className="absolute bottom-6 left-6 w-32 h-1 bg-blue-600/60"></div>
            <div className="absolute top-1/2 right-12 w-1 h-24 bg-blue-400/20 transform -translate-y-1/2"></div>
            <div className="absolute top-20 left-6 w-4 h-4 bg-blue-500/40 transform rotate-45"></div>
          </>
        );
      case 'creative':
        return (
          <>
            <div className="absolute top-4 right-4 w-24 h-24 bg-white/20 rounded-3xl transform rotate-12"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-yellow-400/80 rounded-full"></div>
            <div className="absolute top-1/3 left-8 w-8 h-8 bg-white/30 rounded-lg transform -rotate-12"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full transform translate-x-20 -translate-y-20"></div>
          </>
        );
      case 'minimal':
        return (
          <>
            <div className="absolute top-8 right-8 w-16 h-0.5 bg-gray-400"></div>
            <div className="absolute bottom-8 left-8 w-0.5 h-16 bg-gray-400"></div>
            <div className="absolute top-16 left-8 w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="absolute bottom-16 right-8 w-3 h-3 border border-gray-400"></div>
            <div className="absolute top-1/2 left-1/2 w-12 h-px bg-gray-300 transform -translate-x-1/2 translate-y-16"></div>
          </>
        );
      case 'tech':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5"></div>
            <div className="absolute top-6 right-6 w-20 h-20 border-2 border-cyan-400/40 rounded-lg"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 bg-emerald-400/20 rounded transform rotate-45"></div>
            <div className="absolute top-1/4 right-12 w-px h-20 bg-cyan-400/30"></div>
            <div className="absolute top-1/3 right-8 w-8 h-px bg-cyan-400/30"></div>
            <div className="absolute bottom-1/4 left-12 w-6 h-6 bg-cyan-400/20 rounded-full blur-sm"></div>
            <div className="absolute bottom-1/4 left-12 w-3 h-3 bg-cyan-400 rounded-full"></div>
            <div className="absolute top-20 left-20 w-16 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
            <div className="absolute bottom-20 right-20 w-px h-16 bg-gradient-to-b from-emerald-400/50 to-transparent"></div>
          </>
        );
      default:
        return null;
    }
  };

  const getTemplateSpecificTextStyles = () => {
    switch (template.id) {
      case 'modern':
        return {
          title: 'text-gray-900 dark:text-white font-bold tracking-tight',
          body: 'text-gray-700 dark:text-gray-300 font-medium'
        };
      case 'creative':
        return {
          title: 'text-white font-bold tracking-wide drop-shadow-lg',
          body: 'text-white/95 font-medium drop-shadow'
        };
      case 'minimal':
        return {
          title: 'text-gray-900 dark:text-white font-light tracking-wide',
          body: 'text-gray-600 dark:text-gray-400 font-normal'
        };
      case 'tech':
        return {
          title: 'text-white font-bold tracking-tight drop-shadow-lg',
          body: 'text-gray-100 font-medium'
        };
      default:
        return {
          title: 'text-gray-800 dark:text-gray-200 font-bold',
          body: 'text-gray-700 dark:text-gray-300'
        };
    }
  };

  const getSlideNumberStyle = () => {
    switch (template.id) {
      case 'modern':
        return 'text-blue-600 dark:text-blue-400 font-bold bg-white/80 px-2 py-1 rounded';
      case 'creative':
        return 'text-white font-bold bg-black/20 px-2 py-1 rounded backdrop-blur-sm';
      case 'minimal':
        return 'text-gray-600 dark:text-gray-400 font-medium';
      case 'tech':
        return 'text-cyan-400 font-bold bg-black/30 px-2 py-1 rounded border border-cyan-400/30';
      default:
        return 'text-gray-600 dark:text-gray-400 font-bold';
    }
  };

  const textStyles = getTemplateSpecificTextStyles();

  return (
    <div 
      ref={slideRef}
      className={`${template.style} rounded-xl p-8 flex flex-col justify-center items-center relative overflow-hidden Resizable: false; shadow-2xl`}
      style={{
        width: '800px', // Fixed preview width
        height: '600px', // Fixed preview height
      }}
    >
      {/* Template-specific decorative elements */}
      {getTemplateSpecificElements()}

      {/* Slide number with template-specific styling */}
      <div className={`absolute top-4 left-4 text-sm z-20 ${getSlideNumberStyle()}`}>
        {slideNumber}/{totalSlides}
      </div>

      {/* Dimensions and word count (only in preview mode) */}
      {!isForPDF && (
        <div className={`absolute bottom-4 right-4 text-sm z-20 text-gray-600 dark:text-gray-400 font-medium bg-white/80 dark:bg-black/20 px-2 py-1 rounded backdrop-blur-sm`}>
          Preview: {dimensions} | PDF: {pdfDimensions} | {wordCount} words
        </div>
      )}

      {/* Main content with enhanced styling */}
      <div className="text-center max-w-full z-10 relative px-4">
        <h1 className={`text-3xl md:text-4xl mb-6 ${textStyles.title} leading-tight`}>
          {title}
        </h1>
        
        {bodyContent && (
          <div className={`text-lg leading-relaxed ${textStyles.body} whitespace-pre-wrap max-w-2xl mx-auto`}>
            {bodyContent}
          </div>
        )}
      </div>

      {/* Template-specific bottom accent */}
      {template.id === 'modern' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
      )}
      {template.id === 'creative' && (
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"></div>
      )}
      {template.id === 'minimal' && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gray-400"></div>
      )}
      {template.id === 'tech' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg shadow-cyan-400/50"></div>
      )}
    </div>
  );
}