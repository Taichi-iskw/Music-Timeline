import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Music Timeline</h1>
        </div>
      </div>
    </header>
  );
}
