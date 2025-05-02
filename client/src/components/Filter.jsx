import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Sample tags - replace or fetch these dynamically later
const allTags = [
  "React",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "Data Structures",
  "Algorithms",
  "CSS",
  "HTML",
  "Web Development",
  "Machine Learning",
  "System Design",
  "Go",
  "Rust",
  "Java",
  "C++",
];

const VISIBLE_TAGS_COUNT = 5; // Number of tags visible at a time

const Filter = () => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setPage(page + newDirection);
    setDirection(newDirection);
  };

  const startIndex = page * VISIBLE_TAGS_COUNT;
  const endIndex = startIndex + VISIBLE_TAGS_COUNT;
  const visibleTags = allTags.slice(startIndex, endIndex);

  const canGoPrev = page > 0;
  const canGoNext = endIndex < allTags.length;

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
    <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-md my-4 shadow relative overflow-hidden">
      <button
        onClick={() => paginate(-1)}
        disabled={!canGoPrev}
        className={`p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 z-10 ${
          !canGoPrev ? "" : "text-indigo-600"
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex-1 flex items-center justify-center h-8 overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute flex space-x-2"
            style={{ minWidth: "100%", justifyContent: "center" }}
          >
            {visibleTags.map((tag) => (
              <motion.button
                key={tag}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => paginate(1)}
        disabled={!canGoNext}
        className={`p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 z-10 ${
          !canGoNext ? "" : "text-indigo-600"
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Filter;
