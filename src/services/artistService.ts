import type { WorksType, Work, Artist } from "../types/timeline";

export async function searchArtists(query: string): Promise<Artist[]> {
  const res = await fetch(`/api/search-artist?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search artist");
  return res.json();
}

export async function fetchArtistWorks(artistId: string, type: WorksType): Promise<Work[]> {
  const res = await fetch(`/api/artist-works?artistId=${artistId}&type=${type}`);
  if (!res.ok) throw new Error("Failed to fetch works");
  return res.json();
}
