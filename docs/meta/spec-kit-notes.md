# Spec kit prompt — working notes

**Task ID: META-1.** Owner: John. Builder: Opus 5.5 (high), one thread, no Sonnet review (John reviews).
Branch: `claude/project-thread-8uzqlq`. Files: `docs/meta/spec-kit-prompt.md` (the template) and this file.
No PR and no merge until John says so.

## Checkpoint

| Step | Status | Next |
| --- | --- | --- |
| 1. Study the project | done (2026-10-25) | — |
| 2. Questions to the coordinator | sent, waiting | apply answers below |
| 3. Gap report and critique | not started | |
| 4. Template v1 | not started | |
| 5. Rounds with John | not started | |

A fresh thread resumes by reading this file top to bottom, then `git log` of this branch.

---

## Step 1. The real structure

What follows is how the project actually runs, from the repo, the PRs, git history and the coordinator's
facts (2026-10-25). Where Appendix B or the Step 4 checklist of John's task disagree, the difference is in
"Differences from the task message" at the end of this section.

### 1.1 File tree of the agent docs

```text
(outside the repo)
  Project instructions        1,810 characters, Project settings → Memory → Project instructions
  Project memory              off in this project; nothing kept there
  Library                     spec/ (starter copy, frozen at the version from before PR #4),
                              source materials (PDF deck, HTML scheme, Guide Structure Catalog),
                              reviews/02-git-github-review.md (one early review copied there)

(repo)
  CLAUDE.md                   29 lines, 1.4 KB
  README.md                   humans: commands, deploy note, "Agents: start with CLAUDE.md"
  .github/workflows/deploy.yml   build + publish to GitHub Pages on push to main (deploy only, no tests)
  docs/
    spec/
      00-general.md           146 lines, 12 KB — goal, readers, language, site map, style, terms,
                              result format, sources rules, G1–G7, workflow
      INDEX.md                55 lines — parts table, wave order and gates, ownership rules,
                              a section per later wave
      parts/01…10-*.md        one per part of the first build (54–131 lines each)
      waves/fixes-wave.md     John's fixes-wave brief, verbatim, + agents-scheme.png
    PROGRESS.md               one row per part (+ one row "Fixes 1"); stale since the fixes wave
    DECISIONS.md              tables: decision | why | alternatives (stack, routing, content model, tokens)
    STYLE.md                  voice rules + 15 "reference decisions" + 3 excerpts, set by part 02
    COMPONENTS.md             catalogue of generic components (props + usage), 178 lines
    parts/NN-*.notes.md       per-part notes: Sources table, New terms, Ready phrases,
                              Troubleshooting, Open questions, later "<Wave> (date)" sections
    reviews/NN-*.md           reviewer reports, first build only (waves 1–7)
    templates/spec-pack/      the downloadable template pack (source of static/downloads/spec-pack.zip)
    meta/                     this task
  (no docs/BUGS.md, no docs/features/, no .claude/, no AGENTS.md, no test files)
```

### 1.2 What each file is for, who writes, who reads, when it changes

