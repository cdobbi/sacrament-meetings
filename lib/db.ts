import postgres from "postgres";

const globalForDb = globalThis as typeof globalThis & {
    meetingsSql?: postgres.Sql;
};

export function getSql(): postgres.Sql {
    if (!globalForDb.meetingsSql) {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error("DATABASE_URL is not set in .env.local.");
        }
        globalForDb.meetingsSql = postgres(connectionString, {
            ssl: "require",
            max: 5,
            idle_timeout: 20,
        });
    }
    return globalForDb.meetingsSql;
}
