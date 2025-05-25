import React, { useState, useCallback } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useDragPosition } from "../../providers/DndProvider";
import SpotifyPlayer from "../../player/SpotifyPlayer";
import Header from "./Header";
import { MODAL_POSITIONS, modalStyles } from "./styles";
import type { WorkModalProps } from "../../../types/components";

const WorkModal: React.FC<WorkModalProps> = ({ work, onClose }) => {
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
  const positions = isMinimized ? MODAL_POSITIONS.MINIMIZED : MODAL_POSITIONS.MAXIMIZED;
  const translate = isMinimized
    ? transform
      ? `translate3d(${position.x + transform.x}px, ${position.y + transform.y}px, 0)`
      : `translate3d(${position.x}px, ${position.y}px, 0)`
    : "translate(-50%, -50%)";

  return (
    <>
      {/* Overlay: show only when not minimized */}
      {!isMinimized && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-label="Close modal overlay"
        />
      )}
      {/* Unified modal node, style switches by state */}
      <div
        ref={isMinimized ? setNodeRef : undefined}
        style={{
          ...modalStyles.base,
          ...positions,
          transform: translate,
          willChange: "transform",
        }}
        className={`transition-all duration-300 ease-in-out ${
          isMinimized ? "p-0" : modalStyles.container.base
        } rounded-2xl shadow-xl border border-border z-50 overflow-hidden bg-transparent`}
      >
        {/* Size change container */}
        <div
          className={`w-full h-full transition-all duration-300 ease-in-out flex flex-col items-center overflow-hidden bg-transparent ${
            isMinimized ? "w-[300px]" : ""
          }`}
        >
          <Header
            releaseDate={work.releaseDate}
            isMinimized={isMinimized}
            onMinimize={handleMinimize}
            onClose={handleClose}
            dragAttributes={attributes}
            dragListeners={listeners}
          />
          {/* Spotify player area */}
          <div className={`w-full ${isMinimized ? "h-[80px]" : "flex-1"}`}>
            <SpotifyPlayer albumId={work.id} minimized={isMinimized} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkModal;
