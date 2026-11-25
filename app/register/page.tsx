import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Create an account to manage sacrament meetings.",
    robots: { index: false, follow: false },
};

export default function RegisterPage() {
    return (
        <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
            <section className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-accent/10 sm:p-8">
                <h1 className="text-2xl font-bold text-accent">Create Account</h1>
                <RegisterForm />
                <p className="mt-4 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-accent underline">
                        Sign In
                    </Link>
                </p>
            </section>
        </main>
    );
}
