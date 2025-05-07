import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Screenshots = () => {
  const screenshots = [
    {
      id: 1,
      title: "Resource Discovery",
      description:
        "Browse thousands of computer science resources organized by topics",
      image: "/Screenshot (126).png",
    },
    {
      id: 2,
      title: "Personal Collections",
      description: "Create and organize your own resource collections",
      image: "/Screenshot (127).png",
    },
    {
      id: 3,
      title: "Community Sharing",
      description: "Share resources with the community and get feedback",
      image: "/Screenshot (128).png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="screenshots" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            App Screenshots
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See how our platform makes discovering and sharing CS resources
            simple and intuitive
          </p>
        </div>

        {/* Mobile slider (visible on small screens) */}
        <div className="relative md:hidden">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <div className="relative pb-[60%]">
              <img
                src={screenshots[currentIndex].image}
                alt={screenshots[currentIndex].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <h3 className="font-semibold text-xl text-white">
              {screenshots[currentIndex].title}
            </h3>
            <p className="text-gray-300 mt-2">
              {screenshots[currentIndex].description}
            </p>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>

            <div className="flex gap-1 items-center">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-blue-400" : "bg-gray-600"
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Desktop screenshots display (visible on medium+ screens) */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot.id}
              className={`rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 ${
                index === 1 ? "md:translate-y-8" : ""
              }`}
            >
              <div className="relative pb-[60%]">
                <img
                  src={screenshot.image}
                  alt={screenshot.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-gray-800">
                <h3 className="font-semibold text-xl mb-2 text-white">
                  {screenshot.title}
                </h3>
                <p className="text-gray-300">{screenshot.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
