# 🚀 Path AI — AI-First Career Guidance Workspace

🚀 **Live Application:** [https://mypath-ai.vercel.app](https://mypath-ai.vercel.app)

Path AI is a comprehensive, production-ready, AI-driven career guidance workspace designed to accelerate professional job search and career progression. Built on Next.js 15 (App Router), it leverages Google Gemini to deliver tailored resume optimization, AI-generated cover letters, realistic mock interviews, interactive conversational assistant chat, and real-time industry/salary analytics.

---

## 📖 Table of Contents
- [📌 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📂 Architecture & Folder Structure](#-architecture--folder-structure)
- [📊 Database Schema & Data Model](#-database-schema--data-model)
- [⚙️ Environment Variables](#-environment-variables)
- [🚀 Local Development Setup](#-local-development-setup)
- [🌐 Production Deployment & OAuth Setup](#-production-deployment--oauth-setup)
- [🛡️ Security & Best Practices](#-security--best-practices)

---

## 📌 Overview
Path AI combines modern AI models with a sleek, interactive user experience to simplify and automate key parts of the job application pipeline. It solves standard job seeker problems (lack of tailored resumes, generic cover letters, and interview anxiety) by acting as an intelligent agent that keeps track of the user's industry, skills, and past performance.

---

## ✨ Key Features
* **🎯 Interactive Onboarding:** Collects user profile details, industry focus, experience levels, and skills to personalize all AI actions.
* **📊 Analytics Dashboard:** Displays live industry insights, salary trends (via Recharts), growth rates, and dynamic career recommendation cards.
* **📝 ATS-Optimized Resume Builder:** Enables users to edit resumes, check real-time ATS optimization scores, and get actionable suggestions.
* **✉️ AI Cover Letter Generator:** Instantly generates tailored, high-converting cover letters based on specific job descriptions and user profiles.
* **🎙️ Mock Interview Prep:** Interactive quizzes and situational practice flows with immediate AI evaluations, feedback, and improvement metrics.
* **💬 Career Assistant Chat:** A context-aware chatbot offering career advice, resume reviews, roadmap generation, and task suggestions.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) | Server-side rendering, API routes, and App router patterns. |
| **Library** | React 19 / Javascript | Core UI component lifecycle and DOM manipulation. |
| **Database** | PostgreSQL | Relational database storage (hosted on Neon). |
| **ORM** | Prisma | Typesafe database schema modeling and queries. |
| **Authentication** | Auth.js (NextAuth.js v5) | Credentials-based email/password & OAuth (Google/GitHub). |
| **AI Integration** | Google Gemini API (`@google/generative-ai`) | Generates resume feedback, cover letters, mock interviews, and advice. |
| **Workflow Engine** | Inngest | Manages background jobs and event-driven updates. |
| **Styling** | Tailwind CSS & Tailwind Animate | Responsive grid system, premium styling, and animations. |
| **UI Components** | Radix UI + Lucide Icons | Accessible headless primitives and modern vector iconography. |

---

## 📂 Architecture & Folder Structure

* **`app/`** — Next.js App Router folders containing the pages, layouts, and route handlers.
  * **`api/`** — Backend endpoints, including next-auth (`api/auth/[...nextauth]`) and background tasks (`api/inngest`).
* **`actions/`** — Server Actions containing backend logic (Resume, Cover Letter, Quizzes) separating DB mutations/AI calls from client components.
* **`components/`** — Reusable UI modules (buttons, models, dashboard widgets) styled with Tailwind CSS.
* **`prisma/`** — The [schema.prisma](prisma/schema.prisma) configuration file, detailing tables, database relations, and migrations.
* **`lib/`** — Shareable utility classes and helper configurations (e.g. database client pooler [prisma.js](lib/prisma.js) and [inngest/](lib/inngest) routines).
* **`middleware.js`** — Intercepts and guards routes (`/dashboard`, `/resume`, `/interview`, etc.) ensuring only authenticated sessions pass.

---

## 📊 Database Schema & Data Model
Path AI leverages a PostgreSQL relational database structured as follows:

* **`User`** — Profile fields (`email`, `name`, `image`, `skills`, `industry`, `experience`).
* **`Resume`** — Markdown content, calculated ATS optimization score, and AI feedback.
* **`CoverLetter`** — Saved cover letter documents, target company information, and job description.
* **`Assessment`** — Historic record of AI-graded mock interviews, quiz scores, and actionable feedback.
* **`IndustryInsight`** — Cached salary averages, market growth indicators, high-demand skills, and trends.

For details, view the complete schema file: [prisma/schema.prisma](prisma/schema.prisma).

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Database Connection (Postgres)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?sslmode=require"

# Auth.js / NextAuth Configuration
AUTH_SECRET="your-32-byte-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"

# AI Integration
GEMINI_API_KEY="your-google-gemini-api-key"

# Optional OAuth Client Credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

---

## 🚀 Local Development Setup

Follow these steps to run Path AI locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YashChauhan245/Path_AI.git
   cd Path_AI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Migration:**
   Ensure your local/development database is active and `DATABASE_URL` is set in `.env`, then run:
   ```bash
   npx prisma migrate dev
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Production Deployment & OAuth Setup

Path AI is optimized for deployment on **Vercel** with a hosted database (such as **Neon**).

### Crucial Post-Deployment Steps:
1. **Set Environment Variables:**
   Ensure all production keys listed in [Environment Variables](#-environment-variables) are defined in your deployment settings. Set `AUTH_URL` to `https://<your-domain>/api/auth`.
2. **Database Migration:**
   Apply any pending database schema migrations in production by running:
   ```bash
   npx prisma migrate deploy
   ```
3. **Configure OAuth Redirect URIs:**
   * **Google:** Register `https://<your-domain>/api/auth/callback/google` in the Authorized Redirect URIs on the [Google Cloud Console](https://console.cloud.google.com/).
   * **GitHub:** Register `https://<your-domain>/api/auth/callback/github` as the Authorization Callback URL in your [GitHub Developer settings](https://github.com/settings/developers).

---

## 🛡️ Security & Best Practices
* **Password Hashing:** User passwords are encrypted using `bcryptjs` before insertion into the database.
* **Route Protection:** Handled via Next.js Edge Middleware ([middleware.js](middleware.js)) verifying JWT signatures.
* **Environment Integrity:** Hardcoded API keys are forbidden. All credentials must be sourced strictly from environment variables.
