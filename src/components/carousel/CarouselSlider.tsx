import React, { RefObject } from "react";
import CarouselGroup from "./CarouselGroup";

interface CarouselSliderProps {
  groupCount: number;
  groupWidth: number;
  slidePx: number;
  children: React.ReactNode[];
  groupRef: RefObject<HTMLDivElement>;
  cardRef: RefObject<HTMLDivElement>;
  MAIN_SIZE: number;
}

const CarouselSlider: React.FC<CarouselSliderProps> = ({
  groupCount,
  groupWidth,
  slidePx,
  children,
  groupRef,
  cardRef,
  MAIN_SIZE,
}) => (
  <div className="w-full overflow-hidden relative">
    <div
      className="flex transition-transform duration-500 ease-in-out"
      style={{
        width: `${groupCount * groupWidth}px`,
        transform: `translateX(${slidePx}px)`,
      }}
    >
      {Array.from({ length: groupCount }).map((_, groupIdx) => (
        <CarouselGroup
          key={groupIdx}
          groupIdx={groupIdx}
          groupWidth={groupWidth}
          groupRef={groupIdx === 0 ? groupRef : undefined}
          cardRef={groupIdx === 0 ? cardRef : undefined}
        >
          {children.slice(groupIdx * MAIN_SIZE, groupIdx * MAIN_SIZE + MAIN_SIZE)}
        </CarouselGroup>
      ))}
    </div>
  </div>
);

export default CarouselSlider;
