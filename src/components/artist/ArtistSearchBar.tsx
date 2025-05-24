"use client";
import React, { useState } from "react";
import type { Artist } from "../../types/timeline";
import { searchArtists } from "../../services/artistService";

type ArtistSearchBarProps = {
  onSearch: (artists: Artist[]) => void;
};

const ArtistSearchBar: React.FC<ArtistSearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await searchArtists(input);
      onSearch(data);
    } catch (e) {
      console.error("Failed to search artist", e);
      onSearch([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-2xl py-2 pl-4">
      <label htmlFor="artist-name" className="font-medium">
        Artist
      </label>
      <input
        id="artist-name"
        type="text"
        className="border px-2 py-1 rounded w-48"
        placeholder="Enter artist name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default ArtistSearchBar;
