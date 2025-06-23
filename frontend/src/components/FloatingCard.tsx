'use client';

import Link from 'next/link';
import { useState } from 'react';

interface FloatingCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;
}

export function FloatingCard({ title, description, icon, href, gradient }: FloatingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href}>
      <div
        className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
          isHovered ? 'translate-y-[-8px]' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg`}>
              {icon}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
          <div className="mt-6 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
            Try it now
            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}