import Footer from "../components/Footer";
import Header from "../components/Header";
import { Suspense } from "react";
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
    title: "Mtn. View 2nd Ward | Sacrament Meetings",
    description: "Sacrament meeting schedules and agendas for Mtn. View 2nd Ward.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Suspense fallback={<header className="bg-surface px-6 py-4">Loading header...</header>}>
                    <Header wardName="Mtn. View 2nd Ward" />
                </Suspense>
                {children}
                <Footer />
            </body>
        </html>
    );
}
