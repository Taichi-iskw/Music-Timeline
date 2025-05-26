"use client";

import { createContext, useContext } from "react";
import { useLanguage } from "@/hooks/use-language";

type LanguageProviderProps = {
  children: React.ReactNode;
};

const LanguageProviderContext = createContext<ReturnType<typeof useLanguage> | undefined>(undefined);

export function LanguageProvider({ children }: LanguageProviderProps) {
  const languageState = useLanguage();

  return <LanguageProviderContext.Provider value={languageState}>{children}</LanguageProviderContext.Provider>;
}

export const useLanguageContext = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined) {
    throw new Error("useLanguageContext must be used within a LanguageProvider");
  }

  return context;
};
