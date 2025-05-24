import { useState } from "react";
import type { Artist } from "../types/timeline";
import { searchArtists } from "../services/artistService";

export function useArtistSearch() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchArtists(query);
      setArtists(result);
    } catch (e) {
      setError("Failed to search artist");
      setArtists([]);
    } finally {
      setLoading(false);
    }
  };

  return { artists, setArtists, loading, error, handleSearch };
}
