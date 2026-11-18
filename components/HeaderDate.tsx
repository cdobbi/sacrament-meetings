"use client";

import { useEffect, useState } from "react";
import { WARD_TIME_ZONE } from "../lib/ward-date";

export default function HeaderDate() {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        setCurrentDate(
            new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                timeZone: WARD_TIME_ZONE,
            }),
        );
    }, []);

    return (
        <span className="block text-xs text-foreground/80" suppressHydrationWarning>
            {currentDate}
        </span>
    );
}
