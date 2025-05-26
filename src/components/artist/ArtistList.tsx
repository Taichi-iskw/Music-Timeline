"use client";
import React from "react";
import ArtistCard from "./ArtistCard";
import type { ArtistListProps } from "../../types/components";

const ArtistList: React.FC<ArtistListProps> = ({ artists, onArtistClick }) => {
  if (artists.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">Search Results</h3>
        <div className="w-full flex justify-center">
          <div className="max-w-[1200px] w-full overflow-x-auto -mx-4 sm:mx-0">
            <div className="flex gap-4 px-4 sm:px-0 justify-start">
              {artists.map((artist) => (
                <div key={artist.id} className="flex-none">
                  <ArtistCard
                    id={artist.id}
                    name={artist.name}
                    imageUrl={artist.images && artist.images[0] ? artist.images[0].url : undefined}
                    onClick={onArtistClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
