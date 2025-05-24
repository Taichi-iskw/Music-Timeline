import { useState } from "react";
import type { Work } from "../types/timeline";

export function useWorkModal() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const openModal = (work: Work) => setSelectedWork(work);
  const closeModal = () => setSelectedWork(null);

  return { selectedWork, openModal, closeModal };
}
