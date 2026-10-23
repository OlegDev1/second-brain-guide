# Part 07 — Quality, deploy, security

**Model:** Opus, High. **Depends on:** 02. **Wave:** 5, in parallel with 08.

## Goal

Chapters `08-testing`, `12-deploy` and `13-security`: making "done" mean "works" in the friend's app, turning the repo into a link and an icon on the phone, and not leaking keys or losing personal data.

## Includes

**Chapter 08 — Testing and quality (for the friend's app, not this site)**
- Why an author checks himself badly ([2]) and why tests guard the code ([1]: checks that block code breaking old features; passing tests ≠ finished work).
- Levels: unit, component, end-to-end "like a user", screenshots, manual check on the phone — and when each is worth its tokens. Default for the friend: short tests only for logic with randomness, time and reminders; everything else checked by hand against acceptance criteria.
- Testing randomness in «Выбери за меня»: 10,000 runs; every task appears at least once; frequencies close to expected; a fixed seed; edge cases 0 / 1 / many.
- Focus timer: fake clocks; what Android does to timers in the background and with the screen locked.
- Reminders: correct time with time zones and daylight saving.
- A 5-minute review checklist the friend runs at each checkpoint.

**Chapter 12 — Deploy and running on the phone**
- Hosting options: GitHub Pages (what this site uses), Cloudflare Pages, Vercel, Netlify; deploy from `main`; preview links per PR where the host offers them; custom domain.
- GitHub Pages specifics for a SvelteKit static site: base path, `.nojekyll`, deploy from Actions.
- Installing a PWA on Android; updates («доступна новая версия»).
- APK via Capacitor: build, signing, installing outside the store. Google Play terms and fees — verify on the date.
- Environment variables: what is public in a static site and what never is.

**Chapter 13 — Security and personal data**
- API keys: never in chat, in the repo or in browser code — anyone can read a key in client code. Where they belong: hosting or cloud-environment secrets, a small server-side proxy.
- A key leaked: revoke and reissue; deleting it from history is not enough.
- Personal data: stored locally, backups, optional encrypted export; the code repo is private.
- Agent permissions: forbid force push and branch deletion in `.claude/settings.json`; list in project instructions what needs the owner's OK.
- Prompt injection: text from web pages and files is data, not commands; don't give agents secrets they don't need.

**Components and blocks**
- Chapter 08: Checklist (#38) "review a feature in 5 minutes"; an example `BUGS.md` entry in a CodeBlock.
- Chapter 12: Steps (#23) "first deploy to GitHub Pages"; Tabs Сайт / Телефон (#22).
- Chapter 13: Callout danger blocks; Checklist "security before release".
- No new shared components.

## Excludes

- CI/CD pipelines, branch protection automation, release tooling → part 09 (`a4-ci-cd`).
- Git rollback → part 02. Permissions and hooks in depth → part 09 (`a3-claude-code-advanced`).
- Notifications architecture → part 06 (`10-stack-speed`); link only.

## Output

`src/content/guide/08-testing.md`, `src/content/guide/12-deploy.md`, `src/content/guide/13-security.md`, `docs/parts/07-quality-deploy-security.notes.md`. PR title: `Part 07: chapters 08, 12 and 13`.

## Sources

The researcher saves a source for every key fact into the notes Sources table as it is found, so the fact-checker checks the saved link instead of searching again. Key facts here: PDF [1], [2], [3], [17] with original URLs; GitHub Pages and SvelteKit static deployment (docs.github.com, svelte.dev); PWA install and update behaviour (web.dev, MDN); Capacitor build and signing (capacitorjs.com, developer.android.com); Google Play fees (Play Console help); Claude Code permissions and security (code.claude.com).

## Done when

- Build and check pass; every platform fact and fee has a source with a date.
- The deploy stepper matches how this site is actually deployed.
