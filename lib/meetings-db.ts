import type postgres from 'postgres';
import { getSql } from './db';
import type { SacramentMeeting } from './types';

export const ITEMS_PER_PAGE = 5;

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

export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>,
): Promise<SacramentMeeting> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements, opening_hymn,
      opening_prayer, ward_business, stake_business, sacrament_hymn,
      speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${data.date}::date, ${data.meetingType}, ${data.presiding}, ${data.conducting},
      ${data.announcements ?? []}::text[],
      ${sql.json({ ...data.openingHymn })}, ${data.openingPrayer},
      ${sql.json(data.wardBusiness.map((item) => ({ ...item })))}, ${data.stakeBusiness},
      ${sql.json({ ...data.sacramentHymn })},
      ${sql.json(data.speakers.map((item) => ({ ...item })))},
      ${sql.json({ ...data.closingHymn })}, ${data.closingPrayer}
    )
    RETURNING ${meetingColumns(sql)}
  `;
  return rows[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
  id: number,
  data: Omit<SacramentMeeting, 'id'>,
): Promise<SacramentMeeting | null> {
  const sql = getSql();
  const rows = await sql`
    UPDATE meetings SET
      date = ${data.date}::date, meeting_type = ${data.meetingType},
      presiding = ${data.presiding}, conducting = ${data.conducting},
      announcements = ${data.announcements ?? []}::text[],
      opening_hymn = ${sql.json({ ...data.openingHymn })},
      opening_prayer = ${data.openingPrayer},
      ward_business = ${sql.json(data.wardBusiness.map((item) => ({ ...item })))},
      stake_business = ${data.stakeBusiness},
      sacrament_hymn = ${sql.json({ ...data.sacramentHymn })},
      speakers = ${sql.json(data.speakers.map((item) => ({ ...item })))},
      closing_hymn = ${sql.json({ ...data.closingHymn })},
      closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
    RETURNING ${meetingColumns(sql)}
  `;
  return (rows[0] as unknown as SacramentMeeting | undefined) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`DELETE FROM meetings WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
