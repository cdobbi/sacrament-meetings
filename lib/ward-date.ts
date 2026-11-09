export const WARD_TIME_ZONE = "America/Denver";

export function getCurrentSundayDate(today: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: WARD_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(today);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Could not determine the ward's calendar date.");
  }

  const sunday = new Date(`${year}-${month}-${day}T00:00:00Z`);
  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());

  return sunday.toISOString().slice(0, 10);
}
