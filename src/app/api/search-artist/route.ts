import { NextRequest, NextResponse } from "next/server";
import { getSpotifyAccessToken } from "@/lib/spotifyToken";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  if (!q) return NextResponse.json({ error: "No query" }, { status: 400 });

  try {
    // Get Spotify access token using the shared function
    const { access_token } = await getSpotifyAccessToken();

    // Search for artists
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=artist&limit=10`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await res.json();
    return NextResponse.json(data.artists.items);
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}
