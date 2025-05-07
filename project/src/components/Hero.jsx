import React from 'react';
import { ChevronRight, Search, Share2 } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
        <div className="absolute right-0 top-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute left-0 bottom-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Tags above the heading */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['New', 'Open Source', 'Community-Driven'].map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 text-xs font-medium text-blue-200 bg-blue-900 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover & Share <br className="md:hidden" />
            <span className="text-blue-400">Computer Science Resources</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mb-8">
            Find the best tutorials, courses, books, and tools to level up your CS skills.
            Join our community of developers sharing valuable resources.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-16">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
              Get Started
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg border border-gray-600 transition-colors duration-300">
              Learn More
            </button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-900 text-blue-400 rounded-full mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Find Resources</h3>
              <p className="text-gray-300">Discover curated computer science content tailored to your learning needs</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-900 text-blue-400 rounded-full mb-4">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Share Knowledge</h3>
              <p className="text-gray-300">Contribute by sharing valuable resources with fellow developers</p>
            </div>
            
            <div className="hidden lg:flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-900 text-blue-400 rounded-full mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
                  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Track Progress</h3>
              <p className="text-gray-300">Follow your learning journey and bookmark resources for later</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;