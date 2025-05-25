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
      <div className="flex items-center justify-center gap-3">
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab select-none text-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          ≡
        </span>
        {artist.images && artist.images[0] && (
          <div className="relative w-8 h-8 overflow-hidden rounded-full ring-2 ring-border">
            <img src={artist.images[0].url} alt={name} className="w-full h-full object-cover" />
          </div>
        )}
        <span className="font-medium">{name}</span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-muted-foreground hover:text-destructive transition-colors text-sm p-1 rounded-full hover:bg-destructive/10"
          >
            ×
          </button>
        )}
      </div>
    </th>
  );
};

export default SortableHeader;
