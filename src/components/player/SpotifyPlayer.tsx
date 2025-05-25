import React, { useState } from "react";
import type { SpotifyPlayerProps } from "../../types/components";

// SpotifyPlayer renders a Spotify embed iframe for an album
const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ albumId, minimized }) => {
  const [isLoading, setIsLoading] = useState(true);
  const spotifyUrl = `https://open.spotify.com/embed/album/${albumId}`;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/95">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      <iframe
        src={spotifyUrl}
        width={minimized ? "300" : "100%"}
        height={minimized ? "80" : "680"}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player"
        className={`rounded ${minimized ? "" : "w-full"}`}
        style={{ border: "none" }}
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
