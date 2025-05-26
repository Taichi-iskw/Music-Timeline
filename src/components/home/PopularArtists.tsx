import React, { useEffect, useState } from "react";
import ArtistCard from "../artist/ArtistCard";
import type { Artist } from "../../types/timeline";
import { fetchPopularArtists } from "../../services/artistService";

interface PopularArtistsProps {
  onArtistClick: (artist: Artist) => void;
}

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Error message component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center text-muted-foreground">{message}</div>
);

// Welcome section component
const WelcomeSection = () => (
  <div className="text-center mb-8">
    <h2 className="text-2xl font-bold mb-2">Welcome to Music Timeline</h2>
    <p className="text-muted-foreground">Line up artists and explore their music side by side.</p>
  </div>
);

// Artist list component
const ArtistList = ({ artists, onArtistClick }: { artists: Artist[]; onArtistClick: (artist: Artist) => void }) => (
  <div className="w-full flex justify-center">
    <div className="max-w-[1200px] w-full overflow-x-auto -mx-4 sm:mx-0">
      <div className="flex gap-4 px-4 sm:px-0 justify-start">
        {artists.map((artist) => (
          <div key={artist.id} className="flex-none">
            <ArtistCard
              id={artist.id}
              name={artist.name}
              imageUrl={artist.images?.[0]?.url}
              onClick={() => onArtistClick(artist)}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PopularArtists: React.FC<PopularArtistsProps> = ({ onArtistClick }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPopularArtists = async () => {
      try {
        const data = await fetchPopularArtists();
        setArtists(data);
      } catch (err) {
        setError("Failed to load popular artists");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPopularArtists();
  }, []);

  return (
    <div className="mt-12 w-full">
      <WelcomeSection />
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">Popular Artists</h3>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <ArtistList artists={artists} onArtistClick={onArtistClick} />
        )}
      </div>
    </div>
  );
};

export default PopularArtists;
