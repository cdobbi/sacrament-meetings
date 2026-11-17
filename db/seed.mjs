// Usage: npm run db:seed  (reads DATABASE_URL from .env.local)
import { readFile } from 'node:fs/promises';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set in .env.local');
  process.exit(1);
}

const sql = postgres(connectionString, { ssl: 'require', max: 1 });

try {
  const seed = await readFile(new URL('./seed.sql', import.meta.url), 'utf8');
  await sql.unsafe(seed);
  const [{ count }] = await sql`SELECT COUNT(*) AS count FROM meetings`;
  console.log(`Seed complete. meetings table has ${count} rows.`);
} finally {
  await sql.end();
}
