import { meetingTypeBadgeClasses, meetingTypeLabels } from "../lib/meeting-type";
import type { MeetingType } from "../lib/types";

export default function MeetingTypeBadge({ type }: { type: MeetingType }) {
    return (
        <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${meetingTypeBadgeClasses[type] ?? "bg-surface"}`}
        >
            {meetingTypeLabels[type] ?? type}
        </span>
    );
}
