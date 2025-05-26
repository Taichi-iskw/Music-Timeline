// Function to get authenticated Spotify client
export async function getSpotifyClient() {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error("Failed to get access token");
    }

    const data = await response.json();
    return {
      getAccessToken: async () => data,
      getPlaylistTracks: async (playlistId: string) => {
        const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
        if (!tracksResponse.ok) {
          throw new Error("Failed to fetch playlist tracks");
        }
        return {
          body: {
            items: await tracksResponse.json().then((res) => res.items),
          },
        };
      },
    };
  } catch (error) {
    console.error("Error getting Spotify client:", error);
    throw error;
  }
}
