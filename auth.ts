import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";

const credentialsSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = credentialsSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const ownerEmail = process.env.AUTH_OWNER_EMAIL;
                const ownerPasswordHash = process.env.AUTH_OWNER_PASSWORD_HASH;

                if (!ownerEmail || !ownerPasswordHash) {
                    throw new Error(
                        "AUTH_OWNER_EMAIL and AUTH_OWNER_PASSWORD_HASH must be configured.",
                    );
                }

                const emailMatches =
                    parsed.data.email.trim().toLowerCase() ===
                    ownerEmail.trim().toLowerCase();
                const passwordMatches = await bcrypt.compare(
                    parsed.data.password,
                    ownerPasswordHash,
                );

                if (!emailMatches || !passwordMatches) return null;

                return {
                    id: "owner",
                    email: ownerEmail,
                    name: "Meeting Planner",
                };
            },
        }),
    ],
});
