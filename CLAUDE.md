# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Music Timeline Application

A Next.js application that displays music releases from multiple artists on a chronological timeline using the Spotify Web API.

## Essential Commands

```bash
# Install dependencies
npm install

# Run development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## High-Level Architecture

### Core Architecture Pattern
The application follows a client-heavy Next.js App Router architecture with:
- **Client Components**: Most UI components use `"use client"` directive
- **API Routes**: Server-side endpoints proxy Spotify API calls and handle authentication
- **Custom Hooks Composition**: Complex logic is composed through multiple specialized hooks

### Data Flow
```
User Action → Custom Hook → API Route → Spotify API
     ↑            ↓
     └── Component State Update
```

### Key Architectural Components

1. **Custom Hooks** (in `/src/hooks/`):
   - `useTimeline` - Main orchestrator for timeline functionality
   - `useTimelineCore` - Core timeline state management
   - `useArtists` - Artist selection/management
   - `useWorks` - Fetches and caches artist albums/singles
   - `useTimelineSort` - Sorting and filtering logic
   - `useArtistSearch` - Search functionality

2. **API Routes** (in `/src/app/api/`):
   - `/api/search-artist` - Artist search
   - `/api/artist-works` - Fetch artist's albums/singles
   - `/api/popular-artists` - Get trending artists
   - `/api/spotify-token` - Token management

3. **Component Structure**:
   - `/components/timeline/` - Timeline visualization components
   - `/components/artist/` - Artist search and display components
   - `/components/providers/` - Context providers (Theme, Language, DnD)
   - `/components/common/` - Shared UI components

### State Management Strategy
- **Local State**: Most state is managed in components using React hooks
- **Global State**: Zustand for language preference (persisted to localStorage)
- **Theme State**: Managed by ThemeProvider using next-themes

### Key Technologies
- **Next.js 15.3.2** with App Router and Turbopack
- **TypeScript** with strict mode
- **Tailwind CSS** with custom theming
- **shadcn/ui** components (Radix UI based)
- **Zustand** for minimal global state
- **@dnd-kit** for drag-and-drop functionality

### Spotify Integration
All Spotify API calls go through server-side API routes to:
- Keep credentials secure (never exposed to client)
- Handle token refresh automatically
- Provide consistent error handling
- Enable potential caching

### Environment Variables Required
```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=
SPOTIFY_SCOPES=
NODE_ENV=
PORT=
```

### Development Workflow Tips
1. Always use the existing custom hooks when adding features - they handle complex state management
2. Add new API endpoints in `/src/app/api/` when integrating new Spotify features
3. Follow the existing pattern of client components with server-side data fetching
4. Use the existing TypeScript types in `/src/types/` and extend as needed
5. Maintain the modular component structure - components should be feature-focused

### Performance Considerations
- Components use React.memo where appropriate (e.g., Timeline)
- Search is debounced to reduce API calls
- Artist works are lazy-loaded only when an artist is selected
- Images use Next.js Image component for optimization

### Testing
Currently no test framework is configured. When adding tests, consider setting up Jest or Vitest with React Testing Library.