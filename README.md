# Think Tank Solutions AI

The TerraForm Sovereign AI Platform: a premium marketplace connecting clients with vetted AI agencies and creators through the Brand Symphony Arrangement Method™.

## Run

```bash
npm install
npm run dev
npm run build
```

## Product surfaces

- **The Overture** — narrative landing page with a real Three.js node network and heartbeat waveform.
- **The Audience** — pain-led onboarding, searchable directory, filters, favorites, provider profiles, scheduling, and demo checkout.
- **The First Chair** — provider metrics, service CRUD, Resonance responses, social connections, and SEO readiness.
- **The Maestro** — MRR overview, provider approval/suspension, sponsored placement ordering, and review moderation.
- **The Open Score** — repository interface, pull-request discovery, and Fee-Free contributor leaderboard.

## Architecture

React + TypeScript + Vite + Tailwind CSS + Three.js. Product surfaces live in `src/pages`, reusable interface components in `src/components`, typed demonstration data in `src/data`, and production integration seams in `src/services`. Hash routing keeps every product route reachable on static hosting.

This delivery is **frontend-only**. Authentication, payment, social sync, submission, and booking flows are demonstrations. Favorites and onboarding details are stored in this browser's localStorage only; they do not sync across devices and disappear when browser data is cleared. Stripe, Supabase, and Google OAuth can be connected behind `src/services/platform.ts` without redesigning the UI.

## Methodology and intellectual property

The three-movement structure, five-agent mapping (Lead Capture, Scheduling, Follow-up, Support Triage, Reputation), Discord-to-Symphony terminology, **Brand Symphony Arrangement Method™**, and **Think Tank Solutions AI™** are asserted here as the platform owner's proprietary framework and brand assets. Certified Brand Symphony Conductor™ status is intended to be issued only through the owner's certification program.

This repository documentation is not a substitute for formal copyright registration, trademark filing, or legal advice.

## Accessibility and motion

Semantic DOM content, keyboard-operable dialogs, visible focus states, responsive navigation, reduced-motion handling, and a CSS fallback behind WebGL are included.
