"use client";
import React from "react";
import Header from "../components/common/Header";
import ArtistSearchBar from "../components/artist/ArtistSearchBar";
import ArtistList from "../components/artist/ArtistList";
import WorksTypeSelector from "../components/timeline/WorksTypeSelector";
import TimelineTable from "../components/timeline/TimelineTable";
import { useTimeline } from "../hooks/useTimeline";

export default function Home() {
  const {
    artists,
    setArtists,
    worksType,
    setWorksType,
    selectedArtists,
    handleArtistClick,
    handleRemoveArtistFromTable,
    handleToggleSort,
    isAscending,
    organizeWorksByYear,
  } = useTimeline();

  const { years, artistNames, worksByYearAndArtist } = organizeWorksByYear();

  return (
    <div>
      <Header />
      <main className="pt-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <ArtistSearchBar onSearch={setArtists} />
          <WorksTypeSelector value={worksType} onChange={setWorksType} />
        </div>
        <ArtistList
          artists={artists}
          onArtistClick={(id) => {
            const artist = artists.find((a) => a.id === id);
            if (artist) handleArtistClick(artist);
          }}
        />
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
