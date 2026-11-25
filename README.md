This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Database (Render PostgreSQL)

Meeting data is stored in a PostgreSQL database hosted on Render and accessed
with the [`postgres`](https://github.com/porsager/postgres) package.

1. Copy the **External Database URL** from the Render database's **Connect** panel.
2. Add it to a root `.env.local` file (never commit this file):

   ```
   DATABASE_URL=postgresql://user:password@host.oregon-postgres.render.com/sacrament_meetings
   ```

3. Create the `meetings` table and load sample data:

   ```bash
   npm run db:seed
   ```

   The script runs `db/seed.sql`. Existing dates are skipped, so it is safe to
   run more than once. The same SQL can also be run in pgAdmin or `psql`.

When deploying, set `DATABASE_URL` in the host's environment settings. On a
Render web service in the same region, the **Internal Database URL** can be used.

The current meeting link uses the most recent Sunday in the ward's time zone and
displays a message when no record exists for that date. Open a meeting and select
**Print program** to print its agenda without the site navigation.

## Authentication

The meeting planner uses Auth.js Credentials and stores account email addresses
and bcrypt password hashes in Render PostgreSQL. Create the account table with
`npm run db:init-auth` (this does not seed meeting data). Add the following
values to `.env.local`:

```text
AUTH_SECRET=<generated secret>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Keep passwords and `AUTH_SECRET` out of the repository. Generate a unique
`AUTH_SECRET` for each deployment, and set it in the host's environment.

Anyone can create an account from the sign-in page, and every signed-in account
can create, edit, and delete meetings. The public meeting schedules remain
available without signing in.
`/meetings/new` and `/meetings/:id/edit` redirect unauthenticated visitors to
`/login`. Signed-in users can use the Planner navigation to create meetings,
Edit/Delete controls to manage meetings, and Sign Out from the planner layout.
Create, update, and delete Server Actions independently verify the session
before changing the database.

Set `NEXT_PUBLIC_SITE_URL` to the deployed site origin so Open Graph image URLs
use the production hostname.


## Acknowledgments

Developed with assistance from GitHub Copilot (AI coding assistant).

## Deploy via URL from Render
