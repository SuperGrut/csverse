import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Github, Twitter } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold text-white">CS Resources</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">Features</a>
              <a href="#screenshots" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">Screenshots</a>
              <a href="#resources" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">Resources</a>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                <Twitter className="h-4 w-4" />
                <span>Sign with X</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-blue-400 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-md shadow-lg mt-2">
              <a 
                href="#features" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#screenshots" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Screenshots
              </a>
              <a 
                href="#resources" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </a>
              <button className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                <Twitter className="h-4 w-4" />
                <span>Sign with X</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;