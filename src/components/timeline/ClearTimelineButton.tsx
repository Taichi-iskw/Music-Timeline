import React, { memo, useCallback, useState, useEffect, useRef } from "react";

interface ClearTimelineButtonProps {
  onClear: () => void;
}

const ClearTimelineButton: React.FC<ClearTimelineButtonProps> = memo(({ onClear }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isConfirming && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsConfirming(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isConfirming]);

  const handleClick = useCallback(() => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onClear();
    setIsConfirming(false);
  }, [isConfirming, onClear]);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 w-[100px] justify-center ${
        isConfirming
          ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
          : "bg-secondary/50 text-secondary-foreground hover:bg-secondary/80"
      }`}
      title="Reset timeline to start fresh"
      aria-label={isConfirming ? "Click again to confirm resetting timeline" : "Reset timeline"}
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
        className={`w-4 h-4 transition-transform duration-200 ${isConfirming ? "rotate-180" : ""}`}
        aria-hidden="true"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
      <span className="font-medium">{isConfirming ? "Confirm" : "Reset"}</span>
    </button>
  );
});

ClearTimelineButton.displayName = "ClearTimelineButton";

export default ClearTimelineButton;
