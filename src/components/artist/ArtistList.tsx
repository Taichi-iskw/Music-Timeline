"use client";
import React from "react";
import ArtistCard from "./ArtistCard";
import type { ArtistListProps } from "../../types/components";

const ArtistList: React.FC<ArtistListProps> = ({ artists, onArtistClick }) => {
  return (
    <div className="w-full bg-muted/30 rounded-lg p-4 backdrop-blur supports-[backdrop-filter]:bg-muted/30">
      <div className="w-full flex justify-center">
        <div className="max-w-[1200px] w-full overflow-x-auto -mx-4 sm:mx-0">
          <div className="flex gap-4 px-4 sm:px-0 justify-start">
            {artists.map((artist) => (
              <ArtistCard
                key={artist.id}
                id={artist.id}
                name={artist.name}
                imageUrl={artist.images && artist.images[0] ? artist.images[0].url : undefined}
                onClick={onArtistClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
