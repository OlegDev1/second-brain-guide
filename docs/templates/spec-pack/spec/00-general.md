# General spec — read by every agent

> Template note: every thread reads this file at the start of every task, so each line costs
> tokens many times over. Keep it to what EVERY agent needs. Details of one feature go into its
> part file in `parts/`. Replace everything in [square brackets]; delete these notes when done.

## Goal

[One or two sentences: what we build and for whom. Example: "A personal productivity web app
for one user: inbox, tasks, focus timer, habits."]

## Users

- [Who uses it and what they need from it. One line per kind of user.]

## Stack and architecture

- [Stack, e.g. "Svelte 5 + SvelteKit, static build". If you are not sure, let the spec chat propose one and say why.]
- [Where the data lives, e.g. "on the device only (IndexedDB), no server".]
- Each feature lives in its own folder and never edits another feature's files.

## Language

- [Language of the app's interface.]
- Everything agents write for each other — code, comments, docs, commits, PRs — is in English.

## Rules for every feature

- [Rules that apply everywhere: speed targets, offline behaviour, design tokens, accessibility.]
- No real personal data anywhere: not in the spec, the code, test data or an agent's context. Use made-up sample data.

## What we don't build

- [Things that are explicitly out of scope for this version. This list saves the most tokens:
  without it an agent may "helpfully" add a login screen nobody asked for.]

## Terms

| Term | Meaning |
| --- | --- |
| [term] | [one-line meaning, so every agent uses the same word] |

## How agents work

> Template note: this is the workflow that keeps tokens low. Change it only if you know why.

- One part of the spec = one thread = one branch = one PR.
- A thread reads only this file and its own part file in `parts/`. It never opens other part files. Only the coordinator reads `INDEX.md`.
- Threads that run at the same time never edit the same files. Shared files (navigation, global styles, home page) belong to one thread only.
- **Two agents per task.** A builder (Opus, High effort) writes the code, commits, pushes and reports done; then its thread is closed. A checker (Sonnet, High effort) reviews the branch against the acceptance criteria. If there are issues, they go back to the builder's thread — the only time it is reopened. If not, the checker opens the PR.
- Only the owner merges. Agents never merge and never force push.
- At the end of a task, the thread updates its own row in `docs/PROGRESS.md`.
- Commit and push work in progress regularly.
- If an access, fact or decision is missing: say exactly what is missing and stop. Never invent.

## Checks

- The builder checks its feature against the acceptance criteria in its part file.
- Short automated tests only for logic with randomness, time or reminders. No heavy test suites or CI at the start.
