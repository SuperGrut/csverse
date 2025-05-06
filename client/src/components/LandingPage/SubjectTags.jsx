"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SubjectTags() {
  const [paused, setPaused] = useState(false);
  const carouselRef = useRef(null);

  // Computer science subjects organized in three rows
  const subjects = [
    // Row 1
    [
      "Algorithms",
      "Data Structures",
      "Machine Learning",
      "Artificial Intelligence",
      "Computer Networks",
      "Operating Systems",
      "Database Systems",
      "Web Development",
      "Mobile Development",
      "Cloud Computing",
      "DevOps",
      "Cybersecurity",
    ],
    // Row 3
    [
      "Computer Architecture",
      "Distributed Systems",
      "Parallel Computing",
      "Quantum Computing",
      "Blockchain",
      "Natural Language Processing",
      "Computer Vision",
      "Robotics",
      "Game Development",
      "Compilers",
    ],
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const scrollSpeed = 1; // pixels per frame
    let animationFrameId;
    let lastTimestamp;

    const scroll = (timestamp) => {
      if (!carouselRef.current || paused) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      // For each row, scroll at the same speed but in alternating directions
      const rows = carouselRef.current.querySelectorAll(".tag-row");
      rows.forEach((row, index) => {
        const direction = index % 2 === 0 ? 1 : -1; // Alternate direction
        const scrollAmount = scrollSpeed * elapsed * 0.05 * direction;

        const htmlRow = row;
        if (htmlRow && typeof htmlRow === "object" && "scrollLeft" in htmlRow) {
          htmlRow.scrollLeft += scrollAmount;

          // Reset scroll position when reaching the end for infinite loop effect
          if (
            direction > 0 &&
            htmlRow.scrollLeft >= htmlRow.scrollWidth - htmlRow.clientWidth - 10
          ) {
            htmlRow.scrollLeft = 0;
          } else if (direction < 0 && htmlRow.scrollLeft <= 10) {
            htmlRow.scrollLeft = htmlRow.scrollWidth - htmlRow.clientWidth;
          }
        }
      });

      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [paused]);

  return (
    <div
      className="w-full max-w-5xl mx-auto overflow-hidden py-8 relative"
      ref={carouselRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16  z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16  z-10 pointer-events-none" />

      <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20"></div>

      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20"></div>

      {subjects.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className={`tag-row flex overflow-x-auto scrollbar-hide py-3 ${
            rowIndex > 0 ? "mt-4" : ""
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Duplicate tags for infinite scrolling effect */}
          {[...row, ...row].map((subject, index) => (
            <div
              key={`${subject}-${index}`}
              className="tag-item flex-shrink-0 px-4 py-2 bg-gray-100 rounded-full mx-2 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {subject}
            </div>
          ))}
        </div>
      ))}

      {/* Keep the style tag for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
