import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="top-0 left-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Music Timeline</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
