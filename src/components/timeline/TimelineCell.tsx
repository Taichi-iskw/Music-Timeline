"use client";
import React from "react";
import WorkCard from "./WorkCard";
import type { TimelineCellProps } from "../../types/components";

const TimelineCell: React.FC<TimelineCellProps> = ({ works, onWorkClick }) => (
  <td className="timeline-cell">
    <div className="flex flex-col gap-3 items-center">
      {works.map((work) => (
        <WorkCard
          key={work.id}
          name={work.name}
          imageUrl={work.imageUrl}
          onClick={onWorkClick ? () => onWorkClick(work) : undefined}
        />
      ))}
    </div>
  </td>
);

export default TimelineCell;
