"use client";
import React from "react";
import type { WorkCardProps } from "../../types/components";
import Image from "next/image";

const WorkCard: React.FC<WorkCardProps> = ({ name, imageUrl, onClick }) => (
  <div
    className="group flex flex-col items-center w-28 cursor-pointer transition-transform hover:scale-105"
    onClick={onClick}
  >
    {imageUrl ? (
      <div className="relative w-24 h-24 overflow-hidden rounded-lg shadow-sm">
        <Image
          src={imageUrl}
          alt={name}
          width={96}
          height={96}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
    ) : (
      <div className="w-24 h-24 bg-muted rounded-lg shadow-sm flex items-center justify-center">
        <span className="text-muted-foreground text-xs">No Image</span>
      </div>
    )}
    <span className="mt-2 text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
      {name}
    </span>
  </div>
);

export default WorkCard;
