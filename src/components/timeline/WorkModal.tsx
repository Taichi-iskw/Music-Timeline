import React from "react";
import type { Work } from "../../types/timeline";
import Modal from "../common/Modal";

type WorkModalProps = {
  work: Work | null;
  onClose: () => void;
};

// Modal component for displaying work details and Spotify player
const WorkModal: React.FC<WorkModalProps> = ({ work, onClose }) => {
  if (!work) return null;

  return (
    <Modal open={true} onClose={onClose}>
      <div className="flex flex-col items-center gap-0 w-[520px] max-w-full">
        <div className="w-full flex items-center justify-between px-4 py-2">
          <span className="text-sm text-gray-600">{work.releaseDate}</span>
          <button className="text-gray-500 hover:text-gray-800 text-2xl font-bold" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <iframe
          src={`https://open.spotify.com/embed/album/${work.id}`}
          width="100%"
          height="600"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Player"
          className="rounded w-full"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </Modal>
  );
};

export default WorkModal;
