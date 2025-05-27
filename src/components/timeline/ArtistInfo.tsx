import React from "react";
import type { Artist } from "../../types/timeline";
import Image from "next/image";

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
      className="flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity w-full pr-0.5"
      onClick={handleArtistClick}
    >
      {artist.images && artist.images[0] && (
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-lg flex-shrink-0">
          <Image
            src={artist.images[0].url}
            alt={name}
            width={56}
            height={56}
            className="w-full h-full object-cover"
            style={{ aspectRatio: "1/1" }}
          />
        </div>
      )}
      <span className="font-medium text-sm sm:text-base group-hover:text-foreground transition-colors">{name}</span>
    </div>
  );
};

ArtistInfo.displayName = "ArtistInfo";

export default ArtistInfo;
