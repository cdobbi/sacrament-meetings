import Link from "next/link";
import { formatMeetingDate } from "../lib/format-date";
import type { SacramentMeeting } from "../lib/types";

type MeetingCardProps = {
  meeting: SacramentMeeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-lg bg-surface p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-accent hover:underline"
        >
          <time dateTime={meeting.date}>{formatMeetingDate(meeting.date)}</time>
        </Link>
      </h2>

      <p className="mt-2 capitalize">
        {meeting.meetingType} meeting
      </p>

      <p className="mt-2 text-sm">
        Conducting: {meeting.conducting}
      </p>
    </article>
  );
}