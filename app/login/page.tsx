import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
    title: "Planner Sign In",
    description: "Sign in to manage sacrament meeting plans.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginPage() {
    return (
        <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
            <section className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-accent/10 sm:p-8">
                <h1 className="text-2xl font-bold text-accent">Planner Sign In</h1>
                <p className="mt-2 text-foreground/80">
                    Sign in to create and manage meetings.
                </p>
                <LoginForm />
                <p className="mt-4 text-sm">
                    Need an account?{" "}
                    <Link href="/register" className="font-semibold text-accent underline">
                        Create Account
                    </Link>
                </p>
            </section>
        </main>
    );
}
