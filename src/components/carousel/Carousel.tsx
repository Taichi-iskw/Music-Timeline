"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import type { CarouselProps } from "../../types/components";
import { measureCardAndGap } from "../../utils/carousel";
import CarouselArrowButton from "./CarouselArrowButton";
import CarouselSlider from "./CarouselSlider";

const MAIN_SIZE = {
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};
const DEFAULT_CARD_WIDTH = {
  sm: 160,
  md: 180,
  lg: 200,
  xl: 200,
};
const DEFAULT_GAP = 24; // gap-6

interface CarouselWithResetProps extends CarouselProps {
  resetKey?: unknown;
}

const Carousel: React.FC<CarouselWithResetProps> = ({ children, resetKey }) => {
  const total = children.length;
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg" | "xl">("xl");
  const mainSize = MAIN_SIZE[screenSize];
  const groupCount = Math.ceil(total / mainSize);
  const [page, setPage] = useState(0);
  const [cardWidth, setCardWidth] = useState(DEFAULT_CARD_WIDTH[screenSize]);
  const [gap, setGap] = useState(DEFAULT_GAP);
  const cardRef = useRef<HTMLDivElement>(null!);
  const groupRef = useRef<HTMLDivElement>(null!);

  // Reset page to 0 when children changes
  useEffect(() => {
    setPage(0);
  }, [resetKey]);

  // Update screen size based on window width
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("sm");
      else if (width < 768) setScreenSize("md");
      else if (width < 1024) setScreenSize("lg");
      else setScreenSize("xl");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

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
  }, [measureSizes, children, screenSize]);

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
  let groupWidth = cardWidth * mainSize + gap * (mainSize - 1);
  if (total < mainSize) {
    groupWidth = cardWidth * total + gap * (total - 1);
  }
  const slidePx = -(page * groupWidth);

  return (
    <div className="relative flex items-center w-full select-none overflow-hidden">
      <div className="absolute left-0 z-10">
        <CarouselArrowButton direction="left" onClick={handlePrev} disabled={!canPrev} ariaLabel="Previous" />
      </div>
      <div className="w-full flex justify-center">
        <CarouselSlider
          groupCount={groupCount}
          groupWidth={groupWidth}
          slidePx={slidePx}
          cardRef={cardRef}
          MAIN_SIZE={mainSize}
        >
          {children}
        </CarouselSlider>
      </div>
      <div className="absolute right-0 z-10">
        <CarouselArrowButton direction="right" onClick={handleNext} disabled={!canNext} ariaLabel="Next" />
      </div>
    </div>
  );
};

export default Carousel;
