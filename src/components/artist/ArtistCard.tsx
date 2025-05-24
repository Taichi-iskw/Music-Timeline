"use client";
import React from "react";

type ArtistCardProps = {
  name: string;
  imageUrl?: string;
  id: string;
  onClick?: (id: string) => void;
};

const CARD_WIDTH = "w-32 min-w-[160px] max-w-[200px]";
const IMAGE_HEIGHT = "h-32";
const NAME_HEIGHT = "h-10";

const ArtistCard: React.FC<ArtistCardProps> = ({ name, imageUrl, id, onClick }) => (
  <div
    className={`flex flex-col items-center border rounded bg-white shadow-sm ${CARD_WIDTH} cursor-pointer hover:bg-gray-100 transition`}
    onClick={() => onClick && onClick(id)}
  >
    <div className={`w-full ${IMAGE_HEIGHT} overflow-hidden flex items-center justify-center`}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-300" />
      )}
    </div>
    <div className={`flex items-center justify-center w-full ${NAME_HEIGHT}`}>
      <span className="font-medium truncate block whitespace-nowrap overflow-hidden max-w-[140px] text-center">
        {name}
      </span>
    </div>
  </div>
);

export default ArtistCard;
