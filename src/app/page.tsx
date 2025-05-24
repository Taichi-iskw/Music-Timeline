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
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [works, setWorks] = useState<Work[]>([]);

  const handleArtistClick = async (artistId: string) => {
    const artist = artists.find((a) => a.id === artistId);
    if (!artist) return;

    setSelectedArtist(artist);
    try {
      const res = await fetch(`/api/artist-works?artistId=${artistId}&type=${worksType}`);
      const data = await res.json();
      setWorks(data);
    } catch (e) {
      console.error("Failed to fetch works", e);
      setWorks([]);
    }
  };

  // Organize works by year
  const organizeWorksByYear = () => {
    if (!selectedArtist || works.length === 0) {
      return {
        years: [],
        artistNames: [],
        worksByYearAndArtist: [],
      };
    }

    // Get unique years and sort them
    const years = Array.from(new Set(works.map((work) => work.releaseYear))).sort((a, b) => b.localeCompare(a));

    // Create the 3D array structure
    const worksByYearAndArtist = years.map((year) => {
      const worksInYear = works.filter((work) => work.releaseYear === year);
      return [worksInYear]; // Single artist for now
    });

    return {
      years,
      artistNames: [selectedArtist.name],
      worksByYearAndArtist,
    };
  };

  const { years, artistNames, worksByYearAndArtist } = organizeWorksByYear();

  return (
    <div>
      <Header />
      <main className="pt-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <ArtistSearchBar onSearch={setArtists} />
          <WorksTypeSelector value={worksType} onChange={setWorksType} />
        </div>
        <ArtistList artists={artists} onArtistClick={handleArtistClick} />
        {selectedArtist && works.length > 0 && (
          <div className="mt-8">
            <TimelineTable years={years} artistNames={artistNames} worksByYearAndArtist={worksByYearAndArtist} />
          </div>
        )}
      </main>
    </div>
  );
}
