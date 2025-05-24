"use client";
import React, { useState, useEffect, useCallback } from "react";
import type { Artist } from "../../types/timeline";
import { searchArtists } from "../../services/artistService";
import { useDebounce } from "../../hooks/useDebounce";

type ArtistSearchBarProps = {
  onSearch: (artists: Artist[]) => void;
};

const ArtistSearchBar: React.FC<ArtistSearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedInput = useDebounce(input, 300); // 300ms debounce

  // 共通の検索処理
  const handleSearch = useCallback(
    async (query: string) => {
      if (!query) {
        onSearch([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchArtists(query);
        onSearch(data);
      } catch (e) {
        console.error("Failed to search artist", e);
        onSearch([]);
      } finally {
        setLoading(false);
      }
    },
    [onSearch]
  );

  // 入力時の自動検索
  useEffect(() => {
    handleSearch(debouncedInput);
  }, [debouncedInput, handleSearch]);

  // ボタン押下時の即時検索
  const handleButtonClick = () => {
    handleSearch(input);
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-2xl py-2 pl-4">
      <label htmlFor="artist-name" className="font-medium">
        Artist
      </label>
      <div className="relative flex-1">
        <input
          id="artist-name"
          type="text"
          className="border px-2 py-1 rounded w-full"
          placeholder="Enter artist name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button className="px-3 py-1 bg-gray-800 text-white rounded" onClick={handleButtonClick} disabled={loading}>
        Search
      </button>
    </div>
  );
};

export default ArtistSearchBar;
