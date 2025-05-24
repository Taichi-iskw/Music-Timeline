import { useState } from "react";
import type { Artist } from "../types/timeline";

export function useArtists() {
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);

  // Add artist to selected list if not already selected
  const handleArtistClick = (artist: Artist) => {
    if (selectedArtists.some((a) => a.id === artist.id)) return;
    setSelectedArtists((prev) => [...prev, artist]);
  };

  // Remove artist by ID
  const handleRemoveArtist = (artistId: string) => {
    setSelectedArtists((prev) => prev.filter((a) => a.id !== artistId));
  };

  // Remove artist by index (used in table view)
  const handleRemoveArtistFromTable = (artistIndex: number) => {
    const artistToRemove = selectedArtists[artistIndex];
    if (artistToRemove) {
      handleRemoveArtist(artistToRemove.id);
    }
  };

  return {
    selectedArtists,
    setSelectedArtists,
    handleArtistClick,
    handleRemoveArtist,
    handleRemoveArtistFromTable,
  };
}
