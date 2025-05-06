import React, { useState, useEffect } from "react";
import { Code, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-foreground ${
        isScrolled ? "bg-csdark/80 backdrop-blur-md shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-csblue" />
              <span className="text-xl font-bold text-white">CodeSphere</span>
            </a>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#showcase"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  App
                </a>
              </li>
              <li>
                <a
                  href="#subjects"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Subjects
                </a>
              </li>
              <li>
                <a
                  href="#rankings"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Rankings
                </a>
              </li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white border-gray-600 hover:bg-gray-700 hover:text-white">
              Log in
            </button>
            <button className="bg-csblue hover:bg-csblue/80 text-white">
              Sign up
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-csdark border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#features"
              className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
            >
              Features
            </a>
            <a
              href="#showcase"
              className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
            >
              App
            </a>
            <a
              href="#subjects"
              className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
            >
              Subjects
            </a>
            <a
              href="#rankings"
              className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
            >
              Rankings
            </a>
            <div className="flex flex-col space-y-2 px-3 py-2">
              <button className="w-full justify-center text-white border-gray-600 hover:bg-gray-700">
                Log in
              </button>
              <button className="w-full justify-center bg-csblue hover:bg-csblue/80 text-white">
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
