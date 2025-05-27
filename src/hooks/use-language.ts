"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Language } from "@/lib/translations";
import { useEffect, useState } from "react";

interface LanguageState {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

// Create store with default English
const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",
      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "ja" ? "en" : "ja",
        })),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ language: state.language }),
    }
  )
);

// Custom hook to handle hydration and browser language
export const useLanguage = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { language, toggleLanguage, setLanguage } = useLanguageStore();

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Set initial language based on browser settings if no saved language exists
  useEffect(() => {
    if (isHydrated) {
      const savedLanguage = localStorage.getItem("language-storage");
      if (!savedLanguage) {
        const browserLang = window.navigator.language.toLowerCase();
        const initialLang: Language = browserLang.startsWith("ja") ? "ja" : "en";
        setLanguage(initialLang);
      }
    }
  }, [isHydrated, setLanguage]);

  return {
    language,
    toggleLanguage,
    isHydrated,
  };
};
