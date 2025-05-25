// Common utility types
export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Event handler types
export type EventHandler<T = any> = (event: T) => void;

export type MouseEventHandler = EventHandler<React.MouseEvent>;

export type KeyboardEventHandler = EventHandler<React.KeyboardEvent>;

// Style related types
export interface StyleProps {
  className?: string;
  style?: React.CSSProperties;
}
