export const translations = {
  en: {
    description: "Line up artists and explore their music side by side.",
    popularArtists: "Popular Artists",
    searchResults: "Search Results",
    welcome: "Welcome to Music Timeline",
    welcomeDescription: "Let's explore the history of music.",
    searchPlaceholder: "Enter artist name to search...",
  },
  ja: {
    description: "アーティストを並べて、音楽を見比べよう。",
    popularArtists: "人気のアーティスト",
    searchResults: "検索結果",
    welcome: "Music Timeline へようこそ",
    welcomeDescription: "音楽の歴史をたどりましょう",
    searchPlaceholder: "アーティスト名を入力...",
  },
} as const;

export type Language = keyof typeof translations;
