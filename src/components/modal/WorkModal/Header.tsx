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
      <span className="text-sm text-muted-foreground max-w-xs whitespace-nowrap">Release: {releaseDate}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={onMinimize}
          className="text-muted-foreground hover:text-foreground text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
          aria-label={isMinimized ? "Maximize" : "Minimize"}
        >
          ⤢
        </button>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-destructive text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-destructive/10 transition-colors"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Header;
