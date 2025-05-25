"use client";
import React from "react";
import type { WorksType } from "../../types/timeline";
import type { WorksTypeSelectorProps } from "../../types/components";

const WORKS_TYPE_OPTIONS = [
  {
    value: "single",
    label: "Singles",
    description: "Single tracks and digital singles",
    icon: "💿",
  },
  {
    value: "album",
    label: "Albums",
    description: "Full albums, EPs, and compilations",
    icon: "📀",
  },
  {
    value: "all",
    label: "All",
    description: "All works including singles and albums",
    icon: "🎵",
  },
] as const;

const WorksTypeSelector: React.FC<WorksTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      {WORKS_TYPE_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value as WorksType)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            value === option.value
              ? "bg-gray-100 text-gray-900 border border-gray-300"
              : "bg-white text-gray-600 border border-gray-200"
          }`}
          title={option.description}
        >
          <span className="text-lg">{option.icon}</span>
          <span className="font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default WorksTypeSelector;
