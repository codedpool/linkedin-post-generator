'use client';

import { CarouselTemplate } from './types';

interface CarouselTemplateSelectorProps {
  templates: CarouselTemplate[];
  selectedTemplate: CarouselTemplate;
  onTemplateSelect: (template: CarouselTemplate) => void;
}

export function CarouselTemplateSelector({ 
  templates, 
  selectedTemplate, 
  onTemplateSelect 
}: CarouselTemplateSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Choose Your Template
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedTemplate.id === template.id
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{template.preview}</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}