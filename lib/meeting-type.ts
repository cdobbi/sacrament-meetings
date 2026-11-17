import type { MeetingType } from "./types";

export const meetingTypeLabels: Record<MeetingType, string> = {
    regular: "Regular",
    testimony: "Fast & Testimony",
    stake: "Stake Conference",
    general: "General Conference",
    special: "Special",
};

export const meetingTypeBadgeClasses: Record<MeetingType, string> = {
    regular: "bg-teal-100 text-teal-900",
    testimony: "bg-amber-100 text-amber-900",
    stake: "bg-indigo-100 text-indigo-900",
    general: "bg-violet-100 text-violet-900",
    special: "bg-rose-100 text-rose-900",
};
