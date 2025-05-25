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
      <span className="text-sm text-gray-600 max-w-xs whitespace-nowrap">Release: {releaseDate}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={onMinimize}
          className="text-gray-500 hover:text-gray-800 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          aria-label={isMinimized ? "Maximize" : "Minimize"}
        >
          ⤢
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Header;
