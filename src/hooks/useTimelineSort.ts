import { useState } from "react";
import type { WorkWithArtist } from "../types/timeline";
import { sortWorksByDate, getSortedYears } from "../utils/timelineSort";

export function useTimelineSort() {
  const [isAscending, setIsAscending] = useState(true);

  const handleToggleSort = () => {
    setIsAscending((prev) => !prev);
  };

  // Organize works by year and artist, applying current sort order
  const organizeWorksByYear = (
    selectedArtists: { id: string; name: string }[],
    worksByArtist: { [key: string]: WorkWithArtist[] }
  ) => {
    if (selectedArtists.length === 0) {
      return {
        years: [],
        artistNames: [],
        worksByYearAndArtist: [],
      };
    }

    // Flatten all works and add artist names
    const allWorks: WorkWithArtist[] = selectedArtists.flatMap((artist) => {
      const works = worksByArtist[artist.id] || [];
      return works.map((work) => ({ ...work, artistName: artist.name }));
    });

    // Sort works by date and get unique years
    const sortedWorks = sortWorksByDate(allWorks, isAscending);
    const years = getSortedYears(sortedWorks, isAscending);

    // Create 3D array: [year][artist][works]
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
    isAscending,
    handleToggleSort,
    organizeWorksByYear,
  };
}
