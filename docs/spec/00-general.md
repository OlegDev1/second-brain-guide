# General spec — read by every agent

## Goal

A Russian-language guide website that teaches the friend (24, no coding background) to build his own "second brain" app with a team of Claude agents in a Claude Code project — and explains why the method works. Part II "Advanced" is for the author (20, programming since 14, knows JavaScript and automation). Static SvelteKit site; the owner deploys it to GitHub Pages himself.

## Readers

- **Friend:** must understand the mechanics and make decisions, not just press buttons. Every term is explained on first use. Examples come only from his app: Inbox, Tasks, "Выбери за меня" (pick for me), focus timer, habits, clients with call reminders, meditation button, daily goals, daily productivity analysis.
- **Author:** reads Advanced. Denser text, code, trade-offs.

## Language

Site content: Russian, informal «ты». Everything else agents write — code, comments, `docs/`, notes, commits, PRs, reports — English. UI names stay in English as in the product: Project settings → Memory.

## Site structure

Three top tabs: **Гайд** (`/guide`), **Advanced** (`/advanced`), **Справочник** (`/ref`). Home `/` is a hub with two blocks: the step-by-step build guide and the knowledge library.

Slug map — use these for cross-links even if the target chapter is not written yet:

- Guide: `00-roadmap` (titled «Введение» since the fixes wave; the slug is kept so old links work), `01-how-agents-work`, `02-project`, `03-specs-prompts`, `04-project-files`, `05-git-github`, `06-sync`, `07-agent-team`, `08-testing`, `09-tokens-limits`, `10-stack-speed`, `11-architecture`, `12-deploy`, `13-security`, `14-how-this-site-was-made`, `15-your-prompt`
- Advanced: `a1-local-first`, `a2-integrations`, `a3-claude-code-advanced`, `a4-ci-cd`, `a5-performance`, `a6-economics`, `a7-large-teams`
- Reference: `phrases`, `glossary`, `checklists`, `troubleshooting`, `sources`

Link format: `/guide/05-git-github#anchor`. Navigation, breadcrumbs and previous/next are generated from frontmatter; content parts never edit navigation code.

## Style

