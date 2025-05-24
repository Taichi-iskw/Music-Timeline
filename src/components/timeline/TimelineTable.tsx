"use client";
import React from "react";
import TimelineRow from "./TimelineRow";
import type { Work } from "../../types/timeline";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TimelineTableProps = {
  years: string[];
  artistNames: string[];
  worksByYearAndArtist: Work[][][]; // 3D array: [year][artist][works] - Works organized by year and artist
  onRemoveArtist?: (artistIndex: number) => void;
  onToggleSort?: () => void;
  isAscending?: boolean;
  onWorkClick?: (work: Work) => void;
  onSortEnd?: (newOrder: number[]) => void;
};

// Sortableヘッダー用コンポーネント
const SortableHeader: React.FC<{
  id: string;
  index: number;
  name: string;
  onRemove?: () => void;
}> = ({ id, index, name, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };
  return (
    <th ref={setNodeRef} style={style} className="border px-2 py-2 bg-gray-100">
      <div className="flex items-center justify-center gap-2">
        <span {...attributes} {...listeners} className="cursor-grab select-none text-lg">
          ≡
        </span>
        <span>{name}</span>
        {onRemove && (
          <button onClick={onRemove} className="text-gray-500 hover:text-red-500 text-sm">
            ×
          </button>
        )}
      </div>
    </th>
  );
};

const TimelineTable: React.FC<TimelineTableProps> = ({
  years,
  artistNames,
  worksByYearAndArtist,
  onRemoveArtist,
  onToggleSort,
  isAscending = false,
  onWorkClick,
  onSortEnd,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // 並び替え時のコールバック
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = artistNames.findIndex((name) => name === active.id);
      const newIndex = artistNames.findIndex((name) => name === over.id);
      if (onSortEnd) {
        // 新しい順序（インデックス配列）を返す
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
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={artistNames} strategy={verticalListSortingStrategy}>
              {artistNames.map((name, idx) => (
                <SortableHeader
                  key={name}
                  id={name}
                  index={idx}
                  name={name}
                  onRemove={onRemoveArtist ? () => onRemoveArtist(idx) : undefined}
                />
              ))}
            </SortableContext>
          </DndContext>
        </tr>
      </thead>
      <tbody>
        {years.map((year, yearIdx) => (
          <TimelineRow key={year} year={year} worksByArtist={worksByYearAndArtist[yearIdx]} onWorkClick={onWorkClick} />
        ))}
      </tbody>
    </table>
  );
};

export default TimelineTable;
