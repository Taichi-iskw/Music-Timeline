"use client";
import React, { useState } from "react";
import Header from "../components/common/Header";
import ArtistSearchBar from "../components/artist/ArtistSearchBar";
import ArtistList from "../components/artist/ArtistList";
import WorksTypeSelector from "../components/timeline/WorksTypeSelector";

export default function Home() {
  const [artists, setArtists] = useState<any[]>([]);
  const [worksType, setWorksType] = useState<"single" | "album" | "all">("all");

  const handleArtistClick = async (artistId: string) => {
    try {
      const res = await fetch(`/api/artist-works?artistId=${artistId}&type=${worksType}`);
      const data = await res.json();
      console.log("Works for artist", artistId, data);
    } catch (e) {
      console.error("Failed to fetch works", e);
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
      </main>
    </div>
  );
}
