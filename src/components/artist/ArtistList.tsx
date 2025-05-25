"use client";
import React from "react";
import ArtistCard from "./ArtistCard";
import Carousel from "../common/Carousel";
import type { Artist } from "../../types/timeline";
import type { ArtistListProps } from "../../types/components";

const ArtistList: React.FC<ArtistListProps> = ({ artists, onArtistClick }) => (
  <div className="w-full">
    <Carousel>
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

export default ArtistList;
