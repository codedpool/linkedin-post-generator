import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CarouselTemplate } from './types';
import { SlideDisplay } from './SlideDisplay';
import React from 'react';
import ReactDOM from 'react-dom/client';

export const exportSlidesAsPDF = async (
  slides: string[],
  template: CarouselTemplate
): Promise<void> => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [1200, 1500] // PDF page size
  });

  // Ensure global CSS is loaded
  const style = document.createElement('style');
  style.textContent = `
    @import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;700&display=swap");
    :root {
      --font-geist-sans: 'Geist', sans-serif;
    }
    body {
      font-family: var(--font-geist-sans), Arial, sans-serif;
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < slides.length; i++) {
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '1200px';
    tempContainer.style.height = '1500px';
    document.body.appendChild(tempContainer);

    // Render SlideDisplay component
    const root = ReactDOM.createRoot(tempContainer);
    root.render(
      React.createElement(SlideDisplay, {
        content: slides[i],
        slideNumber: i + 1,
        totalSlides: slides.length,
        template: template,
        isForPDF: true
      })
    );

    try {
      // Wait for rendering to complete
      await new Promise(resolve => setTimeout(resolve, 500));

      // Convert to canvas with high resolution
      const canvas = await html2canvas(tempContainer, {
        width: 1200,
        height: 1500,
        scale: 2, // Increase scale for better quality
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        imageTimeout: 0,
        windowWidth: 1200,
        windowHeight: 1500,
      });

      // Add to PDF
      if (i > 0) {
        pdf.addPage();
      }
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, 0, 1200, 1500);

    } catch (error) {
      console.error(`Error processing slide ${i + 1}:`, error);
      throw error;
    } finally {
      // Clean up
      root.unmount();
      document.body.removeChild(tempContainer);
    }
  }

  // Clean up global styles
  document.head.removeChild(style);

  // Save the PDF
  pdf.save('carousel-slides.pdf');
};

export const exportSlidesAsTXT = (slides: string[]): void => {
  const textContent = slides.map((slide, index) => 
    `Slide ${index + 1}:\n${slide}\n\n`
  ).join('');
  
  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'carousel-slides.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const copyAllSlides = (slides: string[]): void => {
  const allSlides = slides.map((slide, index) => 
    `Slide ${index + 1}:\n${slide}\n\n`
  ).join('');
  navigator.clipboard.writeText(allSlides);
};