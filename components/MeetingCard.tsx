import Link from "next/link";
import { formatMeetingDate } from "../lib/format-date";
import type { SacramentMeeting } from "../lib/types";
import MeetingTypeBadge from "./MeetingTypeBadge";
import { deleteMeeting } from "@/lib/actions";

type MeetingCardProps = {
  meeting: SacramentMeeting;
  canManage: boolean;
};

function dateParts(date: string) {
  const value = new Date(`${date}T00:00:00Z`);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(value);
  return { month: part({ month: "short" }), day: part({ day: "numeric" }) };
}

export default function MeetingCard({ meeting, canManage }: MeetingCardProps) {
  const { month, day } = dateParts(meeting.date);
  const speakers = meeting.speakers
    .filter((item) => item.type === "speaker")
    .map((item) => item.name);

  return (
    <article className="group relative flex items-center gap-4 rounded-xl bg-surface p-4 shadow-sm ring-1 ring-accent/10 transition hover:shadow-md hover:ring-accent/30 focus-within:ring-2 focus-within:ring-accent">
      <div
        className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-accent py-1.5 text-background"
        aria-hidden="true"
      >
        <span className="text-xs font-semibold uppercase tracking-wide">{month}</span>
        <span className="text-xl font-bold leading-none">{day}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-semibold">
            <Link
              href={`/meetings/${meeting.id}`}
              className="text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <time dateTime={meeting.date}>{formatMeetingDate(meeting.date)}</time>
            </Link>
          </h2>
          <MeetingTypeBadge type={meeting.meetingType} />
        </div>

        <p className="mt-1 truncate text-sm text-foreground/80">
          {speakers.length > 0
            ? `Speakers: ${speakers.join(", ")}`
            : `Conducting: ${meeting.conducting || "TBA"}`}
        </p>
      </div>

      {canManage && (
        <div className="flex flex-col items-end gap-2 text-sm">
          <Link href={`/meetings/${meeting.id}/edit`} className="font-semibold text-accent underline"
            aria-label={`Edit meeting on ${formatMeetingDate(meeting.date)}`}>Edit</Link>
          <form action={deleteMeeting.bind(null, meeting.id)}>
            <button type="submit" className="font-semibold text-red-700 underline"
              aria-label={`Delete meeting on ${formatMeetingDate(meeting.date)}`}>Delete</button>
          </form>
        </div>
      )}
    </article>
  );
}
