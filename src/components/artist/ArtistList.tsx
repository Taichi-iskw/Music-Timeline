"use client";
import React from "react";
import type { ArtistListProps } from "../../types/components";
import ArtistCardList from "./ArtistCardList";
import WelcomeSection from "./WelcomeSection";

// Constants
const CONTAINER_HEIGHT = "h-[250px]";
const CONTAINER_STYLES = "rounded-lg p-6";
const CARD_CONTAINER_STYLES = "max-w-[1200px] w-full overflow-x-auto -mx-4 sm:mx-0";

const ArtistList: React.FC<ArtistListProps> = ({ artists, onArtistClick }) => {
  const hasArtists = artists.length > 0;
  const containerClassName = `${CONTAINER_STYLES} ${CONTAINER_HEIGHT} ${
    hasArtists ? "bg-card border border-border" : ""
  }`;

  return (
    <div className="w-full">
      {hasArtists ? (
        <div className={containerClassName}>
          <div className="w-full h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Suggested Artists</h3>
            <div className="w-full flex-1 flex justify-center">
              <div className={CARD_CONTAINER_STYLES}>
                <ArtistCardList artists={artists} onArtistClick={onArtistClick} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <WelcomeSection hasArtists={hasArtists} />
      )}
    </div>
  );
};

export default ArtistList;
