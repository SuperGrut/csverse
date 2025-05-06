import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Filter as FilterIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Updated list of CS subjects from ContributeModal
const allSubjects = [
  // Foundational
  "Discrete Mathematics",
  "Programming Fundamentals",
  "Calculus",
  "Linear Algebra",
  "Probability & Statistics",
  // Core
  "Data Structures",
  "Algorithms",
  "Digital Logic",
  "Computer Architecture",
  "Operating Systems",
  "Database Systems",
  "Software Engineering",
  "Computer Networks",
  "Theory of Computation",
  "Compiler Design",
  // Advanced
  "Artificial Intelligence",
  "Machine Learning",
  "Cloud Computing",
  "Cryptography",
  "Cybersecurity",
  "Distributed Systems",
  "Computer Graphics",
  "Human-Computer Interaction",
  "Natural Language Processing",
  "Bioinformatics",
  "Robotics",
  "Quantum Computing",
];

const displaySubjects = ["All", ...allSubjects]; // Add "All" to the beginning

const VISIBLE_TAGS_COUNT_LG = 6; // Number of tags visible on large screens
const VISIBLE_TAGS_COUNT_SM = 3; // Number of tags visible on small screens

const Filter = ({ selectedFilter, onFilterChange }) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      setPage(0); // Reset page when switching between mobile/desktop
      setDirection(0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tagsPerPage = isMobile ? VISIBLE_TAGS_COUNT_SM : VISIBLE_TAGS_COUNT_LG;

  const paginate = (newDirection) => {
    // Ensure page doesn't go below 0 or beyond the last page
    const nextPage = page + newDirection;
    const totalPages = Math.ceil(displaySubjects.length / tagsPerPage);
    if (nextPage >= 0 && nextPage < totalPages) {
      setPage(nextPage);
      setDirection(newDirection);
    } else if (newDirection === 1 && page === totalPages - 1) {
      // Optional: loop back to start from the end
      // setPage(0);
      // setDirection(1);
    } else if (newDirection === -1 && page === 0) {
      // Optional: loop back to end from the start
      // setPage(totalPages - 1);
      // setDirection(-1);
    }
  };

  const startIndex = page * tagsPerPage;
  const endIndex = startIndex + tagsPerPage;
  // Ensure endIndex doesn't exceed array bounds, useful for the last page
  const visibleTags = displaySubjects.slice(
    startIndex,
    Math.min(endIndex, displaySubjects.length)
  );

  const totalPages = Math.ceil(displaySubjects.length / tagsPerPage);
  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0,
      };
    },
  };

  return (
    <div className="flex items-center space-x-2 p-4 bg-[#161e27] rounded-md my-4 shadow relative overflow-hidden">
      {/* Pagination Button Left */}
      <button
        onClick={() => paginate(-1)}
        disabled={!canGoPrev}
        className={`p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 z-10 ${
          !canGoPrev ? "text-gray-400" : "text-indigo-600"
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Tag Container - Always uses pagination now */}
      <div className="flex-1 flex items-center justify-center h-8 overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page} // Keyed by page for animation
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute flex space-x-2 w-full justify-center cursor-grab"
            drag="x" // Enable horizontal dragging
            dragConstraints={{ left: 0, right: 0 }} // Constrain visual drag
            onDragEnd={(event, { offset, velocity }) => {
              const swipeThreshold = 50; // Minimum drag distance pixels
              const velocityThreshold = 200; // Minimum velocity
              const swipePower = Math.abs(offset.x) * velocity.x;

              if (
                swipePower < -swipeThreshold * velocityThreshold &&
                offset.x < -swipeThreshold
              ) {
                paginate(1); // Swiped left
              } else if (
                swipePower > swipeThreshold * velocityThreshold &&
                offset.x > swipeThreshold
              ) {
                paginate(-1); // Swiped right
              }
              // Otherwise, the animation will snap back due to the key change if paginate is called
              // or snap back naturally if swipe wasn't strong enough.
            }}
            // Removed inline style for minWidth
          >
            {visibleTags.map((tag) => (
              <motion.button
                key={tag}
                className={`px-3 py-1 border rounded-full text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-1
                  ${
                    (tag === "All" && selectedFilter === null) ||
                    selectedFilter === tag
                      ? "bg-indigo-600 text-white border-indigo-700 focus:ring-indigo-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 focus:ring-indigo-500"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (tag === "All") {
                    onFilterChange(null); // Clicking "All" clears the filter
                  } else if (selectedFilter === tag) {
                    onFilterChange(null); // Clicking selected tag clears filter
                  } else {
                    onFilterChange(tag); // Clicking other tag selects it
                  }
                }}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Button Right */}
      <button
        onClick={() => paginate(1)}
        disabled={!canGoNext}
        className={`p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 z-10 ${
          !canGoNext ? "text-gray-400" : "text-indigo-600"
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Filter;
