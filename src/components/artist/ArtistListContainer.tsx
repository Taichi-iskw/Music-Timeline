"use client";
import React from "react";

// Constants
const CONTAINER_HEIGHT = "h-[250px]";
const CONTAINER_STYLES = "rounded-lg p-4";
const CARD_CONTAINER_STYLES = "max-w-[1200px] w-full overflow-x-auto -mx-4 sm:mx-0";

interface ArtistListContainerProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const ArtistListContainer: React.FC<ArtistListContainerProps> = ({ title, children, className = "" }) => {
  const containerClassName = `${CONTAINER_STYLES} ${CONTAINER_HEIGHT} bg-card border border-border ${className}`;

  return (
    <div className="w-full">
      <div className={containerClassName}>
        <div className="w-full h-full flex flex-col">
          {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
          <div className="w-full flex-1 flex justify-center">
            <div className={CARD_CONTAINER_STYLES}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistListContainer;
