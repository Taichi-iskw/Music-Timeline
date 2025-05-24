import { useArtists } from "./useArtists";
import { useWorks } from "./useWorks";
import { useTimelineSort } from "./useTimelineSort";
import type { Artist, WorksType } from "../types/timeline";

export function useTimelineCore() {
  const {
    selectedArtists,
    setSelectedArtists,
    handleArtistClick: baseHandleArtistClick,
    handleRemoveArtist,
    handleRemoveArtistFromTable,
  } = useArtists();

  const { worksType, setWorksType, worksByArtist, fetchWorks, removeWorks } = useWorks();

  const { isAscending, handleToggleSort, organizeWorksByYear } = useTimelineSort();

  // Extend artist selection logic to fetch works
  const handleArtistClick = async (artist: Artist) => {
    baseHandleArtistClick(artist);
    await fetchWorks(artist.id);
  };

  // Extend artist removal logic to clean up works
  const handleRemoveArtistWithWorks = (artistId: string) => {
    handleRemoveArtist(artistId);
    removeWorks(artistId);
  };

  // Handle works type change
  const handleWorksTypeChange = (type: WorksType) => {
    setWorksType(type);
  };

  return {
    worksType,
    setWorksType: handleWorksTypeChange,
    selectedArtists,
    setSelectedArtists,
    handleArtistClick,
    handleRemoveArtistFromTable,
    handleToggleSort,
    isAscending,
    organizeWorksByYear: () => organizeWorksByYear(selectedArtists, worksByArtist),
  };
}
