import React from "react";

interface CarouselGroupProps {
  children: React.ReactNode[];
  groupWidth: number;
  groupIdx: number;
  cardRef?: React.Ref<HTMLDivElement>;
  groupRef?: React.Ref<HTMLDivElement>;
}

const CarouselGroup = React.forwardRef<HTMLDivElement, CarouselGroupProps>(
  ({ children, groupWidth, groupIdx, cardRef, groupRef }, ref) => (
    <div
      ref={groupRef}
      className="flex flex-row gap-6 justify-center items-center flex-shrink-0 mx-auto"
      style={{ width: `${groupWidth}px`, maxWidth: `${groupWidth}px` }}
    >
      {children.map((card, idx) => (
        <div
          key={groupIdx * children.length + idx}
          className="flex-shrink-0"
          ref={groupIdx === 0 && idx === 0 ? cardRef : undefined}
        >
          {card}
        </div>
      ))}
    </div>
  )
);
CarouselGroup.displayName = "CarouselGroup";

export default CarouselGroup;
