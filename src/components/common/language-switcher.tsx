"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button variant="ghost" size="icon" onClick={toggleLanguage} className="h-9 w-9 px-0">
      {language === "ja" ? "EN" : "JP"}
    </Button>
  );
}
