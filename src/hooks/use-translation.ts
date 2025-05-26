"use client";

import { useLanguage } from "./use-language";
import { translations } from "@/lib/translations";

export function useTranslation() {
  const { language } = useLanguage();
  return translations[language];
}
