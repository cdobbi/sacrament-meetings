import { Suspense, type ReactNode } from "react";
import MeetingsTabs, { MeetingsTabsList } from "@/components/MeetingsTabs";

export default function MeetingsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-1 flex-col">
            <div className="mx-auto w-full max-w-3xl px-4 pt-5 sm:px-6 print:hidden">
                <Suspense fallback={<MeetingsTabsList />}>
                    <MeetingsTabs />
                </Suspense>
            </div>
            {children}
        </div>
    );
}
