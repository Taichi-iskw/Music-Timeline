"use client";
import React, { useMemo } from "react";
import ArtistCard from "./ArtistCard";
import Carousel from "../carousel/Carousel";
import type { ArtistListProps } from "../../types/components";

const ArtistList: React.FC<ArtistListProps> = ({ artists, onArtistClick }) => {
  // Only change resetKey when the artists list changes
  const resetKey = useMemo(() => artists.map((a) => a.id).join(","), [artists]);

  return (
    <div className="w-full bg-muted/30 rounded-lg p-4 backdrop-blur supports-[backdrop-filter]:bg-muted/30">
      <Carousel resetKey={resetKey}>
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            id={artist.id}
            name={artist.name}
            imageUrl={artist.images && artist.images[0] ? artist.images[0].url : undefined}
            onClick={onArtistClick}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ArtistList;
