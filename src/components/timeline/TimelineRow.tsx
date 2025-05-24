"use client";
import React from "react";
import TimelineCell from "./TimelineCell";
import type { Work } from "../../types/timeline";

type TimelineRowProps = {
  year: string;
  worksByArtist: Work[][]; // Array of works for each artist in this year
  onWorkClick?: (work: Work) => void;
};

const TimelineRow: React.FC<TimelineRowProps> = ({ year, worksByArtist, onWorkClick }) => (
  <tr>
    <td className="border px-2 py-4 text-center font-semibold bg-gray-50 w-24">{year}</td>
    {worksByArtist.map((works, idx) => (
      <TimelineCell key={idx} works={works} onWorkClick={onWorkClick} />
    ))}
  </tr>
);

export default TimelineRow;
