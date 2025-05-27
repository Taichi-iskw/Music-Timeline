"use client";
import React, { useState } from "react";
import Header from "../components/common/Header";
import ArtistSearchBar from "../components/artist/ArtistSearchBar";
import ArtistList from "../components/artist/ArtistList";
import Timeline from "../components/timeline/Timeline";
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

  const handleClearTimeline = () => {
    setSelectedArtists([]);
  };

  return (
    <div>
      <Header />
      <main className="pt-5 w-full px-0 sm:max-w-6xl sm:mx-auto sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-full sm:flex-1">
            <ArtistSearchBar onSearch={setArtists} value={searchInput} onChange={setSearchInput} />
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
            <Timeline
              years={years}
              artistNames={artistNames}
              artists={selectedArtists}
              worksByYearAndArtist={worksByYearAndArtist}
              worksType={worksType}
              onWorksTypeChange={setWorksType}
              onRemoveArtist={handleRemoveArtistFromTable}
              onToggleSort={handleToggleSort}
              isAscending={isAscending}
              onWorkClick={handleWorkClick}
              onSortEnd={(newOrder) => {
                setSelectedArtists((prev) => newOrder.map((i) => prev[i]));
              }}
              onClearTimeline={handleClearTimeline}
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
