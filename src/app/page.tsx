"use client";
import React, { useState } from "react";
import Header from "../components/common/Header";
import ArtistSearchBar from "../components/artist/ArtistSearchBar";
import ArtistList from "../components/artist/ArtistList";
import WorksTypeSelector from "../components/timeline/WorksTypeSelector";
import TimelineTable from "../components/timeline/TimelineTable";

type Work = {
  id: string;
  name: string;
  imageUrl?: string;
  releaseYear: string;
  releaseDate: string;
};

type Artist = {
  id: string;
  name: string;
  images?: { url: string }[];
};

type WorkWithArtist = Work & {
  artistName: string;
};

export default function Home() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [worksType, setWorksType] = useState<"single" | "album" | "all">("all");
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);
  const [worksByArtist, setWorksByArtist] = useState<{ [key: string]: Work[] }>({});
  const [isAscending, setIsAscending] = useState(false);

  const handleArtistClick = async (artistId: string) => {
    const artist = artists.find((a) => a.id === artistId);
    if (!artist || selectedArtists.some((a) => a.id === artistId)) return;

    setSelectedArtists((prev) => [...prev, artist]);
    try {
      const res = await fetch(`/api/artist-works?artistId=${artistId}&type=${worksType}`);
      const data = await res.json();
      setWorksByArtist((prev) => ({ ...prev, [artistId]: data }));
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

  // Sort works by release date
  const sortWorksByDate = (works: WorkWithArtist[]): WorkWithArtist[] => {
    return works.sort((a, b) => {
      // Handle empty release dates
      if (!a.releaseDate) return 1;
      if (!b.releaseDate) return -1;
      return isAscending ? a.releaseDate.localeCompare(b.releaseDate) : b.releaseDate.localeCompare(a.releaseDate);
    });
  };

  // Get sorted years from works
  const getSortedYears = (works: WorkWithArtist[]): string[] => {
    return Array.from(new Set(works.map((work) => work.releaseYear)))
      .filter(Boolean) // Remove empty years
      .sort((a, b) => (isAscending ? a.localeCompare(b) : b.localeCompare(a)));
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

    // Get all works with artist names
    const allWorks: WorkWithArtist[] = selectedArtists.flatMap((artist) => {
      const works = worksByArtist[artist.id] || [];
      return works.map((work) => ({
        ...work,
        artistName: artist.name,
      }));
    });

    // Sort works by release date
    const sortedWorks = sortWorksByDate(allWorks);

    // Get sorted years
    const years = getSortedYears(sortedWorks);

    // Create the 3D array structure
    const worksByYearAndArtist = years.map((year) =>
      selectedArtists.map((artist) => {
        const worksInYear = sortedWorks
          .filter((work) => work.releaseYear === year && work.artistName === artist.name)
          .map(({ artistName, ...work }) => work); // Remove artistName from the work object
        return worksInYear;
      })
    );

    return {
      years,
      artistNames: selectedArtists.map((a) => a.name),
      worksByYearAndArtist,
    };
  };

  const { years, artistNames, worksByYearAndArtist } = organizeWorksByYear();

  const handleRemoveArtistFromTable = (artistIndex: number) => {
    const artistToRemove = selectedArtists[artistIndex];
    if (artistToRemove) {
      handleRemoveArtist(artistToRemove.id);
    }
  };

  const handleToggleSort = () => {
    setIsAscending((prev) => !prev);
  };

  return (
    <div>
      <Header />
      <main className="pt-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <ArtistSearchBar onSearch={setArtists} />
          <WorksTypeSelector value={worksType} onChange={setWorksType} />
        </div>
        <ArtistList artists={artists} onArtistClick={handleArtistClick} />
        {selectedArtists.length > 0 && (
          <div className="mt-8">
            <TimelineTable
              years={years}
              artistNames={artistNames}
              worksByYearAndArtist={worksByYearAndArtist}
              onRemoveArtist={handleRemoveArtistFromTable}
              onToggleSort={handleToggleSort}
              isAscending={isAscending}
            />
          </div>
        )}
      </main>
    </div>
  );
}
