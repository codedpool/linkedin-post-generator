'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';

export default function LinkedInGenerator() {
  const [topicText, setTopicText] = useState('');
  const [contextText, setContextText] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [editedPost, setEditedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const generatePost = async () => {
    if (!topicText.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // Combine topic and context for the API call
      const userInput = contextText.trim() 
        ? `${topicText.trim()}\n\nContext: ${contextText.trim()}`
        : topicText.trim();

      const response = await fetch('http://localhost:5000/api/short-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from API');
      }

      const data = await response.json();
      const content = data.content || 'No content generated';
      setGeneratedPost(content);
      setEditedPost(content);
      setIsEditing(false);
      
    } catch (error) {
      console.error('Error generating LinkedIn post:', error);
      const fallbackContent = 'Failed to generate post. Please try again.';
      setGeneratedPost(fallbackContent);
      setEditedPost(fallbackContent);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    const contentToCopy = isEditing ? editedPost : generatedPost;
    if (!contentToCopy) return;

    try {
      await navigator.clipboard.writeText(contentToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Failed to copy. Please select and copy the text manually.');
    }
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedPost(generatedPost);
  };

  const saveEdit = () => {
    setGeneratedPost(editedPost);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedPost(generatedPost);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
         
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                💼
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              LinkedIn Post Generator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your ideas into engaging LinkedIn posts that drive professional engagement
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              What is on your mind?
            </h2>
            
            <div className="space-y-6">
              {/* Topic Input */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Topic <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="topic"
                    value={topicText}
                    onChange={(e) => setTopicText(e.target.value)}
                    placeholder="Enter your main topic or key message... (e.g., 'The importance of continuous learning in tech')"
                    className="w-full h-24 p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                    required
                  />
                  <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                    {topicText.length}/300
                  </div>
                </div>
              </div>

              {/* Context Input */}
              <div>
                <label htmlFor="context" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Context <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <textarea
                    id="context"
                    value={contextText}
                    onChange={(e) => setContextText(e.target.value)}
                    placeholder="Provide additional context, background, or specific details... (e.g., 'Based on my 5 years in software development', 'Recent industry trends show...')"
                    className="w-full h-24 p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  />
                  <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                    {contextText.length}/500
                  </div>
                </div>
              </div>
              
              <button
                onClick={generatePost}
                disabled={!topicText.trim() || isGenerating}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </div>
                ) : (
                  'Generate LinkedIn Post'
                )}
              </button>
            </div>
          </div>

          {/* Output Section - Only shows when post is generated */}
          {generatedPost && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your LinkedIn Post
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
                  disabled={!generatedPost}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-blue-500">
                {isEditing ? (
                  <textarea
                    value={editedPost}
                    onChange={(e) => setEditedPost(e.target.value)}
                    className="w-full h-64 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-200 font-medium leading-relaxed resize-none"
                    placeholder="Edit your LinkedIn post..."
                  />
                ) : (
                  <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                    {generatedPost}
                  </pre>
                )}
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={generatePost}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Generate Another
                    </button>
                    <button
                      onClick={startEditing}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Edit Post
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}