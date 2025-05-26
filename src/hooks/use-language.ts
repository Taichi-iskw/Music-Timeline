"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "ja" | "en";

interface LanguageState {
  language: Language;
  toggleLanguage: () => void;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      language: "ja",
      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "ja" ? "en" : "ja",
        })),
    }),
    {
      name: "language-storage",
    }
  )
);
