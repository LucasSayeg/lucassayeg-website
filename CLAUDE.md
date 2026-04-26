# Project guide for AI agents

This project was scaffolded from the `next-payload-template`. Skills live at `.agents/skills/` (real dir) with `.claude/skills/` symlinks.

## Language

**All user-facing content MUST be in Brazilian Portuguese (pt-BR).** This includes hardcoded JSX text, page titles, meta descriptions, alt attributes, ARIA labels, form labels and placeholders, validation messages (Zod, react-hook-form), toast/sonner messages, error pages, empty states, and email copy.

- Editable content lives in Payload (collections/globals) — the client manages it there.
- Static UI strings go in `src/messages/pt.json` and are read via `next-intl` (`useTranslations`, `getTranslations`). Don't hardcode pt-BR strings inline when a `messages/pt.json` key already exists or could exist.
- If you must add a new hardcoded string, write it in pt-BR directly — do not write English first and translate later.
- **Code identifiers (variable/function/file/type names, commit messages, code comments) stay in English.** The pt-BR rule applies to content rendered to end users, not to code.
- `src/messages/en.json` is a template artifact and is not used by the live site; treat `pt` as the only shipping locale unless told otherwise.

## Architecture

- `src/core/` — pure TypeScript. No React/Next imports. No imports from `app/` or `ui/`.
- `src/lib/` — shared helpers. May import React. No imports from `app/` or `ui/`.
- `src/ui/` — React components. Consumes `core` via `lib`.
- `src/app/` — Next.js routes + server actions. Composes everything.

CI enforces these via `scripts/arch-check.sh` (`pnpm arch:check`).

## Other source layout

- `src/collections/`, `src/globals/` — Payload schema (editable by the client)
- `src/features/` — Payload editor extensions (e.g. `lexicalCode`)
- `src/i18n/`, `src/messages/` — next-intl config and message catalogs
- `src/migrations/` — committed SQL; runs in `vercel-build` before `next build`

## Commands

- `pnpm dev` — Next dev server (Turbopack)
- `pnpm typecheck` / `pnpm lint` / `pnpm format` — pre-commit runs these on staged files
- `pnpm arch:check` — enforces the layer rules above (also runs in CI)
- `pnpm db:branch` — create/ensure `dev-$USER` Neon branch and point `.env.local` at it
- `pnpm db:migrate` / `pnpm db:migrate:create <name>` / `pnpm db:migrate:status`
- `pnpm payload` — Payload CLI (use this to create the first admin user)
- `pnpm seed` — run seeders in `src/seed/`

## Gotchas

- `PAYLOAD_ENABLED=false` turns the site into a pure static Next app: admin returns 404 and `getPayloadSafe()` returns `null`. Pages must tolerate that.
- `@template:*` comment markers in code are scaffold remnants — leave them unless you're removing a whole feature block.
