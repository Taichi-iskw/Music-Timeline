import React from "react";
import type { Artist } from "../../types/timeline";

interface ArtistInfoProps {
  name: string;
  artist: Artist;
}

const ArtistInfo: React.FC<ArtistInfoProps> = ({ name, artist }) => {
  const handleArtistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`https://open.spotify.com/artist/${artist.id}`, "_blank");
  };

  return (
    <div
      className="flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity w-full"
      onClick={handleArtistClick}
    >
      {artist.images && artist.images[0] && (
        <div className="relative w-8 h-8 overflow-hidden rounded-full ring-2 ring-border transition-transform group-hover:scale-110">
          <img src={artist.images[0].url} alt={name} className="w-full h-full object-cover" />
        </div>
      )}
      <span className="font-medium group-hover:text-foreground transition-colors">{name}</span>
    </div>
  );
};

export default ArtistInfo;
