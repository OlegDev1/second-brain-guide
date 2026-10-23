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
