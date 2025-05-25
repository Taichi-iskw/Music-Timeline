"use client";
import React from "react";
import type { WorkCardProps } from "../../types/components";

const WorkCard: React.FC<WorkCardProps> = ({ name, imageUrl, onClick }) => (
  <div
    className="group flex flex-col items-center w-24 cursor-pointer transition-transform hover:scale-105"
    onClick={onClick}
  >
    {imageUrl ? (
      <div className="relative w-20 h-20 overflow-hidden rounded-lg shadow-sm">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
    ) : (
      <div className="w-20 h-20 bg-muted rounded-lg shadow-sm flex items-center justify-center">
        <span className="text-muted-foreground text-xs">No Image</span>
      </div>
    )}
    <span className="mt-2 text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
      {name}
    </span>
  </div>
);

export default WorkCard;
