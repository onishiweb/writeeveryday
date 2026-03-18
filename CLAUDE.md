# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start dev server with HMR (localhost:5173)
npm run build         # Production build
npm start             # Run built app (requires build first)
npm run typecheck     # Generate React Router types + TypeScript check
npm run budget        # Check bundle sizes against perf-budget.json (requires a build)
npm run build:budget  # Build then immediately check budget
```

There are no test commands configured in this project.

## Project description

This project is a Daily Prompt for writer's to use as a way of practicing writing with different themes and prompts.

The prompts I curate are short and very broad, with a lot of room for interpretation. They follow common themes to allow writer's to practice with recognisable prompts each day if they choose to follow along.

## Architecture

**Write Every Day** is a React Router v7 app (SSR enabled) that shows writers one writing prompt per day of the year.

### Data Model

Prompts live as a static array in `app/utils/prompts.ts` — an array of 365+ strings indexed by day of year (0-based). There is no database or CMS; all content is in this file.

`app/utils/currentDayOfYear.ts` calculates the current day number (1–366) used to index into the prompts array.

### Routing

- `/` — Home: shows today's prompt. Redirects to `/day/:n` if `n > totalPrompts`.
- `/day/:dayNumber` — Shows a specific day's prompt. Redirects to today if `dayNumber > currentDay`.

Navigation arrows are disabled on Day 1 (no previous) and on the current day's prompt (can't view future prompts).

### Path Aliases

`~/*` maps to `./app/*` (configured in `tsconfig.json`). Use `~/components/Foo` etc. for imports.

### Styling

Tailwind CSS v4 with a single global stylesheet at `app/app.css`. Dark mode uses `prefers-color-scheme` media query plus `dark:` utility classes. Quicksand font loaded from Google Fonts in `root.tsx`.

### Deployment

The app is deployed to **Netlify** (`netlify.toml` configures build/publish dirs). A `Dockerfile` also exists for container-based deployments. Build output goes to `build/client` (static) and `build/server` (SSR).
