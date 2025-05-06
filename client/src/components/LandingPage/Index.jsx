import React from "react";

import { Code } from "lucide-react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AppShowcase from "./AppShowcase";
import SignInSection from "./SignInSection";
import SubjectTags from "./SubjectTags";

const Index = ({ signInWithTwitter }) => {
  return (
    <div className="bg-csdark min-h-screen text-foreground">
      <HeroSection signInWithTwitter={signInWithTwitter} />
      <AppShowcase />
      <SubjectTags />
      <SignInSection signInWithTwitter={signInWithTwitter} />

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <Code className="h-6 w-6 text-csblue" />
              <span className="ml-2 text-lg font-bold text-white">CSVerse</span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} CSVerse. All rights reserved.
            </p>
            <p className="text-gray-500 mt-4 md:mt-0">
              Designed for CS enthusiasts worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
