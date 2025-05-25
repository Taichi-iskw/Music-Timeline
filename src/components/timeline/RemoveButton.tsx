import React from "react";

interface RemoveButtonProps {
  onRemove: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onRemove }) => (
  <button
    onClick={onRemove}
    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all text-sm p-1.5 rounded-full hover:bg-destructive/10"
    aria-label="Remove artist"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  </button>
);

export default RemoveButton;
