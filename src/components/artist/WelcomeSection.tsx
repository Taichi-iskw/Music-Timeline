"use client";
import React from "react";

// Welcome message component
const WelcomeMessage = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-4">
    <h2 className="text-2xl font-semibold text-center">
      <span className="block sm:inline">Welcome to</span>{" "}
      <span className="block sm:inline mt-1 sm:mt-0">Music Timeline</span>
    </h2>
    <p className="text-center text-muted-foreground max-w-[280px] sm:max-w-none">
      <span className="block sm:inline">Line up artists and</span>{" "}
      <span className="block sm:inline mt-1 sm:mt-0">explore their music side by side.</span>
    </p>
  </div>
);

interface WelcomeSectionProps {
  hasArtists: boolean;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ hasArtists }) => {
  if (hasArtists) return null;

  return (
    <div className="w-full">
      <div className="rounded-lg p-6 h-[250px]">
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex-1 flex justify-center">
            <div className="max-w-[1200px] w-full overflow-x-auto -mx-4 sm:mx-0">
              <WelcomeMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
