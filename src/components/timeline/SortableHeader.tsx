import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SortableHeaderProps } from "../../types/components";
import DragHandle from "./DragHandle";
import ArtistInfo from "./ArtistInfo";
import RemoveButton from "./RemoveButton";

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
      <div className="flex items-center justify-between gap-3 group relative">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <DragHandle attributes={attributes} listeners={listeners} />
            <ArtistInfo name={name} artist={artist} />
          </div>
        </div>
        {onRemove && <RemoveButton onRemove={onRemove} />}
      </div>
    </th>
  );
};

export default SortableHeader;
