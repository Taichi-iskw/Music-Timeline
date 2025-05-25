"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import type { CarouselProps } from "../../types/components";
import { measureCardAndGap } from "../../utils/carousel";
import CarouselArrowButton from "./CarouselArrowButton";
import CarouselSlider from "./CarouselSlider";

const MAIN_SIZE = 5; // Maximum number of main cards displayed
const DEFAULT_CARD_WIDTH = 200;
const DEFAULT_GAP = 24; // gap-6

interface CarouselWithResetProps extends CarouselProps {
  resetKey?: unknown;
}

const Carousel: React.FC<CarouselWithResetProps> = ({ children, resetKey }) => {
  const total = children.length;
  const groupCount = Math.ceil(total / MAIN_SIZE);
  const [page, setPage] = useState(0); // page is the group index (0, 1, 2, ...)
  const [cardWidth, setCardWidth] = useState(DEFAULT_CARD_WIDTH);
  const [gap, setGap] = useState(DEFAULT_GAP);
  const cardRef = useRef<HTMLDivElement>(null!);
  const groupRef = useRef<HTMLDivElement>(null!);

  // Reset page to 0 when children changes (e.g., after a new search)
  useEffect(() => {
    setPage(0);
  }, [resetKey]);

  // Measure card width and gap
  const measureSizes = useCallback(() => {
    if (cardRef.current && groupRef.current) {
      const { cardWidth, gap } = measureCardAndGap(cardRef.current, groupRef.current);
      setCardWidth(cardWidth);
      setGap(gap);
    }
  }, []);

  useEffect(() => {
    measureSizes();
    window.addEventListener("resize", measureSizes);
    return () => window.removeEventListener("resize", measureSizes);
  }, [measureSizes, children]);

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

  // Calculate group width dynamically
  const groupWidth = cardWidth * MAIN_SIZE + gap * (MAIN_SIZE - 1);
  const slidePx = -(page * groupWidth);

  return (
    <div className="relative flex items-center w-full select-none overflow-hidden">
      <CarouselArrowButton direction="left" onClick={handlePrev} disabled={!canPrev} ariaLabel="Previous" />
      <CarouselSlider
        groupCount={groupCount}
        groupWidth={groupWidth}
        slidePx={slidePx}
        groupRef={groupRef}
        cardRef={cardRef}
        MAIN_SIZE={MAIN_SIZE}
      >
        {children}
      </CarouselSlider>
      <CarouselArrowButton direction="right" onClick={handleNext} disabled={!canNext} ariaLabel="Next" />
    </div>
  );
};

export default Carousel;
