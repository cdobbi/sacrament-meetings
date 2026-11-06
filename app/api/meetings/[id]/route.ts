import { getMeetingById } from "../../../../lib/meetings-db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!/^\d+$/.test(id) || !Number.isSafeInteger(meetingId)) {
    return Response.json(
      { error: "Meeting ID must be a non-negative safe integer." },
      { status: 400 },
    );
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return Response.json({ error: "Meeting not found." }, { status: 404 });
  }

  return Response.json(meeting);
}
