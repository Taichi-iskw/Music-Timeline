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
};

const ArtistList: React.FC<ArtistListProps> = ({ artists }) => (
  console.log(artists),
  (
    <div className="w-full">
      <Carousel>
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            imageUrl={artist.images && artist.images[0] ? artist.images[0].url : undefined}
          />
        ))}
      </Carousel>
    </div>
  )
);

export default ArtistList;
