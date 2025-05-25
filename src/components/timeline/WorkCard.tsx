"use client";
import React from "react";
import type { WorkCardProps } from "../../types/components";

const WorkCard: React.FC<WorkCardProps> = ({ name, imageUrl, onClick }) => (
  <div className="flex flex-col items-center w-24 cursor-pointer" onClick={onClick}>
    {imageUrl ? (
      <img src={imageUrl} alt={name} className="w-20 h-20 object-cover rounded mb-1" />
    ) : (
      <div className="w-20 h-20 bg-gray-300 rounded mb-1" />
    )}
    <span className="text-xs text-center">{name}</span>
  </div>
);

export default WorkCard;
