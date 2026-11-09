export function getApiUrl(path: string): URL {
    const baseUrl =
        process.env.API_BASE_URL || "http://localhost:3000";

    const url = new URL(baseUrl);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("API_BASE_URL must use http:// or https://.");
    }

    return new URL(path, url);
}