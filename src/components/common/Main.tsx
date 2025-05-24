import React from "react";

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="pt-20 max-w-6xl mx-auto">{children}</main>
);

export default Main;
