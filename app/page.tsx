import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background px-4 py-10 sm:px-6 sm:py-14">
      <section className="flex w-full max-w-3xl flex-col items-center gap-8 rounded-2xl border border-accent/15 bg-surface px-6 py-10 text-center shadow-sm sm:px-12">
        <Image
          className="h-auto w-full max-w-[378px] rounded-lg"
          src="/meetinghouse.webp"
          alt="Brick meetinghouse with white columns and a tall white steeple"
          width={378}
          height={247}
          loading="eager"
          fetchPriority="high"
        />
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-accent">
            Welcome to Mtn. View 2nd Ward
          </h1>
          <p className="max-w-md text-lg leading-8 text-foreground">
            Find sacrament meeting schedules, hymns, speakers, and announcements.
          </p>
        </div>
        <Link
          href="/meetings"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 font-medium text-background transition-colors hover:bg-accent/90"
        >
          View Meetings
        </Link>
      </section>
    </main>
  );
}
