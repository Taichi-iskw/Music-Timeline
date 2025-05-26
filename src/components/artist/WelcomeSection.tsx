"use client";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";

// Welcome message component
const WelcomeMessage = () => {
  const t = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h2 className="text-2xl font-semibold text-center">{t.welcome}</h2>
      <p className="text-center text-muted-foreground max-w-[280px] sm:max-w-none">{t.welcomeDescription}</p>
    </div>
  );
};

interface WelcomeSectionProps {
  hasArtists: boolean;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ hasArtists }) => {
  if (hasArtists) return null;
  return <WelcomeMessage />;
};

export default WelcomeSection;
