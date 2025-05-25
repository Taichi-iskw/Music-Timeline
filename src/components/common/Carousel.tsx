"use client";
import React, { useState } from "react";
import type { CarouselProps } from "../../types/components";

const Carousel: React.FC<CarouselProps> = ({ children, pageSize = 6 }) => {
  const [page, setPage] = useState(0);
  const maxPage = Math.max(0, Math.ceil(children.length / pageSize) - 1);

  const start = page * pageSize;
  const end = start + pageSize;
  const visible = children.slice(start, end);

  return (
    <div className="flex items-center gap-2 w-full">
      <button
        className="p-2 rounded-full bg-background border border-border hover:bg-muted/50 hover:scale-105 hover:border-primary/50 text-muted-foreground disabled:opacity-50 disabled:hover:bg-background disabled:hover:scale-100 disabled:hover:border-border transition-all duration-200 shadow-sm active:scale-95"
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={page === 0}
        aria-label="Previous"
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
      <div className="flex flex-row gap-3 w-full justify-between">{visible}</div>
      <button
        className="p-2 rounded-full bg-background border border-border hover:bg-muted/50 hover:scale-105 hover:border-primary/50 text-muted-foreground disabled:opacity-50 disabled:hover:bg-background disabled:hover:scale-100 disabled:hover:border-border transition-all duration-200 shadow-sm active:scale-95"
        onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
        disabled={page === maxPage}
        aria-label="Next"
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
