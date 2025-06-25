import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CarouselTemplate } from './types';

export const exportSlidesAsPDF = async (
  slides: string[],
  template: CarouselTemplate
): Promise<void> => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [800, 600]
  });

  for (let i = 0; i < slides.length; i++) {
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '800px';
    tempContainer.style.height = '600px';
    document.body.appendChild(tempContainer);

    // Create slide element directly as DOM element
    const slideElement = document.createElement('div');
    slideElement.style.width = '800px';
    slideElement.style.height = '600px';
    slideElement.style.background = template.pdfStyle.background;
    slideElement.style.display = 'flex';
    slideElement.style.flexDirection = 'column';
    slideElement.style.justifyContent = 'center';
    slideElement.style.alignItems = 'center';
    slideElement.style.padding = '60px';
    slideElement.style.fontFamily = 'Arial, sans-serif';
    slideElement.style.position = 'relative';
    slideElement.style.boxSizing = 'border-box';

    // Parse content
    const lines = slides[i].split('\n').filter(line => line.trim());
    const title = lines[0] || `Slide ${i + 1}`;
    const bodyContent = lines.slice(1).join('\n');

    // Create header bar
    const headerBar = document.createElement('div');
    headerBar.style.position = 'absolute';
    headerBar.style.top = '0';
    headerBar.style.left = '0';
    headerBar.style.right = '0';
    headerBar.style.height = '8px';
    headerBar.style.background = template.pdfStyle.primaryColor;
    slideElement.appendChild(headerBar);

    // Create decorative circles
    const circle1 = document.createElement('div');
    circle1.style.position = 'absolute';
    circle1.style.top = '20px';
    circle1.style.right = '20px';
    circle1.style.width = '60px';
    circle1.style.height = '60px';
    circle1.style.borderRadius = '50%';
    circle1.style.background = template.pdfStyle.accentColor;
    circle1.style.opacity = '0.3';
    slideElement.appendChild(circle1);

    const circle2 = document.createElement('div');
    circle2.style.position = 'absolute';
    circle2.style.bottom = '20px';
    circle2.style.left = '20px';
    circle2.style.width = '40px';
    circle2.style.height = '40px';
    circle2.style.borderRadius = '50%';
    circle2.style.background = template.pdfStyle.secondaryColor;
    circle2.style.opacity = '0.2';
    slideElement.appendChild(circle2);

    // Create slide number
    const slideNumber = document.createElement('div');
    slideNumber.style.position = 'absolute';
    slideNumber.style.top = '30px';
    slideNumber.style.left = '30px';
    slideNumber.style.fontSize = '14px';
    slideNumber.style.color = template.pdfStyle.primaryColor;
    slideNumber.style.fontWeight = 'bold';
    slideNumber.textContent = `${i + 1}/${slides.length}`;
    slideElement.appendChild(slideNumber);

    // Create main content container
    const contentContainer = document.createElement('div');
    contentContainer.style.textAlign = 'center';
    contentContainer.style.maxWidth = '600px';
    contentContainer.style.width = '100%';
    contentContainer.style.overflow = 'hidden';

    // Create title with dynamic font sizing
    const titleElement = document.createElement('h1');
    const titleLength = title.length;
    let titleFontSize = '32px';
    
    // Adjust title font size based on length
    if (titleLength > 80) {
      titleFontSize = '24px';
    } else if (titleLength > 60) {
      titleFontSize = '28px';
    } else if (titleLength > 40) {
      titleFontSize = '30px';
    }
    
    titleElement.style.fontSize = titleFontSize;
    titleElement.style.fontWeight = 'bold';
    titleElement.style.color = template.pdfStyle.headerColor;
    titleElement.style.marginBottom = '24px';
    titleElement.style.lineHeight = '1.2';
    titleElement.style.margin = '0 0 24px 0';
    titleElement.style.wordWrap = 'break-word';
    titleElement.style.overflowWrap = 'break-word';
    titleElement.style.hyphens = 'auto';
    titleElement.textContent = title;
    contentContainer.appendChild(titleElement);

    // Create body content with dynamic font sizing
    if (bodyContent) {
      const bodyElement = document.createElement('div');
      const bodyLength = bodyContent.length;
      let bodyFontSize = '16px';
      
      // Adjust body font size based on content length
      if (bodyLength > 800) {
        bodyFontSize = '14px';
      } else if (bodyLength > 600) {
        bodyFontSize = '15px';
      } else if (bodyLength > 400) {
        bodyFontSize = '16px';
      } else {
        bodyFontSize = '17px';
      }
      
      bodyElement.style.fontSize = bodyFontSize;
      bodyElement.style.lineHeight = '1.5';
      bodyElement.style.color = template.pdfStyle.textColor;
      bodyElement.style.whiteSpace = 'pre-wrap';
      bodyElement.style.wordWrap = 'break-word';
      bodyElement.style.overflowWrap = 'break-word';
      bodyElement.style.hyphens = 'auto';
      bodyElement.style.maxHeight = '350px';
      bodyElement.style.overflow = 'hidden';
      bodyElement.textContent = bodyContent;
      contentContainer.appendChild(bodyElement);
    }

    slideElement.appendChild(contentContainer);

    // Create footer gradient
    const footerGradient = document.createElement('div');
    footerGradient.style.position = 'absolute';
    footerGradient.style.bottom = '0';
    footerGradient.style.left = '0';
    footerGradient.style.right = '0';
    footerGradient.style.height = '4px';
    footerGradient.style.background = `linear-gradient(90deg, ${template.pdfStyle.primaryColor} 0%, ${template.pdfStyle.accentColor} 100%)`;
    slideElement.appendChild(footerGradient);

    tempContainer.appendChild(slideElement);

    try {
      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Convert to canvas with consistent settings
      const canvas = await html2canvas(slideElement, {
        width: 800,
        height: 600,
        scale: 1.5, // Reduced scale for better consistency
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        imageTimeout: 0,
        removeContainer: true,
      });

      // Add to PDF
      if (i > 0) {
        pdf.addPage();
      }
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, 0, 800, 600);

    } catch (error) {
      console.error(`Error processing slide ${i + 1}:`, error);
      throw error;
    } finally {
      // Clean up
      document.body.removeChild(tempContainer);
    }
  }

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