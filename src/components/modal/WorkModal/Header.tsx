import React from "react";
import { modalStyles } from "./styles";
import type { WorkModalHeaderProps } from "../../../types/components";

const Header: React.FC<WorkModalHeaderProps> = ({
  releaseDate,
  isMinimized,
  onMinimize,
  onClose,
  dragAttributes,
  dragListeners,
}) => {
  return (
    <div
      className={`${modalStyles.header.base} ${isMinimized ? modalStyles.header.minimized : ""}`}
      {...(isMinimized ? dragListeners : {})}
      {...(isMinimized ? dragAttributes : {})}
    >
      <span className="text-sm text-gray-600 truncate max-w-[120px]">{releaseDate}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={onMinimize}
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
  );
};

export default Header;
