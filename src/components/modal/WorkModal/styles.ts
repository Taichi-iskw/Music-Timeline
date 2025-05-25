// Modal dimensions
export const MODAL_DIMENSIONS = {
  MINIMIZED: {
    width: 300,
    height: 100,
  },
  MAXIMIZED: {
    width: 480,
    height: 720,
  },
} as const;

// Modal positions
export const MODAL_POSITIONS = {
  MINIMIZED: {
    left: 16,
    bottom: 40,
  },
  MAXIMIZED: {
    left: "50%",
    top: "50%",
  },
} as const;

// Modal styles
export const modalStyles = {
  base: {
    position: "fixed" as const,
    zIndex: 50,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  header: {
    base: "w-full flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg",
    minimized: "py-1 h-[32px] cursor-move",
  },
  player: {
    base: "flex-1 flex items-center justify-center w-full h-full p-0",
    minimized: "h-[68px] p-0",
  },
} as const;
