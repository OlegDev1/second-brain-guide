# Part 08 — Advanced I: data, integrations, performance

**Model:** Opus, High. **Depends on:** 02. **Wave:** 5, in parallel with 07.

## Goal

Advanced chapters `a1-local-first`, `a2-integrations` and `a5-performance` for the author: denser, with code and trade-offs. A2 is the centrepiece — a catalog of concrete integration ideas for the second brain.

## Includes

Every Advanced chapter starts with a "для кого" callout and a link to the Part I chapter it deepens.

**A1 — Local-first and cross-device sync** (deepens `06-sync`, `11-architecture`)
- Browser storage: IndexedDB via Dexie, SQLite WASM over OPFS, PGlite; speed, quotas, eviction, `navigator.storage.persist()`.
- Three sync paths: own backend (Supabase, PocketBase), sync engines (PowerSync, ElectricSQL, Zero, Triplit, InstantDB, Jazz), CRDT libraries (Yjs, Automerge). CompareTable: complexity, offline, conflicts, cost, lock-in. Verify each project's current status.
- Conflicts: per-field last-write-wins, CRDTs for note text, hybrid logical clocks.
- End-to-end encryption of personal data; client-side migrations; backup to the user's own cloud.

**A2 — Integrations and APIs: an idea catalog** (deepens `11-architecture`)
For each idea: what it gives the second brain, which API, difficulty 1–3, whether a server is needed to hide a key. The author may add ideas.
- **Capture:** voice inbox (Web Speech API, or cloud transcription — OpenAI, Deepgram, AssemblyAI, ElevenLabs Scribe — then the Claude API maps the phrase to fields); on-device Whisper (transformers.js, whisper.cpp WASM); «Поделиться» from any app via Web Share Target or a Capacitor intent; photo of a whiteboard or receipt → tasks via the Claude API with images; NFC tag on the desk → start focus (Web NFC, Chrome Android).
- **Google:** Calendar API (timed tasks ⇄ events; «Выбери за меня» sees the gap before the next meeting); Tasks API (two-way import); Docs and Drive API (evening review → a document, backup to `appDataFolder`); Sheets API (clients and analytics ⇄ a sheet); Gmail API (labelled emails → inbox); Maps / Places / Routes + geofences via Capacitor ("near the shop — show the list"). A block on OAuth: consent screen, test users, verification for sensitive scopes, short-lived tokens.
- **Claude API inside the app:** «позвонить Пете завтра в 15» → reminder linked to the contact (structured output or tool use); «Выбери за меня» that explains its choice; evening review and weekly analytics via the Batch API; semantic search over notes (embeddings — Anthropic has no embedding model, check whom its docs recommend; vectors stored locally); an own MCP server for the second brain on Cloudflare Workers, connected as a connector. Key stays on the server; small model for classification; prompt caching (link to `a6-economics`).
- **Notifications and messengers:** Telegram Bot API + Cloudflare Worker with cron (reliable reminders, capture, morning digest); Web Push (VAPID) + a server; weekly email digest (Resend, Postmark).
- **Health, context, import:** Health Connect via a Capacitor plugin (verify support); Open-Meteo weather; Spotify Web API (focus or meditation playlist); Notion, Todoist and Obsidian import; ICS feed; webhooks into n8n, Make, Zapier.
- **Module ideas beyond the friend's list:** journal and mood; spaced repetition; goals → key results → tasks; energy by hour; GTD weekly review; graph of linked notes; expense tracker.
- Present as CompareTables by group, plus one worked example end to end: voice inbox → transcription → Claude API → item in IndexedDB, with a short code sketch.

**A5 — Performance in depth** (deepens `10-stack-speed`)
- Svelte 5 runes: `$state`, `$derived`, `$effect`; the classic mistake of computing in `$effect` instead of `$derived`.
- Bundle analysis, splitting by module, lazy routes.
- IndexedDB indexes, batched transactions, not loading everything at start; SQLite in a worker.
- Search in a worker (MiniSearch, FlexSearch); virtual lists; animate only `transform` and `opacity`; View Transitions.
- Measuring on a real Android: remote debugging, Performance panel, web-vitals inside the app.

**Components:** generic only (CompareTable, CodeBlock, Callout, Deeper). No new shared components.

## Excludes

- Claude Code tooling, CI, economics, large teams → part 09.
- Basic sync, stack and architecture → part 06; link instead of repeating.

## Output

`src/content/advanced/a1-local-first.md`, `src/content/advanced/a2-integrations.md`, `src/content/advanced/a5-performance.md`, `docs/parts/08-advanced-data-integrations.notes.md`. PR title: `Part 08: Advanced A1, A2, A5`.

## Sources

The researcher saves a source for every key fact into the notes Sources table as it is found, so the fact-checker checks the saved link instead of searching again. Key facts here: every API capability, quota, price and status — from that service's official docs, with the date; browser support for Web NFC, Web Share Target, OPFS, Web Push (MDN, Chrome Platform Status); Svelte 5 runes behaviour (svelte.dev).

## Done when

- Build and check pass; every service in A2 has an official link and a "checked" date.
- A2 has at least one worked end-to-end example with code.
