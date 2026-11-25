"use client";

import { useActionState } from "react";
import { register } from "@/lib/actions";

const inputClass = "mt-1 block w-full rounded-md border border-foreground/40 bg-surface px-3 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-accent";

export default function RegisterForm() {
    const [errorMessage, formAction, isPending] = useActionState(register, undefined);

    return (
        <form action={formAction} className="mt-6 space-y-4">
            <div>
                <label htmlFor="email" className="block font-medium">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
            </div>
            <div>
                <label htmlFor="password" className="block font-medium">Password</label>
                <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required className={inputClass} />
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block font-medium">Confirm password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required className={inputClass} />
            </div>
            <button type="submit" disabled={isPending}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-accent px-4 font-semibold text-background hover:bg-accent/90 disabled:cursor-wait disabled:opacity-70">
                {isPending ? "Creating account..." : "Create Account"}
            </button>
            {errorMessage && (
                <p role="alert" className="text-sm font-medium text-red-700">{errorMessage}</p>
            )}
        </form>
    );
}
