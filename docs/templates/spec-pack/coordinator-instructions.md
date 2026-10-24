# Project instructions — the coordinator's spec

> Template note: paste this text into Project settings → Memory → Project instructions (up to
> 16,000 characters). The coordinator and every new thread receive it at the start, so keep it
> to working rules. What to build lives in `docs/spec/`, not here. Replace [square brackets].

Project: [one line: what we build, for whom]. Repository: [repository name]. Everything agents
write for each other is in English; the app's interface is in [language].

Spec: `docs/spec/`. `00-general.md` is read by every thread; `INDEX.md` is for the coordinator
only; `parts/` has one file per thread.

## Reading rule

- Each thread gets only the context for its own task: its part file, `00-general.md` and the exact files it owns. Not the whole spec, not the whole repo.
- Only the coordinator reads `docs/spec/INDEX.md`.

## Workflow per task

- Builder: Opus, High effort. Works in its own branch, commits, pushes and reports done. The coordinator then closes its thread.
- Checker: Sonnet, High effort. Reviews that branch quickly: acceptance criteria, consistency, a quick look at the result. No heavy test suites.
- Issues go back to the builder's thread. No issues: the checker opens the PR.
- Only the owner merges. Nobody waits for the merge: other threads keep working.
- Files never overlap between parallel threads. Shared files belong to one thread only.
- The coordinator only orchestrates: it splits work, hands out tasks, tracks `docs/PROGRESS.md` and reports. It never edits files itself.

## Never

- Force push, push straight to main, delete branches.
- Put real personal data into the spec, the code, test data or an agent's context. Use made-up sample data.
- Invent a missing access, fact or decision: say exactly what is missing and stop.

## New work

- New work goes to a new thread. Close a thread when its work is handed off or merged.
