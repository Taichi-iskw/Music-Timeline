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
};

type Artist = {
  id: string;
  name: string;
  images?: { url: string }[];
};

export default function Home() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [worksType, setWorksType] = useState<"single" | "album" | "all">("all");
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);
  const [worksByArtist, setWorksByArtist] = useState<{ [key: string]: Work[] }>({});

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

  // Organize works by year
  const organizeWorksByYear = () => {
    if (selectedArtists.length === 0) {
      return {
        years: [],
        artistNames: [],
        worksByYearAndArtist: [],
      };
    }

    // Get all works and their years
    const allWorks = selectedArtists.flatMap((artist) => worksByArtist[artist.id] || []);
    const years = Array.from(new Set(allWorks.map((work) => work.releaseYear))).sort((a, b) => b.localeCompare(a));

    // Create the 3D array structure
    const worksByYearAndArtist = years.map((year) =>
      selectedArtists.map((artist) => (worksByArtist[artist.id] || []).filter((work) => work.releaseYear === year))
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
            />
          </div>
        )}
      </main>
    </div>
  );
}
