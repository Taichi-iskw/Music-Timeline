"use client";
import React from "react";
import ArtistCard from "./ArtistCard";
import Carousel from "../common/Carousel";

type Artist = {
  id: string;
  name: string;
  images?: { url: string }[];
};

type ArtistListProps = {
  artists: Artist[];
  onArtistClick?: (id: string) => void;
};

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
