"use client";
import React from "react";
import TimelineRow from "./TimelineRow";

type Work = {
  id: string;
  name: string;
  imageUrl?: string;
};

type TimelineTableProps = {
  years: string[];
  artistNames: string[];
  worksByYearAndArtist: Work[][][]; // 3D array: [year][artist][works] - Works organized by year and artist
  onRemoveArtist?: (artistIndex: number) => void;
};

const TimelineTable: React.FC<TimelineTableProps> = ({ years, artistNames, worksByYearAndArtist, onRemoveArtist }) => (
  <table className="min-w-full border-collapse">
    <thead>
      <tr>
        <th className="border px-2 py-2 bg-gray-100 w-24">Year</th>
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
        <TimelineRow key={year} year={year} worksByArtist={worksByYearAndArtist[yearIdx]} />
      ))}
    </tbody>
  </table>
);

export default TimelineTable;
