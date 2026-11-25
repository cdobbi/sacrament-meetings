import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { credentialsSchema } from "./lib/credentials";
import { getUserByEmail } from "./lib/users-db";

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = credentialsSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const user = await getUserByEmail(parsed.data.email);
                if (!user) return null;
                const passwordMatches = await bcrypt.compare(
                    parsed.data.password,
                    user.passwordHash,
                );

                if (!passwordMatches) return null;

                return {
                    id: String(user.id),
                    email: user.email,
                };
            },
        }),
    ],
});
