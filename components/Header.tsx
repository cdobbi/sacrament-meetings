import { io } from "next/cache";
import NavLinks from "./NavLinks";
import { WARD_TIME_ZONE } from "../lib/ward-date";
type HeaderProps = {
    wardName: string;
};

export default async function Header({ wardName }: HeaderProps) {
    await io();

    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: WARD_TIME_ZONE,
    });

    return (
        <header className="bg-surface px-6 py-4 print:hidden">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-2xl font-bold text-accent">
                    {wardName}
                </p>
                <p className="text-sm">{currentDate}</p>
                <NavLinks />
            </div>
        </header>
    );
}