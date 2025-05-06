import React from "react";
import { Github, CircleArrowDown } from "lucide-react";

const HeroSection = ({ signInWithTwitter }) => {
  const scrollToSubjects = () => {
    const subjectsSection = document.getElementById("subjects");
    if (subjectsSection) {
      subjectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen pt-32 flex items-center bg-csdark text-foreground">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-csblue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-cspurple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-csgreen/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Discover & Share{" "}
            <span className="bg-gradient-to-br from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              Computer Science
            </span>{" "}
            Resources
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join a community of developers and students. Learn, contribute, and
            climb the ranks as you share valuable resources with fellow CS
            enthusiasts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={signInWithTwitter}
              className="bg-csblue text-white font-medium px-8 py-3 rounded shadow-[0_0_15px_rgba(0,120,255,0.5)] hover:bg-csblue/90 hover:shadow-[0_0_10px_rgba(0,120,255,0.3)] transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          <div className="mt-16 animate-bounce">
            <button onClick={scrollToSubjects} aria-label="Scroll to subjects">
              <CircleArrowDown className="h-10 w-10 text-white/70 hover:text-white transition-colors mx-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* Gradient border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
