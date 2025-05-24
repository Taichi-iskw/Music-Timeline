import React from "react";

// Props for the SpotifyPlayer component
interface SpotifyPlayerProps {
  albumId: string;
  minimized?: boolean;
}

// SpotifyPlayer renders a Spotify embed iframe for an album
const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ albumId, minimized }) => {
  const spotifyUrl = `https://open.spotify.com/embed/album/${albumId}`;
  return (
    <iframe
      src={spotifyUrl}
      width={minimized ? "300" : "100%"}
      height={minimized ? "80" : "600"}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title="Spotify Player"
      className={`rounded ${minimized ? "" : "w-full"}`}
      style={{ border: "none" }}
    ></iframe>
  );
};

export default SpotifyPlayer;
