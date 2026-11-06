import { formatMeetingDate } from "../lib/format-date";
import type { SacramentMeeting } from "../lib/types";

type MeetingDetailProps = {
    meeting: SacramentMeeting;
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    return (
        <article className="space-y-6 rounded-lg bg-surface p-6">
            <header>
                <h1 className="text-3xl font-bold text-accent">
                    Sacrament Meeting
                </h1>
                <p className="mt-2">
                    <time dateTime={meeting.date}>{formatMeetingDate(meeting.date)}</time>
                </p>
                <p className="capitalize">{meeting.meetingType} meeting</p>
                <p className="text-sm">Meeting #{meeting.id}</p>
            </header>

            <section>
                <h2 className="text-xl font-semibold">Leadership</h2>
                <p>Presiding: {meeting.presiding}</p>
                <p>Conducting: {meeting.conducting}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Announcements</h2>
                {meeting.announcements?.length ? (
                    <ul className="list-disc space-y-1 pl-5">
                        {meeting.announcements.map((announcement, index) => (
                            <li key={index}>{announcement}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No announcements.</p>
                )}
            </section>

            <section>
                <h2 className="text-xl font-semibold">Opening</h2>
                <p>
                    Opening hymn: #{meeting.openingHymn.number} —{" "}
                    {meeting.openingHymn.title}
                </p>
                <p>Opening prayer: {meeting.openingPrayer}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Ward Business</h2>
                {meeting.wardBusiness.length > 0 ? (
                    <ul className="list-disc space-y-1 pl-5">
                        {meeting.wardBusiness.map((item, index) => (
                            <li key={index}>{item.description}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No ward business.</p>
                )}
                <p className="mt-2">
                    Stake business: {meeting.stakeBusiness ? "Yes" : "No"}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Sacrament</h2>
                <p>
                    Sacrament hymn: #{meeting.sacramentHymn.number} —{" "}
                    {meeting.sacramentHymn.title}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold">
                    Speakers and Musical Numbers
                </h2>
                {meeting.speakers.length > 0 ? (
                    <ul className="space-y-3">
                        {meeting.speakers.map((item, index) => (
                            <li key={index}>
                                <p>
                                    <span className="font-semibold">
                                        {item.type === "musical-number"
                                            ? "Musical number"
                                            : "Speaker"}:
                                    </span>{" "}
                                    {item.name}
                                </p>
                                {item.topic && <p>{item.topic}</p>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No speakers or musical numbers listed.</p>
                )}
            </section>

            <section>
                <h2 className="text-xl font-semibold">Closing</h2>
                <p>
                    Closing hymn: #{meeting.closingHymn.number} —{" "}
                    {meeting.closingHymn.title}
                </p>
                <p>Closing prayer: {meeting.closingPrayer}</p>
            </section>
        </article>
    );
}