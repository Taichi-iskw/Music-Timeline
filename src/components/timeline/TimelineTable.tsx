"use client";
import React from "react";
import TimelineRow from "./TimelineRow";
import SortableHeader from "./SortableHeader";
import type { TimelineTableProps } from "../../types/components";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p className="text-sm text-muted-foreground">Loading works...</p>
    </div>
  </div>
);

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
  isLoading = false,
}) => {
  // Configure drag and drop sensors
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  // Handle drag end event and update artist order
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const oldIndex = artistNames.indexOf(activeId);
    const newIndex = artistNames.indexOf(overId);
    const newOrder = [...artistNames];
    newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, activeId);
    onSortEnd?.(newOrder.map((name) => artistNames.indexOf(name)));
  };

  if (isLoading && years.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="timeline-table overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="timeline-header sticky top-0 z-10">
            <tr>
              <th className="border-b border-border px-2 py-3 text-left text-sm font-medium text-muted-foreground w-12 bg-background">
                <div className="flex items-center justify-center gap-1 group">
                  <span className="group-hover:text-foreground transition-colors">Year</span>
                  {onToggleSort && (
                    <button
                      onClick={onToggleSort}
                      className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-full hover:bg-muted"
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
                        className={`w-3 h-3 transition-transform ${!isAscending ? "rotate-180" : ""}`}
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
