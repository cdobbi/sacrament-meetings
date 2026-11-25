import { readFile } from "node:fs/promises";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const sql = postgres(connectionString, { ssl: "require", max: 1 });
try {
  const schema = await readFile(new URL("./auth.sql", import.meta.url), "utf8");
  await sql.unsafe(schema);
  console.log("Account table is ready.");
} finally {
  await sql.end();
}
