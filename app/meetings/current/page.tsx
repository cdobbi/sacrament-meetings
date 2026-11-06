import { io } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getMeetings } from "../../../lib/meetings-db";
import Loading from "../loading";

export default function CurrentMeetingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CurrentMeetingRedirect />
    </Suspense>
  );
}

async function CurrentMeetingRedirect() {
  await io();

  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, "0");
  const day = String(sunday.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;

  const meeting = getMeetings(date)[0];

  return redirect(meeting ? `/meetings/${meeting.id}` : "/meetings");
}
