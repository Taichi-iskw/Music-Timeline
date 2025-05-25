import React, { useState, useCallback } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useDragPosition } from "../../providers/DndProvider";
import SpotifyPlayer from "../../player/SpotifyPlayer";
import Header from "./Header";
import { MODAL_DIMENSIONS, MODAL_POSITIONS, modalStyles } from "./styles";
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
  const dimensions = isMinimized ? MODAL_DIMENSIONS.MINIMIZED : MODAL_DIMENSIONS.MAXIMIZED;
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
        className={`transition-transform duration-75 ease-linear ${
          isMinimized ? "p-0" : "max-w-full p-0"
        } rounded-2xl shadow-xl bg-background border border-border z-50`}
      >
        {/* Size change container */}
        <div
          style={{
            ...dimensions,
          }}
          className="w-full h-full transition-[width,height] duration-200 ease-out flex flex-col items-center"
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
          <div
            className={`${modalStyles.player.base} ${
              isMinimized ? modalStyles.player.minimized : ""
            } w-full h-full flex-1 flex items-center justify-center`}
          >
            <SpotifyPlayer albumId={work.id} minimized={isMinimized} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkModal;
