"use client";
import React from "react";
import TimelineCell from "./TimelineCell";
import type { TimelineRowProps } from "../../types/components";

const TimelineRow: React.FC<TimelineRowProps> = ({ year, worksByArtist, onWorkClick }) => (
  <tr className="timeline-row">
    <td className="timeline-year">{year}</td>
    {worksByArtist.map((works, idx) => (
      <TimelineCell key={idx} works={works} onWorkClick={onWorkClick} />
    ))}
  </tr>
);

export default TimelineRow;
