# Spec kit prompt — working notes

**Task ID: META-1.** Owner: John. Builder: Opus 5.5 (high), one thread, no Sonnet review (John reviews).
Branch: `claude/project-thread-8uzqlq`. Files: `docs/meta/spec-kit-prompt.md` (the template) and this file.
No PR and no merge until John says so.

## Checkpoint

| Step | Status | Next |
| --- | --- | --- |
| 1. Study the project | done (2026-10-25) | — |
| 2. Questions to the coordinator | done | — |
| 3. Gap report and critique | done | |
| 4. Template v1 | done (`spec-kit-prompt.md`) | send round 1 |
| 5. Rounds with John | public prompt handed to the coordinator for chapter 15 | wait for John |

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

Sent to the coordinator on 2026-10-25 (13 questions). Answered by the coordinator at 04:40 and by John (via the
coordinator) at 04:44. John confirmed the goal: a prompt that produces the same kit he uploaded to this project.

1. **Project instructions size; was an earlier version longer?** John (04:44): no info on a longer version; the
   instructions must have the same shape as this project's. Current text, 1,810 characters, is the model.
2. **Polish wave brief.** Exists only as John's chat message; never saved to the repo. Only the override note in
   `00-general.md`. One Opus builder, one Sonnet reviewer.
3. **Issues back to the builder.** Never exercised in the fixes or polish waves. Reviewer instructions allowed
   "trivial fixes yourself, list anything bigger so it goes back to the builder". In practice: small wording,
   TL;DR or CSS fixes inside the branch's own files. Plan for a send-back: message the resolved builder thread
   (that reopens it).
4. **Checkpoints and limits.** No thread hit a limit as far as the coordinator knows. "Commit and push WIP" was the
   only checkpoint rule.
5. **Coordinator's files.** Builder 1 of the fixes wave updated INDEX, 00-general and PROGRESS on instruction.
   Nobody flips PROGRESS rows to done after a merge (real gap). Outside the repo: Project instructions and the
   Library spec copy only.
6. **Reviewer report location.** John has no preference; I chose the PR body (see d12).
7. **Builder → reviewer handoff.** The coordinator passed the builder's report (branch, summary, flags) in the
   reviewer's instructions. Notes files were secondary.
8. **Models.** Set per spawn: Opus high for builders, Sonnet high for reviewers. Project-level defaults not
   visible to the coordinator.
9. **Fixes wave.** Five builders because John made speed the priority and files split cleanly. Final report
   after all five PRs were open. Cross-file leftovers (glossary, troubleshooting, ch. 10, phrases) were routed
   to the reviewer that owned those files and fixed in PR #18.
10. **Why rules were dropped.** Haiku: John dropped it explicitly. Two checkers, reviewer merges, wave gates:
    John: the Haiku checkers didn't work well; quality comes first, speed second, and speed must never cost quality.
    The coordinator can't see why reviewer merges and gates were dropped. Extra known failure: the claim "agents message each other" in ch. 07 was unsourced.
11. **Brief language.** Unanswered; template allows either, the docs/spec owner saves an English version.
12. **Memory.** Off. Template assumes files + Project instructions only.
13. **Library starter spec.** Keep it as a starter copy; the recap explains in one line what it is.

---

## Step 3. Gap report and critique

Draft vs real project. "Draft" = Appendix A (= the published `starter-prompt.txt`, Russian, identical in content;
chapter 15 imports that file, so page and draft are the same text line by line).

### a) In the project, missing from the draft

1. A full file map beyond spec/: `STYLE.md`, `DECISIONS.md`, `COMPONENTS.md`, `docs/parts/` notes, `docs/reviews/`,
   `docs/spec/waves/`.
2. Numbered global rules (G1…Gn) and task IDs, so instructions cite them; overrides by a dated "this section wins"
   line.
3. The coordinator's role and limits: only orchestrates, never edits files, decides parallelism, sends a short
   final report per wave.
4. The coordinator's task message format (instructions block: task IDs, rules, owned files, branch, check, report,
   "say what is missing and stop") — and passing the builder's report to the reviewer.
