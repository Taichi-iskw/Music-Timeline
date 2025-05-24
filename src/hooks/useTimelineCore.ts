import { useState } from "react";
import type { Work, Artist, WorkWithArtist, WorksType } from "../types/timeline";
import { fetchArtistWorks } from "../services/artistService";
import { sortWorksByDate, getSortedYears } from "../utils/timelineSort";

export function useTimelineCore() {
  const [worksType, setWorksType] = useState<WorksType>("all");
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);
  const [worksByArtist, setWorksByArtist] = useState<{ [key: string]: Work[] }>({});
  const [isAscending, setIsAscending] = useState(false);

  const handleArtistClick = async (artist: Artist) => {
    if (selectedArtists.some((a) => a.id === artist.id)) return;
    setSelectedArtists((prev) => [...prev, artist]);
    try {
      const data = await fetchArtistWorks(artist.id, worksType);
      setWorksByArtist((prev) => ({ ...prev, [artist.id]: data }));
    } catch (e) {
      console.error("Failed to fetch works", e);
    }
  };

  const handleRemoveArtist = (artistId: string) => {
    setSelectedArtists((prev) => prev.filter((a) => a.id !== artistId));
    setWorksByArtist((prev) => {
      const newWorks = { ...prev };
      delete newWorks[artistId];
      return newWorks;
    });
  };

  const handleRemoveArtistFromTable = (artistIndex: number) => {
    const artistToRemove = selectedArtists[artistIndex];
    if (artistToRemove) {
      handleRemoveArtist(artistToRemove.id);
    }
  };

  const handleToggleSort = () => {
    setIsAscending((prev) => !prev);
  };

  // Organize works by year and artist
  const organizeWorksByYear = () => {
    if (selectedArtists.length === 0) {
      return {
        years: [],
        artistNames: [],
        worksByYearAndArtist: [],
      };
    }
    const allWorks: WorkWithArtist[] = selectedArtists.flatMap((artist) => {
      const works = worksByArtist[artist.id] || [];
      return works.map((work) => ({ ...work, artistName: artist.name }));
    });
    const sortedWorks = sortWorksByDate(allWorks, isAscending);
    const years = getSortedYears(sortedWorks, isAscending);
    const worksByYearAndArtist = years.map((year) =>
      selectedArtists.map((artist) => {
        const worksInYear = sortedWorks
          .filter((work) => work.releaseYear === year && work.artistName === artist.name)
          .map(({ artistName, ...work }) => work);
        return worksInYear;
      })
    );
    return {
      years,
      artistNames: selectedArtists.map((a) => a.name),
      worksByYearAndArtist,
    };
  };

  return {
    worksType,
    setWorksType,
    selectedArtists,
    handleArtistClick,
    handleRemoveArtistFromTable,
    handleToggleSort,
    isAscending,
    organizeWorksByYear,
  };
}
