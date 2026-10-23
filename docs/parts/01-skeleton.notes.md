# Part 01 — Skeleton and design system: notes

## Sources

Checked on 2026-10-23. Package facts come from the npm registry JSON (what `npm view` reads).

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| SvelteKit 2.70.3 is the newest 2.x release (2026-08-18) | DECISIONS.md: Stack | https://registry.npmjs.org/@sveltejs/kit | 2026-10-23 | `time["2.70.3"]`, versions list |
| npm `latest` for SvelteKit is 3.1.0; 3.0.0 published 2026-10-01 | DECISIONS.md: Stack | https://registry.npmjs.org/@sveltejs/kit | 2026-10-23 | `dist-tags.latest`, `time["3.0.0"]` |
| SvelteKit 2.70.3 peers: vite ^5–^8, plugin-svelte up to ^7, TypeScript ^5.3.3 or ^6 | DECISIONS.md: Stack | https://registry.npmjs.org/@sveltejs/kit/2.70.3 | 2026-10-23 | `peerDependencies` |
| Svelte 5.57.2 is the latest Svelte 5 | DECISIONS.md: Stack | https://registry.npmjs.org/svelte/5.57.2 | 2026-10-23 | `dist-tags.latest` in the package document |
| mdsvex 0.12.8 accepts Svelte 5 | DECISIONS.md: Stack | https://registry.npmjs.org/mdsvex/0.12.8 | 2026-10-23 | `peerDependencies.svelte`: "^5.0.0-next.120" |
| adapter-static 3.x targets SvelteKit 2 | DECISIONS.md: Stack | https://registry.npmjs.org/@sveltejs/adapter-static/3.0.10 | 2026-10-23 | `peerDependencies["@sveltejs/kit"]`: "^2.0.0" |
| GitHub Pages: set `paths.base` to the repo name; generate a `404.html` fallback | DECISIONS.md: Routing | https://raw.githubusercontent.com/sveltejs/kit/%40sveltejs/kit%402.70.3/documentation/docs/25-build-and-deploy/50-adapter-static.md | 2026-10-23 | "## GitHub Pages": "update config.kit.paths.base to match your repo name" |
| Add `.nojekyll` in `static` when not deploying via GitHub Actions | DECISIONS.md: Routing | same as above | 2026-10-23 | "add an empty .nojekyll file in your static directory" |
| `trailingSlash: 'always'` prerenders `about/index.html` | DECISIONS.md: Routing | https://raw.githubusercontent.com/sveltejs/kit/%40sveltejs/kit%402.70.3/documentation/docs/20-core-concepts/40-page-options.md | 2026-10-23 | "## trailingSlash": "will result in an about/index.html file" |
| Dynamic routes need `entries` to be prerendered | DECISIONS.md: Routing | same as above | 2026-10-23 | "## entries" |
| Pagefind indexes only pages with `data-pagefind-body` once any page has it | DECISIONS.md: Stack | https://raw.githubusercontent.com/Pagefind/pagefind/main/docs/content/docs/indexing.md | 2026-10-23 | "any pages without this attribute will not be indexed" |
| Pagefind Node API: `createIndex`, `addDirectory` with `glob`, `writeFiles` with `outputPath` | DECISIONS.md: Stack | https://raw.githubusercontent.com/Pagefind/pagefind/main/docs/content/docs/node-api.md | 2026-10-23 | "## index.addDirectory", "## index.writeFiles" |
| Pagefind `baseUrl` prefixes result URLs on a subpath | DECISIONS.md: Stack | https://raw.githubusercontent.com/Pagefind/pagefind/main/docs/content/docs/search-config.md | 2026-10-23 | "### Base URL" |
| `pagefind.debouncedSearch` returns null when superseded | src/lib/components/layout/SearchDialog.svelte | https://raw.githubusercontent.com/Pagefind/pagefind/main/docs/content/docs/api.md | 2026-10-23 | "returns null if a subsequent call" |
| Pagefind 1.5.2 is current | DECISIONS.md: Stack | https://registry.npmjs.org/pagefind/1.5.2 | 2026-10-23 | `version` |
| Fonts: Golos Text, Unbounded, JetBrains Mono under SIL OFL 1.1; Cyrillic/Latin woff2 subsets and their unicode ranges | src/app.css | https://registry.npmjs.org/@fontsource-variable/golos-text/5.3.0 (and `/unbounded/5.3.0`, `/jetbrains-mono/5.3.0`) | 2026-10-23 | `license`; package `unicode.json`; LICENSE files copied to `src/lib/fonts/` |
| `svelte.dev` is blocked from the cloud environment, so the Svelte MCP can't start | DECISIONS.md: Stack | https://svelte.dev/llms.txt | 2026-10-23 | proxy answered 403 `connect_rejected` |
| Contrast ratios of the tokens | DECISIONS.md: Design tokens | https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio | 2026-10-23 | computed with the WCAG 2.1 relative-luminance formula |

## New terms

None. The glossary is seeded from the terminology table in `00-general.md`; the Russian one-line definitions in `src/lib/glossary.ts` translate its "Meaning" column.

## Ready phrases

None in this part.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Search says «Поиск работает в собранной версии сайта» | `npm run dev` has no Pagefind index | `npm run build`, then `npm run preview` |
| Build fails with a YAML error in frontmatter | A value contains `:` | Quote it: `title: "Claude Code: приёмы"` |
| Markdown inside a component shows raw `**` or `-` | No blank line between the tag and the Markdown | Leave a blank line after the opening tag and before the closing tag |
| Build fails: "slug must match the file name" | `slug` in frontmatter differs from the file name | Make them equal |
| Prerender warns about a missing `#id` | Link to an anchor in a chapter that isn't written yet | Fine while the target is a stub; part 10 checks links |

## Open questions

1. **SvelteKit version.** The spec says SvelteKit 3 is a prerelease, but 3.0.0 became npm `latest` on 2026-10-01. This part follows the project instructions and uses 2.70.3. Moving to 3.x is the owner's call.
2. **Stub titles** are working titles derived from the slugs (e.g. `05-git-github` → «Git и GitHub»). Each content part sets the real title.
3. **`part` frontmatter field** is left out of the stubs: the part→chapter map is in `INDEX.md`, which this part doesn't read.
4. **Svelte MCP** isn't set up in the repo because `svelte.dev` is blocked here; run `npx sv add ai-tools` on a machine that can reach it, if wanted.
5. **Home hub** shows the hero and the three tabs with chapter cards only; roadmap and hub content belong to part 10.
