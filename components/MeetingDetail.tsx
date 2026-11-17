import type { ReactNode } from "react";
import { formatMeetingDate } from "../lib/format-date";
import type { Hymn, SacramentMeeting } from "../lib/types";
import MeetingTypeBadge from "./MeetingTypeBadge";

type MeetingDetailProps = {
    meeting: SacramentMeeting;
};

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="py-5 first:pt-0 last:pb-0 print:break-inside-avoid">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
                {title}
            </h2>
            {children}
        </section>
    );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-0.5 py-1.5 sm:flex-row sm:gap-4">
            <dt className="text-sm text-foreground/80 sm:w-40 sm:shrink-0">{label}</dt>
            <dd className="font-medium">{children}</dd>
        </div>
    );
}

function HymnText({ hymn }: { hymn: Hymn }) {
    return (
        <>
            <span className="mr-2 inline-block rounded bg-accent/10 px-1.5 text-sm font-semibold text-accent">
                #{hymn.number}
            </span>
            {hymn.title}
        </>
    );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    const isConference = meeting.meetingType === "stake" || meeting.meetingType === "general";
    const title =
        meeting.meetingType === "stake"
            ? "Stake Conference"
            : meeting.meetingType === "general"
                ? "General Conference"
                : "Sacrament Meeting";

    return (
        <article className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-accent/10 sm:p-8 print:p-0 print:shadow-none print:ring-0">
            <header className="mb-6 border-b border-accent/15 pb-6 text-center">
                <MeetingTypeBadge type={meeting.meetingType} />
                <h1 className="mt-2 text-2xl font-bold text-accent sm:text-3xl">{title}</h1>
                <p className="mt-1 text-foreground/80">
                    <time dateTime={meeting.date}>{formatMeetingDate(meeting.date)}</time>
                </p>
            </header>

            <div className="divide-y divide-accent/10">
                <Section title="Leadership">
                    <dl>
                        <Row label="Presiding">{meeting.presiding}</Row>
                        <Row label="Conducting">{meeting.conducting}</Row>
                    </dl>
                </Section>

                {meeting.announcements && meeting.announcements.length > 0 && (
                    <Section title="Announcements">
                        <ul className="list-disc space-y-1 pl-5">
                            {meeting.announcements.map((announcement, index) => (
                                <li key={index}>{announcement}</li>
                            ))}
                        </ul>
                    </Section>
                )}

                <Section title="Opening">
                    <dl>
                        <Row label="Opening hymn"><HymnText hymn={meeting.openingHymn} /></Row>
                        <Row label="Invocation">{meeting.openingPrayer}</Row>
                    </dl>
                </Section>

                {(meeting.wardBusiness.length > 0 || meeting.stakeBusiness) && (
                    <Section title="Business">
                        {meeting.wardBusiness.length > 0 && (
                            <ul className="list-disc space-y-1 pl-5">
                                {meeting.wardBusiness.map((item, index) => (
                                    <li key={index}>{item.description}</li>
                                ))}
                            </ul>
                        )}
                        {meeting.stakeBusiness && (
                            <p className="mt-2 text-sm text-foreground/80">Stake business will be conducted.</p>
                        )}
                    </Section>
                )}

                {!isConference && (
                    <Section title="Sacrament">
                        <dl>
                            <Row label="Sacrament hymn"><HymnText hymn={meeting.sacramentHymn} /></Row>
                        </dl>
                    </Section>
                )}

                <Section title={meeting.meetingType === "testimony" ? "Testimonies" : "Speakers & Music"}>
                    {meeting.speakers.length > 0 ? (
                        <ol className="space-y-3">
                            {meeting.speakers.map((item, index) => (
                                <li key={index} className="flex gap-3">
                                    <span
                                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent"
                                        aria-hidden="true"
                                    >
                                        {item.type === "musical-number"
                                            ? "♪"
                                            : meeting.speakers
                                                  .slice(0, index + 1)
                                                  .filter((s) => s.type === "speaker").length}
                                    </span>
                                    <div>
                                        <p className="font-medium">
                                            {item.name}
                                            {item.type === "musical-number" && (
                                                <span className="ml-2 text-sm font-normal text-foreground/80">
                                                    Musical number
                                                </span>
                                            )}
                                        </p>
                                        {item.topic && (
                                            <p className="text-sm text-foreground/80">{item.topic}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="text-foreground/80">
                            {meeting.meetingType === "testimony"
                                ? "Members are invited to bear testimony."
                                : "No speakers listed yet."}
                        </p>
                    )}
                </Section>

                <Section title="Closing">
                    <dl>
                        <Row label="Closing hymn"><HymnText hymn={meeting.closingHymn} /></Row>
                        <Row label="Benediction">{meeting.closingPrayer}</Row>
                    </dl>
                </Section>
            </div>
        </article>
    );
}
