import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SortableHeaderProps } from "../../types/components";

const SortableHeader: React.FC<SortableHeaderProps> = ({ id, index, name, artist, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      className="border-b border-border px-4 py-3 text-left text-sm font-medium text-muted-foreground bg-muted/50 backdrop-blur supports-[backdrop-filter]:bg-muted/50"
    >
      <div className="flex items-center justify-between gap-3 group">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab select-none p-2 -m-2 rounded-md hover:bg-muted/80 transition-colors opacity-0 group-hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-muted-foreground"
            >
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
          </div>
          {artist.images && artist.images[0] && (
            <div className="relative w-8 h-8 overflow-hidden rounded-full ring-2 ring-border transition-transform group-hover:scale-110">
              <img src={artist.images[0].url} alt={name} className="w-full h-full object-cover" />
            </div>
          )}
          <span className="font-medium group-hover:text-foreground transition-colors">{name}</span>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all text-sm p-1.5 rounded-full hover:bg-destructive/10"
            aria-label="Remove artist"
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
              className="w-4 h-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    </th>
  );
};

export default SortableHeader;
