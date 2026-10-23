# Review: part 07, chapters 08, 12 and 13 (PR #9)

Reviewed on 2026-10-23 against `docs/spec/00-general.md`, `docs/parts/07-quality-deploy-security.notes.md` and the PR diff.
Two checks: fact-check and frontend skim.

## Result

- Facts: the claims I opened are supported by their saved links. One wording fix (below).
- Frontend: no horizontal page scroll at 360 px (dark and light) or 1440 px (dark) on any of the three pages. Two layout bugs fixed (below).
- `npm run build` → `Pagefind: indexed 28 pages`; `npm run check` → `COMPLETED 283 FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS`.
- Main was already merged into the branch (no conflicts).

## Fact-check

Opened and confirmed:

- SvelteKit adapter-static: `paths.base` must match the repo name, `.nojekyll` only when not deploying with Actions, `fallback: '404.html'`, example workflow passes `BASE_PATH` from `actions/configure-pages` and uploads `build/`, deploy job has `pages: write` and `id-token: write`, `ssr` must not be `false`.
- Claude Projects page: cloud threads do not apply permission rules, hooks or `env` from a repository's `.claude/settings.json`; approvals happen inside the thread. The project-instructions example line matches.
- Cloud environments page: environment variables are readable by anyone using the environment; network secrets stay outside the VM, can't be viewed again, available on Pro, Max, Team and Enterprise; the GitHub proxy rejects branch deletions and non-branch pushes but doesn't limit which branches.
- web.dev install criteria (HTTPS, name/short_name, 192 and 512 px icons, start_url, display); Android developer verification FAQ (30 Sep 2026 for participating stores, sideloading not yet affected, ADB exempt, 20 devices, one-day wait); Netlify preview URL pattern `deploy-preview-<n>--site.netlify.app`.
- Chapter 08 numbers match the scratch runs in the notes (3350 / 3347 / 3303, ±47 spread).

## Fixed

1. **Timer throttling wording (chapter 08).** The page said Chrome checks hidden-page timers once a minute "after five minutes". The source gives that only under extra conditions (chained timers, silent for 30 s). Now "может проверять раз в минуту".
2. **Raw Markdown link in chapter 12.** A paragraph that starts with a component (`<Term … />`) is not parsed as Markdown by mdsvex, so the PWA paragraph showed `[«Стек и скорость»](/guide/10-stack-speed#android)` as plain text. The same start also lost its `<p>` wrapper in the first paragraph of the deploy section. Both paragraphs now start with text.
3. **Diagram labels crossed the arrows (chapter 13).** In the key-proxy diagram the small labels sat on the arrow lines. Moved next to the arrows.

## Not changed

- The hosting-table row «Чем хорош» is a short judgment call from the writer, as the notes say.
- The deploy stepper describes a workflow that doesn't exist in the repo yet; the owner adds it when deploying (open question in the notes, left as is).
- The APK build could not run here; the chapter correctly sends it to Android Studio.
- Other chapters have the same "paragraph starts with `<Term>`" pattern: `07-agent-team` line 55 shows a raw Markdown link (`[Anthropic](…)`) and several paragraphs in chapters 01, 02, 03, 05 and 07 lose their `<p>` wrapper. Not part 07's files; part 10 should fix them (start the paragraph with text or fix the component).
