import { useState } from "react";
import type { Work, WorkWithArtist, WorksType } from "../types/timeline";
import { fetchArtistWorks } from "../services/artistService";

export function useWorks() {
  const [worksType, setWorksType] = useState<WorksType>("all");
  const [worksByArtist, setWorksByArtist] = useState<{ [key: string]: WorkWithArtist[] }>({});

  const fetchWorks = async (artistId: string) => {
    try {
      const data = await fetchArtistWorks(artistId, worksType);
      // Convert Work[] to WorkWithArtist[] by adding artistName
      const worksWithArtist: WorkWithArtist[] = data.map((work) => ({
        ...work,
        artistName: "", // Set empty string initially (will be set later)
      }));
      setWorksByArtist((prev) => ({ ...prev, [artistId]: worksWithArtist }));
    } catch (e) {
      console.error("Failed to fetch works", e);
    }
  };

  const removeWorks = (artistId: string) => {
    setWorksByArtist((prev) => {
      const newWorks = { ...prev };
      delete newWorks[artistId];
      return newWorks;
    });
  };

  return {
    worksType,
    setWorksType,
    worksByArtist,
    fetchWorks,
    removeWorks,
  };
}
