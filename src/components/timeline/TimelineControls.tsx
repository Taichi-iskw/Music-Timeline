import React, { memo } from "react";
import type { WorksType } from "../../types/timeline";
import WorksTypeSelector from "./WorksTypeSelector";
import ClearTimelineButton from "./ClearTimelineButton";

interface TimelineControlsProps {
  worksType: WorksType;
  onWorksTypeChange: (type: WorksType) => void;
  onClearTimeline: () => void;
}

const TimelineControls: React.FC<TimelineControlsProps> = memo(({ worksType, onWorksTypeChange, onClearTimeline }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <WorksTypeSelector value={worksType} onChange={onWorksTypeChange} />
      <ClearTimelineButton onClear={onClearTimeline} />
    </div>
  );
});

TimelineControls.displayName = "TimelineControls";

export default TimelineControls;
