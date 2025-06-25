import { CarouselTemplate } from './types';

export const templates: CarouselTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, minimalist design perfect for business content',
    preview: '📊',
    style: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-800 border-l-4 border-blue-500',
    pdfStyle: {
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
      primaryColor: '#3b82f6',
      secondaryColor: '#1e40af',
      accentColor: '#60a5fa',
      textColor: '#1f2937',
      headerColor: '#1e3a8a'
    }
  },
  {
    id: 'creative',
    name: 'Creative Vibrant',
    description: 'Colorful and engaging for creative industries',
    preview: '🎨',
    style: 'bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-800 border-l-4 border-purple-500',
    pdfStyle: {
      background: 'linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%)',
      primaryColor: '#a855f7',
      secondaryColor: '#7c3aed',
      accentColor: '#c084fc',
      textColor: '#374151',
      headerColor: '#6b21a8'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant for focused messaging',
    preview: '✨',
    style: 'bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-700 dark:to-slate-600 border-l-4 border-gray-500',
    pdfStyle: {
      background: 'linear-gradient(135deg, #f9fafb 0%, #f1f5f9 100%)',
      primaryColor: '#6b7280',
      secondaryColor: '#374151',
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
    style: 'bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-900 dark:to-teal-800 border-l-4 border-cyan-500',
    pdfStyle: {
      background: 'linear-gradient(135deg, #ecfeff 0%, #f0fdfa 100%)',
      primaryColor: '#06b6d4',
      secondaryColor: '#0891b2',
      accentColor: '#67e8f9',
      textColor: '#0f172a',
      headerColor: '#164e63'
    }
  }
];