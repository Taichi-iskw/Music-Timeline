import React, { useState, useCallback } from "react";
import type { Work } from "../../types/timeline";
import SpotifyPlayer from "./SpotifyPlayer";
import { useDraggable } from "@dnd-kit/core";
import { useDragPosition } from "../providers/DndProvider";

// Props for the WorkModal component
// work: the selected work to display
// onClose: function to close the modal
const WorkModal: React.FC<{
  work: Work | null;
  onClose: () => void;
}> = ({ work, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const { position } = useDragPosition();

  // dnd-kit draggable for minimized modal
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "minimized-modal",
  });

  const handleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized((v) => !v);
  }, []);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  if (!work) return null;

  // Dynamic style for modal position/size
  const minimized = isMinimized;
  const width = minimized ? 300 : 520;
  const height = minimized ? 100 : 680;
  const left = minimized ? 16 : "50%";
  const bottom = minimized ? 40 : undefined;
  const top = minimized ? undefined : "50%";
  const translate = minimized
    ? transform
      ? `translate3d(${position.x + transform.x}px, ${position.y + transform.y}px, 0)`
      : `translate3d(${position.x}px, ${position.y}px, 0)`
    : "translate(-50%, -50%)";

  return (
    <>
      {/* Overlay: show only when not minimized */}
      {!minimized && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-label="Close modal overlay"
        />
      )}
      {/* Unified modal node, style switches by state */}
      <div
        ref={minimized ? setNodeRef : undefined}
        style={{
          position: "fixed",
          zIndex: 50,
          width,
          height,
          left,
          top,
          bottom,
          transform: translate,
          transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)",
          border: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className={minimized ? "p-0" : "max-w-full"}
      >
        {/* Header: release date, minimize, close */}
        <div
          className={`w-full flex items-center justify-between px-4 ${
            minimized ? "py-1 h-[32px] bg-gray-100 rounded-t-lg cursor-move" : "py-2 bg-gray-100 rounded-t-lg"
          }`}
          {...(minimized ? listeners : {})}
          {...(minimized ? attributes : {})}
        >
          <span className="text-sm text-gray-600 truncate max-w-[120px]">{work.releaseDate}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinimize}
              className="text-gray-500 hover:text-gray-800 text-lg"
              aria-label={isMinimized ? "Maximize" : "Minimize"}
            >
              ⤢
            </button>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-800 text-lg" aria-label="Close">
              ×
            </button>
          </div>
        </div>
        {/* Spotify player area */}
        <div
          className={
            minimized
              ? "flex-1 flex items-center justify-center w-full h-[68px] p-0"
              : "flex-1 flex items-center justify-center w-full h-full"
          }
        >
          <SpotifyPlayer albumId={work.id} minimized={isMinimized} />
        </div>
      </div>
    </>
  );
};

export default WorkModal;
