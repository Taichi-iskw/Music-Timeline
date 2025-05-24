"use client";
import React, { useState } from "react";
import Header from "../components/common/Header";
import ArtistSearchBar from "../components/artist/ArtistSearchBar";
import ArtistList from "../components/artist/ArtistList";

export default function Home() {
  const [artists, setArtists] = useState<any[]>([]);

  return (
    <div>
      <Header />
      <main className="pt-20 max-w-6xl mx-auto">
        <ArtistSearchBar onSearch={setArtists} />
        <ArtistList artists={artists} />
      </main>
    </div>
  );
}
