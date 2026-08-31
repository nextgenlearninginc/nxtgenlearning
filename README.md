# NextGen Learning

> Empowering the Next Generation Through Free Education.

A production-quality marketing + enrollment website for **NextGen Learning**, a
nonprofit offering free online Math and English tutoring for elementary and
middle school students. Built with the Next.js 15 App Router, TypeScript,
Tailwind CSS, Framer Motion, and shadcn/ui.

---

## Highlights

- **Placement assessments** — two 15-question quizzes (Math & English) that ramp
  in difficulty, auto-score, and assign one of five levels with a polished
  results card.
- **Level carries over** — the assigned level is remembered and pre-fills the
  registration form.
- **Multi-step registration** — an animated, validated four-step enrollment flow.
- **Volunteer recruitment** — benefits section plus a validated application form
  with a resume-upload placeholder.
- **Fully responsive, accessible, dark-mode** — skip links, focus-visible rings,
  reduced-motion support, semantic markup.
- **SEO + Open Graph** metadata, favicon, web manifest, loading skeletons, and a
  custom 404.
- **Backend-ready** — every side effect flows through a single typed service
  layer, so adding Supabase/Firebase/Clerk/Resend/Google Calendar later means
  editing one folder.

## Tech stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
shadcn/ui (Radix primitives) · Lucide icons · next-themes.

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Email delivery (Contact / Register / Volunteer forms)

These three forms send a real email via [Resend](https://resend.com) to the
address in `src/lib/site.ts` (`siteConfig.email`).

1. Sign up free at resend.com (no credit card; 3,000 emails/month).
2. Dashboard → **API Keys** → **Create API Key** → copy it.
3. Copy `.env.example` to `.env.local` and paste the key into `RESEND_API_KEY`.
4. Restart `npm run dev`. Submit the Contact form — the email should land in
   your inbox within seconds (check spam the first time).
5. When deploying (see below), add the same `RESEND_API_KEY` in your host's
   environment variable settings.

Until you verify your own domain in Resend, keep `RESEND_FROM_EMAIL` as
`onboarding@resend.dev` — Resend rejects unverified custom "from" domains, but
this default can send to *any* inbox, including a personal Gmail.

## Hosting for free — Vercel

Vercel is built by the Next.js team and has a generous free tier that's a
perfect fit for a nonprofit site.

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → sign up with GitHub → **Add New
   Project** → select the repo → Vercel auto-detects Next.js → **Deploy**.
3. In the project's **Settings → Environment Variables**, add `RESEND_API_KEY`
   (and `RESEND_FROM_EMAIL` if you changed it) → redeploy.
4. Your free URL will look like `https://your-project-name.vercel.app`. Update
   `siteConfig.url` in `src/lib/site.ts` to match, then redeploy.
5. If you later buy a custom domain, add it under **Settings → Domains** —
   still free, you only pay the domain registrar.

Every future `git push` to your main branch auto-deploys.

## Scheduling sessions

This build doesn't include a scheduling backend (that's intentionally out of
scope for a static-first site). Two free options that plug in well:

- **Cal.com** (free tier) — create an event type per tutor/subject and embed
  or link it from your confirmation email after a registration comes in.
- **Google Calendar + Google Forms/Appointments** — free with any Google
  account; works well for a small volunteer roster.

A natural next step is a small internal dashboard (see "Planned dashboards" in
`src/lib/services/README.md`) that turns each registration/volunteer email
into a row you can actually schedule against — happy to help build that next.

## Project structure

```
src/
├── app/                     # App Router routes
│   ├── page.tsx             # Home
│   ├── about/ programs/ faq/ contact/ privacy/ terms/
│   ├── assessment/          # landing + [subject] dynamic quiz route
│   ├── register/            # multi-step registration
│   ├── volunteer/           # recruitment + application
│   ├── layout.tsx           # root shell, metadata, theme provider
│   ├── loading.tsx          # skeleton loading UI
│   └── not-found.tsx        # 404
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── layout/              # navbar, footer, logo
│   ├── home/                # hero, features, stats, testimonials, how-it-works
│   ├── shared/              # section, reveal, page-header, cta-band, level-ladder
│   ├── assessment/          # assessment-runner (quiz engine)
│   └── forms/               # contact, registration, volunteer
├── hooks/                   # use-assessment-level (persists across pages)
├── lib/
│   ├── data/                # levels, questions, testimonials, faqs, programs
│   ├── services/            # ← the backend boundary (all stubs)
│   ├── site.ts              # site config + navigation
│   └── utils.ts             # cn(), helpers
└── types/                   # shared TypeScript types
```

## The service layer (how to add a backend)

The entire app depends only on the typed functions in `src/lib/services/`.
They currently return fake successful results. To go live, replace the bodies —
no component changes required.

| Function               | Today   | Suggested provider          |
| ---------------------- | ------- | --------------------------- |
| `submitRegistration`   | stub    | Supabase / Firebase (DB)    |
| `submitVolunteer`      | stub    | Supabase + Storage (resume) |
| `submitContactMessage` | stub    | Resend / serverless route   |
| `getCurrentUser`       | `null`  | Clerk                       |

Planned dashboards (student / tutor / admin), attendance, and volunteer-hour
tracking are described in `src/lib/services/README.md`. Route stubs and role
mapping live in `src/lib/services/auth.ts`.

## Design system

- **Brand colors:** primary blue `#2563EB`, secondary emerald `#10B981`, on
  white / slate neutrals, with a signature blue→emerald gradient.
- **Type:** Bricolage Grotesque (display) + Inter (body) via `next/font`.
- **Motif:** the "skill-level ladder" (`LevelLadder`) reinforces the core idea
  that students are grouped by level, not age.
- Tokens live in `tailwind.config.ts` and `src/app/globals.css` (light + dark).

## Accessibility & performance

Server components by default, client components only where interactivity is
needed. Skip-to-content link, keyboard-navigable controls, `aria` attributes,
`prefers-reduced-motion` handling throughout, and semantic headings.

## Notes

- Placeholder statistics, testimonials, and legal copy are included for demo
  purposes. Replace with real content before launch, and have counsel review the
  Privacy Policy and Terms.
- `public/og.png` is a generated placeholder social card.

---

Built as a deployable starting point — clean architecture over shortcuts.
