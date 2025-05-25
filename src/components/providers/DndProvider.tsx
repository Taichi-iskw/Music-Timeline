"use client";

import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { ReactNode, useState, createContext, useContext } from "react";

// Create context for drag position
type DragContextType = {
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
};

const DragContext = createContext<DragContextType | null>(null);

export const useDragPosition = () => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDragPosition must be used within a DndProvider");
  }
  return context;
};

export default function DndProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragStart() {
    // setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { delta } = event;
    setPosition((prev) => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }));
    // setActiveId(null);
  }

  return (
    <DragContext.Provider value={{ position, setPosition }}>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {children}
      </DndContext>
    </DragContext.Provider>
  );
}
