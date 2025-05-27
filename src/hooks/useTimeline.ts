import { useState } from "react";
import { useArtistSearch } from "./useArtistSearch";
import { useTimelineCore } from "./useTimelineCore";
import type { Artist } from "../types/timeline";

export function useTimeline() {
  const [isLoading, setIsLoading] = useState(false);
  const artistSearch = useArtistSearch();
  const timelineCore = useTimelineCore();

  const handleArtistClick = async (artist: Artist) => {
    // Only show loading when adding a new artist
    if (!timelineCore.selectedArtists.some((a) => a.id === artist.id)) {
      setIsLoading(true);
      try {
        await timelineCore.handleArtistClick(artist);
      } finally {
        setIsLoading(false);
      }
    } else {
      await timelineCore.handleArtistClick(artist);
    }
  };

  return {
    ...artistSearch,
    ...timelineCore,
    isLoading,
    handleArtistClick,
  };
}
