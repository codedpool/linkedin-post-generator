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
    format: [1200, 1500] // PDF page size
  });

  for (let i = 0; i < slides.length; i++) {
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '1200px'; // Match PDF width
    tempContainer.style.height = '1500px'; // Match PDF height
    document.body.appendChild(tempContainer);

    // Create slide element directly as DOM element
    const slideElement = document.createElement('div');
    slideElement.style.width = '1200px'; // Match PDF width
    slideElement.style.height = '1500px'; // Match PDF height
    slideElement.style.background = template.pdfStyle.background;
    slideElement.style.fontFamily = 'Arial, sans-serif';
    slideElement.style.position = 'relative';
    slideElement.style.boxSizing = 'border-box';
    // Remove flex centering to allow content to fill space
    // slideElement.style.display = 'flex';
    // slideElement.style.flexDirection = 'column';
    // slideElement.style.justifyContent = 'center';
    // slideElement.style.alignItems = 'center';

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
    headerBar.style.height = '12px'; // Scaled from 8px
    headerBar.style.background = template.pdfStyle.primaryColor;
    slideElement.appendChild(headerBar);

    // Create decorative circles
    const circle1 = document.createElement('div');
    circle1.style.position = 'absolute';
    circle1.style.top = '30px';
    circle1.style.right = '30px';
    circle1.style.width = '90px';
    circle1.style.height = '90px';
    circle1.style.borderRadius = '50%';
    circle1.style.background = template.pdfStyle.accentColor;
    circle1.style.opacity = '0.3';
    slideElement.appendChild(circle1);

    const circle2 = document.createElement('div');
    circle2.style.position = 'absolute';
    circle2.style.bottom = '30px';
    circle2.style.left = '30px';
    circle2.style.width = '60px';
    circle2.style.height = '60px';
    circle2.style.borderRadius = '50%';
    circle2.style.background = template.pdfStyle.secondaryColor;
    circle2.style.opacity = '0.2';
    slideElement.appendChild(circle2);

    // Create slide number
    const slideNumber = document.createElement('div');
    slideNumber.style.position = 'absolute';
    slideNumber.style.top = '45px';
    slideNumber.style.left = '45px';
    slideNumber.style.fontSize = '21px';
    slideNumber.style.color = template.pdfStyle.primaryColor;
    slideNumber.style.fontWeight = 'bold';
    slideNumber.textContent = `${i + 1}/${slides.length}`;
    slideElement.appendChild(slideNumber);

    // Create main content container
    const contentContainer = document.createElement('div');
    contentContainer.style.position = 'absolute';
    contentContainer.style.top = '90px'; // Start below header and padding
    contentContainer.style.left = '90px';
    contentContainer.style.right = '90px';
    contentContainer.style.bottom = '90px'; // Allow space for footer
    contentContainer.style.textAlign = 'center';
    contentContainer.style.overflow = 'hidden';

    // Create title with dynamic font sizing
    const titleElement = document.createElement('h1');
    const titleLength = title.length;
    let titleFontSize = '48px'; // Base size
    
    if (titleLength > 80) {
      titleFontSize = '36px';
    } else if (titleLength > 60) {
      titleFontSize = '42px';
    } else if (titleLength > 40) {
      titleFontSize = '45px';
    }
    
    titleElement.style.fontSize = titleFontSize;
    titleElement.style.fontWeight = 'bold';
    titleElement.style.color = template.pdfStyle.headerColor;
    titleElement.style.marginBottom = '36px';
    titleElement.style.lineHeight = '1.2';
    titleElement.style.wordWrap = 'break-word';
    titleElement.style.overflowWrap = 'break-word';
    titleElement.style.hyphens = 'auto';
    titleElement.textContent = title;
    contentContainer.appendChild(titleElement);

    // Create body content with dynamic font sizing
    if (bodyContent) {
      const bodyElement = document.createElement('div');
      const bodyLength = bodyContent.length;
      let bodyFontSize = '24px'; // Base size
      
      if (bodyLength > 800) {
        bodyFontSize = '21px';
      } else if (bodyLength > 600) {
        bodyFontSize = '22.5px';
      } else if (bodyLength > 400) {
        bodyFontSize = '24px';
      } else {
        bodyFontSize = '25.5px';
      }
      
      bodyElement.style.fontSize = bodyFontSize;
      bodyElement.style.lineHeight = '1.5';
      bodyElement.style.color = template.pdfStyle.textColor;
      bodyElement.style.whiteSpace = 'pre-wrap';
      bodyElement.style.wordWrap = 'break-word';
      bodyElement.style.overflowWrap = 'break-word';
      bodyElement.style.hyphens = 'auto';
      bodyElement.style.maxHeight = 'calc(100% - 100px)'; // Allow dynamic height
      bodyElement.style.overflow = 'auto';
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
    footerGradient.style.height = '6px';
    footerGradient.style.background = `linear-gradient(90deg, ${template.pdfStyle.primaryColor} 0%, ${template.pdfStyle.accentColor} 100%)`;
    slideElement.appendChild(footerGradient);

    tempContainer.appendChild(slideElement);

    try {
      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Convert to canvas with settings matching PDF size
      const canvas = await html2canvas(slideElement, {
        width: 1200,
        height: 1500,
        scale: 1.0,
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
      pdf.addImage(imgData, 'PNG', 0, 0, 1200, 1500);

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