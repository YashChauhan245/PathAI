# Path AI

Path AI is an AI-first career guidance workspace built with Next.js (App Router). It combines resume building, AI-generated cover letters, mock interview practice, interactive chat, and industry analytics to help professionals prepare for job search and career progression.

**Status:** production-ready README for interview / portfolio review.

**Key areas covered:** usage, tech stack, architecture, data model, security, deployment, and developer setup.

---

**Overview**

- **What:** Full-stack Next.js app that provides growth tools: resume builder (ATS optimization), cover letter generation, interview quizzes, industry insights, and an assistant chat.
- **Audience:** Job seekers, career coaches, and product teams that want structured career workflows.

**Live demo / owner**: Made by Yash Chauhan

---

**Features (by module)**

- **Landing:** Marketing pages, features, FAQ, testimonials, AI plan CTA.
- **Auth / Onboarding:** Email/password + OAuth (Google/GitHub) with onboarding flow to capture industry and skills.
- **Dashboard:** Industry insights, salary charts, and personalized recommendations.
- **Resume:** Resume editor, ATS optimization, save/load resume to DB.
- **Cover Letter:** AI-generated, editable cover letters saved to user account.
- **Interview Prep:** AI-generated quizzes, mock interview flow, assessment storage and improvement tips.
- **Chat:** Conversational AI assistant for roadmaps, resume feedback, and task suggestions.
- **Settings / Profile:** Manage preferences, workspace, and security options.

---

**Tech Stack**

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript / React 19
- **Styling:** Tailwind CSS (custom design tokens)
- **UI primitives:** Radix + shadcn-style components
- **Database / ORM:** PostgreSQL + Prisma (see [prisma/schema.prisma](prisma/schema.prisma#L1))
- **Auth:** next-auth (credentials + OAuth)
- **AI:** Google Gemini via `@google/generative-ai`
- **Background / Workers:** Inngest functions and webhooks
- **Charts / UI helpers:** Recharts, Sonner, Lucide icons

---

**Architecture & important files**

- **App entry & routing:** `app/` (Next.js App Router) — layouts, auth and main product routes.
- **Server actions & features:** `actions/` contains server-side action handlers (resume, cover-letter, interview, dashboard).
- **DB client:** `lib/prisma.js` (Prisma client pooling and reuse).
- **Auth handlers:** `auth.js` and `app/api/auth/[...nextauth]/route.js` (NextAuth setup).
- **Background tasks:** `lib/inngest/*` and `app/api/inngest/route.js` for scheduled enrichment (industry insights).
- **Prisma schema & migrations:** `prisma/schema.prisma` and `prisma/migrations/` (canonical data model for users, resumes, cover letters, assessments, industry insights).

Refer to these files for the implementation details: [package.json](package.json#L1), [prisma/schema.prisma](prisma/schema.prisma#L1), [app/layout.js](app/layout.js#L1), [lib/prisma.js](lib/prisma.js#L1).

---

**Data model (summary)**

- `User` — core profile (email, name, image, skills, industry, passwordHash)
- `Resume` — markdown content, ATS score, feedback
- `CoverLetter` — generated content, job/company metadata, status
- `Assessment` — saved quiz results, improvement tips
- `IndustryInsight` — salary ranges, growthRate, topSkills, trends

Full schema: [prisma/schema.prisma](prisma/schema.prisma#L1).

---

**Environment variables**

Create a `.env` file at project root. Minimum required variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
AUTH_SECRET="replace-with-a-strong-random-secret"
GEMINI_API_KEY="your-gemini-api-key"

# Optional (enable OAuth providers)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
```

Notes:

- `DATABASE_URL` is required for Prisma and migrations.
- `AUTH_SECRET` is used by NextAuth for signed cookies/JWT.
- Gemini API key is required for AI-driven features (resume improvements, cover letters, quizzes, insights).

---

**Local development**

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client (postinstall runs this automatically):

```bash
npx prisma generate
```

3. Run local migrations & dev DB (ensure `DATABASE_URL` points to your dev Postgres):

```bash
npx prisma migrate dev
npx prisma studio
```

4. Start dev server:

```bash
npm run dev
```

App runs at `http://localhost:3000` by default.

---

**Production / Deployment notes**

- Recommended platform: Vercel (Next.js first-class) + managed PostgreSQL (e.g., Neon, Supabase, Render managed DB).
- Before deploy:
  - Set all `ENV` variables in the platform settings.
  - Run `npx prisma migrate deploy` to apply schema migrations.
  - Ensure `AUTH_SECRET` is strong and unique.
  - Add OAuth callback URLs for Google/GitHub if those providers are used.

---

**Security & privacy notes**

- Passwords are hashed with `bcryptjs` before saving.
- Sensitive keys (Gemini API, DB URL, OAuth secrets) must never be committed to source.
- Consider rotating `AUTH_SECRET` and API keys regularly in production.

---

**Developer tips & known behaviors**

- The project uses server actions (files in `actions/`) to keep AI calls and DB updates server-side.
- `lib/prisma.js` exposes a singleton Prisma client for dev hot-reloads — keep this pattern to avoid connection storms.
- AI prompts are strict about returning JSON in some places; malformed AI responses may throw JSON.parse errors — add defensive parsing when adapting.
- Caching: several actions use `unstable_cache` and `revalidatePath` for performance and incremental updates.

---

**Useful commands**

- `npm run dev` — run dev server
- `npm run build` — build for production
- `npm run start` — start production server
- `npx prisma migrate dev` — run migrations locally
- `npx prisma migrate deploy` — apply migrations in production
- `npx prisma studio` — open DB admin UI

---

**Where to look for interview review**

- UI & routes: [app/](app#L1)
- Server actions: [actions/](actions#L1)
- DB model: [prisma/schema.prisma](prisma/schema.prisma#L1)
- Dev metadata & scripts: [package.json](package.json#L1)

---

If you want, I can:

- Run a static analysis to list potential runtime issues.
- Add a short CONTRIBUTING.md and a PR template.
- Prepare a one-page slide summarizing architecture for interviewers.

Made a concise, interviewer-friendly README and updated [README.md](README.md#L1) in the repository.