| File | Purpose | Writes | Reads | Changes |
| --- | --- | --- | --- | --- |
| Project instructions | Working rules for coordinator and every thread: project line, where the spec is, reading rule, workflow, never-list | John (in settings) | Coordinator and every new thread, automatically | When the workflow changes (it was rewritten for the fixes wave). Only new threads see edits |
| Library `spec/` | Starter copy of the spec, so the coordinator sees it before the repo has anything | John, once, at project creation | Coordinator; part 01 thread copied it into the repo | Never after the first PR |
| Library source materials | Research and references (PDF deck, HTML scheme, component catalogue) | John | A thread only when its part file cites them | Never |
| `CLAUDE.md` | Map: read-before-task list, where things are, commands, code rules, never-list | Part 01 thread from a template in its part file; one line added in PR #4 | Every thread, automatically, at start | Rarely (twice). Now partly stale (mentions part files and reviewer reads; no G-rules, no wave briefs) |
| `00-general.md` | Shared rules for every thread; G1–G7 since the fixes wave | Spec chat (first version); then whichever thread owns `docs/spec` in a wave | Every thread | Each wave adds a section; old rules are overridden by a "this section wins" line, not deleted |
| `INDEX.md` | Coordinator's map: parts, owned files, waves, gates, ownership | Spec chat; thread that owns `docs/spec` | Coordinator only | Each wave appends a section |
| `parts/NN-*.md` | One thread's whole task for the first build: goal, includes, excludes, owned files (Output), sources, done-when | Spec chat | That one thread | Never edited after the build; later waves had no part files |
| `waves/<name>.md` | John's brief for a later wave, verbatim | The thread that owns `docs/spec` in that wave (coordinator never edits files) | Coordinator; reviewers when they need a G-rule | Once per wave (only the fixes wave is saved; the polish wave left one line in 00-general) |
| `PROGRESS.md` | Status table, one row per part | Each thread, only its own row | Coordinator, John | At the end of each task. Nobody flips a row to "done" after John merges, so it goes stale |
| `DECISIONS.md` | Decision, why, alternatives; "new dependency needs a line" | Builder that decides | Builders before changing stack or structure | When a decision is made (mostly part 01) |
| `STYLE.md` | Voice and conventions; the reference chapter fixed them | Part 01 (copy), part 02 (decisions + excerpts) | Every content thread | Once after the reference part |
| `COMPONENTS.md` | Reusable blocks: name, props, example | Part 01 (owner of shared components) | Every builder that writes pages | When a generic component is added |
| `docs/parts/*.notes.md` | Working notes per part: sources with locators, terms, phrases, troubleshooting, open questions; later the builder's changelog for the reviewer ("Fixes wave (date)") | The part's builder | Its reviewer; part 10 compiled them into reference pages | During the task; one section added per later wave |
| `docs/reviews/*.md` | Reviewer report: what was checked, what was fixed, what is left | Reviewer | John, coordinator | Once per review, first build only. In the fixes and polish waves the report went into the PR description instead |
| `docs/templates/spec-pack/` | Public template pack (project content stripped) | Fixes-wave builder 2 | Site readers | When the method changes |
| `deploy.yml` | Publish after every push to `main` | Added by a thread in PR #12 on John's request | GitHub Actions | Once |

### 1.3 The flow of a task, from John's brief to John's merge

**First build (waves 1–7, 2026-10-23/24), part files:**

1. John and a plain claude.ai chat wrote the spec, already split (`00-general`, `INDEX`, 10 parts). John added it
   to the Library at project creation and pasted Project instructions.
2. Part 01 (skeleton) ran alone: copied `spec/` into `docs/spec/`, built the shell, wrote `CLAUDE.md`,
   `PROGRESS.md`, `STYLE.md`, `DECISIONS.md`, `COMPONENTS.md` from templates in its part file.
3. Part 02 (reference chapter) ran alone and fixed the voice in `STYLE.md`; John approved the voice.
4. Waves 3–7: at most two part threads at once, each owning different files.
5. Writer (Opus high) did the part, ran build + check, filled its notes file, opened the PR.
6. Checks: originally two non-fixing threads (Sonnet fact-check, Haiku screenshots). From PR #4 on, one Sonnet
   (high) reviewer: fact-checked against the saved Sources rows, skimmed 360/1440 px, fixed what it found,
   wrote `docs/reviews/NN.md`, and merged.
