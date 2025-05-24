import React from "react";

const ArtistSearchBar: React.FC = () => {
  return (
    <div className="flex items-center gap-2 w-full max-w-2xl py-2 pl-4">
      <label htmlFor="artist-name" className="font-medium">
        Artist
      </label>
      <input id="artist-name" type="text" className="border px-2 py-1 rounded w-48" placeholder="Enter artist name" />
      <button className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700">Search</button>
    </div>
  );
};

export default ArtistSearchBar;
