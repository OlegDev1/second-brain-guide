# Part 01 — Skeleton and design system

**Model:** Opus, High. **Depends on:** nothing. **Wave:** 1.

## Goal

A working site shell and design system, so every later part only writes Markdown and, where listed, one specialised component.

## Includes

**First step:** copy the `spec/` folder from the project Library into `docs/spec/` in the repo.

**Stack**
- Svelte 5 (runes) + SvelteKit 2, latest stable. SvelteKit 3 is a prerelease; don't use it.
- `@sveltejs/adapter-static`, prerender every page. mdsvex for Markdown with components inside. Shiki highlighting at build time. Pagefind search, loaded on demand.
- Official Svelte MCP (`npx sv add mcp`); use `svelte-autofixer` on Svelte code. If the cloud environment blocks `svelte.dev`, say so and continue without it.
- Self-hosted woff2 fonts, Cyrillic + Latin subset, `font-display: swap`: Golos Text (body), Unbounded (headings), JetBrains Mono (code and file names).

**GitHub Pages readiness** (the owner deploys)
- `paths.base` = `/<repo-name>` (repo name is in the project instructions); every internal link and asset is base-aware; `static/.nojekyll`.
- Don't add any deploy workflow; the owner does that.

**Content pipeline**
- Chapters from `src/content/guide/`, `src/content/advanced/`, `src/content/ref/` by frontmatter (fields in `00-general.md`) → routes `/guide/<slug>`, `/advanced/<slug>`, `/ref/<slug>`.
- Navigation tree, breadcrumbs, previous/next and the "on this page" rail are generated from frontmatter and headings. Content parts never touch this code.
- A stub page («Глава в работе») for every slug in the slug map, so cross-links work from day one.

**Layout and navigation** (mobile-first)

