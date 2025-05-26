"use client";
import React from "react";
import type { ArtistListProps } from "../../types/components";
import ArtistCardList from "./ArtistCardList";
import WelcomeSection from "./WelcomeSection";
import ArtistListContainer from "./ArtistListContainer";
import { useTranslation } from "@/hooks/use-translation";

const ArtistList: React.FC<ArtistListProps> = ({ artists, onArtistClick }) => {
  const hasArtists = artists.length > 0;
  const t = useTranslation();

  if (!hasArtists) {
    return <WelcomeSection hasArtists={hasArtists} />;
  }

  return (
    <ArtistListContainer title={t.searchResults}>
      <ArtistCardList artists={artists} onArtistClick={onArtistClick} />
    </ArtistListContainer>
  );
};

export default ArtistList;
