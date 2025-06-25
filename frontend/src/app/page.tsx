'use client';

import { FloatingCard } from '@/components/FloatingCard';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-300">
      <Header />
    
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl opacity-10 rounded-full" />
            <h1 className="relative text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Create Amazing
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Content Instantly
              </span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into engaging LinkedIn posts and stunning carousels with our AI-powered content generators. 
            Create professional content in seconds, not hours.
          </p>
        </div>
      </section>

      {/* Choose Your Generator Section - Moved up */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Generator
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select from our powerful content creation tools to bring your ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <FloatingCard
              title="LinkedIn Post Generator"
              description="Create engaging LinkedIn posts that drive engagement and build your professional brand. Perfect for thought leadership and networking."
              icon="💼"
              href="/linkedin-generator"
              gradient="from-blue-500 to-cyan-500"
            />
            
            <FloatingCard
              title="Carousel Generator"
              description="Design beautiful carousel posts that tell your story across multiple slides. Ideal for tutorials, tips, and visual storytelling."
              icon="🎠"
              href="/carousel-generator"
              gradient="from-purple-500 to-pink-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CleverGen?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">Generate content in seconds with our optimized AI algorithms</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Beautiful Design</h3>
              <p className="text-gray-600 dark:text-gray-300">Professional templates that make your content stand out</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy to Use</h3>
              <p className="text-gray-600 dark:text-gray-300">Intuitive interface that anyone can master in minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CG</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">CleverGen</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            © 2025 CleverGen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}