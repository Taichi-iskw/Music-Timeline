import React, { memo } from "react";
import type { Artist, Work, WorksType } from "../../types/timeline";
import TimelineControls from "./TimelineControls";
import TimelineTable from "./TimelineTable";

interface TimelineProps {
  years: string[];
  artistNames: string[];
  artists: Artist[];
  worksByYearAndArtist: Work[][][];
  worksType: WorksType;
  onWorksTypeChange: (type: WorksType) => void;
  onRemoveArtist: (index: number) => void;
  onToggleSort: () => void;
  isAscending: boolean;
  onWorkClick?: (work: Work) => void;
  onSortEnd?: (newOrder: number[]) => void;
  onClearTimeline: () => void;
  isLoading?: boolean;
}

const Timeline: React.FC<TimelineProps> = memo(
  ({
    years,
    artistNames,
    artists,
    worksByYearAndArtist,
    worksType,
    onWorksTypeChange,
    onRemoveArtist,
    onToggleSort,
    isAscending,
    onWorkClick,
    onSortEnd,
    onClearTimeline,
    isLoading = false,
  }) => {
    return (
      <div className="flex flex-col">
        <TimelineControls
          worksType={worksType}
          onWorksTypeChange={onWorksTypeChange}
          onClearTimeline={onClearTimeline}
        />
        <TimelineTable
          years={years}
          artistNames={artistNames}
          artists={artists}
          worksByYearAndArtist={worksByYearAndArtist}
          onRemoveArtist={onRemoveArtist}
          onToggleSort={onToggleSort}
          isAscending={isAscending}
          onWorkClick={onWorkClick}
          onSortEnd={onSortEnd}
          isLoading={isLoading}
        />
      </div>
    );
  }
);

Timeline.displayName = "Timeline";

export default Timeline;
