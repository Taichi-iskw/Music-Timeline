"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-4 text-center text-sm text-muted-foreground">
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
    </footer>
  );
}
