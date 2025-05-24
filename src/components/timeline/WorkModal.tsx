import React, { useState } from "react";
import type { Work } from "../../types/timeline";
import SpotifyPlayer from "./SpotifyPlayer";

// Props for the WorkModal component
// work: the selected work to display
// onClose: function to close the modal
const WorkModal: React.FC<{
  work: Work | null;
  onClose: () => void;
}> = ({ work, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!work) return null;

  // CSS classes for modal and overlay
  const modalBase =
    "fixed z-50 flex flex-col items-center bg-white shadow-lg border border-gray-200 transition-all duration-300";
  const modalNormal = "top-1/2 left-1/2 w-[520px] max-w-full h-[680px] -translate-x-1/2 -translate-y-1/2 rounded-lg";
  const modalMin = "bottom-5 left-4 w-[320px] h-[130px] rounded-lg";
  const overlay = "fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300";

  return (
    <>
      {/* Overlay: show only when not minimized */}
      {!isMinimized && <div className={overlay} onClick={onClose} aria-label="Close modal overlay" />}
      {/* Modal container: position and size change with state */}
      <div className={modalBase + " " + (isMinimized ? modalMin : modalNormal)}>
        {/* Header: release date, minimize, close */}
        <div className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg">
          <span className="text-sm text-gray-600">{work.releaseDate}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized((v) => !v)}
              className="text-gray-500 hover:text-gray-800 text-lg"
              aria-label={isMinimized ? "Maximize" : "Minimize"}
            >
              ⤢
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-lg" aria-label="Close">
              ×
            </button>
          </div>
        </div>
        {/* Spotify player area */}
        <div className="flex-1 flex items-center justify-center w-full h-full">
          <SpotifyPlayer albumId={work.id} minimized={isMinimized} />
        </div>
      </div>
    </>
  );
};

export default WorkModal;
