"use client";
import React from "react";
import Header from "../components/common/Header";
import ArtistSearchBar from "../components/artist/ArtistSearchBar";
import ArtistList from "../components/artist/ArtistList";
import WorksTypeSelector from "../components/timeline/WorksTypeSelector";
import TimelineTable from "../components/timeline/TimelineTable";
import Modal from "../components/common/Modal";
import { useTimeline } from "../hooks/useTimeline";
import { useWorkModal } from "../hooks/useWorkModal";
import type { Work } from "../types/timeline";

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
            />
          </div>
        )}
        <Modal open={!!selectedWork} onClose={closeModal}>
          {selectedWork && (
            <div className="flex flex-col items-center gap-0 w-[520px] max-w-full">
              <div className="w-full flex items-center justify-between px-4 py-2">
                <span className="text-sm text-gray-600">{selectedWork.releaseDate}</span>
                <button
                  className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <iframe
                src={`https://open.spotify.com/embed/album/${selectedWork.id}`}
                width="100%"
                height="600"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player"
                className="rounded w-full"
                style={{ border: "none" }}
              ></iframe>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}
