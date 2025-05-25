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

  const { worksType, setWorksType, worksByArtist, fetchWorks } = useWorks();

  const { isAscending, handleToggleSort, organizeWorksByYear } = useTimelineSort();

  // Extend artist selection logic to fetch works
  const handleArtistClick = async (artist: Artist) => {
    baseHandleArtistClick(artist);
    await fetchWorks(artist.id);
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
