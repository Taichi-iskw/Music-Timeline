import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Artist } from "../../types/timeline";

type SortableHeaderProps = {
  id: string;
  index: number;
  name: string;
  artist: Artist;
  onRemove?: () => void;
};

// Component for draggable artist header in timeline table
const SortableHeader: React.FC<SortableHeaderProps> = ({ id, index, name, artist, onRemove }) => {
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
        {artist.images && artist.images[0] && (
          <img src={artist.images[0].url} alt={name} className="w-8 h-8 rounded-full object-cover" />
        )}
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

export default SortableHeader;
