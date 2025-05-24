export type Work = {
  id: string;
  name: string;
  imageUrl?: string;
  releaseYear: string;
  releaseDate: string;
};

export type Artist = {
  id: string;
  name: string;
  images?: { url: string }[];
};

export type WorkWithArtist = Work & {
  artistName: string;
};

export type WorksType = "single" | "album" | "all";
