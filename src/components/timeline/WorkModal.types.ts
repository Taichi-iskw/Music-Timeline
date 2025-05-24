import type { Work } from "../../types/timeline";

export interface WorkModalProps {
  work: Work | null;
  onClose: () => void;
}

export interface ModalPosition {
  x: number;
  y: number;
}
