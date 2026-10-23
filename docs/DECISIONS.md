# Decisions

Decision — why — alternatives. Newest at the bottom of each section.

## Stack and dependencies (part 01)

| Decision | Why | Alternatives |
| --- | --- | --- |
| **SvelteKit 2.70.x** (`@sveltejs/kit@^2.70.3`), not 3.x | Project instructions fix SvelteKit 2. Note: since 2026-10-01 npm's `latest` tag is 3.x (3.1.0 on 2026-10-23), so the spec's line "SvelteKit 3 is a prerelease" is out of date; 2.70.3 is the newest 2.x. | Move to SvelteKit 3 — needs the owner's call. |
| **Svelte 5.57** with `compilerOptions.runes: true` | Runes only, as CLAUDE.md requires; also compiles the Markdown chapters in runes mode. | Per-file opt-in. |
| **Vite 8** + `@sveltejs/vite-plugin-svelte` 7 | Newest versions inside SvelteKit 2.70's peer ranges. | Vite 7 + plugin 6. |
| **TypeScript 6** | Newest version inside SvelteKit 2.70 and svelte-check peer ranges (TypeScript 7 is outside them). | TypeScript 5. |
| **`@sveltejs/adapter-static` 3**, every page prerendered, `fallback: '404.html'` | Static site for GitHub Pages; the 404 page replaces GitHub's default one. | — |
| **mdsvex 0.12.8** for Markdown | Supports Svelte 5 (peer range includes `^5.0.0-next.120`), components inside Markdown. | MDX-like tools for Svelte are less mature. |
| **Shiki 4** at build time, two themes (`github-dark-default`, `github-light-default`) in one pass | No highlighting code ships to the browser; colours switch with `light-dark()` per theme scope. | Prism (mdsvex default), runtime highlighting. |
| **Pagefind 1.5** via its Node API (`config/pagefind.js`) | Static search, index loaded only when the dialog opens. The Node API writes the index to `build/` and to the preview output, so search also works under `npm run preview`. Only chapter pages (`data-pagefind-body`) are indexed. | Pagefind CLI (index missing in `vite preview`), Fuse.js with a JSON index. |
| **yaml** | Reads chapter frontmatter for the navigation index (`virtual:content-index`) without loading chapter bodies. | Eager `import.meta.glob` of every chapter (puts all text into the navigation bundle). |
| **github-slugger** | Same heading ids as GitHub; Cyrillic headings keep readable anchors. `{#id}` sets a stable Latin id. | Custom slug function. |
| **Fonts vendored** in `src/lib/fonts/` (Golos Text, Unbounded, JetBrains Mono; variable woff2; Cyrillic + Latin subsets only; OFL licences alongside) | Self-hosted, `font-display: swap`, no runtime dependency; files taken from the `@fontsource-variable/*` 5.3.0 packages. | Keep `@fontsource-variable/*` as dependencies (ships the extra subsets too). |
| **Svelte MCP** not configured in the repo | The cloud environment blocks `svelte.dev`; the MCP server crashes at start-up without it. `svelte-autofixer` was run offline from `@sveltejs/mcp` 0.1.27 on every Svelte file; remaining hints are about `$effect`/`bind:this` used for scroll tracking, dialogs and popovers, which is intended. | Run `npx sv add ai-tools` locally where `svelte.dev` is reachable. |

## Routing and GitHub Pages

| Decision | Why | Alternatives |
| --- | --- | --- |
| `paths.base = '/second-brain-guide'` in dev and build; `BASE_PATH=''` overrides it | Repo name from the project instructions; same URLs locally and on Pages. | Empty base in dev (SvelteKit docs example). |
| `trailingSlash: 'always'` | Every page is `<path>/index.html`, so `/guide` and `/guide/05-git-github` never clash with a same-named `.html` file on a static host. | `'never'` (default) writes `guide.html` next to `guide/`. |
| Content links are written root-relative (`/guide/05-git-github#a`) and rewritten at build time | Authors don't think about the base path; the rehype step adds base and trailing slash. | Authors write the base. |
| `prerender.handleMissingId: 'warn'` | Chapters may link to anchors in chapters that are still stubs. Missing pages still fail the build. | `'fail'`. |
| `static/.nojekyll` | Stops Jekyll from hiding `_app/` if the site is pushed as files. | — |

