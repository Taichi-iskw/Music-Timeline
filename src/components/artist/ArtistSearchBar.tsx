"use client";
import React, { useState, useEffect, useCallback } from "react";
import type { ArtistSearchBarProps } from "../../types/components";
import { searchArtists } from "../../services/artistService";
import { useDebounce } from "../../hooks/useDebounce";
import { useTranslation } from "@/hooks/use-translation";

const ArtistSearchBar: React.FC<ArtistSearchBarProps> = ({ onSearch, value, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const debouncedInput = useDebounce(value, 300);
  const t = useTranslation();

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

  useEffect(() => {
    if (debouncedInput) {
      handleSearch(debouncedInput);
    }
  }, [debouncedInput, handleSearch]);

  const handleButtonClick = () => {
    handleSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1 group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            id="artist-name"
            type="text"
            className="w-full h-12 pl-9 pr-4 py-2 text-sm bg-background border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            placeholder={t.searchPlaceholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="animate-spin h-4 w-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleButtonClick}
        disabled={loading}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground h-12 px-6 py-2 ${
          isButtonHovered && !loading ? "hover:bg-primary/90 shadow-md" : ""
        }`}
      >
        Search
      </button>
    </div>
  );
};

export default ArtistSearchBar;