5. Shared files owned by one thread per wave; an explicit shared-files list.
6. Order inside the first build: skeleton first and alone (owns all shared components), a reference part that
   fixes style before others copy it, a wrap-up part last that alone may touch every file (terms, links).
7. Reviewer details: fresh thread, flags only what breaks work or requirements, may fix trivial things in the
   branch's own files, opens the PR because the PR-opener watches the PR (cheaper on Sonnet).
8. Later waves: briefs saved verbatim in `docs/spec/waves/`, no part files needed (the instructions block is the
   task).
9. Sources table in notes for fact-heavy content (claim, place, URL, date, locator).
10. Deploy automation after merge.
11. Lessons from failures: verify PR head before conflict fixes; brief on main before reviewers need it; no new
    commits on a PR'd branch.

### b) In the draft, different from the project

| Draft says | Project does | Which is right |
| --- | --- | --- |
| Reviewer checks "against the acceptance criteria" | Also logic/consistency with the repo, 1–2 checks per interactive element, layout look; may fix trivial things | Project (superset) |
| Short tests for randomness, time, reminders | No tests at all; build only | Both, by project type: one rule in d) |
| "No CI at the start" | Deploy workflow on every push to main | Project: deploy ≠ test CI |
| Thread updates PROGRESS "at the end of the task" | Same, but nobody flips rows after merge, rows go stale | Neither: fix in d) |
| Thread reads "only 00-general and its part file" | Also CLAUDE.md (auto), STYLE.md, its PROGRESS row; later waves read the instructions block instead of a part file | Project |
| 16,000 / 80 lines as size targets | 1,810 chars, 29 lines | See d) |
| `00-general` holds "how the agents work" | Workflow lives in Project instructions and 00-general (duplicated) | Proposal in d) |
| First message: "propose a scaffold plan" | Part 01 did copy spec, create docs and build the skeleton in one PR | Draft is safer (owner checks the kit first); keep the draft |

### c) Project-specific, must be generalised

- Chapters, slugs, part names, Advanced section, chapter 15 green highlight → "parts", "pages/screens".
- Svelte 5 runes, mdsvex, `npm run check`, design tokens in `src/app.css` → "[stack rules]", "[commands]".
- Russian «ты» voice, «Глубже», TL;DR, STYLE reference decisions → content-project STYLE.md; code conventions for apps.
- "Second brain" features (Inbox, «Выбери за меня», focus timer) → marked examples only.
- Reader personas (the friend, the author) → "users / readers" block in the interview.
- Library sources (PDF deck, HTML) → "source materials, cited by part files".
- "Opus 5.5" → "Opus" (model versions change); effort names checked in the UI.
- GitHub Pages / `paths.base` → "deploy target".
- Part 10's glossary/terminology pass → generic "wrap-up part".

### d) Critique and proposals

1. **CLAUDE.md "up to 80 lines".** Ours: 29 lines and it was enough. Anthropic's ceiling is 200; every line is read
   on every step. **Confirm 80 as a hard ceiling, aim for ~30–40.** Rule for each line: "would an agent make a
   mistake without it?"
2. **Project instructions "up to 16,000".** 16,000 is the real product limit (Projects docs page). We used 1,810
   (11%), not "large". They go to the coordinator and every thread, so they cost like CLAUDE.md. **Proposal: same
   shape as ours, aim for 1,500–3,500 characters; 16,000 is the limit, not a target.** What to build goes to
   `docs/spec/`, not there.
3. **One home for the workflow.** Today the workflow sits in Project instructions and again in `00-general.md`.
   Two copies drift (ours did: 00-general kept "reviewer merges" text until the fixes wave overrode it).
   **Proposal: full team workflow lives in Project instructions; 00-general keeps a 5-line summary that points
   there.**
4. **Tests — one rule for apps and sites.** "Tests only where a person can't see the bug by looking: randomness,
   time and dates, timers and reminders, calculations, data migrations. The part file marks such acceptance
   criteria `[test]`. The builder writes and runs a short test only for those; everything else needs a passing
   build plus the reviewer's quick checks. A site with no `[test]` criteria has no tests." It covers both: our
   site had zero `[test]` criteria; the second-brain app would have a few.
