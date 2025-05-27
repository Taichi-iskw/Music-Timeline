"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import type { Language } from "@/lib/translations";

const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
  isHydrated: boolean;
}>({
  language: "en",
  toggleLanguage: () => {},
  isHydrated: false,
});

export const useLanguageContext = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const languageState = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <LanguageContext.Provider value={languageState}>{children}</LanguageContext.Provider>;
}
