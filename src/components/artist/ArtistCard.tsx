"use client";
import React from "react";
import type { ArtistCardProps } from "../../types/components";

const CARD_WIDTH = "w-32 min-w-[160px] max-w-[200px]";
const IMAGE_HEIGHT = "h-32";
const NAME_HEIGHT = "h-10";

const ArtistCard: React.FC<ArtistCardProps> = ({ name, imageUrl, id, onClick }) => (
  <div
    className={`flex flex-col items-center rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 ${CARD_WIDTH} cursor-pointer group`}
    onClick={() => onClick && onClick(id)}
  >
    <div className={`w-full ${IMAGE_HEIGHT} overflow-hidden rounded-t-lg`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      )}
    </div>
    <div className={`flex items-center justify-center w-full ${NAME_HEIGHT} px-2 bg-card rounded-b-lg`}>
      <span className="font-medium text-sm truncate block whitespace-nowrap overflow-hidden max-w-[140px] text-center group-hover:text-primary transition-colors">
        {name}
      </span>
    </div>
  </div>
);

export default ArtistCard;
