import React from "react";

interface ClearTimelineButtonProps {
  onClear: () => void;
}

const ClearTimelineButton: React.FC<ClearTimelineButtonProps> = ({ onClear }) => {
  const [isConfirming, setIsConfirming] = React.useState(false);

  const handleClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      // Reset confirmation state after 3 seconds
      setTimeout(() => setIsConfirming(false), 3000);
      return;
    }
    onClear();
    setIsConfirming(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
        isConfirming
          ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
      title="Clear all artists from timeline"
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
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
      <span className="font-medium">{isConfirming ? "Click again to confirm" : "Clear Timeline"}</span>
    </button>
  );
};

export default ClearTimelineButton;
