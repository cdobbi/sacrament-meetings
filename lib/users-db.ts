import { getSql } from "./db";

type UserRecord = {
    id: number;
    email: string;
    passwordHash: string;
};

export async function getUserByEmail(email: string): Promise<UserRecord | null> {
    const sql = getSql();
    const rows = await sql<UserRecord[]>`
        SELECT id, email, password_hash AS "passwordHash"
        FROM planner_users
        WHERE email = ${email}
    `;
    return rows[0] ?? null;
}

export async function createUser(email: string, passwordHash: string): Promise<boolean> {
    const sql = getSql();
    const rows = await sql`
        INSERT INTO planner_users (email, password_hash)
        VALUES (${email}, ${passwordHash})
        ON CONFLICT (email) DO NOTHING
        RETURNING id
    `;
    return rows.length > 0;
}
