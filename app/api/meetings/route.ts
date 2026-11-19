import { getAllMeetings, getMeetingByDate } from "../../../lib/meetings-db";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date");

  if (date === null) {
    return Response.json(await getAllMeetings());
  }

  const parsed = new Date(`${date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    return Response.json(
      { error: "Date must be a valid YYYY-MM-DD value." },
      { status: 400 },
    );
  }

  const meeting = await getMeetingByDate(date);

  return Response.json(meeting ? [meeting] : []);
}
