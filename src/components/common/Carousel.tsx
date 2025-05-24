"use client";
import React, { useState } from "react";

type CarouselProps = {
  children: React.ReactNode[];
  pageSize?: number;
};

const Carousel: React.FC<CarouselProps> = ({ children, pageSize = 4 }) => {
  const [page, setPage] = useState(0);
  const maxPage = Math.max(0, Math.ceil(children.length / pageSize) - 1);

  const start = page * pageSize;
  const end = start + pageSize;
  const visible = children.slice(start, end);

  return (
    <div className="flex items-center gap-2 w-full">
      <button
        className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={page === 0}
        aria-label="Previous"
      >
        &lt;
      </button>
      <div className="flex flex-row gap-4 w-full justify-between">{visible}</div>
      <button
        className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
        disabled={page === maxPage}
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
