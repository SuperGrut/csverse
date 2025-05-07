import React, { useEffect, useRef } from "react";

const TagsCarousel = () => {
  // Arrays of tags for each row
  const tagsRow1 = [
    "Database",
    "Operating System",
    "Computer Architecture",
    "Theory of Computation",
    "Compiler",
    "Computer Networks",
    "Cryptography",
    "Data Structures",
  ];

  const tagsRow2 = [
    "Machine Learning",
    "Data Structures",
    "Algorithms",
    "Web Development",
    "Mobile Apps",
    "Cloud Computing",
    "DevOps",
    "Database Design",
    "Networking",
    "Security",
    "Blockchain",
  ];

  const tagsRow3 = [
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Django",
    "Flask",
    "Spring Boot",
    "TensorFlow",
    "PyTorch",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "Redux",
  ];

  // Refs for each row
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);

  useEffect(() => {
    // Automatic scrolling animation for each row
    const animate = (element, direction) => {
      if (!element.current) return;

      const scrollSpeed = direction === "right" ? 0.5 : -0.5;
      let lastTime = null;

      const scrollAnimation = (timestamp) => {
        if (!element.current) return;

        if (!lastTime) lastTime = timestamp;
        const delta = timestamp - lastTime;
        lastTime = timestamp;

        // Scroll by a small amount based on delta
        element.current.scrollLeft += scrollSpeed * (delta / 10);

        // If we've scrolled too far, reset
        if (
          direction === "right" &&
          element.current.scrollLeft >=
            element.current.scrollWidth - element.current.clientWidth
        ) {
          element.current.scrollLeft = 0;
        } else if (direction === "left" && element.current.scrollLeft <= 0) {
          element.current.scrollLeft =
            element.current.scrollWidth - element.current.clientWidth;
        }

        requestAnimationFrame(scrollAnimation);
      };

      requestAnimationFrame(scrollAnimation);
    };

    // Start animations with different directions
    animate(row1Ref, "right");
    animate(row2Ref, "left");
    animate(row3Ref, "right");

    // No need to clean up as the component should persist
  }, []);

  const renderRow = (tags, ref) => (
    <div
      ref={ref}
      className="flex overflow-x-hidden whitespace-nowrap py-3 px-4 mb-4"
    >
      {/* Double the tags to create seamless looping */}
      {[...tags, ...tags].map((tag, index) => (
        <div
          key={index}
          className="inline-block mx-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full shadow-lg whitespace-nowrap hover:bg-gray-700 transition-colors"
        >
          {tag}
        </div>
      ))}
    </div>
  );

  return (
    <section id="resources" className="py-16 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Explore Resources by Topic
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Browse our extensive library of computer science resources organized
            by programming languages, concepts, and frameworks
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        {renderRow(tagsRow1, row1Ref)}
        {renderRow(tagsRow2, row2Ref)}
        {renderRow(tagsRow3, row3Ref)}
      </div>

      <div className="text-center mt-10">
        <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors duration-300">
          View All Topics
        </button>
      </div>
    </section>
  );
};

export default TagsCarousel;
