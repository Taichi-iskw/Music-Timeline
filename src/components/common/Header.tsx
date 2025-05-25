import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="top-0 left-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center focus:outline-none">
          <Image
            src="/music-timeline_icon.png"
            alt="Music Timeline Icon"
            width={36}
            height={36}
            className="mr-1"
            priority
          />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Music Timeline</h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
