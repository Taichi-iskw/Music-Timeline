import React from "react";

interface CarouselArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

const CarouselArrowButton: React.FC<CarouselArrowButtonProps> = ({ direction, onClick, disabled, ariaLabel }) => (
  <button
    className={`absolute ${
      direction === "left" ? "left-2" : "right-2"
    } top-1/2 -translate-y-1/2 p-2 rounded-full bg-background border border-border hover:bg-muted/50 hover:border-primary/50 text-muted-foreground disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 z-10`}
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    style={{ zIndex: 2 }}
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {direction === "left" ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      )}
    </svg>
  </button>
);

export default CarouselArrowButton;
