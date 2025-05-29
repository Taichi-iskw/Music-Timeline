"use client";

import React, { useState } from "react";
import Image from "next/image";
import TermsModal from "./TermsModal";
import { useLanguage } from "@/hooks/use-language";

export default function Footer() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const { language } = useLanguage();

  const termsText = {
    ja: "利用規約",
    en: "Terms of Service",
  };

  return (
    <>
      <footer className="w-full py-4 text-center text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <span>Powered by</span>
            <a
              href="https://www.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/spotify-logo.png" alt="Spotify" width={80} height={24} className="h-6 w-auto" unoptimized />
            </a>
          </div>
          <button
            onClick={() => setIsTermsOpen(true)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {termsText[language]}
          </button>
        </div>
      </footer>
      <TermsModal open={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
}
