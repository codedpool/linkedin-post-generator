import { CarouselTemplate } from './types';

export const templates: CarouselTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, minimalist design perfect for business content',
    preview: '📊',
    style: 'bg-white dark:bg-gray-900 relative overflow-hidden',
    pdfStyle: {
      background: '#ffffff',
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      accentColor: '#3b82f6',
      textColor: '#1f2937',
      headerColor: '#1e3a8a'
    }
  },
  {
    id: 'creative',
    name: 'Creative Vibrant',
    description: 'Colorful and engaging for creative industries',
    preview: '🎨',
    style: 'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 relative overflow-hidden',
    pdfStyle: {
      background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #4f46e5 100%)',
      primaryColor: '#ffffff',
      secondaryColor: '#f8fafc',
      accentColor: '#fbbf24',
      textColor: '#ffffff',
      headerColor: '#ffffff'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant for focused messaging',
    preview: '✨',
    style: 'bg-gray-50 dark:bg-gray-800 relative overflow-hidden',
    pdfStyle: {
      background: '#f9fafb',
      primaryColor: '#374151',
      secondaryColor: '#6b7280',
      accentColor: '#9ca3af',
      textColor: '#111827',
      headerColor: '#1f2937'
    }
  },
  {
    id: 'tech',
    name: 'Tech Modern',
    description: 'Perfect for technology and startup content',
    preview: '💻',
    style: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden',
    pdfStyle: {
      background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #581c87 100%)',
      primaryColor: '#00d4ff',
      secondaryColor: '#60a5fa',
      accentColor: '#34d399',
      textColor: '#ffffff',
      headerColor: '#ffffff'
    }
  }
];