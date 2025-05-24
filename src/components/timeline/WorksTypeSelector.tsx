"use client";
import React from "react";
import type { WorksType } from "../../types/timeline";

type WorksTypeSelectorProps = {
  value: WorksType;
  onChange: (value: WorksType) => void;
};

const WorksTypeSelector: React.FC<WorksTypeSelectorProps> = ({ value, onChange }) => (
  <select className="border px-2 py-1 rounded" value={value} onChange={(e) => onChange(e.target.value as WorksType)}>
    <option value="single">single</option>
    <option value="album">album</option>
    <option value="all">all</option>
  </select>
);

export default WorksTypeSelector;
