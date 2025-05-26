"use client";
import React from "react";
import ArtistCard from "./ArtistCard";
import type { ArtistListProps } from "../../types/components";

// Constants
const CONTAINER_HEIGHT = "h-[250px]";
const CONTAINER_STYLES = "rounded-lg p-6";
const CARD_CONTAINER_STYLES = "max-w-[1200px] w-full overflow-x-auto -mx-4 sm:mx-0";
const CARD_LIST_STYLES = "flex gap-4 px-4 sm:px-0 justify-start";

// Welcome message component
const WelcomeMessage = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-4">
    <h2 className="text-2xl font-semibold text-center">
      <span className="block sm:inline">Welcome to</span>{" "}
      <span className="block sm:inline mt-1 sm:mt-0">Music Timeline</span>
    </h2>
    <p className="text-center text-muted-foreground max-w-[280px] sm:max-w-none">
      <span className="block sm:inline">Line up artists and</span>{" "}
      <span className="block sm:inline mt-1 sm:mt-0">explore their music side by side.</span>
    </p>
  </div>
);

// Artist card list component
const ArtistCardList = ({
  artists,
  onArtistClick,
}: {
  artists: ArtistListProps["artists"];
  onArtistClick: ArtistListProps["onArtistClick"];
}) => (
  <div className={CARD_LIST_STYLES}>
    {artists.map((artist) => (
      <div key={artist.id} className="flex-none">
        <ArtistCard id={artist.id} name={artist.name} imageUrl={artist.images?.[0]?.url} onClick={onArtistClick} />
      </div>
    ))}
  </div>
);

const ArtistList: React.FC<ArtistListProps> = ({ artists, onArtistClick }) => {
  const hasArtists = artists.length > 0;
  const containerClassName = `${CONTAINER_STYLES} ${CONTAINER_HEIGHT} ${
    hasArtists ? "bg-card border border-border" : ""
  }`;

  return (
    <div className="w-full">
      <div className={containerClassName}>
        <div className="w-full h-full flex flex-col">
          {hasArtists && <h3 className="text-lg font-semibold mb-4">Suggested Artists</h3>}
          <div className="w-full flex-1 flex justify-center">
            <div className={CARD_CONTAINER_STYLES}>
              {hasArtists ? <ArtistCardList artists={artists} onArtistClick={onArtistClick} /> : <WelcomeMessage />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
