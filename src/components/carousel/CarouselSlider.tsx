import React from "react";
import CarouselGroup from "./CarouselGroup";

interface CarouselSliderProps {
  groupCount: number;
  slidePx: number;
  children: React.ReactNode[];
  cardRef: React.RefObject<HTMLDivElement>;
  MAIN_SIZE: number;
}

const CarouselSlider: React.FC<CarouselSliderProps> = ({ groupCount, slidePx, children, cardRef, MAIN_SIZE }) => (
  <div className="overflow-hidden relative flex justify-center">
    <div
      className="flex transition-transform duration-500 ease-in-out justify-center w-auto"
      style={{
        transform: `translateX(${slidePx}px)`,
      }}
    >
      {Array.from({ length: groupCount }).map((_, groupIdx) => (
        <CarouselGroup key={groupIdx} groupIdx={groupIdx} cardRef={groupIdx === 0 ? cardRef : undefined}>
          {children.slice(groupIdx * MAIN_SIZE, groupIdx * MAIN_SIZE + MAIN_SIZE)}
        </CarouselGroup>
      ))}
    </div>
  </div>
);

export default CarouselSlider;
