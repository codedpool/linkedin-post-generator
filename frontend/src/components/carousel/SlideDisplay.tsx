'use client';

import React, { useRef } from 'react';
import { CarouselTemplate } from './types';

interface SlideDisplayProps {
  content?: string; // Make content optional to handle undefined cases
  slideNumber: number;
  totalSlides: number;
  template: CarouselTemplate;
  isForPDF?: boolean;
}

export function SlideDisplay({ 
  content = '', // Default to empty string if undefined
  slideNumber, 
  totalSlides, 
  template, 
  isForPDF = false 
}: SlideDisplayProps) {
  // Ensure content is a string; use fallback if invalid
  const safeContent = typeof content === 'string' && content.trim().length > 0 
    ? content 
    : `Slide ${slideNumber}: No content provided. Please regenerate the carousel.`;
  
  const lines = safeContent.split('\n').filter(line => line.trim());
  const title = lines[0] || `Slide ${slideNumber}`;
  const bodyContent = lines.slice(1).join('\n');
  
  // Calculate word count for the slide content
  const wordCount = safeContent.split(/\s+/).filter(word => word.trim().length > 0).length;
  
  // Define fixed dimensions
  const pdfDimensions = '1200x1500px'; // Fixed size for PDF export
  const previewDimensions = '800x600px'; // Fixed size for preview
  const slideRef = useRef<HTMLDivElement>(null);

  // Use fixed dimensions based on mode
  const dimensions = isForPDF ? pdfDimensions : previewDimensions;
  const width = isForPDF ? '1200px' : '800px';
  const height = isForPDF ? '1500px' : '600px';
  const fontScale = isForPDF ? 1.5 : 1; // Scale fonts for PDF
  const padding = isForPDF ? '90px' : '60px';
  const maxContentWidth = isForPDF ? '1020px' : '680px'; // 1200 - 2*90 or 800 - 2*60
  const maxContentHeight = isForPDF ? '1320px' : '480px'; // 1500 - 2*90 or 600 - 2*60

  // Dynamic font sizing based on content length
  const titleLength = title.length;
  const bodyLength = bodyContent.length;
  const titleFontSize = titleLength > 80 ? 24 * fontScale : titleLength > 60 ? 30 * fontScale : titleLength > 40 ? 33 * fontScale : 36 * fontScale;
  const bodyFontSize = bodyLength > 800 ? 18 * fontScale : bodyLength > 600 ? 19.5 * fontScale : bodyLength > 400 ? 21 * fontScale : 22.5 * fontScale;

  const getTemplateSpecificElements = () => {
    const baseStyles = {
      position: 'absolute' as const,
      zIndex: 5,
    };

    switch (template.id) {
      case 'modern':
        return (
          <>
            <div style={{ ...baseStyles, top: '0', left: '0', right: '0', height: isForPDF ? '9px' : '6px', background: template.pdfStyle.primaryColor }} />
            <div style={{ ...baseStyles, top: isForPDF ? '45px' : '30px', right: isForPDF ? '45px' : '30px', width: isForPDF ? '120px' : '80px', height: isForPDF ? '120px' : '80px', border: `3px solid ${template.pdfStyle.accentColor}`, borderRadius: '50%', opacity: 0.3 }} />
            <div style={{ ...baseStyles, bottom: isForPDF ? '45px' : '30px', left: isForPDF ? '45px' : '30px', width: isForPDF ? '180px' : '120px', height: isForPDF ? '6px' : '4px', background: template.pdfStyle.primaryColor, opacity: 0.6 }} />
          </>
        );
      case 'creative':
        return (
          <>
            <div style={{ ...baseStyles, top: isForPDF ? '30px' : '20px', right: isForPDF ? '30px' : '20px', width: isForPDF ? '150px' : '100px', height: isForPDF ? '150px' : '100px', background: 'rgba(255,255,255,0.2)', borderRadius: isForPDF ? '30px' : '20px', transform: 'rotate(15deg)' }} />
            <div style={{ ...baseStyles, bottom: isForPDF ? '30px' : '20px', left: isForPDF ? '30px' : '20px', width: isForPDF ? '90px' : '60px', height: isForPDF ? '90px' : '60px', background: 'rgba(251,191,36,0.8)', borderRadius: '50%' }} />
          </>
        );
      case 'minimal':
        return (
          <>
            <div style={{ ...baseStyles, top: isForPDF ? '60px' : '40px', right: isForPDF ? '60px' : '40px', width: isForPDF ? '90px' : '60px', height: isForPDF ? '3px' : '2px', background: template.pdfStyle.accentColor }} />
            <div style={{ ...baseStyles, bottom: isForPDF ? '60px' : '40px', left: isForPDF ? '60px' : '40px', width: isForPDF ? '3px' : '2px', height: isForPDF ? '90px' : '60px', background: template.pdfStyle.accentColor }} />
          </>
        );
      case 'tech':
        return (
          <>
            <div style={{ ...baseStyles, top: '0', left: '0', right: '0', bottom: '0', background: 'radial-gradient(circle at 20% 80%, rgba(0,212,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(52,211,153,0.1) 0%, transparent 50%)' }} />
            <div style={{ ...baseStyles, top: isForPDF ? '45px' : '30px', right: isForPDF ? '45px' : '30px', width: isForPDF ? '120px' : '80px', height: isForPDF ? '120px' : '80px', border: `3px solid ${template.pdfStyle.primaryColor}`, borderRadius: isForPDF ? '12px' : '8px', opacity: 0.4 }} />
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
          title: isForPDF ? { fontSize: `${titleFontSize}px`, fontWeight: 'bold', color: template.pdfStyle.headerColor } : 'text-gray-900 dark:text-white font-bold tracking-tight',
          body: isForPDF ? { fontSize: `${bodyFontSize}px`, lineHeight: '1.6', color: template.pdfStyle.textColor } : 'text-gray-700 dark:text-gray-300 font-medium'
        };
      case 'creative':
        return {
          title: isForPDF ? { fontSize: `${titleFontSize}px`, fontWeight: 'bold', color: template.pdfStyle.headerColor } : 'text-white font-bold tracking-wide drop-shadow-lg',
          body: isForPDF ? { fontSize: `${bodyFontSize}px`, lineHeight: '1.6', color: template.pdfStyle.textColor } : 'text-white/95 font-medium drop-shadow'
        };
      case 'minimal':
        return {
          title: isForPDF ? { fontSize: `${titleFontSize}px`, fontWeight: 'light', color: template.pdfStyle.headerColor } : 'text-gray-900 dark:text-white font-light tracking-wide',
          body: isForPDF ? { fontSize: `${bodyFontSize}px`, lineHeight: '1.6', color: template.pdfStyle.textColor } : 'text-gray-600 dark:text-gray-400 font-normal'
        };
      case 'tech':
        return {
          title: isForPDF ? { fontSize: `${titleFontSize}px`, fontWeight: 'bold', color: template.pdfStyle.headerColor } : 'text-white font-bold tracking-tight drop-shadow-lg',
          body: isForPDF ? { fontSize: `${bodyFontSize}px`, lineHeight: '1.6', color: template.pdfStyle.textColor } : 'text-gray-100 font-medium'
        };
      default:
        return {
          title: isForPDF ? { fontSize: `${titleFontSize}px`, fontWeight: 'bold', color: template.pdfStyle.headerColor } : 'text-gray-800 dark:text-gray-200 font-bold',
          body: isForPDF ? { fontSize: `${bodyFontSize}px`, lineHeight: '1.6', color: template.pdfStyle.textColor } : 'text-gray-700 dark:text-gray-300'
        };
    }
  };

  const getSlideNumberStyle = () => {
    switch (template.id) {
      case 'modern':
        return isForPDF ? { fontSize: `${14 * fontScale}px`, color: template.pdfStyle.primaryColor, fontWeight: 'bold', background: 'rgba(255,255,255,0.8)', padding: '4px 8px', borderRadius: '4px' } : 'text-blue-600 dark:text-blue-400 font-bold bg-white/80 px-2 py-1 rounded';
      case 'creative':
        return isForPDF ? { fontSize: `${14 * fontScale}px`, color: template.pdfStyle.primaryColor, fontWeight: 'bold', background: 'rgba(0,0,0,0.2)', padding: '4px 8px', borderRadius: '4px' } : 'text-white font-bold bg-black/20 px-2 py-1 rounded backdrop-blur-sm';
      case 'minimal':
        return isForPDF ? { fontSize: `${14 * fontScale}px`, color: template.pdfStyle.accentColor, fontWeight: 'medium' } : 'text-gray-600 dark:text-gray-400 font-medium';
      case 'tech':
        return isForPDF ? { fontSize: `${14 * fontScale}px`, color: template.pdfStyle.primaryColor, fontWeight: 'bold', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', border: `1px solid ${template.pdfStyle.primaryColor}30` } : 'text-cyan-400 font-bold bg-black/30 px-2 py-1 rounded border border-cyan-400/30';
      default:
        return isForPDF ? { fontSize: `${14 * fontScale}px`, color: template.pdfStyle.primaryColor, fontWeight: 'bold' } : 'text-gray-600 dark:text-gray-400 font-bold';
    }
  };

  const textStyles = getTemplateSpecificTextStyles();

  return (
    <div 
      ref={slideRef}
      className={isForPDF ? '' : `${template.style} rounded-xl flex flex-col justify-center items-center relative overflow-hidden shadow-2xl`}
      style={{
        width,
        height,
        background: isForPDF ? template.pdfStyle.background : undefined,
        fontFamily: isForPDF ? 'Arial, sans-serif' : undefined,
        boxSizing: 'border-box',
        padding,
      }}
    >
      {/* Template-specific decorative elements */}
      {getTemplateSpecificElements()}

      {/* Slide number with template-specific styling */}
      <div 
        className={isForPDF ? '' : `absolute top-4 left-4 text-sm z-20 ${getSlideNumberStyle()}`}
        style={isForPDF ? { 
          position: 'absolute', 
          top: isForPDF ? '45px' : '30px', 
          left: isForPDF ? '45px' : '30px', 
          zIndex: 20, 
          ...getSlideNumberStyle() 
        } : undefined}
      >
        {slideNumber}/{totalSlides}
      </div>

      {/* Dimensions and word count (only in preview mode) */}
      {!isForPDF && (
        <div className="absolute bottom-4 right-4 text-sm z-20 text-gray-600 dark:text-gray-400 font-medium bg-white/80 dark:bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
          Preview: {dimensions} | PDF: {pdfDimensions} | {wordCount} words
        </div>
      )}

      {/* Main content with enhanced styling */}
      <div 
        className={isForPDF ? '' : 'text-center z-10 relative flex flex-col justify-center items-center'}
        style={isForPDF ? { 
          textAlign: 'center', 
          maxWidth: maxContentWidth, 
          maxHeight: maxContentHeight,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        } : undefined}
      >
        <h1 
          className={isForPDF ? '' : `mb-6 ${textStyles.title} leading-tight`}
          style={isForPDF ? { 
            ...textStyles.title, 
            marginBottom: isForPDF ? '45px' : '30px', 
            lineHeight: '1.2',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            maxWidth: maxContentWidth,
          } : undefined}
        >
          {title}
        </h1>
        
        {bodyContent && (
          <div 
            className={isForPDF ? '' : `leading-relaxed ${textStyles.body} whitespace-pre-wrap`}
            style={isForPDF ? { 
              ...textStyles.body, 
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
              maxWidth: maxContentWidth,
              maxHeight: `calc(${maxContentHeight} - ${isForPDF ? '90px' : '60px'})`, // Subtract title space
              overflow: 'hidden',
            } : undefined}
          >
            {bodyContent}
          </div>
        )}
      </div>

      {/* Template-specific bottom accent */}
      {template.id === 'modern' && (
        <div 
          className={isForPDF ? '' : 'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400'}
          style={isForPDF ? { 
            position: 'absolute', 
            bottom: '0', 
            left: '0', 
            right: '0', 
            height: isForPDF ? '6px' : '4px', 
            background: `linear-gradient(90deg, ${template.pdfStyle.primaryColor}, ${template.pdfStyle.accentColor})` 
          } : undefined}
        />
      )}
      {template.id === 'creative' && (
        <div 
          className={isForPDF ? '' : 'absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600'}
          style={isForPDF ? { 
            position: 'absolute', 
            bottom: '0', 
            left: '0', 
            right: '0', 
            height: isForPDF ? '6px' : '4px', 
            background: `linear-gradient(90deg, ${template.pdfStyle.primaryColor}, ${template.pdfStyle.accentColor})` 
          } : undefined}
        />
      )}
      {template.id === 'minimal' && (
        <div 
          className={isForPDF ? '' : 'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gray-400'}
          style={isForPDF ? { 
            position: 'absolute', 
            bottom: '0', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            width: isForPDF ? '120px' : '80px', 
            height: isForPDF ? '3px' : '2px', 
            background: template.pdfStyle.accentColor 
          } : undefined}
        />
      )}
      {template.id === 'tech' && (
        <div 
          className={isForPDF ? '' : 'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg shadow-cyan-400/50'}
          style={isForPDF ? { 
            position: 'absolute', 
            bottom: '0', 
            left: '0', 
            right: '0', 
            height: isForPDF ? '6px' : '4px', 
            background: `linear-gradient(90deg, ${template.pdfStyle.primaryColor}, ${template.pdfStyle.accentColor})` 
          } : undefined}
        />
      )}
    </div>
  );
}