5. **CI.** Deploy automation (publish on merge to main) is fine and separate; one task adds it when the owner asks,
   and nobody else touches it. Test CI: none at the start. Proposal (later, optional): when `[test]` tests exist,
   one CI job that runs only them.
6. **PROGRESS goes stale.** Proposal: statuses `not started / building / in review / PR open / merged`; the reviewer
   sets "PR open #N"; the thread that owns `docs/spec` in the next wave flips merged rows as its first commit.
   PROGRESS stays one table (one row per thread = no conflicts); "tried and failed" goes into the part's notes
   (Troubleshooting), "how to run" into CLAUDE.md commands. Free-form shared sections would bring back conflicts.
7. **Checkpoints.** Ch. 09: a thread that hits a usage limit waits and continues by itself, and long threads compact
   on their own. A fresh thread is needed only when a thread was stopped, its machine is gone, or after the
   restart rule. Checkpoints still matter (uncommitted work can be lost), but **at meaningful stops only**:
   commit, push, PROGRESS row (last step → next step). Notes files get a Checkpoint line only for long tasks.
8. **Brief on main first.** The wave brief and new G-rules go in a tiny PR of their own, opened first; until it is
   merged the coordinator pastes the needed rules into each instructions block (reviewers too).
9. **"Plan first" vs "nobody waits".** The fixes wave started without OK on purpose. Proposal: plan-first only for
   tasks marked so in INDEX (data model, architecture, migrations, big restructures); the builder sends the plan
   to the coordinator, which approves it inside the spec or asks the owner if it changes the goal.
10. **Send-back path.** Never exercised, so define it: the coordinator messages the resolved builder thread with
    the reviewer's list (cheaper than a new builder: it already has the context); the same reviewer re-checks only
    those items. A new builder thread only under the restart rule.
11. **"Agents message each other".** Unsourced in ch. 07; in the kit, routing goes through the coordinator, which
    is what actually happened.
12. **Reviewer report.** John has no preference. Chosen: the PR body is the report (where John reads it); a
    `docs/reviews/` file only when the review leaves open items for later threads.
13. **00-general size.** Ours grew to 146 lines / 12 KB and every thread reads it. Proposal: ceiling ~150 lines;
    long reference tables (slug maps, glossaries) go to their own file that only the parts needing them read.

---

## Round log

| Round | Date | What changed |
| --- | --- | --- |
| v1 | 2026-10-25 | First template from the real project: method (principles, roles, flow, waves, checks, instructions block, checkpoints, settings, file map), deliverables 1–5 with zip layout and file shapes, pre-zip check. Applied John's answers: quality first, Project instructions in our shape (~1,500–3,500 chars), briefs in either language saved in English, Library copy explained in the recap. |
| v2 | 2026-10-25 | John asked whether a skill beats a pasted prompt, whether it works for a website, and whether "just the features" is enough. Added: interview block 0 (project type and team), "propose a default, I confirm" interview rule, per-part team overrides in INDEX and part headers, full fixed Project instructions text (3,261 chars unfilled; aim now 2,000–4,000 filled), section 2.9 "fixed vs generated". His pasted Russian text is the old draft (= starter-prompt.txt), already covered by v1; nothing new to fold in. SearchSkills found no spec/kit skill in his account; proposed packaging the template as a personal skill. |
| v3 | 2026-10-25 | John: is it a skill, can he dictate 6,000–10,000 words, does it fit any project type. Added: long-dump handling (summary by block + gaps first), zip fallback when the chat can't run code. Drafted a SKILL.md version (name `project-kit`) and proposed it to John as a saveable skill. Web research on similar skills runs in a separate thread started by the coordinator. |
| public | 2026-10-25 | John dropped the skill/kit download: prompt only, in English, published in chapter 15. Public version added at the end of `spec-kit-prompt.md` (and `/mnt/project-files/meta/starter-prompt-en.txt`): placeholders on the first three lines, conversation in the user's language, no references to this project. A Russian draft was written first and dropped after John asked for English. Chapter 15 rework handed to the coordinator for a separate builder thread. |
