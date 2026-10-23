# Index — parts, order, parallelism

For the coordinator. Part threads don't read this file.

Ten parts. One part = one thread = one branch = one PR. At most two threads at once. A part thread reads only `00-general.md`, `docs/STYLE.md` and its own part file — never other part files.

| # | Part | Covers | Depends on | Wave |
| --- | --- | --- | --- | --- |
| 01 | Skeleton and design system | Site code, generic components, `/design`, stubs for every slug, `CLAUDE.md`, `docs/PROGRESS.md` | — | 1 |
| 02 | Reference chapter: Git and GitHub | Chapter 05, commit graph, final `docs/STYLE.md` | wave 1 closed | 2 |
| 03 | How Claude works and what it costs | Chapters 01, 09, token calculator | wave 2 closed | 3 |
| 04 | The method: project and agent team | Chapters 02, 07, clickable project diagram, feature-cycle transcript | wave 2 closed | 3 |
| 05 | Specs, project files and your prompt | Chapters 03, 04, 15, repo tree | wave 3 closed | 4 |
| 06 | The app: sync, stack, architecture | Chapters 06, 10, 11 | wave 3 closed | 4 |
| 07 | Quality, deploy, security | Chapters 08, 12, 13 | wave 4 closed | 5 |
| 08 | Advanced I: data, integrations, performance | A1, A2, A5 | wave 4 closed | 5 |
| 09 | Advanced II: tooling, CI, economics, large teams | A3, A4, A6, A7 | wave 5 closed (uses the checked calculator from 03) | 6 |
| 10 | Reference pages and wrap-up | All `/ref` pages, chapters 00 and 14, home hub, glossary merge, terminology pass over all chapters | wave 6 closed | 7 |

## Order and wave gates

1 → gate → 2 → gate → (03 ∥ 04) → gate → (05 ∥ 06) → gate → (07 ∥ 08) → gate → 09 → gate → 10 → gate

A **gate** closes a wave. The next wave starts only when, for every part in the wave:

1. the PR is open and `npm run build` / `npm run check` pass;
2. the fact-check (Sonnet) and the quick look (Haiku) have written `docs/reviews/NN-<slug>.md`;
3. every open item in that review is fixed;
4. the owner has merged the PR.

For wave 1 (part 01, no chapter text) the gate is the quick look plus the owner's check of its screenshots. Nothing is deployed during the build; the owner deploys later.

Why gates: a mistake left in one wave travels into the next. The calculator from 03 is reused in 09; terms and claims from early chapters are linked and repeated later.

- **01 first.** Content parts only write Markdown into the shell it builds.
- **02 alone.** The reference chapter fixes voice, depth and component use in `docs/STYLE.md`; every later part copies it. The owner reviews it closely.
- **Waves 3–5 run in pairs.** Parts in a pair own different files and link to each other only by slug.
- **10 goes last.** It compiles glossary, phrases, troubleshooting and sources from every notes file, aligns terminology across all chapters, and needs the real build history for chapter 14.
- The owner may run a pair one part at a time to save limit; the order inside a wave doesn't matter.

## Ownership rules

- A part edits only the files its part file lists, plus its own row in `docs/PROGRESS.md`.
- **Exception — part 10** may edit every chapter, but only to: replace non-standard terms with the glossary term, wire the Term tooltip, and fix broken links. No other changes to other parts' text or structure.
- Shared generic components belong to part 01. If a content part needs a change to one, it describes the change under Open questions in its notes file instead of editing the component.
- If a part turns out large, its thread uses subagents for research. It does not split the part or start other parts.

Status of every part lives in `docs/PROGRESS.md`.
