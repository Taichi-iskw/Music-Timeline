import { NextRequest, NextResponse } from "next/server";
import { getSpotifyAccessToken } from "@/lib/spotifyToken";
import type { WorksType } from "@/types/timeline";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const artistId = searchParams.get("artistId");
  const type = (searchParams.get("type") || "all") as WorksType;

  if (!artistId) {
    return NextResponse.json({ error: "Missing artistId" }, { status: 400 });
  }

  // Determine the value for include_groups
  let includeGroups = "album,single";
  if (type === "single") includeGroups = "single";
  if (type === "album") includeGroups = "album";

  try {
    const { access_token } = await getSpotifyAccessToken();
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=${includeGroups}&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await res.json();

    // Extract only the necessary information
    const works = (data.items || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.images?.[0]?.url,
      releaseYear: item.release_date?.slice(0, 4),
      releaseDate: item.release_date || "",
    }));

    return NextResponse.json(works);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch works" }, { status: 500 });
  }
}
