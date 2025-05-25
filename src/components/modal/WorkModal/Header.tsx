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
      <div className="flex-1 min-w-0 mr-2">
        <span className="text-sm text-muted-foreground truncate block">Release: {releaseDate}</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={onMinimize}
          className="text-muted-foreground hover:text-foreground text-xl w-7 h-7 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
          aria-label={isMinimized ? "Maximize" : "Minimize"}
        >
          ⤢
        </button>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-destructive text-xl w-7 h-7 flex items-center justify-center rounded-full hover:bg-destructive/10 transition-colors"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Header;