## Content model

| Decision | Why | Alternatives |
| --- | --- | --- |
| Stubs are real Markdown files with `stub: true` and a working title derived from the slug | Navigation, search and cross-links work from day one; the owning part overwrites the file and sets the real title. | Stubs generated from a slug list in code. |
| Frontmatter `time` is minutes (number); `prereqs` are chapter paths like `guide/02-project` or plain text; `short` is an optional bar title; `part` is optional | Lets components render "20 мин" and link prerequisites. Stubs leave `part` out because the part→chapter map lives in `INDEX.md`, which part threads don't read. | Free-text time. |
| Prev / next stay inside a section | Гайд, Advanced and Справочник are read separately. | One chain across all sections. |
| The `00-roadmap` stub carries test headings | For the reviewer's skim of the reading bar; replaced by the chapter's author. | A separate test page. |
| Generic components are auto-imported in `.md` files | Authors write tags only; fewer broken chapters. | Explicit `<script>` imports. |

## Design tokens (final values, `src/app.css`)

Dark is the default; light applies under `[data-theme="light"]` and under `[data-theme="system"]` with `prefers-color-scheme: light`.

| Token | Dark | Light | Note |
| --- | --- | --- | --- |
| `--bg` | #0B1220 | #F3F4F8 | |
| `--surface` | #111A2C | #FFFFFF | |
| `--sunk` | #0E1626 | #EAEDF5 | |
| `--line` | #19253B | #D6DAE5 | |
| `--line-strong` | #2A3550 | #B9C0D0 | |
| `--ink` | #E6E9F1 | #19202D | 15.4:1 / 14.9:1 on bg |
| `--muted` | #94A3B8 | #5B6476 | 7.3:1 / 5.4:1 on bg |
| `--accent` | #3B82F6 | #2D47D4 | strokes, fills, progress line |
| `--accent-ink` | #6EA8FE | #2D47D4 | link text; the dark accent itself is only 5.1:1, too close to the limit on surfaces |
| `--accent-soft` | #10233F | #E3E8FC | |
| `--mark` | rgba(255,212,56,.34) | #FFE15A | |
| `--blue` / `-soft` / `-ink` | #3B82F6 / #10233F / #7DB3FF | #2563EB / #E6EEFE / #1D4ED8 | you, coordinator, main idea, links |
| `--violet` / `-soft` / `-ink` | #8B5CF6 / #1C1838 / #B39DFB | #7C3AED / #F0EBFE / #6D28D9 | threads, agents |
| `--amber` / `-soft` / `-ink` | #F59E0B / #2A1D06 / #F8B84A | #D97706 / #FEF3DC / #92400E | tokens, cost, checks, important |
| `--green` / `-soft` / `-ink` | #22C55E / #0D2A1A / #4ADE80 | #16A34A / #E3F5EA / #166534 | done, `main`, tips |
| `--red` / `-soft` / `-ink` | #EF4444 / #2A1010 / #F87171 | #DC2626 / #FDE8E8 / #B91C1C | danger |

Why the `-ink` tokens: the stroke colours are not readable as text on their own tinted fill in every case (violet #8B5CF6 on #1C1838 is 4.0:1, amber #B45309 on #FEF3DC 4.6:1, green #15803D on #E3F5EA 4.4:1). Each `-ink` value is at least 4.5:1 on its fill.

Type: body Golos Text 17 px / 1.6; h1–h2 Unbounded 600; h3 Golos Text 650; code JetBrains Mono. Radius 10 px (boxes, diagrams), 14 px (cards, sheets). Motion 150–250 ms, off under `prefers-reduced-motion`. Reading bar 44 px; tap targets 44 px.
