"use client";
import React from "react";
import TimelineCell from "./TimelineCell";
import type { TimelineRowProps } from "../../types/components";

const TimelineRow: React.FC<TimelineRowProps> = ({ year, worksByArtist, onWorkClick }) => (
  <tr className="hover:bg-muted/50 transition-colors">
    <td className="border-b border-border px-4 py-4 text-center text-sm font-medium text-muted-foreground bg-muted/30 w-24">
      {year}
    </td>
    {worksByArtist.map((works, idx) => (
      <TimelineCell key={idx} works={works} onWorkClick={onWorkClick} />
    ))}
  </tr>
);

export default TimelineRow;
