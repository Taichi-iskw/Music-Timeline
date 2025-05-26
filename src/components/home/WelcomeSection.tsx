import React from "react";

const WelcomeSection: React.FC = () => {
  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome to Music Timeline</h2>
        <p className="text-muted-foreground">Line up artists and explore their music side by side.</p>
      </div>

      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
        <ol className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-primary font-medium">1.</span>
            <span>Search for an artist using the bar above.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-medium">2.</span>
            <span>Click artists to add them to your timeline.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-medium">3.</span>
            <span>Compare releases from different artists year by year.</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default WelcomeSection;
