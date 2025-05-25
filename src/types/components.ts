import type { Work, Artist, WorksType } from "./timeline";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

// Modal related types
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface WorkModalProps {
  work: Work | null;
  onClose: () => void;
}

export interface ModalPosition {
  x: number;
  y: number;
}

export interface WorkModalHeaderProps {
  releaseDate: string;
  isMinimized: boolean;
  onMinimize: (e: React.MouseEvent) => void;
  onClose: (e: React.MouseEvent) => void;
  dragAttributes?: DraggableAttributes;
  dragListeners?: SyntheticListenerMap;
}

// Timeline related types
export interface TimelineTableProps {
  years: string[];
  artistNames: string[];
  artists: Artist[];
  worksByYearAndArtist: Work[][][];
  onRemoveArtist?: (artistIndex: number) => void;
  onToggleSort?: () => void;
  isAscending?: boolean;
  onWorkClick?: (work: Work) => void;
  onSortEnd?: (newOrder: number[]) => void;
}

export interface TimelineRowProps {
  year: string;
  worksByArtist: Work[][];
  onWorkClick?: (work: Work) => void;
}

export interface TimelineCellProps {
  works: Work[];
  onWorkClick?: (work: Work) => void;
}

export interface SortableHeaderProps {
  id: string;
  index: number;
  name: string;
  artist: Artist;
  onRemove?: () => void;
}

export interface WorksTypeSelectorProps {
  value: WorksType;
  onChange: (value: WorksType) => void;
}

// Artist related types
export interface ArtistCardProps {
  name: string;
  imageUrl?: string;
  id: string;
  onClick?: (id: string) => void;
}

export interface ArtistListProps {
  artists: Artist[];
  onArtistClick?: (id: string) => void;
}

export interface ArtistSearchBarProps {
  onSearch: (artists: Artist[]) => void;
}

// Work related types
export interface WorkCardProps {
  name: string;
  imageUrl?: string;
  onClick?: () => void;
}

export interface SpotifyPlayerProps {
  albumId: string;
  minimized?: boolean;
}

// Common component types
export interface CarouselProps {
  children: React.ReactNode[];
  pageSize?: number;
}
