# Awesome Greetings By Dioame

A microservice to create and share beautiful, time-limited greetings. Built with **Next.js**, **Node**, and **Turso** (libSQL), deployable on **Vercel**.

## Features

- **Greetings library** – Multiple design types: Swipable Book, Card Flip, Reveal & Unveil, Confetti Burst, Minimal Elegant, Photo Frame, Typewriter
- **Create greeting** – Pick a design, add recipient and message, get a unique shareable link
- **Professional link page** – Each link opens a polished, design-specific view for the recipient
- **Auth** – Email/password registration and Google login (NextAuth.js)
- **3-day expiry** – Links expire after 3 days and are removed from the database (cron cleanup)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Turso (libSQL / SQLite)
- **Auth:** NextAuth.js (Credentials + Google)
- **Deploy:** Vercel

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Use Turso (recommended)

This app uses **Turso** (libSQL) as the database. To use Turso:

1. **Install Turso CLI** (optional, for creating the DB):  
   [Install guide](https://docs.turso.tech/cli/installation)  
   Or use the [Turso dashboard](https://turso.tech/app).

2. **Create a database** (if using CLI):
   ```bash
   turso auth login
   turso db create greetings-db
   turso db show greetings-db
   ```
   Copy the **URL** (e.g. `libsql://greetings-db-xxx.turso.io`).

3. **Create an auth token**:
   ```bash
   turso db tokens create greetings-db
   ```
   Copy the token and keep it secret.

4. **Set env vars** in `.env.local`:
   ```env
   TURSO_DATABASE_URL=libsql://greetings-db-xxx.turso.io
   TURSO_AUTH_TOKEN=your-token-here
   ```

Without these, the app falls back to a local file (`file:local.db`) for development.

### 3. Other environment variables

Copy `.env.example` to `.env.local` and fill in:

- **NEXTAUTH_URL** – App URL (e.g. `http://localhost:3000` or `https://your-app.vercel.app`)
- **NEXTAUTH_SECRET** – Random secret for sessions (e.g. `openssl rand -base64 32`)
- **GOOGLE_CLIENT_ID** / **GOOGLE_CLIENT_SECRET** – For Google login (optional). In [Google Cloud Console](https://console.cloud.google.com/apis/credentials) add this **Authorized redirect URI**: `http://localhost:3000/api/auth/callback/google` (and your production URL + `/api/auth/callback/google` when deploying).
- **CRON_SECRET** – Secret for Vercel cron to call cleanup (optional)

### 4. Database

With `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` set (or using `file:local.db`), apply schema and seed:

```bash
npm run db:push
npm run db:seed
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Register or sign in, then create a greeting from the dashboard.

## Deploy on Vercel

1. Push the repo to GitHub and import the project in Vercel.
2. Set all env vars in the Vercel project (including `NEXTAUTH_URL` = your production URL).
3. For Turso, use your Turso URL and auth token.
4. Optional: set **CRON_SECRET** and in Vercel Cron add a secret header `Authorization: Bearer <CRON_SECRET>` for `/api/cron/cleanup` (or use Vercel’s cron auth).
5. After first deploy, run schema + seed once (e.g. via Turso CLI or a one-off script):

   ```bash
   TURSO_DATABASE_URL="..." TURSO_AUTH_TOKEN="..." npm run db:push
   TURSO_DATABASE_URL="..." TURSO_AUTH_TOKEN="..." npm run db:seed
   ```

## Scripts

| Script           | Description                    |
|------------------|--------------------------------|
| `npm run dev`    | Start Next.js dev server       |
| `npm run build`  | Production build               |
| `npm run start`  | Start production server        |
| `npm run db:push`| Apply Turso schema             |
| `npm run db:seed`| Seed greeting design library   |
| `npm run db:cleanup` | Delete expired greetings (optional local run) |

## Greeting types (designs)

| Type            | Description                                  |
|-----------------|----------------------------------------------|
| Swipable Book   | Turn “pages” to reveal the message           |
| Card Flip       | Flip card to reveal content                  |
| Reveal & Unveil | Curtain lifts to show the message            |
| Confetti Burst  | Celebratory confetti and message             |
| Minimal Elegant | Clean, typography-focused layout            |
| Photo Frame     | Message in a classic frame                   |
| Typewriter      | Message appears with a typewriter effect     |

## Link expiry and cleanup

- Each greeting link **expires 3 days** after creation.
- Expired links return a “no longer available” style response.
- **Vercel Cron** is configured to hit `/api/cron/cleanup` daily to delete expired rows. Protect this route with `CRON_SECRET` (e.g. `Authorization: Bearer <CRON_SECRET>`).

---

**Awesome Greetings By Dioame** – create and share short-lived, beautiful greetings.