**Reading bar** — a slim sticky bar at the top of every chapter page, always visible while reading, about 44 px tall on a phone:
- Left: the current chapter (number + short title). Tap → a bottom sheet with every chapter grouped by Гайд / Advanced / Справочник, the current one highlighted, "read" marks on finished ones (#16, #11).
- Middle: the current section heading, updated as you scroll. Tap → the list of this chapter's sections; tap one to jump there (#12).
- Right: search (#15) and previous / next chapter arrows (#14).
- A 2 px reading-progress line along its bottom edge.
- It never covers the heading you jumped to (`scroll-margin-top`), doesn't jitter while scrolling, opens and closes with one thumb, and stays light: no heavy blur or shadows.

Around it:
- From 1024 px: the same bar on top, plus the section tree on the left (#11) and the "on this page" rail on the right (#12), text in the centre (max 44 rem).
- Home page: tabs Гайд / Advanced / Справочник (#17) and the hub.
- On the phone, breadcrumbs (#13) are folded into the bar; on desktop they sit under it.
- Previous / next cards (#14) at the end of each chapter.

**Look and feel**
- The site must look beautiful and finished on its own: calm, modern, easy to read on a phone. That is the goal, not matching any reference.
- The HTML page and the PDF deck in the Library are mood references only: the page's clean reading column and typography, the deck's dark navy palette and clear diagrams. Don't copy or blend them mechanically; design one coherent look of your own.
- Clarity first: every heading states the point, one idea per card, key numbers in bold, plenty of space, no decoration that doesn't help reading.
- Default theme: dark. Light theme via a switch light / dark / system, stored in `localStorage` inside try/catch. Both themes must look finished, not like an inverted copy of each other.

**Design tokens** on `:root`. Use the palette below as a starting point: refine it freely for beauty and AA contrast, then lock the final values in `src/app.css` and note them in `docs/DECISIONS.md`. The dark set is the default; the light set applies under `[data-theme="light"]` (and under `prefers-color-scheme: light` when the user picked "system").
- Dark (default): bg #0B1220, surface #111A2C, sunk #0E1626, line #19253B, line-strong #2A3550, ink #E6E9F1, muted #94A3B8, accent #3B82F6, accent-soft #10233F, mark rgba(255,212,56,.34).
- Light: bg #F3F4F8, surface #FFFFFF, sunk #EAEDF5, line #D6DAE5, line-strong #B9C0D0, ink #19202D, muted #5B6476, accent #2D47D4, accent-soft #E3E8FC, mark #FFE15A.

**Colours carry meaning — the same everywhere** (callouts, diagrams, badges). Stroke / tinted fill, dark theme; pick light-theme equivalents with AA contrast.
- Blue #3B82F6 / #10233F — you, the coordinator, the main idea, links.
- Violet #8B5CF6 / #1C1838 — threads and agents.
- Amber #F59E0B / #2A1D06 — tokens, cost, checks, "important" callouts, source references.
- Green #22C55E / #0D2A1A — done, the `main` branch, "tip" callouts.
- Red #EF4444 / #2A1010 — "danger" callouts (force push, leaked keys).

**Diagrams:** outlined rounded boxes (radius 10, 1.5 px stroke) with the tinted fill of their meaning colour; arrows in muted; dashed lines for loops and optional steps; labels short; vertical layout on a phone.

Body 16.5–17 px, line height 1.6. AA contrast in both themes, visible focus, tap targets of 44 px or more, `prefers-reduced-motion`. Motion only where it carries meaning, 150–250 ms.

**Generic components** (catalog numbers in brackets)
LessonHeader (#19), TLDR and Takeaways (#20), Callout tip / important / danger (#27), Deeper — the «Глубже» disclosure (#24), Term — glossary tooltip (#25), Steps — vertical stepper (#23), Tabs — synced across the page (#22), Accordion (#21), CompareTable — scrolls inside its box on a phone (#28), BeforeAfter (#29), CodeBlock with Copy, PhraseCard with Copy (#35), Checklist with ticks saved in `localStorage` (#38), ChatTranscript with side notes (#34), DiagramFrame (wrapper for inline SVG with `aria-label`), Card, Chip, LevelBadge.

- Term reads `src/lib/glossary.ts`, seeded from the terminology table in `00-general.md`.
- `/design` page (`noindex`) shows every component in both themes.

**Repo files**
- `CLAUDE.md` — template below.
- `docs/COMPONENTS.md` — one entry per generic component: name, props, a two-line mdsvex usage example. Keep it short; chapter authors read only this.
- `docs/PROGRESS.md` — table: part | title | status (not started / in progress / in review / done) | PR | notes. Rows 01–10.
- `docs/STYLE.md` — start as a copy of the Style section of `00-general.md`; part 02 extends it.
- `docs/DECISIONS.md` — decision, why, alternatives.

## Excludes

- Any chapter text; only stubs.
- Specialised components: commit graph (02), token calculator (03), clickable project diagram (04), repo tree (05), roadmap and hub content (10).
- Deploy workflow, tests, CI.

## Output

Site code; `docs/spec/`; `CLAUDE.md`; `docs/COMPONENTS.md`, `docs/PROGRESS.md`, `docs/STYLE.md`, `docs/DECISIONS.md`; `docs/parts/01-skeleton.notes.md`. PR title: `Part 01: skeleton and design system`.

## Sources

The researcher saves a source for every key fact into the notes Sources table as it is found, so a later check uses the saved link instead of searching again. Key facts here — every library and version choice and each fact you relied on: SvelteKit and Svelte versions, mdsvex compatibility with Svelte 5, Pagefind with adapter-static, `paths.base` for GitHub Pages.

## Done when

- `npm run build` and `npm run check` pass.
- Every slug in the slug map opens a stub; search finds stub titles.
- The reading bar works at 360 px: the chapter sheet and the section list open and close, the progress line moves, and a jumped-to heading is never hidden under the bar. The reviewer's frontend skim checks this on a stub page with a few test headings.
- `/design` shows every component in light and dark theme.
- `docs/COMPONENTS.md` covers every generic component.
- The reviewer skimmed `/design` and one stub page at 360 and 1440 px. Deploying is not part of this part; the owner deploys later.

## CLAUDE.md template

```markdown
# Guide: Second Brain with a Claude Agent Team

Static site: SvelteKit 2, Svelte 5 (runes), mdsvex, adapter-static, GitHub Pages.
Site content is Russian. Code, comments, docs, notes, commits and PRs are English.

## Read before any task — and nothing else
- docs/spec/00-general.md, docs/STYLE.md and your own part file in docs/spec/parts/
- docs/PROGRESS.md only to update your own row
- Never open other part files. docs/spec/INDEX.md is for the coordinator only.

## Where things are
- src/content/guide/, src/content/advanced/, src/content/ref/ — chapters (Markdown)
- src/lib/components/ — components; generic ones documented in docs/COMPONENTS.md
- docs/parts/ — notes per part (sources, terms, phrases); docs/reviews/ — check reports

## Commands
npm run dev · npm run build · npm run check

## Code
- Svelte 5 runes only ($state, $derived, $props). No export let, $: or on:click.
- Use the Svelte MCP and svelte-autofixer on Svelte code.
- Colours only from the tokens in src/app.css.
- A new dependency needs a line in docs/DECISIONS.md.
- No test files, no CI checks. Don't touch the GitHub Pages deploy setup.

## Never
- force push, commits straight to main, deleting branches, secrets in the repo.
- Editing files another part owns. Only part 10 may align terms and fix links across chapters.
```
