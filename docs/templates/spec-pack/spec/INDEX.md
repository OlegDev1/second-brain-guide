# Index — parts, order, parallelism

For the coordinator only. Threads don't read this file: each gets only its own part.

> Template note: this is the coordinator's plan. It answers three questions: which parts exist,
> in which order they run, and which files each part owns. Keep it short; the details of each
> part live in its own file in `parts/`.

## Parts

| # | Part | Covers | Owns files | Depends on | Wave |
| --- | --- | --- | --- | --- | --- |
| 01 | [Skeleton] | [App shell, navigation, design tokens, empty screens] | [src/lib/app/, src/app.css] | — | 1 |
| 02 | [Feature A] | [What the user can do] | [src/lib/features/a/] | 01 | 2 |
| 03 | [Feature B] | [What the user can do] | [src/lib/features/b/] | 01 | 2 |
| 04 | [Feature C] | [What the user can do] | [src/lib/features/c/] | 02 | 3 |

## Order and waves

1 → check → 2 (02 ∥ 03) → check → 3 → check

- A wave starts when every PR of the previous wave is checked. A mistake left in one wave travels into the next.
- Parts in the same wave run in parallel only when their "Owns files" never overlap.
- The skeleton goes first and alone: later parts only add their own folders to it.

## Ownership rules

- A part edits only the files listed in its row, plus its own row in `docs/PROGRESS.md`.
- Shared files belong to one part. If another part needs a change there, it writes the request under "Open questions" in its report instead of editing the file.

## Workflow per part

- Builder: Opus, High effort. Builds in its own branch, commits, pushes, reports done. Its thread is then closed.
- Checker: Sonnet, High effort. Reviews that branch quickly against the acceptance criteria.
- Issues go back to the builder's thread. No issues: the checker opens the PR.
- The owner merges. Nobody waits for the merge: other threads keep working.

Status of every part lives in `docs/PROGRESS.md`.
