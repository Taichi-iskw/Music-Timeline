"use client";
import React, { useState, useEffect } from "react";
import type { CarouselProps } from "../../types/components";

const MAIN_SIZE = 5; // Maximum number of main cards displayed
const GROUP_WIDTH = 1096; // 200px * 5 + 24px * 4 (gap-6) = 1096px

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const total = children.length;
  const groupCount = Math.ceil(total / MAIN_SIZE);
  const [page, setPage] = useState(0); // page is the group index (0, 1, 2, ...)

  // Reset page to 0 when children changes (e.g., after a new search)
  useEffect(() => {
    setPage(0);
  }, [children]);

  // Main card index range for current group
  const mainStart = page * MAIN_SIZE;
  const mainEnd = Math.min(mainStart + MAIN_SIZE, total);
  const mainCards = children.slice(mainStart, mainEnd);

  // Scroll control
  const canPrev = page > 0;
  const canNext = page < groupCount - 1;

  // Change page by 1 group at a time
  const handlePrev = () => {
    if (canPrev) setPage((p) => Math.max(0, p - 1));
  };
  const handleNext = () => {
    if (canNext) setPage((p) => Math.min(groupCount - 1, p + 1));
  };

  // Slide animation: calculate translateX in px
  const slidePx = -(page * GROUP_WIDTH);

  return (
    <div className="relative flex items-center w-full select-none overflow-hidden">
      {/* Left arrow button */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background border border-border hover:bg-muted/50 hover:border-primary/50 text-muted-foreground disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 z-10"
        onClick={handlePrev}
        disabled={!canPrev}
        aria-label="Previous"
        style={{ zIndex: 2 }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Main cards with slide animation */}
      <div className="w-full overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${groupCount * GROUP_WIDTH}px`,
            transform: `translateX(${slidePx}px)`,
          }}
        >
          {Array.from({ length: groupCount }).map((_, groupIdx) => (
            <div
              key={groupIdx}
              className="flex flex-row gap-6 justify-center items-center flex-shrink-0 mx-auto"
              style={{ width: `${GROUP_WIDTH}px`, maxWidth: `${GROUP_WIDTH}px` }}
            >
              {children.slice(groupIdx * MAIN_SIZE, groupIdx * MAIN_SIZE + MAIN_SIZE).map((card, idx) => (
                <div key={groupIdx * MAIN_SIZE + idx} className="flex-shrink-0">
                  {card}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Right arrow button */}
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background border border-border hover:bg-muted/50 hover:border-primary/50 text-muted-foreground disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 z-10"
        onClick={handleNext}
        disabled={!canNext}
        aria-label="Next"
        style={{ zIndex: 2 }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
