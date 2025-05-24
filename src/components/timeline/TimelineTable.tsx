"use client";
import React from "react";
import TimelineRow from "./TimelineRow";
import type { Work } from "../../types/timeline";

type TimelineTableProps = {
  years: string[];
  artistNames: string[];
  worksByYearAndArtist: Work[][][]; // 3D array: [year][artist][works] - Works organized by year and artist
  onRemoveArtist?: (artistIndex: number) => void;
  onToggleSort?: () => void;
  isAscending?: boolean;
  onWorkClick?: (work: Work) => void;
};

const TimelineTable: React.FC<TimelineTableProps> = ({
  years,
  artistNames,
  worksByYearAndArtist,
  onRemoveArtist,
  onToggleSort,
  isAscending = false,
  onWorkClick,
}) => (
  <table className="min-w-full border-collapse">
    <thead className="sticky top-0 z-20 bg-gray-100">
      <tr>
        <th className="border px-2 py-2 bg-gray-100 w-24">
          <div className="flex items-center justify-center gap-2">
            <span>Year</span>
            {onToggleSort && (
              <button
                onClick={onToggleSort}
                className="text-gray-500 hover:text-gray-700"
                aria-label={isAscending ? "Sort descending" : "Sort ascending"}
              >
                {isAscending ? "↑" : "↓"}
              </button>
            )}
          </div>
        </th>
        {artistNames.map((name, idx) => (
          <th key={idx} className="border px-2 py-2 bg-gray-100">
            <div className="flex items-center justify-center gap-2">
              <span>{name}</span>
              {onRemoveArtist && (
                <button onClick={() => onRemoveArtist(idx)} className="text-gray-500 hover:text-red-500 text-sm">
                  ×
                </button>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {years.map((year, yearIdx) => (
        <TimelineRow key={year} year={year} worksByArtist={worksByYearAndArtist[yearIdx]} onWorkClick={onWorkClick} />
      ))}
    </tbody>
  </table>
);

export default TimelineTable;
