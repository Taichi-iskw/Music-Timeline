"use client";
import React from "react";
import type { ArtistListProps } from "../../types/components";
import ArtistCardList from "./ArtistCardList";
import WelcomeSection from "./WelcomeSection";
import ArtistListContainer from "./ArtistListContainer";

const ArtistList: React.FC<ArtistListProps> = ({ artists, onArtistClick }) => {
  const hasArtists = artists.length > 0;

  if (!hasArtists) {
    return <WelcomeSection hasArtists={hasArtists} />;
  }

  return (
    <ArtistListContainer title="Suggested Artists">
      <ArtistCardList artists={artists} onArtistClick={onArtistClick} />
    </ArtistListContainer>
  );
};

export default ArtistList;
