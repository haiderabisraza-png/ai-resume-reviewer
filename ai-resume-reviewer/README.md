# ResumeAI — AI Resume Reviewer

An AI-powered resume reviewer SaaS built with Next.js 15, TypeScript, Prisma, PostgreSQL, Auth.js v5, Tailwind CSS, and OpenAI.

## Features

- 🔐 Authentication (credentials + Google OAuth)
- 📄 PDF upload and text extraction
- 🤖 AI-powered resume analysis (GPT-4o-mini)
- 🎯 ATS score, strengths, weaknesses, improvements
- 📋 Job description matching
- 📊 Dashboard with charts and analytics
- 📁 Review history

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Auth.js v5 (NextAuth)
- **Database**: PostgreSQL + Prisma ORM
- **AI**: OpenAI GPT-4o-mini
- **PDF**: pdf-parse
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Toasts**: Sonner

## Setup

### 1. Clone and Install

```bash
git clone <repo>
cd ai-resume-reviewer
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/ai_resume_reviewer"
AUTH_SECRET="run: openssl rand -base64 32"
AUTH_URL="http://localhost:3000"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
OPENAI_API_KEY="sk-your-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# Seed demo user (optional)
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

Demo credentials (after seeding):
- Email: `demo@example.com`
- Password: `password123`

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` as redirect URI
6. Copy Client ID and Secret to `.env`

## Deployment (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Add all environment variables
4. Deploy

For production, use a managed PostgreSQL (Neon, Supabase, Railway).

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, Register pages
│   ├── (dashboard)/     # Dashboard, Upload, Reviews, Analysis
│   ├── api/auth/        # NextAuth route handler
│   └── globals.css
├── components/
│   ├── auth/            # LoginForm, RegisterForm
│   ├── dashboard/       # Sidebar, TopBar, ScoreChart, DeleteResumeButton
│   └── forms/           # UploadForm
├── lib/
│   ├── auth.ts          # NextAuth config
│   ├── openai.ts        # OpenAI client + prompts
│   ├── pdf.ts           # PDF extraction
│   ├── prisma.ts        # Prisma client
│   ├── utils.ts         # Helpers
│   └── validations/     # Zod schemas
├── actions/             # Server Actions
├── types/               # TypeScript types
├── constants/           # App constants
└── middleware.ts        # Route protection
```
