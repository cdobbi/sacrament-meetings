import { z } from "zod";

export const credentialsSchema = z.object({
    email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
    password: z.string().min(8).refine(
        (password) => Buffer.byteLength(password, "utf8") <= 72,
        "Password must be no more than 72 bytes.",
    ),
});
