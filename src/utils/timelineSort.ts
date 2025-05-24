import type { WorkWithArtist } from "../types/timeline";

export function sortWorksByDate(works: WorkWithArtist[], isAscending: boolean): WorkWithArtist[] {
  return works.slice().sort((a, b) => {
    if (!a.releaseDate) return 1;
    if (!b.releaseDate) return -1;
    return isAscending ? a.releaseDate.localeCompare(b.releaseDate) : b.releaseDate.localeCompare(a.releaseDate);
  });
}

export function getSortedYears(works: WorkWithArtist[], isAscending: boolean): string[] {
  return Array.from(new Set(works.map((work) => work.releaseYear)))
    .filter(Boolean)
    .sort((a, b) => (isAscending ? a.localeCompare(b) : b.localeCompare(a)));
}
