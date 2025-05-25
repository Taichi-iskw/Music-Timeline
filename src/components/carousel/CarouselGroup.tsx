import React from "react";
// 型定義は any で暫定対応（linterエラー回避）
interface CarouselGroupProps {
  children: any[];
  groupWidth: number;
  groupIdx: number;
  cardRef?: React.Ref<HTMLDivElement>;
}

const CarouselGroup = React.forwardRef<HTMLDivElement, CarouselGroupProps>(
  ({ children, groupWidth, groupIdx, cardRef }, ref) => (
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
  )
);
CarouselGroup.displayName = "CarouselGroup";

export default CarouselGroup;
