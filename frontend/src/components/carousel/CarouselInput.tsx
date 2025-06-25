'use client';

interface CarouselInputProps {
  inputText: string;
  pageCount: number;
  onInputChange: (text: string) => void;
  onPageCountChange: (count: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function CarouselInput({ 
  inputText, 
  pageCount,
  onInputChange, 
  onPageCountChange,
  onGenerate, 
  isGenerating 
}: CarouselInputProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        What story do you want to tell?
      </h2>
      
      <div className="space-y-6">
        <div className="relative">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Topic
          </label>
          <textarea
            id="topic"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter your main topic or theme... (e.g., '5 tips for better productivity', 'How to build a personal brand')"
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-400">
            {inputText.length}/500
          </div>
        </div>

        <div>
          <label htmlFor="pageCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Slides
          </label>
          <select
            id="pageCount"
            value={pageCount}
            onChange={(e) => onPageCountChange(parseInt(e.target.value))}
            className="w-full md:w-48 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {[3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num} slides</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={onGenerate}
          disabled={!inputText.trim() || isGenerating}
          className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Carousel...
            </div>
          ) : (
            'Generate Carousel'
          )}
        </button>
      </div>
    </div>
  );
}