7. Wave gate: next wave only after every PR of the wave was reviewed and merged, and only when John asked.
8. Deploy workflow came last (PR #12), on John's request.

**Later waves (fixes wave 2026-10-24, polish wave), no part files:**

1. John posts a brief in the project chat (English, with rules G1–G7, task IDs N1–N4, per-chapter tasks).
2. Coordinator answers with the split (agent → task IDs) and starts without waiting for OK.
3. The builder that owns `docs/spec` saves the brief verbatim into `docs/spec/waves/` and folds the global rules
   and workflow into `00-general.md` and `INDEX.md` (commit 0e161a7, which reached `main` only with that
   builder's PR).
4. Coordinator starts up to 5 builder threads (Opus high) in parallel. Each gets a short instructions block:
   task IDs, G-rules, the exact files it owns, branch, rules — plus John's message attached. Shared files
   (sidebar, top bar, TOC, global styles, home page, diagram components, `docs/spec`) all go to builder 1.
5. Builder: own branch, commits, pushes, adds a "<wave> (date)" section to its notes file and updates its
   PROGRESS row, reports done once with the branch name. No tests, a passing build is enough. No PR.
   Coordinator resolves the builder's thread.
6. Coordinator starts a fresh Sonnet (high) reviewer thread with the branch name and the builder's notes.
7. Reviewer: text logic and consistency, 1–2 checks per new interactive element, quick mobile/desktop look.
   Small fixes it commits on the branch itself (seen in PRs #17, #19). Leftovers in files owned by someone
   else go to the coordinator, which routes them to the owner of those files.
8. Reviewer opens the PR (the PR body is the review report) and assigns John. Nobody waits for the merge.
9. John merges; the deploy workflow publishes the site.
10. Coordinator sends John a short final report.

### 1.4 Known failures and the rules they produced

From the coordinator and the git history:

- A conflict-fix thread pushed to the builder's branch instead of the PR's head branch (merge commit 7ed33df on
  `…-a9bmj4`, while PR #19's head was `…-zr5pif`). Lesson: verify the PR head branch and GitHub's mergeable state
  before fixing a conflict.
- Reviewers couldn't find G1–G7 on `main` until the brief PR merged (PR #17 says so). Lesson: get the brief onto
  `main` before or together with the wave start.
- A small follow-up was committed onto an already-PR'd branch (PR #22 reuses the branch of merged PR #21),
  bypassing review. Lesson: after a PR is opened, new work is a new branch and a new review.
- `PROGRESS.md` is stale: rows still say "in review" for merged parts. No step flips a row after John's merge.
- Reviewer reports stopped going to `docs/reviews/` once reviewers opened PRs: the report lives only in the PR body.
- Early rule changes: two non-fixing checkers → one fixing reviewer (PR #4); reviewer merges → only John merges;
  wave gates → nobody waits for a merge; Haiku dropped; fact-checks against the web dropped.

### 1.5 Differences from the task message (repo wins)

| # | The message says | The project actually does |
| --- | --- | --- |
| D1 | Project instructions "were large", "up to 16,000" | 1,810 characters, ~11% of the 16,000 limit (limit confirmed on the Projects docs page, notes 04 and 05) |
| D2 | CLAUDE.md "up to 80 lines" | 29 lines. Anthropic's own target is under 200 lines |
| D3 | Every thread reads CLAUDE.md, 00-general, STYLE and its part file | True for the first build. Later waves had no part files: the coordinator's instructions block is the task |
| D4 | Wave briefs saved by the coordinator | The coordinator never edits files; the builder that owns `docs/spec` saves them. Only one of two later briefs is saved |
| D5 | Reviewer writes its report to `docs/reviews/` | Only in the first build. Later the report is the PR body |
| D6 | Builder's thread closes, issues "go back to the builder" | How exactly is open (question 3) |
| D7 | Checkpoints: PROGRESS row with last step / next step, notes in docs/parts | Not done. PROGRESS has status + PR + one-line notes; notes files hold sources and a per-wave changelog |
| D8 | PROGRESS.md "tried and failed", "how to run" (chapter 04 template) | Not in the real file; "how to run" is in CLAUDE.md/README; "tried and failed" lives in notes files (Troubleshooting) |
| D9 | `docs/BUGS.md`, `docs/features/` | Not used here (a content site, no bug backlog, no late big feature) |
| D10 | "At most two threads at once" | First build only. Fixes wave ran 5 builders in parallel |
| D11 | Builder writes tests where the spec asks (draft, ch. 07/08) | This project: no tests at all; the build is the only check |
| D12 | "No CI at the start" | Deploy workflow on every push to `main`; no test CI |
| D13 | Not in the message | Global rules have IDs (G1–G7) and wave tasks have IDs (N1–N4); old rules are overridden by a dated "this section wins" line, not deleted |
| D14 | Not in the message | Reference part first (part 02 fixed the voice in STYLE.md, John approved it), skeleton part owns all shared components; a named "wrap-up" part (10) may touch every file for terms and links only |
| D15 | Not in the message | Notes files carry a Sources table (claim, location, URL, date, locator) so the checker doesn't search again |
| D16 | Not in the message | Reviewer may make small fixes itself on the branch |
| D17 | Not in the message | The thread that opened a PR watches it and wakes on CI and comments, so the cheaper reviewer opens it (ch. 07) |
| D18 | Appendix B: `config/`, `src/routes/` etc. | Project-specific; only the idea "app code / agent docs / project settings" generalises (ch. 04 "three groups") |

---

## Step 2. Questions and answers

Sent to the coordinator on 2026-10-25. Answers go under each question.

1. **Project instructions size.** The current text is 1,810 characters. John remembers them as large. Was an earlier version longer (for the first build)? If so, its size and what was cut. Which lines mattered most in practice?
2. **Polish wave brief.** PRs #21/#22 ran a polish wave, but only one line of it is in `00-general.md`. Was that brief saved anywhere? Was it one builder + one reviewer?
3. **Issues back to the builder.** In the fixes and polish waves, did any reviewer send issues back? If yes: did you reopen the resolved builder thread (message it) or start a new builder thread with the list? Reviewers also committed small fixes themselves (PRs #17, #19): is that allowed, and where is the line between "fix it yourself" and "send back"?
4. **Checkpoints and limits.** Did any thread hit a usage limit or context limit and need a fresh thread? If so, what did the fresh thread read to resume? Was "commit and push work in progress regularly" the only checkpoint rule?
5. **Coordinator's internal files.** Since you never edit files, which thread updates `INDEX.md` and the wave section, and who should flip `PROGRESS.md` rows to "done" after John merges (they are stale now)? Do you keep anything outside the repo (Library, project files)?
6. **Reviewer report location.** First build: `docs/reviews/NN.md`. Later: PR body only. Which one does John want in the template?
7. **Builder → reviewer handoff.** Builders appended a "<wave> (date)" section to their notes file as the changelog for the reviewer. Is that the intended channel, or did you pass the builder's final report in your instructions block?
8. **Models in settings.** What are Coordinator model/effort and Thread model/effort in Project settings here? How was Sonnet chosen for reviewer threads: per spawn by you, or something else?
9. **Waves and checks in the fixes wave.** How did you decide 5 builders? When did you send the final report: after all reviewers opened PRs? Were cross-file leftovers (e.g. stale links in `glossary.ts`, `troubleshooting.md`) fixed in that wave or left?
10. **Failures.** Besides the three you listed: why were Haiku, two-checker reviews, reviewer merges and wave gates dropped (cost, speed, quality)? Anything else that went wrong (stalled threads, wrong branch base, an agent inventing facts)?
11. **Brief language.** John's fixes-wave brief was in English. Does John always write briefs in English, or may he write in Russian and the coordinator saves an English version?
12. **Project memory.** Off here. Should the template assume memory off (files + Project instructions only), or use it for something specific?
13. **Starter spec in the Library.** It is frozen at the pre-PR #4 version. Fine as "starter copy only", or should the template tell John to remove or replace it after the first PR?
