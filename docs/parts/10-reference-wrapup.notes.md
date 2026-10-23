# Part 10 — Reference pages and wrap-up: notes

Short version on the owner's request (waves 6 and 7 combined, fewer words). Done on 2026-10-24.

## Sources

Most sources are inherited: `/ref/sources` is generated from the Sources tables of every notes file (parts 02–09), every URL kept, grouped by part, with its "checked on" date. PDF sources [1]–[19] use the URLs from the link annotations of `ai-team-guide.pdf`.

| Claim | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| First commit 2026-10-23 07:54; PRs #1–#10 merged by 2026-10-24 01:25 | 14#waves | git history (`git log origin/main`) | 2026-10-24 | Commit dates and PR numbers in merge titles |
| 10 parts, waves, writer + reviewer per part, workflow switch in PR #4 | 14#waves | git history; `docs/PROGRESS.md`; `docs/spec/00-general.md` | 2026-10-24 | "Docs: switch to writer + single Sonnet reviewer workflow (#4)" |
| What reviews caught | 14#reviews | `docs/reviews/02…08` | 2026-10-24 | "Fixed" sections; 02 F1 (licence wording); 05 auto-import bug; 07 Term paragraph bug |
| Three rules: detailed spec; memory only in files; author doesn't check own work | 00#rules | HTML «Схема сборки второго мозга» (Library) | 2026-10-24 | Section «Где обычно ошибаются» |
| Phrases rewritten for projects («Закрой поток, начни новый», «Передача дел») | ref/phrases | HTML «Схема сборки второго мозга» (Library) | 2026-10-24 | Cards «Кодеру перед заменой», «Новому кодеру» |

## Cross-chapter fixes (allowed edits)

| Chapter | Old | New | Why |
| --- | --- | --- | --- |
| 01-how-agents-work (4 paragraphs) | `<Term …>` at the start of a paragraph | `{null}<Term …>` | mdsvex treats a line that starts with a component as raw HTML: the paragraph loses `<p>` and Markdown links/code inside show as raw text. `{null}` renders nothing and makes the line a normal paragraph. |
| 02-project (1) | same | same | same |
| 03-specs-prompts (1) | same | same | same |
| 05-git-github (5) | same | same | same |
| 07-agent-team (3, incl. raw link at line 55) | same | same | same; the reviewer of part 07 reported the raw `[Anthropic](…)` link |
| a2-integrations (1) | same | same | same |

Build check after the fix: no raw `](` Markdown links in any built page; no broken internal links or anchors (script over `build/`).

## Terminology replacements

| Chapter | Old wording | New term |
| --- | --- | --- |
| — | — | — |

A grep over all chapters for non-standard words («агент-исполнитель», «ветвь», «слияние», «пулл-реквест», «сабагент», «мерж») found only «слияние» in `a1-local-first`, where it means merging data copies during sync (CRDT, last-write-wins), not a git merge. Left unchanged on purpose.

## New terms

None beyond those merged into `src/lib/glossary.ts`. Every entry now has a `chapter` link; `Glossary.svelte` shows it as «Подробнее» and has an A–Я letter row.

Merged: 23 seed terms + 51 new terms from parts 02–09. Left out as too narrow for the glossary (still explained in their chapters): snapshot, parent commit, merge commit, rebase, release, Blame, Compare, ruleset, template repository, clone, reflog, HEAD, package, licence, private repository, step, tool result, reasoning, cache write/read, cache TTL, interview, dictation, Overview, Resolved, definition of done, backlog, export/import, reactivity, virtual list, lazy loading, item, manifest, registry, event, core, schema version, streak, seed, fake timers, DST, hosting, preview deployment, WebAPK, keystore, environment variable, network secret, server-side proxy, revoke, sync engine, LWW, HLC, tombstone, end-to-end encryption, OPFS, eviction, structured outputs, OAuth consent screen, restricted scope, long task, compositor-only property, required status check, Conventional Commits.

## Ready phrases

`/ref/phrases` is generated from every PhraseCard in the chapters (exact title, `when` and text), grouped as the part file asks, plus five new cards: «Закрой поток, начни новый», «Обнови PROGRESS.md», «Модель поменьше», «Хватит следить за PR», «Передача дел».

## Troubleshooting

`/ref/troubleshooting` merges the notes tables into 27 rows in four groups, seeded with the part file's list; each row links to its chapter.

## Open questions

1. **Usage numbers for chapter 14.** The part file says to ask the owner for the limit used (Usage) and not estimate it. Chapter 14 leaves this out; the owner can send the numbers and a short section can be added.
2. **Term wrapping.** To save time, the pass did not wrap the first occurrence of every glossary term in every chapter; existing `<Term>` usage was kept and fixed. A later pass can add more.
3. **Thread count for chapter 14** is not stated: git history shows PRs, not threads.
