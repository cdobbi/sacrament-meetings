import { connection } from "next/server";
import { WARD_TIME_ZONE } from "../lib/ward-date";

export default async function HeaderDate() {
    await connection();
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: WARD_TIME_ZONE,
    });

    return (
        <span className="block text-xs text-foreground/80">
            {currentDate}
        </span>
    );
}
