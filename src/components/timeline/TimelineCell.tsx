"use client";
import React from "react";
import WorkCard from "./WorkCard";
import type { Work } from "../../types/timeline";

type TimelineCellProps = {
  works: Work[];
};

const TimelineCell: React.FC<TimelineCellProps> = ({ works }) => (
  <td className="border align-top px-2 py-2">
    <div className="flex flex-col gap-2 items-center">
      {works.map((work) => (
        <WorkCard key={work.id} name={work.name} imageUrl={work.imageUrl} />
      ))}
    </div>
  </td>
);

export default TimelineCell;
