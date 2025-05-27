"use client";
import React, { useState } from "react";
import Header from "../components/common/Header";
import ArtistSearchBar from "../components/artist/ArtistSearchBar";
import ArtistList from "../components/artist/ArtistList";
import WorksTypeSelector from "../components/timeline/WorksTypeSelector";
import TimelineTable from "../components/timeline/TimelineTable";
import WorkModal from "../components/modal/WorkModal";
import PopularArtists from "../components/home/PopularArtists";
import { useTimeline } from "../hooks/useTimeline";
import { useWorkModal } from "../hooks/useWorkModal";
import type { Work, Artist } from "../types/timeline";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
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
    isLoading,
  } = useTimeline();

  const { years, artistNames, worksByYearAndArtist } = organizeWorksByYear();

  const { selectedWork, openModal, closeModal } = useWorkModal();

  const handleWorkClick = (work: Work) => {
    openModal(work);
  };

  const handlePopularArtistClick = (artist: Artist) => {
    setSearchInput(artist.name);
    handleArtistClick(artist);
  };

  return (
    <div>
      <Header />
      <main className="pt-5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-full sm:flex-1">
            <ArtistSearchBar onSearch={setArtists} value={searchInput} onChange={setSearchInput} />
          </div>
          <div className="w-full sm:w-auto">
            <WorksTypeSelector value={worksType} onChange={setWorksType} />
          </div>
        </div>

        {/* Search Results - Always visible */}
        <div className="mt-8">
          <ArtistList
            artists={artists}
            onArtistClick={(id) => {
              const artist = artists.find((a) => a.id === id);
              if (artist) handleArtistClick(artist);
            }}
          />
        </div>

        {/* Timeline or Popular Artists */}
        <div className="mt-8">
          {selectedArtists.length > 0 ? (
            <TimelineTable
              years={years}
              artistNames={artistNames}
              artists={selectedArtists}
              worksByYearAndArtist={worksByYearAndArtist}
              onRemoveArtist={handleRemoveArtistFromTable}
              onToggleSort={handleToggleSort}
              isAscending={isAscending}
              onWorkClick={handleWorkClick}
              onSortEnd={(newOrder) => {
                setSelectedArtists((prev) => newOrder.map((i) => prev[i]));
              }}
              isLoading={isLoading}
            />
          ) : (
            <PopularArtists onArtistClick={handlePopularArtistClick} />
          )}
        </div>

        <WorkModal work={selectedWork} onClose={closeModal} />
      </main>
      <ScrollToTopButton />
    </div>
  );
}
