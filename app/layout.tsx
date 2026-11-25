import Footer from "../components/Footer";
import Header from "../components/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: {
        default: "Mtn. View 2nd Ward | Sacrament Meetings",
        template: "%s | Mtn. View 2nd Ward",
    },
    description: "Sacrament meeting schedules and agendas for Mtn. View 2nd Ward.",
    openGraph: {
        title: "Mtn. View 2nd Ward Sacrament Meetings",
        description:
            "Sacrament meeting schedules and agendas for Mtn. View 2nd Ward.",
        images: [
            {
                url: "/meetinghouse.webp",
                width: 378,
                height: 247,
                alt: "Mtn. View 2nd Ward meetinghouse",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Mtn. View 2nd Ward Sacrament Meetings",
        description:
            "Sacrament meeting schedules and agendas for Mtn. View 2nd Ward.",
        images: ["/meetinghouse.webp"],
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Header wardName="Mtn. View 2nd Ward" />
                {children}
                <Footer />
            </body>
        </html>
    );
}
