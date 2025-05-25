"use client";
import React from "react";
import TimelineRow from "./TimelineRow";
import SortableHeader from "./SortableHeader";
import type { TimelineTableProps } from "../../types/components";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const TimelineTable: React.FC<TimelineTableProps> = ({
  years,
  artistNames,
  artists,
  worksByYearAndArtist,
  onRemoveArtist,
  onToggleSort,
  isAscending = true,
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
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

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
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-20 bg-muted/50 backdrop-blur supports-[backdrop-filter]:bg-muted/50">
            <tr>
              <th className="border-b border-border px-4 py-3 text-left text-sm font-medium text-muted-foreground w-24">
                <div className="flex items-center justify-center gap-2 group">
                  <span className="group-hover:text-foreground transition-colors">Year</span>
                  {onToggleSort && (
                    <button
                      onClick={onToggleSort}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"
                      aria-label={isAscending ? "Sort descending" : "Sort ascending"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`w-4 h-4 transition-transform ${!isAscending ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
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
          <tbody className="divide-y divide-border">
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
      </div>
    </DndContext>
  );
};

export default TimelineTable;
