"use client";
import React from "react";
import Header from "../components/common/Header";
import ArtistSearchBar from "../components/artist/ArtistSearchBar";
import ArtistList from "../components/artist/ArtistList";
import WorksTypeSelector from "../components/timeline/WorksTypeSelector";
import TimelineTable from "../components/timeline/TimelineTable";
import WorkModal from "../components/timeline/WorkModal";
import { useTimeline } from "../hooks/useTimeline";
import { useWorkModal } from "../hooks/useWorkModal";
import type { Work } from "../types/timeline";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

export default function Home() {
  const {
    artists,
    setArtists,
    worksType,
    setWorksType,
    selectedArtists,
    setSelectedArtists,
    handleArtistClick,
    handleRemoveArtistFromTable,
    handleToggleSort,
    isAscending,
    organizeWorksByYear,
  } = useTimeline();

  const { years, artistNames, worksByYearAndArtist } = organizeWorksByYear();

  const { selectedWork, openModal, closeModal } = useWorkModal();

  const handleWorkClick = (work: Work) => {
    openModal(work);
  };

  return (
    <div>
      <Header />
      <main className="pt-5 max-w-6xl mx-auto">
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
              onWorkClick={handleWorkClick}
              onSortEnd={(newOrder) => {
                setSelectedArtists((prev) => newOrder.map((i) => prev[i]));
              }}
            />
          </div>
        )}
        <WorkModal work={selectedWork} onClose={closeModal} />
      </main>
      <ScrollToTopButton />
    </div>
  );
}
