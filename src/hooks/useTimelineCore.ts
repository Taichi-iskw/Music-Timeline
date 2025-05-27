import { useArtists } from "./useArtists";
import { useWorks } from "./useWorks";
import { useTimelineSort } from "./useTimelineSort";
import type { Artist, WorksType } from "../types/timeline";

export function useTimelineCore() {
  const {
    selectedArtists,
    setSelectedArtists,
    handleArtistClick: baseHandleArtistClick,
    handleRemoveArtistFromTable,
  } = useArtists();

  const { worksType, setWorksType, worksByArtist, fetchWorks, loadingArtists } = useWorks();

  const { isAscending, handleToggleSort, organizeWorksByYear } = useTimelineSort();

  // Extend artist selection logic to fetch works
  const handleArtistClick = async (artist: Artist) => {
    // Add artist first
    baseHandleArtistClick(artist);
    // Then fetch works if not already loading
    if (!loadingArtists.has(artist.id)) {
      await fetchWorks(artist.id);
    }
  };

  // Handle works type change
  const handleWorksTypeChange = (type: WorksType) => {
    setWorksType(type);
  };

  // Check if any artist's works are still loading
  const isLoading = loadingArtists.size > 0;

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
    isLoading,
  };
}
