import React from "react";

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="pt-14 sm:pt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
);

export default Main;
