# Path AI

Path AI is an AI-powered career guidance platform built with Next.js App Router.
It helps users plan career growth with practical tools for resume building, AI cover letters, mock interviews, market insights, and an assistant chat workspace.

## Highlights

- Resume builder with ATS scoring and feedback
- AI-generated cover letters with editable drafts
- Interview preparation with mock quizzes and result tracking
- Dashboard with industry insights and salary range visualization
- Path AI chat for roadmap, skill-gap, and planning support
- Secure authentication (credentials + optional Google/GitHub OAuth)
- Dark, premium SaaS UI system with responsive navigation

## Tech Stack

- Framework: Next.js 15 (App Router, Turbopack in dev)
- Language: JavaScript (React 19)
- Styling: Tailwind CSS + custom design tokens
- UI Primitives: shadcn/ui + Radix UI
- Database ORM: Prisma
- Database: PostgreSQL
- Auth: NextAuth v5 beta
- AI: Google Gemini API
- Charts: Recharts
- Notifications: Sonner
- Background workflows: Inngest

## Project Structure

```text
app/
  (auth)/                 # auth pages (sign-in, sign-up)
  (main)/                 # main product area (dashboard, chat, resume, interview, settings)
  api/                    # route handlers (auth, inngest)
actions/                  # server actions for AI + dashboard + auth logic
components/               # shared components and UI primitives
data/                     # static content for landing page
lib/                      # db client, helpers, schema, inngest client
prisma/                   # schema + migrations
public/                   # static assets
```

## Features by Module

### Landing

- Product overview and workflow explanation
- Features, testimonials, FAQ, and AI plan CTA

### Dashboard

- Market outlook, demand level, growth indicators
- Salary range chart by role
- Key industry trends + recommended skills

### Resume

- Resume content generation/editing
- ATS score and AI feedback support

### Cover Letter

- Generate tailored cover letters by job/company
- Save and manage drafts

### Interview

- Mock interview/quiz flows
- Result breakdown and performance tracking

### Chat

- Conversational assistant with quick prompts
- Career roadmap and execution planning

### Settings

- Profile, notifications, and workspace preference UI

## Environment Variables

Create a `.env` file in the project root.

```env
# Required
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
AUTH_SECRET="replace-with-a-strong-random-secret"
GEMINI_API_KEY="your-gemini-api-key"

# Optional OAuth providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
```

Notes:

- `DATABASE_URL` is required by Prisma.
- `AUTH_SECRET` is used by NextAuth/JWT.
- OAuth providers are optional and enabled only when values are provided.

## Local Setup

1. Install dependencies

```bash
npm install
```

1. Configure environment variables

- Create `.env` using the template above.

1. Run database migrations

```bash
npx prisma migrate dev
```

1. Start development server

```bash
npm run dev
```

1. Open app

- `http://localhost:3000`

## Scripts

- `npm run dev` - Start development server (Turbopack)
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run Next.js ESLint checks

## Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Apply existing migrations in production-like flow
npx prisma migrate deploy
```

## Authentication Flow

- Credentials sign-in validates hashed passwords (`bcryptjs`)
- OAuth sign-in (`Google`, `GitHub`) auto-upserts user records
- Session strategy is JWT-based
- Route protection handled in middleware and auth checks

## Deployment

Recommended: Vercel + managed PostgreSQL.

Production checklist:

1. Set all required environment variables in deployment platform.
1. Run Prisma migrations (`prisma migrate deploy`).
1. Ensure `AUTH_SECRET` is strong and unique.
1. Verify OAuth callback URLs when Google/GitHub auth is enabled.

## License

This project is for educational and portfolio use unless otherwise specified by the repository owner.
