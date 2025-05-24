let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

export async function getSpotifyAccessToken() {
  const now = Date.now();

  // Return cached token if still valid
  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) {
    return { access_token: cachedToken };
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify credentials");
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  if (!tokenRes.ok) {
    const error = await tokenRes.json();
    throw new Error(error.error_description || "Failed to get Spotify token");
  }

  const tokenJson = await tokenRes.json();
  // Cache the token and its expiry (1 minute early)
  cachedToken = tokenJson.access_token;
  tokenExpiresAt = now + (tokenJson.expires_in - 60) * 1000;

  return tokenJson;
}
