import postgres from 'postgres';
import type { SacramentMeeting } from './types';

export const ITEMS_PER_PAGE = 5;

// Reuse one pool across dev hot reloads so connections aren't leaked.
const globalForDb = globalThis as unknown as { meetingsSql?: postgres.Sql };

// Created lazily so builds and imports don't fail before env vars are available.
function getSql(): postgres.Sql {
  if (!globalForDb.meetingsSql) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set in .env.local.');
    }
    globalForDb.meetingsSql = postgres(connectionString, {
      ssl: 'require',
      max: 5,
      idle_timeout: 20,
    });
  }
  return globalForDb.meetingsSql;
}

const meetingColumns = (sql: postgres.Sql) => sql`
  id,
  to_char(date, 'YYYY-MM-DD') AS "date",
  meeting_type                AS "meetingType",
  presiding, conducting, announcements,
  opening_hymn                AS "openingHymn",
  opening_prayer              AS "openingPrayer",
  ward_business               AS "wardBusiness",
  stake_business              AS "stakeBusiness",
  sacrament_hymn              AS "sacramentHymn",
  speakers,
  closing_hymn                AS "closingHymn",
  closing_prayer              AS "closingPrayer"
`;

function toSearchPattern(query: string): string {
  const escaped = query.trim().replace(/[\\%_]/g, (char) => `\\${char}`);
  return `%${escaped}%`;
}

function toPageNumber(page: number): number {
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export async function getMeetings(
  query: string = '',
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const searchTerm = toSearchPattern(query);
  const offset = (toPageNumber(currentPage) - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT ${meetingColumns(sql)}
    FROM meetings
    WHERE
      presiding       ILIKE ${searchTerm}
      OR conducting   ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR EXISTS (
        SELECT 1 FROM jsonb_array_elements(speakers) AS s
        WHERE s->>'name' ILIKE ${searchTerm}
      )
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query: string = ''): Promise<number> {
  const sql = getSql();
  const searchTerm = toSearchPattern(query);

  const rows = await sql`
    SELECT COUNT(*) AS count
    FROM meetings
    WHERE
      presiding       ILIKE ${searchTerm}
      OR conducting   ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR EXISTS (
        SELECT 1 FROM jsonb_array_elements(speakers) AS s
        WHERE s->>'name' ILIKE ${searchTerm}
      )
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getAllMeetings(): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT ${meetingColumns(sql)}
    FROM meetings
    ORDER BY date DESC
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingByDate(date: string): Promise<SacramentMeeting | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT ${meetingColumns(sql)}
    FROM meetings
    WHERE date = ${date}::date
  `;
  return (rows[0] as unknown as SacramentMeeting | undefined) ?? null;
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  // SERIAL ids are 32-bit; larger values can't exist and would error in Postgres.
  if (!Number.isSafeInteger(id) || id < 1 || id > 2_147_483_647) return null;

  const sql = getSql();
  const rows = await sql`
    SELECT ${meetingColumns(sql)}
    FROM meetings
    WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting | undefined) ?? null;
}

// Mutation stubs Ã¢â‚¬â€ will be wired to the database in Week 04
/* eslint-disable @typescript-eslint/no-unused-vars */
export async function addMeeting(
  _data: Omit<SacramentMeeting, 'id'>,
): Promise<SacramentMeeting> {
  throw new Error('addMeeting: database implementation coming in Week 04');
}

export async function updateMeeting(
  _id: number,
  _updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  throw new Error('updateMeeting: database implementation coming in Week 04');
}

export async function deleteMeeting(_id: number): Promise<boolean> {
  throw new Error('deleteMeeting: database implementation coming in Week 04');
}
