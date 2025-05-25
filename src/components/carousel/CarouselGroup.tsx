import React from "react";

interface CarouselGroupProps {
  children: React.ReactNode[];
  groupIdx: number;
  cardRef?: React.Ref<HTMLDivElement>;
}

const CarouselGroup = React.forwardRef<HTMLDivElement, CarouselGroupProps>(({ children, groupIdx, cardRef }, ref) => (
  <div
    ref={ref}
    className="flex flex-row gap-6 items-center flex-shrink-0 mx-auto max-w-full"
    style={{ width: "auto" }}
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
));
CarouselGroup.displayName = "CarouselGroup";

export default CarouselGroup;
