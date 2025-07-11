import React, { useEffect, useState } from "react";
import ArtistCardList from "../artist/ArtistCardList";
import ArtistListContainer from "../artist/ArtistListContainer";
import type { Artist } from "../../types/timeline";
import { fetchPopularArtists } from "../../services/artistService";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";

interface PopularArtistsProps {
  onArtistClick: (artist: Artist) => void;
}

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Error message component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center py-8">
    <p className="text-destructive">{message}</p>
  </div>
);

const PopularArtists: React.FC<PopularArtistsProps> = ({ onArtistClick }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    const loadPopularArtists = async () => {
      try {
        const data = await fetchPopularArtists(language);
        setArtists(data);
      } catch (err) {
        setError("Failed to load popular artists");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPopularArtists();
  }, [language]);

  const handleArtistClick = (id: string) => {
    const artist = artists.find((a) => a.id === id);
    if (artist) {
      onArtistClick(artist);
    }
  };

  return (
    <ArtistListContainer title={t.popularArtists}>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <ArtistCardList artists={artists} onArtistClick={handleArtistClick} />
      )}
    </ArtistListContainer>
  );
};

export default PopularArtists;
