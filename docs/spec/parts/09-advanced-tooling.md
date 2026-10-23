# Part 09 — Advanced II: tooling, CI, economics, large teams

**Model:** Opus, High. **Depends on:** wave 5 closed; reuses the token calculator from part 03, already checked and merged. **Wave:** 6.

## Goal

Advanced chapters `a3-claude-code-advanced`, `a4-ci-cd`, `a6-economics` and `a7-large-teams`: how the author can push Claude Code further on the friend's app, when automation pays off, what features cost to run, and what large agent teams teach a one-person project.

## Includes

Every Advanced chapter starts with a "для кого" callout and a link to the Part I chapter it deepens.

**A3 — Advanced Claude Code for this project** (deepens `04-project-files`, `07-agent-team`)
- Subagents in `.claude/agents/` with their own tools and model; when a subagent beats a thread.
- Skills: "new module", "DB migration", "release"; writing a description so the skill triggers at the right moment.
- Hooks: formatting and `svelte-check` after edits; blocking `git push --force` and dangerous deletes.
- Permissions in `.claude/settings.json`: what applies in cloud threads with one repository vs several.
- MCP in a project: Svelte MCP; GitHub is built into cloud sessions; connectors.
- Routines: weekly code cleanup, dependency updates, a speed report.
- A thread on your own computer via Remote Control: Android emulator, local database.

**A4 — CI/CD and quality control** (deepens `08-testing`, `12-deploy`)
- When the app grows: a GitHub Actions pipeline — cached install, lint, `svelte-check`, unit and e2e tests, Lighthouse with budgets, APK as an artifact.
- `main` protection, required checks, squash merge, conventional commits → automatic changelog and versions.
- Renovate or Dependabot; preview deploys; visual regression with thresholds.
- The trade-off: every failed check wakes a project thread to fix it, which spends limit. Worth it for the app at scale, not for a small site like this guide.

**A6 — Economics and model choice** (deepens `09-tokens-limits`)
- Subscription for development, API for features inside the app.
- Prices and model names only from the pricing page on the date of writing. Caching, batches, small models for routine calls.
- Worked example: «разбор голосовой заметки» — tokens per request × requests per day × 30, for two model choices.
- Reuse `src/lib/components/tokens/TokenCalculator.svelte` from part 03 (read its header comment for props). Don't modify it; if a change is needed, describe it under Open questions.

**A7 — How large agent teams work** (deepens `07-agent-team`)
- Anthropic: 16 agents write a C compiler — task lock files in git, near-perfect tests, quiet logs, frequent conflicts ([1]).
- OpenAI: a short `AGENTS.md` as a map, knowledge in `docs/`, agent-to-agent review, background cleanup agents ([14]).
- METR: feeling fast ≠ being fast; measure results ([15], [16]).
- What to take into a one-person project and what is overkill (a short CompareTable).

**Components:** generic only, plus the existing TokenCalculator. No new shared components.

## Excludes

- Data, integrations and performance → part 08.
- Token mechanics basics → part 03; link instead of repeating.
- Basic project files → part 05.

## Output

`src/content/advanced/a3-claude-code-advanced.md`, `src/content/advanced/a4-ci-cd.md`, `src/content/advanced/a6-economics.md`, `src/content/advanced/a7-large-teams.md`, `docs/parts/09-advanced-tooling.notes.md`. PR title: `Part 09: Advanced A3, A4, A6, A7`.

## Sources

The researcher saves a source for every key fact into the notes Sources table as it is found, so the fact-checker checks the saved link instead of searching again. Key facts here: subagents, skills, hooks, permissions, routines, Remote Control (code.claude.com); GitHub Actions and branch protection (docs.github.com); model prices and batch discounts (Anthropic pricing page, with date); PDF [1], [14], [15], [16] with original URLs.

## Done when

- Build and check pass; every price has a source and a date.
- A6 uses the calculator without changing it.
