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
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  header: {
    base: "w-full flex items-center justify-between px-3 py-2 bg-secondary rounded-t-lg",
    minimized: "py-2 h-[32px] cursor-move px-2",
  },
  player: {
    base: "w-full h-full flex-1 flex items-center justify-center p-2 overflow-hidden bg-transparent",
    minimized: "h-[48px] sm:h-[68px] p-1",
  },
  container: {
    base: "w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[480px] h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[720px]",
    minimized: "w-[300px] h-[100px]",
  },
} as const;
