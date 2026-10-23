# Part 06 — The app: sync, stack, architecture

**Model:** Opus, High. **Depends on:** 02. **Wave:** 4, in parallel with 05.

## Goal

Chapters `06-sync`, `10-stack-speed` and `11-architecture`: where code and data live, why Svelte and what really makes the app fast, and a structure for the second brain that survives 30+ modules and parallel agents.

## Includes

**Chapter 06 — Sync: where code lives and where data lives**
- Code: cloud thread (its own copy) ⇄ GitHub ⇄ laptop (`git pull`) ⇄ hosting (deploy from `main`). Everything goes through GitHub.
- Uncommitted work in a cloud sandbox can be lost on restart — ask threads to commit and push work in progress.
- The project Library stores copies: changing a file on the computer changes nothing until it is uploaded again.
- The app's data lives on the phone, not on GitHub. Syncing data across devices is a separate problem (link to `a1-local-first`). Export and backup from day one.

**Chapter 10 — Stack and app speed**
- React, Svelte 5, SolidJS, Lit compared: reactivity, runtime size, ecosystem, how confidently an agent writes it (Svelte 5 has an official MCP server and docs for LLMs). Recommendation: Svelte 5 + SvelteKit.
- What matters more than the framework: local storage (IndexedDB via Dexie, or SQLite in the browser) so the app opens without network; virtualised long lists; lazy-loaded modules; search and analytics in a web worker.
- Android: PWA (icon on the home screen, offline) or Capacitor (native shell). Key fact: exact-time reminders in a pure PWA are unreliable; "позвонить клиенту в 15:00" needs server push or native local notifications via Capacitor.
- Targets: cold start under 1 s on a mid-range Android, a new task appears instantly, a 5,000-task list scrolls smoothly.
- How to measure: Lighthouse, the Performance panel, `chrome://inspect` on a real phone.

**Chapter 11 — Second-brain architecture**
- One data model: an "item" (id, type, title, body, status, dates, tags, links) with types task, note, habit, contact, goal, focus session, meditation; why this simplifies search, inbox and analytics.
- Module = folder `src/modules/<name>/` with a manifest (name, icon, routes, a widget for Today, settings), its own store and its own spec; one registry.
- Modules talk through events: «задача выполнена» → analytics and habits update themselves.
- The friend's features mapped to modules: Inbox (quick capture, voice); Tasks and tables; Today (daily goals + to-dos); «Что сейчас сделаю» and «Выбери за меня» (filter by time, energy, deadline + weighted random); Focus timer; Habits (streaks, misses); Clients — «кому позвонить» (last contact, next step, reminder, `tel:` link); Meditation button; daily analysis and evening review.
- Schema versions and migrations; JSON export and import.
- Build order: skeleton + item + Inbox + Tasks → Today → Focus → «Выбери за меня» → Habits → Clients → Analytics.

**Must correct** (error in the source notes): "Common.js" is a typo for SolidJS; CommonJS is a Node.js module format, not a framework.

**Components and blocks**
- Chapter 06: a "what lives where" diagram with two kinds of arrows, code and data (inline SVG in DiagramFrame).
- Chapter 10: CompareTable of the four frameworks; Callout important on notifications.
- Chapter 11: module architecture diagram (inline SVG); a module table with MVP / v1 / v2 waves.
- No new shared components.

## Excludes

- Sync engines, CRDTs and encryption in depth → part 08 (`a1-local-first`).
- Performance internals (runes, workers, bundle analysis) → part 08 (`a5-performance`).
- Installing the PWA, APK and deploy → part 07 (`12-deploy`).
- Testing the app → part 07 (`08-testing`). Git → part 02.

## Output

`src/content/guide/06-sync.md`, `src/content/guide/10-stack-speed.md`, `src/content/guide/11-architecture.md`, `docs/parts/06-app-architecture.notes.md`. PR title: `Part 06: chapters 06, 10 and 11`.

## Sources

The researcher saves a source for every key fact into the notes Sources table as it is found, so the fact-checker checks the saved link instead of searching again. Key facts here: cloud sandbox behaviour and Library copies (Claude Code Projects and cloud sessions docs); framework claims and runtime sizes (official docs or measured, with method); IndexedDB, storage quotas, notifications and Web Push limits (MDN, Chrome docs); Capacitor local notifications (capacitorjs.com).

## Done when

- Build and check pass; every framework and platform claim has a source.
- Both diagrams read clearly at 360 px and in dark theme.
- The "Common.js" correction and the notification limit are stated.
