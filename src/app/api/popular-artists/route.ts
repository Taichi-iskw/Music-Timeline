import { NextResponse } from "next/server";
import { getSpotifyClient } from "@/lib/spotify";

// Types
interface SpotifyArtist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
}

interface SpotifySearchResponse {
  artists: {
    items: SpotifyArtist[];
  };
}

// Error handling
class SpotifyAPIError extends Error {
  constructor(message: string, public status: number, public statusText: string, public body?: string) {
    super(message);
    this.name = "SpotifyAPIError";
  }
}

// API response helpers
const createErrorResponse = (error: unknown) => {
  console.error("Failed to fetch popular artists:", error);
  return NextResponse.json(
    {
      error: "Failed to fetch popular artists",
      details: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    },
    { status: 500 }
  );
};

const createNotFoundResponse = () => {
  return NextResponse.json({ error: "No artists found" }, { status: 404 });
};

// Build search query based on language
const buildSearchQuery = (language: string) => {
  switch (language) {
    case "ja":
      return "genre:j-pop&type=artist&market=JP&limit=10";
    case "en":
    default:
      return "genre:pop&type=artist&market=US&limit=10";
  }
};

// Main API handler
export async function GET(request: Request) {
  try {
    // Get language from query parameters
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("lang") || "en";

    // Get Spotify client and access token
    const spotify = await getSpotifyClient();
    const token = await spotify.getAccessToken();

    if (!token?.access_token) {
      console.error("No access token received:", token);
      return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
    }

    // Build search query based on language
    const searchQuery = buildSearchQuery(language);

    // Search for popular artists
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify API error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new SpotifyAPIError(
        "Failed to fetch artists from Spotify",
        response.status,
        response.statusText,
        errorText
      );
    }

    const data = (await response.json()) as SpotifySearchResponse;
    const popularArtists = data.artists.items;

    if (popularArtists.length === 0) {
      console.error("No artists found in search results");
      return createNotFoundResponse();
    }

    return NextResponse.json(popularArtists);
  } catch (error) {
    return createErrorResponse(error);
  }
}
