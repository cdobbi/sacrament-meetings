"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <form action={formAction} className="mt-6 space-y-4">
            <div>
                <label htmlFor="email" className="block font-medium">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full rounded-md border border-foreground/40 bg-surface px-3 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-accent"
                />
            </div>
            <div>
                <label htmlFor="password" className="block font-medium">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    minLength={8}
                    required
                    className="mt-1 block w-full rounded-md border border-foreground/40 bg-surface px-3 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-accent"
                />
            </div>
            <input type="hidden" name="redirectTo" value="/meetings/new" />
            <button
                type="submit"
                aria-disabled={isPending}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-accent px-4 font-semibold text-background hover:bg-accent/90 disabled:cursor-wait disabled:opacity-70"
            >
                {isPending ? "Signing in..." : "Sign In"}
            </button>
            {errorMessage && (
                <p role="alert" className="text-sm font-medium text-red-700">
                    {errorMessage}
                </p>
            )}
        </form>
    );
}
