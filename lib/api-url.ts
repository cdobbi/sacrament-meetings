export function getApiUrl(path: string): URL {
  const baseUrl =
    process.env.API_BASE_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:3000"
      : undefined);

  if (!baseUrl) {
    throw new Error("Set API_BASE_URL to this site's origin before deploying.");
  }

  const url = new URL(baseUrl);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("API_BASE_URL must use http:// or https://.");
  }

  return new URL(path, url);
}
