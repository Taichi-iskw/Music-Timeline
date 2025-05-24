import React, { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 bg-white border shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-100 z-50"
      aria-label="Scroll to top"
    >
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" fill="none" />
        <polyline points="8 12 12 8 16 12" />
        <line x1="12" y1="8" x2="12" y2="16" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
