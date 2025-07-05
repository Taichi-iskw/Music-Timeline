import type { WorksType, Work, Artist } from "../types/timeline";

// API endpoints
const API_ENDPOINTS = {
  SEARCH: "/api/search-artist",
  POPULAR: "/api/popular-artists",
} as const;

// Error handling
class ArtistServiceError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ArtistServiceError";
  }
}

// Response validation
const validateArtistResponse = (data: unknown): Artist[] => {
  if (!Array.isArray(data)) {
    throw new ArtistServiceError("Invalid response format");
  }
  return data;
};

// API request helpers
const fetchFromAPI = async (endpoint: string, params?: Record<string, string>) => {
  const url = new URL(endpoint, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new ArtistServiceError(`Failed to fetch from ${endpoint}`, response.status);
  }

  return response.json();
};

// Public API
export const searchArtists = async (query: string): Promise<Artist[]> => {
  try {
    const data = await fetchFromAPI(API_ENDPOINTS.SEARCH, { q: query });
    return validateArtistResponse(data);
  } catch (error) {
    console.error("Error searching artists:", error);
    throw error;
  }
};

export const fetchPopularArtists = async (language?: string): Promise<Artist[]> => {
  try {
    const params: Record<string, string> = {};
    if (language) {
      params.lang = language;
    }
    const data = await fetchFromAPI(API_ENDPOINTS.POPULAR, params);
    return validateArtistResponse(data);
  } catch (error) {
    console.error("Error fetching popular artists:", error);
    throw error;
  }
};

export async function fetchArtistWorks(artistId: string, type: WorksType): Promise<Work[]> {
  const res = await fetch(`/api/artist-works?artistId=${artistId}&type=${type}`);
  if (!res.ok) throw new Error("Failed to fetch works");
  return res.json();
}
