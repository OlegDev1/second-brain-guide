# Review: part 08, chapters A1, A2 and A5 (PR #10)

Reviewed on 2026-10-23 against `docs/spec/00-general.md`, `docs/parts/08-advanced-data-integrations.notes.md` and the PR diff.
Two checks: fact-check and frontend skim.

## Result

- Facts: the status changes and the riskiest numbers match their saved links. Four small wording fixes (below).
- Frontend: no horizontal overflow at 360 px (dark and light) and 1440 px (dark) on all three pages.
- Main was already merged into the branch (no conflicts).
- `npm run build` passes; `npm run check` → `COMPLETED 283 FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS`.

## Fact-check

Opened and confirmed: Triplit joined Supabase (8 Oct 2025; no shutdown date, not integrated into the platform); InstantDB team joined OpenAI, cloud shuts down 31 Aug 2027, open source with a self-hosting guide; OpenAI `whisper-1`, `gpt-4o-transcribe` and variants shut down 26 Feb 2027, `gpt-transcribe` recommended, 25 MB; forced `tool_choice` (`any`/`tool`) returns 400 on Opus 5.5 and Sonnet 5.5, Haiku 5.5 accepts it; Zero "generally available" as of March 2026; Jazz docs describe a local-first relational database (2.0 alpha); Haiku 5.5 and Sonnet 5.5 prices and cache multipliers; Google Testing status (100 test users, 7-day authorization and refresh token); `scheduler.yield()` support (Chrome 129, Firefox 142, no Safari, from MDN browser-compat-data); Spotify dev-mode limits.

## Fixed

1. **Zero (A1).** The table said "stable version 1.0"; the status page only says generally available as of March 2026. Reworded.
2. **Triplit (A1).** Added that Supabase does not integrate it into the platform; replaced "you will have to maintain it yourself" with what the sources support: no promised future, follow updates yourself.
3. **Whisper (A2).** Added the shutdown date (26 Feb 2027) for `whisper-1` and `gpt-4o-*-transcribe`, with a "проверено" mark.
4. **Spotify (A2).** The source says dev mode requires a Premium account, not that the app owner does; the five-user limit is per Client ID. Reworded.

Open questions in the notes are settled at the end of the notes file.

## Not changed

Not re-opened (saved links accepted): Maps free thresholds, Cloudflare, Telegram and Resend limits, Health Connect and Capacitor plugin versions, A5 Dexie and web.dev details. Code sketches were not run, as the PR states.
