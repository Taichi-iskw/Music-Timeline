"use client";
import React from "react";
import TimelineRow from "./TimelineRow";
import SortableHeader from "./SortableHeader";
import type { Work, Artist } from "../../types/timeline";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

type TimelineTableProps = {
  years: string[];
  artistNames: string[];
  artists: Artist[];
  worksByYearAndArtist: Work[][][]; // 3D array: [year][artist][works] - Works organized by year and artist
  onRemoveArtist?: (artistIndex: number) => void;
  onToggleSort?: () => void;
  isAscending?: boolean;
  onWorkClick?: (work: Work) => void;
  onSortEnd?: (newOrder: number[]) => void;
};

// Main timeline table component with draggable artist headers
const TimelineTable: React.FC<TimelineTableProps> = ({
  years,
  artistNames,
  artists,
  worksByYearAndArtist,
  onRemoveArtist,
  onToggleSort,
  isAscending = false,
  onWorkClick,
  onSortEnd,
}) => {
  // Configure drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Handle drag end event and update artist order
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = artistNames.findIndex((name) => name === active.id);
      const newIndex = artistNames.findIndex((name) => name === over.id);
      if (onSortEnd) {
        // Return new order as array of indices
        const newOrder = arrayMove(
          artistNames.map((_, i) => i),
          oldIndex,
          newIndex
        );
        onSortEnd(newOrder);
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
            <SortableContext items={artistNames} strategy={verticalListSortingStrategy}>
              {artistNames.map((name, idx) => (
                <SortableHeader
                  key={name}
                  id={name}
                  index={idx}
                  name={name}
                  artist={artists[idx]}
                  onRemove={onRemoveArtist ? () => onRemoveArtist(idx) : undefined}
                />
              ))}
            </SortableContext>
          </tr>
        </thead>
        <tbody>
          {years.map((year, yearIdx) => (
            <TimelineRow
              key={year}
              year={year}
              worksByArtist={worksByYearAndArtist[yearIdx]}
              onWorkClick={onWorkClick}
            />
          ))}
        </tbody>
      </table>
    </DndContext>
  );
};

export default TimelineTable;
