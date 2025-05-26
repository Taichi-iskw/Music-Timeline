"use client";
import React from "react";
import ArtistCard from "./ArtistCard";
import type { ArtistListProps } from "../../types/components";

// Constants
const CARD_LIST_STYLES = "flex gap-4 px-4 sm:px-0 justify-start";

interface ArtistCardListProps {
  artists: ArtistListProps["artists"];
  onArtistClick: ArtistListProps["onArtistClick"];
}

const ArtistCardList: React.FC<ArtistCardListProps> = ({ artists, onArtistClick }) => (
  <div className={CARD_LIST_STYLES}>
    {artists.map((artist) => (
      <div key={artist.id} className="flex-none">
        <ArtistCard id={artist.id} name={artist.name} imageUrl={artist.images?.[0]?.url} onClick={onArtistClick} />
      </div>
    ))}
  </div>
);

export default ArtistCardList;
