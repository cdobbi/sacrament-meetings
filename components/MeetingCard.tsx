import Link from "next/link";
import { formatMeetingDate } from "../lib/format-date";
import type { SacramentMeeting } from "../lib/types";
import MeetingTypeBadge from "./MeetingTypeBadge";

type MeetingCardProps = {
  meeting: SacramentMeeting;
};

function dateParts(date: string) {
  const value = new Date(`${date}T00:00:00Z`);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(value);
  return { month: part({ month: "short" }), day: part({ day: "numeric" }) };
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
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
              className="text-foreground after:absolute after:inset-0 after:rounded-xl focus:outline-none"
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

      <span
        className="text-xl text-accent transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      >
        ›
      </span>
    </article>
  );
}