- Advanced in substance, simple in wording. Sentences up to 25 words, paragraphs up to 3 sentences, no filler.
- Two depth levels: the main text is clear to the friend; «Глубже» blocks answer "but why"; Advanced is denser.
- Every chapter: lesson header (what you'll learn, prerequisites, time) → TL;DR → body → «Выводы» → «Что сделать сейчас» (1–3 actions) → «Источники».
- Length: Guide chapters 1,500–3,500 words, Advanced 1,500–3,000. If a chapter needs more, tell the coordinator; don't split it yourself.
- Headings: `##` for sections, `###` for subsections. Section titles are short (up to about 40 characters) and say the point, because they appear in the reading bar at the top of the page and in its section list.
- Visuals: only components and tokens from the design system (`/design`, `docs/COMPONENTS.md`). No new colours or one-off styles. Dark theme is the default.
- Colours carry meaning everywhere, in callouts and diagrams: blue — you, the coordinator, the main idea; violet — threads and agents; amber — tokens, cost, checks, important; green — done, `main`, tips; red — danger.
- From part 02 on, `docs/STYLE.md` holds voice decisions and short examples from the reference chapter; where it differs from this section, STYLE.md wins.

## Terminology — use exactly these Russian terms

| English | On the site | Meaning |
| --- | --- | --- |
| project | проект | Claude Code project: coordinator + threads |
| coordinator | координатор | project conversation that splits work and reads reports |
| thread | поток | full cloud session doing one task, own branch and PR |
| subagent | субагент | side task inside a thread, own context, returns a summary |
| context window | контекстное окно | everything the model reads on each step |
| token | токен | unit of text the model reads and writes; what limits count |
| cache | кэш | discount for re-reading an unchanged start of history |
| compaction | сжатие | summarising history near the limit |
| spec | ТЗ | document describing what to build |
| project instructions | инструкции проекта | text every thread starts with |
| project memory | память проекта | notes Claude keeps for the project (`MEMORY.md`) |
| skill | навык | instructions loaded when a task matches (`SKILL.md`) |
| repository | репозиторий | project folder with full history on GitHub |
| commit | коммит | saved snapshot with a message and a hash |
| hash | хэш | commit fingerprint (SHA) |
| branch | ветка | movable pointer to a line of commits |
| pull request | пул-реквест (PR) | request to bring a branch into `main` |
| merge | мердж | bringing one branch into another |
| conflict | конфликт | two changes to the same place |
| revert | откат коммитом (revert) | new commit that undoes an old one |
| deploy | деплой | publishing the site or app |
| PWA | PWA | web app installable on the phone |
| MCP | MCP | protocol for connecting tools and data to Claude |

Part 01 seeds the glossary tooltips from this table. New terms go into your notes file; part 10 adds them to the glossary.

## Result format for every content part

1. Chapters: `src/content/guide/<slug>.md` or `src/content/advanced/<slug>.md` (mdsvex). Frontmatter: `title`, `part`, `order`, `slug`, `time`, `level` (basic | advanced), `prereqs`, `updated` (YYYY-MM-DD).
2. Specialised components, only if your part file lists them: `src/lib/components/<area>/…`, props documented in a header comment.
3. Notes file `docs/parts/NN-<slug>.notes.md` with these sections:
   - **Sources** — table: claim (short) | chapter#anchor | URL | checked on | locator (section heading or a quote under 15 words).
   - **New terms** — EN | RU | one-line definition.
   - **Ready phrases** used in your chapters (for `/ref/phrases`).
   - **Troubleshooting** — symptom | cause | fix.
   - **Open questions.**
4. Your row in `docs/PROGRESS.md` updated. Edit only your own row.

## Sources and accuracy

- **Save sources while researching.** Whoever finds a key fact writes it into the Sources table at that moment, with the URL and a locator. Key facts: anything about Anthropic products, every number, price, limit, date, version, command and API capability. The fact-checker verifies against these saved links instead of searching from scratch.
- Anthropic product facts come only from official pages (code.claude.com, docs.claude.com, support.claude.com, anthropic.com). On the page, mark them «проверено: месяц год».
- Numbers from the PDF deck cite its source number [n] and that source's original URL.
- No source, no number. Paraphrase; a quote stays under 15 words, one per source.
- Run every git or terminal command shown in a chapter in a scratch repository before the PR.

## Global rules G1–G7 (every chapter, from the fixes wave on)

Set by the owner in the fixes wave brief (`docs/spec/waves/fixes-wave.md`). Target reader: a non-technical person building the "second brain" with Claude Projects; the guide is centred on our project, but someone building something else must be able to follow it.

- **G1 Context first.** Every chapter opens with a short plain-language intro: what this part is, how it works, how it fits into the Project and what problem it solves. Optionally a small diagram, then the detailed blocks. An explanation, not a summary. Example for Sync: context stored on GitHub survives deleting the Project and can be used any time, from any device, by any agent.
- **G2 Tie everything to Projects.** For each feature, say what it does, how it connects to the Project, and how to use it there.
- **G3 Trim off-topic content.** Directly related to Projects or our workflow: normal depth. Indirectly related (generic git, plain Claude Code commands, "laptop pulls the code"): 1–2 lines. Unrelated: remove. Never remove anything that is actually needed.
- **G4 Plain language.** Replace tables and code snippets that need a technical background with plain text or a simple diagram. Technical internals (e.g. SvelteKit) are the agents' job, not the reader's.
- **G5 General plus our project.** Our project is the main worked example, but phrase things so they apply to other projects too.
- **G6 Sources block.** Keep the «Источники» heading; the text under it is smaller (and dimmer). Styled globally in `src/app.css`, chapters need no markup for it.
- **G7 No personal data.** No example on the site suggests putting personal data into the Project, the spec or an agent's context. Where one does, remove it and point to «Безопасность» (`/guide/13-security`).

The "Advanced" section is not touched unless the owner asks.

## Workflow

From the fixes wave (2026-10-24) on, these rules replace the earlier writer / reviewer / wave-gate rules. Where older text in this file or a part file says otherwise (reviewer merges, fact-checks against URLs, commands run in a scratch repository), this section wins.

- **Reading rule.** A thread gets only the context for its own tasks: its task IDs, the global rules G1–G7 and the exact files it owns. Not the whole brief, not the whole repo. It opens `docs/PROGRESS.md` only to update its own row. Only the coordinator reads `INDEX.md`.
- **Files never overlap** between parallel threads. Shared files (sidebar, global styles, home page, top bar) belong to one thread only.
- No test files, no CI, never touch the GitHub Pages deploy setup.

### Roles

**Opus 5.5 (high) does all the work:**

- Writes and rewrites text.
- Restructures chapters: blocks, order, organisation.
- Changes the visual layout so the site looks clean and clear.
- Builds new elements (diagrams, buttons, dropdowns).
- No tests: Opus writes none, runs none and doesn't check buttons. If `npm run build` passes, that's enough.

**Sonnet (high) only checks, and quickly:**

1. **Text:** logic and consistency only. Does it make sense, match the rest of the site and the repo, contain no contradictions, and was nothing needed deleted? No external links, no web fact-checks: the sources are already in the project.
2. **New interactive elements only:** a quick check that each one works (a button toggles there and back, a link opens the right chapter). 1–2 checks per element, no more.
3. **Layout:** a quick look that the chapter looks OK on mobile and desktop.

No test suites, no writing tests, no repeated builds, no screenshot loops. No Haiku anywhere.

### Flow per task

1. Opus works in its own branch, commits, pushes and reports done. Its thread is then closed.
2. Sonnet reviews that branch.
3. If there are issues, they go back to Opus. If not, Sonnet opens the PR, and Opus isn't messaged again.
4. Only the owner merges PRs. Agents never merge, and nobody waits for the merge: the other threads keep working in parallel.

- Never force push or delete branches without the owner's OK.
- Missing access, fact or decision: say exactly what is missing and stop. Never invent.

## Source materials in the project Library

Open one only when your own part file cites it (for example "PDF slide 2", "[14]" or "HTML"), and only the part you need.

- HTML page «Схема сборки второго мозга» — the original method and the visual style.
- PDF deck «Как устроена ИИ-команда» — research, numbers, sources [1]–[19].
- «Guide Structure Catalog» — component patterns; part files refer to them as #NN.
