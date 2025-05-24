import { useArtistSearch } from "./useArtistSearch";
import { useTimelineCore } from "./useTimelineCore";

export function useTimeline() {
  const artistSearch = useArtistSearch();
  const timelineCore = useTimelineCore();

  return {
    ...artistSearch,
    ...timelineCore,
  };
}
