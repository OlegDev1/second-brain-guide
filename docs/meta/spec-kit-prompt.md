# Spec kit prompt — template v3 + public version

Task META-1. Built from how the "second brain guide" project actually ran (see `spec-kit-notes.md`).

**How to use it:** open a plain claude.ai chat (not a project), pick Opus and the highest effort in the menu
(today: Max; the names change, so check the UI on the day). Copy everything between the two `=====` lines,
replace the three `[CAPITALS]` placeholders, send it, then keep talking by voice and answer the interview.

===== COPY FROM HERE =====

I want to build [WHAT — e.g. a personal "second brain" web app / a guide website / a small CLI tool] with a team of Claude agents in a Claude Code project: a coordinator hands out tasks, each agent works in its own thread and branch, and the code lives on GitHub. I'll now describe what I want by voice. Your job: interview me, then turn it into a ready-to-use kit for the project.

My features (I'll add more by voice):
- [FEATURES — e.g. inbox, tasks, "pick for me", focus timer, habits, daily goals]

Stack: [STACK — e.g. Svelte 5 + SvelteKit, data stored locally on the device; or "propose one"]. If a feature needs something else, explain why and propose an option.

# 1. How to work with me

1. Language. Talk to me in Russian: interview questions, summaries, the final recap. Everything the agents read — every file in the kit — is in English: it uses fewer tokens and makes the work more precise. The product's own content or interface language is whatever I tell you in the interview.
2. Interview first, one block of questions at a time. Don't write the spec or any file until you've understood everything. I may give you only the features, or a very long voice dump (thousands of words, in any order). A long dump: first turn it into a short summary by block plus a list of gaps, then ask only about the gaps. For each block, propose a sensible default from what I said and ask me to confirm or correct it. Ask open questions only where a default would be a guess (data that matters, money, privacy, deploy). Blocks, in this order; skip a block that doesn't apply:
   0. Project type and team: app, website, guide or tool (this switches the content or app rules below). Default team per part: Opus High builder + Sonnet High reviewer. Propose an Opus High reviewer only for parts with risky logic: data model, backend, security, payments, sync.
   a. Goal and users: what it is, for whom, what problem it solves, what "it works" means for me.
   b. Screens or pages: what is on each, how the user moves between them.
   c. Data: what is stored, its fields, where it lives (device, server, files), what happens on a new device.
   d. Rules and edge cases: zero, one, many; empty states; no network; duplicates; anything with time, dates, reminders, randomness or money.
   e. Devices and look: phone or desktop first, offline, speed, visual style, interface language.
   f. Content projects only: reader, voice, depth, the shape of one page, where facts come from.
   g. Running it: where it is published or installed, whether it needs a server or a database, how I'll check results.
   h. What matters most, and what we explicitly don't build.
   After each block, sum up what you understood in 3–5 lines, then ask the next block. Ask follow-ups until a block is clear.
3. If something is too complex for the first version, say so and suggest moving it to v1 or v2.
4. Don't ask me for personal data and don't put it in files. Where examples are needed, make them up. Real data is something I load myself, later, outside the project.
5. If I contradict myself or something is unclear, ask. Never fill a gap with a guess.

# 2. The method the kit must encode

The kit must reproduce this working method exactly. Only the topic, features and stack change.

## 2.1 Principles

- Narrow context. A thread reads CLAUDE.md, docs/spec/00-general.md, its own part file (or the coordinator's instructions block), STYLE.md if its work needs it, and its own PROGRESS row. Never other part files, never INDEX.md, never the whole repo. Fewer tokens, fewer mistakes.
- Memory lives only in files. A decision made in chat doesn't exist for the next thread. Anything agreed goes into a file: the spec, docs/DECISIONS.md, a notes file. Don't rely on project memory.
- One part = one thread = one branch = one PR. Threads that run at the same time never edit the same files. Shared files (navigation, global styles, home page, shared config, shared components, docs/spec) belong to one thread per wave.
- Numbered rules. Global rules are G1, G2, … in 00-general.md; tasks have IDs (01, 02… for parts; short IDs like N1 for later wave tasks). Instructions cite IDs instead of copying text. A later rule overrides an earlier one with a dated line "(wave X, date; overrides …)"; the old text stays.
- Nothing is invented. If an access, fact or decision is missing, the agent says exactly what and stops.

## 2.2 Roles

- **Owner (me).** Writes briefs, answers questions, reviews PRs, merges. Only I merge.
- **Coordinator** (Opus, highest effort). Only orchestrates: splits work, starts threads, routes messages between threads, tracks docs/PROGRESS.md, reports to me. Never edits files itself. Reads INDEX.md and whole briefs. Decides how many threads run in parallel.
- **Builder** (Opus, effort High). Does all the work of a task: code, text, structure, layout, new elements. Works in its own branch from main. Writes tests only for acceptance criteria marked [test] (rule 2.5); otherwise a passing build is enough. Commits, pushes, reports "done" once with the branch name, a short summary, what the reviewer should look at and open questions. Doesn't open a PR, doesn't merge. Its thread is then resolved.
- Defaults per part: builder Opus High, reviewer Sonnet High. INDEX.md may override a part (e.g. an Opus High reviewer for a backend or security part). Quality decides, not speed.
- **Reviewer** (Sonnet, effort High, a fresh thread). Checks the builder's branch quickly:
  1. logic and consistency with the spec and the rest of the repo; nothing needed was deleted;
  2. the part's acceptance criteria;
  3. 1–2 checks per new interactive element (a toggle goes there and back, a link opens the right page);
  4. a quick look at mobile and desktop layout.
  It flags only what breaks the work or the requirements. No test suites, no writing tests, no repeated builds, no screenshot loops, no web fact-checks (sources are already in the project). Trivial fixes inside the branch's own files (wording, a typo, a one-line style fix) it makes itself. Anything bigger it lists for the builder. No issues: it opens the PR — the PR description is the review report — and assigns me. The reviewer opens the PR because whoever opens a PR watches it and wakes on every CI result and comment; that should be the cheaper model.

## 2.3 Flow per task

1. The coordinator starts the builder with an instructions block (format in 2.6).
2. The builder works, checkpoints (2.7), reports done. The coordinator resolves its thread.
3. The coordinator starts a fresh reviewer with the branch name and the builder's report.
4. Issues: the reviewer lists them; the coordinator sends the list to the builder's resolved thread (messaging it reopens it, and it still has the context). The builder fixes, pushes, reports done; the same reviewer re-checks only those items. Leftovers in files another thread owns go, via the coordinator, to that thread.
5. No issues: the reviewer opens the PR and assigns me. The builder isn't messaged again.
6. I merge. Nobody waits for my merge: other threads keep working.
7. After a PR is open, new work goes to a new branch and a new review, never onto the PR'd branch.
8. Fixing a merge conflict: first check the PR's head branch and GitHub's mergeable state, then push to that head branch.
9. Restart rule: after two failed fixes of the same problem, stop. A new thread gets the task plus what was tried and why it failed.
10. Plan first only where INDEX.md marks a task "plan first" (data model, architecture, migrations, big restructures): the builder studies the files and sends a plan to the coordinator, which approves it if it stays inside the spec or asks me if it changes the goal.
11. New work goes to a new thread. A thread is closed when its work is handed off or merged.

## 2.4 Waves

- Product waves: MVP (the smallest version I'd use myself) → v1 → v2.
- Build waves inside them: the skeleton first and alone; then (content projects) a reference part alone that fixes the voice in STYLE.md, which I approve; then (apps) a vertical slice — one feature end to end, screen to storage; then parts in parallel groups whose files never overlap; a wrap-up part last.
- Parallel threads: the coordinator's call, from INDEX.md. Quality first, speed second: never add threads, skip a check or shorten a review if it would cost quality. Two at a time until the first parallel wave has gone through cleanly; more only when the files split cleanly.
- A wave is done when every task has a reviewer-checked PR waiting for my merge, docs/spec is updated with the wave's rules, and the coordinator has sent me a short final report: what changed per part, what was skipped or needs my decision. No long changelog.
- A later brief from me (a fixes wave, a new feature set), in English or Russian: before the wave starts, the thread that owns docs/spec in that wave saves it to docs/spec/waves/NN-name.md — verbatim if English, otherwise a faithful English version — adds new global rules to 00-general.md and a wave section to INDEX.md, and syncs PROGRESS.md with merged PRs — in a small PR of its own that goes first. Until that PR is merged, the coordinator pastes the rules each thread needs into its instructions block. Later waves need no part files: the instructions block is the task.
- A big feature that arrives later: one thread interviews me and writes docs/features/<name>.md (no code, PR, stop); a new thread builds it.

## 2.5 Checks

- Tests only where a person can't see the bug by looking: randomness, time and dates, timers and reminders, calculations, data migrations. The part file marks such acceptance criteria [test]. The builder writes and runs a short test for each [test] criterion only. Everything else needs a passing build plus the reviewer's quick checks. A project without [test] criteria has no test files.
- Every acceptance criterion can be checked by hand in about a minute: tap, look, pass or fail. Most bugs hide at zero and one.
- No test CI at the start. Deploy automation (publish after each merge to main) is allowed and separate: one task adds it when I ask; no other thread touches it.

## 2.6 The coordinator's instructions block

Every thread starts with a short block in English, plus my message attached when it matters:

- Context: 1–3 lines — project, what exists, why this task.
- Task: task IDs, one line each, or the part file path.
- Read: CLAUDE.md, 00-general.md (cite the G-rules that apply), the part file; nothing else. Rules not yet on main: pasted here.
- Own files: exact paths. Don't touch: shared files and other parts' files, named.
- Check: what "done" means — build passes; acceptance criteria; [test] criteria tested.
- Report: done once, with the branch name, summary, what to check, open questions. No PR, no merge.
- Branch: the name, from main. If something is missing, say exactly what and stop. Never invent.

Example (invented, for an app):

    Builder for part 04 (habits). Context: the skeleton and tasks are merged; habits is new.
    Task: docs/spec/parts/04-habits.md. Read: CLAUDE.md, 00-general.md (G1–G4), that part file.
    Own files: src/features/habits/, docs/parts/04-habits.notes.md, your PROGRESS row.
    Don't touch: navigation, global styles, src/features/tasks/.
    Check: build passes; criteria 1–6; criterion 3 [test] has a test that passes.
    Report: done once with branch name, summary, what the reviewer should check. No PR.
    Branch: part-04-habits from main. Missing access, fact or decision: say what and stop.

## 2.7 Checkpoints and resume

- At meaningful stops only — a finished sub-step, before a big change, when the limit is close, before stopping — not after every edit: commit, push, update the own PROGRESS row (status, last step → next step), and for long tasks a Checkpoint line in the part's notes file.
- A thread that hits a usage limit waits and continues on its own. A fresh thread is needed only when a thread was stopped, its machine was lost, or the restart rule applies. It reads CLAUDE.md, 00-general.md, its part file, its PROGRESS row and notes file, and `git log` of its branch, then continues instead of starting over.

## 2.8 Settings and skills

- Project settings → General: coordinator Opus at the highest effort (Max or Extra high); threads Opus, effort High (builders). The coordinator starts reviewer threads on Sonnet, effort High, per thread.
- No skills, subagent files or .claude/ folder in the repo: the rules in CLAUDE.md are enough, and cloud threads take skills from the claude.ai account, not from the repo.

## 2.9 What is fixed and what you generate

- Fixed — copy as written, filling only the [brackets]: the Project instructions (item 2), the CLAUDE.md shape, the starter docs, the folder and zip layout, the first message, the workflow summary in 00-general.md. This is the tested method; don't redesign it.
- Generated from the interview: goal, users, product map, stack and data decisions, G-rules, terms, what we don't build, the part split and owned files, waves, acceptance criteria and [test] marks, STYLE.md content, team overrides.

## 2.10 File map

Always = every project; UI = projects with screens or pages; content = guides, sites, docs; app = apps and tools.

| File | Purpose | Writes | Reads | Changes |
| --- | --- | --- | --- | --- |
| Project instructions (settings, not repo) — always | Team workflow and never-list | Owner pastes it | Coordinator and every thread, automatically | When the workflow changes; only new threads see edits |
| Library spec/ (not repo) — always | Starter copy, so the coordinator sees the spec before the repo has it | Owner, at project creation | Coordinator; kickoff thread copies it | Never; GitHub holds the working version |
| Library source materials (not repo) — optional | Research, references | Owner | Only a thread whose part file cites them | Never |
| CLAUDE.md — always | Short map: what to read, where things are, commands, never-list | Kickoff thread, then the skeleton | Every thread, on every step | Rarely |
| docs/spec/00-general.md — always | Shared rules, G1…Gn, terms, what we don't build | Spec chat; later the docs/spec owner of a wave | Every thread | Each wave may add G-rules |
| docs/spec/INDEX.md — always | Parts, owned files, waves, parallel groups | Spec chat; docs/spec owner of a wave | Coordinator only | Each wave adds a section |
| docs/spec/parts/NN-name.md — always | One thread's whole task | Spec chat | That thread and its reviewer | Not after the build |
| docs/spec/waves/NN-name.md — always (empty at start) | Owner's later briefs, verbatim | docs/spec owner of that wave | Coordinator; threads only for cited rules | Once per wave |
| docs/PROGRESS.md — always | Status table, one row per part | Each thread, own row only | Coordinator, owner, a resuming thread | At checkpoints and at the end of a task |
| docs/DECISIONS.md — always | Decision, why, rejected | The thread that decides | Builders before changing stack or structure | When a decision is made |
| docs/STYLE.md — always | Voice (content) or code conventions (app) | Spec chat; reference part or skeleton | Every thread whose work it covers | After the reference part |
| docs/COMPONENTS.md — UI | Reusable blocks | Skeleton (owner of shared components) | Builders that make screens or pages | When a shared block is added |
| docs/BUGS.md — app | Known bugs as bug reports | Reviewer, owner via coordinator | The thread that fixes a bug | When a bug is found or fixed |
| docs/parts/NN-name.notes.md — always | Working notes per part (+ Sources for content) | The part's builder | Its reviewer, the wrap-up part, a resuming thread | During the task; a section per later wave |
| docs/features/<name>.md — later | Spec of a big feature added later | An interview thread | The thread that builds it | Once |
| PR description — always | Review report | Reviewer | Owner | Once per PR |
| Deploy workflow — when the owner asks | Publish after each merge to main | One task | CI | Once |

# 3. What to deliver

When the interview is done, produce items 1–5. Split the spec yourself: you have the whole conversation; a separate thread won't. Items 1–4 go into one zip named <project-slug>-kit.zip; item 5 goes in the chat. If you can't run code in this chat to build the zip, say so and give every file in its own code block, in zip-layout order.

Zip layout:

    spec/00-general.md
    spec/INDEX.md
    spec/parts/01-skeleton.md, 02-….md, …
    repo/CLAUDE.md
    repo/docs/PROGRESS.md
    repo/docs/DECISIONS.md
    repo/docs/STYLE.md
    repo/docs/COMPONENTS.md        (any project with a UI)
    repo/docs/BUGS.md              (apps and tools)
    project-instructions.txt
    first-message.txt

## Item 1. The spec, already split, in spec/

### spec/00-general.md — read by every thread, so short (ceiling ~150 lines)

Sections:
- Goal and users (who, what problem, what "works" means).
- Language: content/interface language; everything agents write is English.
- Stack and where data lives. Architecture: each feature is its own folder; features never edit each other's files; shared code has one owner.
- Product map: screens/pages and their names or URLs, so cross-references work before a part exists.
- Global rules G1…Gn: what every task must follow (data, offline, speed, accessibility, design tokens, no personal data — always one G-rule: no real personal data anywhere, invented sample data only).
- Terms: term | meaning, so every agent uses the same word.
- What we don't build (this list saves the most tokens).
- Checks: rule 2.5 in two lines, and the [test] areas of this project.
- Result format of a task: owned files, notes file, PROGRESS row.
- Notes file (docs/parts/NN-name.notes.md) sections: Open questions; Troubleshooting (symptom | cause | fix, including what was tried and failed); Checkpoint (long tasks); a "<wave> (date)" section per later wave listing what changed and why. Content or fact-heavy projects add Sources (claim | where used | URL | checked on | locator) and New terms; whoever finds a key fact writes its row at that moment.
- How agents work: a 5-line summary that points to the Project instructions for the full workflow (one home for the workflow, so it can't drift).

### spec/INDEX.md — coordinator only

- Parts table: # | part | covers | owns files | depends on | wave | plan first (yes/no) | team (blank = default; or e.g. "reviewer Opus High").
- Shared files and their owner per wave.
- Order: build waves with parallel groups, e.g. 01 → 02 → (03 ∥ 04) → (05 ∥ 06) → 07; and the product waves MVP / v1 / v2.
- Ownership rules: a part edits only its owned files plus its PROGRESS row. Exception: the wrap-up part may touch every file, only to align terms and fix links. A part that needs a change in someone else's file writes it under Open questions in its notes.
- Later waves append a section here: brief file, task IDs → thread, owned files.

### spec/parts/NN-name.md — one per part: one thread's whole world

- Header: Builder · Reviewer (default Opus High · Sonnet High, or the INDEX override) · Depends on · Wave · Plan first.
- Goal (1–2 sentences).
- Includes: scenarios, screens/pages, data and fields (invented examples), rules and edge cases.
- Acceptance criteria: numbered, each checkable in a minute; mark [test] where rule 2.5 applies.
- Excludes: what it doesn't do, and which part does instead.
- Reads: besides 00-general — STYLE.md, COMPONENTS.md, a named Library source, if needed.
- Owns files: exact paths. Output: files it creates. Done when: build passes, criteria pass, notes and PROGRESS row updated.
- Part 01 (skeleton) also holds the starter text of every repo file it finalises.
- Size: a builder finishes a part in one thread; one feature or a small group. Too big: split it into two parts.

## Item 2. Project instructions — project-instructions.txt

Working rules for the coordinator and every thread; they arrive in every thread automatically. Same shape as the model project (about 1,800 characters there). Aim for 2,000–4,000 characters once filled; the product limit is 16,000, which is a limit, not a target. What to build stays in docs/spec/. Copy this text and fill only the [brackets]:

    Project: [one line: what, for whom]. Repository: [name]. Stack: [one line]. Deploy: [one line or "not yet"].
    Everything agents write (code, comments, docs, commits, PRs, reports) is in English; [content/UI] is in [language]. The owner may write in Russian; the coordinator writes to threads in English.

    Spec: docs/spec/ — 00-general.md (every thread; global rules G1…Gn), INDEX.md (coordinator only), parts/ (one per task), waves/ (the owner's later briefs). Repo map: CLAUDE.md.

    Reading rule:
    - Each thread gets only the context for its own task: its task IDs, the global rules, its part file or instructions block and the exact files it owns. Not the whole brief, not the whole repo.
    - Only the coordinator reads docs/spec/INDEX.md and whole briefs.
    - Anything agreed in chat goes into a file, or it doesn't exist for the next thread.

    Workflow per task:
    - Builder: Opus (high), own branch from main, does all the work. Tests only for criteria marked [test]; otherwise a passing build is enough. Commits and pushes at meaningful stops, updates its PROGRESS row, reports done once with the branch name. No PR, no merge. The coordinator then resolves its thread.
    - Reviewer: Sonnet (high), fresh thread, gets the branch and the builder's report. Checks quickly: logic and consistency with the spec and the repo, acceptance criteria, 1–2 checks per new interactive element, a quick mobile/desktop look. Flags only what breaks the work or the requirements. No test suites, no repeated builds, no screenshot loops, no web fact-checks. Fixes trivial things in the branch's own files itself.
    - Issues go back to the builder's thread (the coordinator messages it); the same reviewer re-checks those items. If none, the reviewer opens the PR (description = review report) and assigns the owner.
    - Only the owner merges; nobody waits for the merge. Per-part team overrides are in INDEX.md.

    Coordinator:
    - Only orchestrates: splits work, starts threads, routes messages, tracks docs/PROGRESS.md, reports. Never edits files.
    - New brief: before the wave, the thread that owns docs/spec saves it to docs/spec/waves/ in English, adds new global rules and syncs PROGRESS, in a small PR that goes first. Until it is merged, paste the needed rules into each instructions block.
    - Files never overlap between parallel threads. Shared files ([list]) belong to one thread per wave.
    - Quality first, speed second. Parallelism is your call: two at a time until a wave has gone through cleanly.
    - A wave is done when every task has a reviewed PR waiting for the owner. Then a short final report: what changed per part, what was skipped or needs a decision.

    Always:
    - After a PR is open, new work goes to a new branch and a new review.
    - Before fixing a conflict, check the PR's head branch and mergeable state.
    - Two failed fixes of the same problem: a new thread, told what was tried and why it failed.
    - Plan first only for tasks INDEX.md marks so.
    - New work goes to a new thread. Close a thread when its work is handed off or merged.
    - Missing access, fact or decision: say exactly what and stop. Never invent.

    Never: force push, commit to main or delete branches without the owner's OK; merge; secrets or real personal data in the repo, spec, test data or any agent's context.

## Item 3. CLAUDE.md and starter docs — repo/

### repo/CLAUDE.md — every thread reads it on every step: aim for ~30–40 lines, ceiling 80

For each line ask: would an agent make a mistake without it? Shape:

    # [Project]
    [One line: what it is.] [Stack, one line.] [Content/UI language]; everything else English.
    ## Read before any task — and nothing else
    - docs/spec/00-general.md, your own part file in docs/spec/parts/ (or your instructions), docs/STYLE.md
    - docs/PROGRESS.md only to update your own row
    - Never open other part files. docs/spec/INDEX.md is for the coordinator only.
    ## Where things are
    - [code folders, one line each]
    - docs/spec/ (spec; waves/ for later briefs) · docs/DECISIONS.md · docs/COMPONENTS.md · docs/parts/ (notes per part)
    ## Commands
    [install · dev · build · check · test]
    ## Code
    - [3–6 stack rules]
    - A new dependency needs a line in docs/DECISIONS.md. Reuse a block from docs/COMPONENTS.md before making a new one.
    ## Never
    - Force push, commit to main, delete branches, secrets or personal data in the repo.
    - Edit files another part owns. Touch the deploy setup unless your task says so.

### Starter docs (each starts with one line saying who writes and who reads it)

- docs/PROGRESS.md — one table, one row per part; each thread edits only its own row, so threads never fight over the file. Columns: part | title | status (not started / building / in review / PR open / merged) | branch / PR | last step → next step. The reviewer sets "PR open #N"; the docs/spec owner of the next wave flips merged rows. No free-form sections: "tried and failed" goes to notes files, "how to run" to CLAUDE.md.
- docs/DECISIONS.md — decision | why | rejected | part, date. Rule: no new library without an entry. Seed it with the stack decisions from the interview.
- docs/STYLE.md — content projects: voice, page structure, length, examples policy; the reference part adds "reference decisions" and short excerpts. Apps: code conventions, naming, folder layout, UI rules. Seed it from the interview.
- docs/COMPONENTS.md — catalogue of reusable blocks (name, props, two-line usage); empty until the skeleton adds the first ones. Reuse before creating.
- docs/BUGS.md — apps and tools: B-NNN entries with steps, expected, actual, device, status.
- The kickoff thread also creates docs/spec/waves/ and docs/parts/, each with a one-line README.

## Item 4. The first message — first-message.txt

To the coordinator: "Start one thread (Opus, High). It copies spec/ from the Library into the repo as docs/spec/, copies the repo/ files into place (CLAUDE.md at the root, docs/…), creates docs/PROGRESS.md with the table of parts and the other starter files, proposes a scaffold plan and lists questions for me. No code. It opens a PR and stops. Don't start any wave until I've merged that PR and said go. If something is missing, say exactly what and stop." I review this PR myself; no reviewer thread.

## Item 5. The recap — in the chat, in Russian, one screen

- What we build: 3–5 lines; waves MVP / v1 / v2; what is deferred and why; the [test] areas.
- My steps, numbered:
  1. Create a private GitHub repository with a README.
  2. Install the Claude GitHub App and give it access to that repository.
  3. Download and unzip the archive. Never upload the zip itself.
  4. On claude.ai/code, create a new project; in Context add the repository and the unzipped folder (if the folder fails, add it later through the Library).
  5. Right after creating it, write: "Wait, don't start anything yet."
  6. Project settings → General: coordinator Opus at the highest effort, threads Opus High. Memory → Project instructions: paste project-instructions.txt.
  7. Send first-message.txt to the coordinator.
  8. Review the kickoff PR, answer its questions, merge it, then say "start wave 1 from docs/spec/INDEX.md".
- One line on the Library copy: the unzipped folder is the starter copy the coordinator sees before the repository has anything; after the kickoff PR the working copy lives on GitHub in docs/spec/, and the Library copy is never edited.
- If anything in the recap is wrong, I'll say so in this chat and you fix every file where it appears and send the zip again.

# 4. Check before zipping

- Every file the agents read is in English; the recap is in Russian.
- No real personal data anywhere; all examples invented.
- Every part has owned files; no two parts in the same parallel group share a file; every shared file has one owner.
- Every acceptance criterion is checkable in a minute; [test] marks only where rule 2.5 applies.
- Sizes: CLAUDE.md ≤ 80 lines (aim 30–40); Project instructions 2,000–4,000 characters; 00-general.md ≤ ~150 lines.
- The workflow is fully in the Project instructions and only summarised in 00-general.md.
- Nothing I said in the interview is missing: each feature is in a part, in v1/v2, or in "what we don't build".

===== COPY UNTIL HERE =====

---

## Public version (for chapter 15 «Промпт для старта»)

Same method, for anyone and any project: placeholders on the first three lines (visible when the prompt is
collapsed), the conversation runs in the user's own language, no references to this project. Requested by John
on 2026-10-25 to replace the prompt in chapter 15 (no skill, prompt only).

===== PUBLIC PROMPT FROM HERE =====

What I want to build: [e.g. a personal "second brain" web app, a guide website, a bot, a small tool]
Stack: [e.g. Svelte 5 + SvelteKit, data stored on the device; or "propose one"]
My features: [list them here, or just tell me by voice below — as much as you like, even 20 minutes]

I want to build this with a team of Claude agents in a Claude Code project: a coordinator hands out tasks, each agent works in its own thread and branch, and the code lives on GitHub. I'll now tell you what I want. Your job: interview me, then turn it all into a ready-to-use kit for the project. If a feature needs a different stack, explain why and propose an option.

# 1. How to work with me

1. Language. Talk to me in the language I write in: interview questions, summaries, the final recap. Everything the agents read — every file in the kit — is in English: it uses fewer tokens and makes the work more precise. The product's own content or interface language is whatever I tell you in the interview.
2. Interview first, one block of questions at a time. Don't write the spec or any file until you've understood everything. I may give you only the features, or a very long voice dump (thousands of words, in any order). A long dump: first turn it into a short summary by block plus a list of gaps, then ask only about the gaps. For each block, propose a sensible default from what I said and ask me to confirm or correct it. Ask open questions only where a default would be a guess (data that matters, money, privacy, deploy). Blocks, in this order; skip a block that doesn't apply:
   0. Project type and team: app, website, guide or tool (this switches the content or app rules below). Default team per part: Opus High builder + Sonnet High reviewer. Propose an Opus High reviewer only for parts with risky logic: data model, backend, security, payments, sync.
   a. Goal and users: what it is, for whom, what problem it solves, what "it works" means for me.
   b. Screens or pages: what is on each, how the user moves between them.
   c. Data: what is stored, its fields, where it lives (device, server, files), what happens on a new device.
   d. Rules and edge cases: zero, one, many; empty states; no network; duplicates; anything with time, dates, reminders, randomness or money.
   e. Devices and look: phone or desktop first, offline, speed, visual style, interface language.
   f. Content projects only: reader, voice, depth, the shape of one page, where facts come from.
   g. Running it: where it is published or installed, whether it needs a server or a database, how I'll check results.
   h. What matters most, and what we explicitly don't build.
   After each block, sum up what you understood in 3–5 lines, then ask the next block. Ask follow-ups until a block is clear.
3. If something is too complex for the first version, say so and suggest moving it to v1 or v2.
4. Don't ask me for personal data and don't put it in files. Where examples are needed, make them up. Real data is something I load myself, later, outside the project.
5. If I contradict myself or something is unclear, ask. Never fill a gap with a guess.

# 2. The method the kit must encode

The kit must reproduce this working method exactly. Only the topic, features and stack change.

## 2.1 Principles

- Narrow context. A thread reads CLAUDE.md, docs/spec/00-general.md, its own part file (or the coordinator's instructions block), STYLE.md if its work needs it, and its own PROGRESS row. Never other part files, never INDEX.md, never the whole repo. Fewer tokens, fewer mistakes.
- Memory lives only in files. A decision made in chat doesn't exist for the next thread. Anything agreed goes into a file: the spec, docs/DECISIONS.md, a notes file. Don't rely on project memory.
- One part = one thread = one branch = one PR. Threads that run at the same time never edit the same files. Shared files (navigation, global styles, home page, shared config, shared components, docs/spec) belong to one thread per wave.
- Numbered rules. Global rules are G1, G2, … in 00-general.md; tasks have IDs (01, 02… for parts; short IDs like N1 for later wave tasks). Instructions cite IDs instead of copying text. A later rule overrides an earlier one with a dated line "(wave X, date; overrides …)"; the old text stays.
- Nothing is invented. If an access, fact or decision is missing, the agent says exactly what and stops.

## 2.2 Roles

- **Owner (me).** Writes briefs, answers questions, reviews PRs, merges. Only I merge.
- **Coordinator** (Opus, highest effort). Only orchestrates: splits work, starts threads, routes messages between threads, tracks docs/PROGRESS.md, reports to me. Never edits files itself. Reads INDEX.md and whole briefs. Decides how many threads run in parallel.
- **Builder** (Opus, effort High). Does all the work of a task: code, text, structure, layout, new elements. Works in its own branch from main. Writes tests only for acceptance criteria marked [test] (rule 2.5); otherwise a passing build is enough. Commits, pushes, reports "done" once with the branch name, a short summary, what the reviewer should look at and open questions. Doesn't open a PR, doesn't merge. Its thread is then resolved.
- Defaults per part: builder Opus High, reviewer Sonnet High. INDEX.md may override a part (e.g. an Opus High reviewer for a backend or security part). Quality decides, not speed.
- **Reviewer** (Sonnet, effort High, a fresh thread). Checks the builder's branch quickly:
  1. logic and consistency with the spec and the rest of the repo; nothing needed was deleted;
  2. the part's acceptance criteria;
  3. 1–2 checks per new interactive element (a toggle goes there and back, a link opens the right page);
  4. a quick look at mobile and desktop layout.
  It flags only what breaks the work or the requirements. No test suites, no writing tests, no repeated builds, no screenshot loops, no web fact-checks (sources are already in the project). Trivial fixes inside the branch's own files (wording, a typo, a one-line style fix) it makes itself. Anything bigger it lists for the builder. No issues: it opens the PR — the PR description is the review report — and assigns me. The reviewer opens the PR because whoever opens a PR watches it and wakes on every CI result and comment; that should be the cheaper model.

## 2.3 Flow per task

1. The coordinator starts the builder with an instructions block (format in 2.6).
2. The builder works, checkpoints (2.7), reports done. The coordinator resolves its thread.
3. The coordinator starts a fresh reviewer with the branch name and the builder's report.
4. Issues: the reviewer lists them; the coordinator sends the list to the builder's resolved thread (messaging it reopens it, and it still has the context). The builder fixes, pushes, reports done; the same reviewer re-checks only those items. Leftovers in files another thread owns go, via the coordinator, to that thread.
5. No issues: the reviewer opens the PR and assigns me. The builder isn't messaged again.
6. I merge. Nobody waits for my merge: other threads keep working.
7. After a PR is open, new work goes to a new branch and a new review, never onto the PR'd branch.
8. Fixing a merge conflict: first check the PR's head branch and GitHub's mergeable state, then push to that head branch.
9. Restart rule: after two failed fixes of the same problem, stop. A new thread gets the task plus what was tried and why it failed.
10. Plan first only where INDEX.md marks a task "plan first" (data model, architecture, migrations, big restructures): the builder studies the files and sends a plan to the coordinator, which approves it if it stays inside the spec or asks me if it changes the goal.
11. New work goes to a new thread. A thread is closed when its work is handed off or merged.

## 2.4 Waves

- Product waves: MVP (the smallest version I'd use myself) → v1 → v2.
- Build waves inside them: the skeleton first and alone; then (content projects) a reference part alone that fixes the voice in STYLE.md, which I approve; then (apps) a vertical slice — one feature end to end, screen to storage; then parts in parallel groups whose files never overlap; a wrap-up part last.
- Parallel threads: the coordinator's call, from INDEX.md. Quality first, speed second: never add threads, skip a check or shorten a review if it would cost quality. Two at a time until the first parallel wave has gone through cleanly; more only when the files split cleanly.
- A wave is done when every task has a reviewer-checked PR waiting for my merge, docs/spec is updated with the wave's rules, and the coordinator has sent me a short final report: what changed per part, what was skipped or needs my decision. No long changelog.
- A later brief from me (a fixes wave, a new feature set), in any language: before the wave starts, the thread that owns docs/spec in that wave saves it to docs/spec/waves/NN-name.md — verbatim if English, otherwise a faithful English version — adds new global rules to 00-general.md and a wave section to INDEX.md, and syncs PROGRESS.md with merged PRs — in a small PR of its own that goes first. Until that PR is merged, the coordinator pastes the rules each thread needs into its instructions block. Later waves need no part files: the instructions block is the task.
- A big feature that arrives later: one thread interviews me and writes docs/features/<name>.md (no code, PR, stop); a new thread builds it.

## 2.5 Checks

- Tests only where a person can't see the bug by looking: randomness, time and dates, timers and reminders, calculations, data migrations. The part file marks such acceptance criteria [test]. The builder writes and runs a short test for each [test] criterion only. Everything else needs a passing build plus the reviewer's quick checks. A project without [test] criteria has no test files.
- Every acceptance criterion can be checked by hand in about a minute: tap, look, pass or fail. Most bugs hide at zero and one.
- No test CI at the start. Deploy automation (publish after each merge to main) is allowed and separate: one task adds it when I ask; no other thread touches it.

## 2.6 The coordinator's instructions block

Every thread starts with a short block in English, plus my message attached when it matters:

- Context: 1–3 lines — project, what exists, why this task.
- Task: task IDs, one line each, or the part file path.
- Read: CLAUDE.md, 00-general.md (cite the G-rules that apply), the part file; nothing else. Rules not yet on main: pasted here.
- Own files: exact paths. Don't touch: shared files and other parts' files, named.
- Check: what "done" means — build passes; acceptance criteria; [test] criteria tested.
- Report: done once, with the branch name, summary, what to check, open questions. No PR, no merge.
- Branch: the name, from main. If something is missing, say exactly what and stop. Never invent.

Example (invented, for an app):

    Builder for part 04 (habits). Context: the skeleton and tasks are merged; habits is new.
    Task: docs/spec/parts/04-habits.md. Read: CLAUDE.md, 00-general.md (G1–G4), that part file.
    Own files: src/features/habits/, docs/parts/04-habits.notes.md, your PROGRESS row.
    Don't touch: navigation, global styles, src/features/tasks/.
    Check: build passes; criteria 1–6; criterion 3 [test] has a test that passes.
    Report: done once with branch name, summary, what the reviewer should check. No PR.
    Branch: part-04-habits from main. Missing access, fact or decision: say what and stop.

## 2.7 Checkpoints and resume

- At meaningful stops only — a finished sub-step, before a big change, when the limit is close, before stopping — not after every edit: commit, push, update the own PROGRESS row (status, last step → next step), and for long tasks a Checkpoint line in the part's notes file.
- A thread that hits a usage limit waits and continues on its own. A fresh thread is needed only when a thread was stopped, its machine was lost, or the restart rule applies. It reads CLAUDE.md, 00-general.md, its part file, its PROGRESS row and notes file, and `git log` of its branch, then continues instead of starting over.

## 2.8 Settings and skills

- Project settings → General: coordinator Opus at the highest effort (Max or Extra high); threads Opus, effort High (builders). The coordinator starts reviewer threads on Sonnet, effort High, per thread.
- No skills, subagent files or .claude/ folder in the repo: the rules in CLAUDE.md are enough, and cloud threads take skills from the claude.ai account, not from the repo.

## 2.9 What is fixed and what you generate

- Fixed — copy as written, filling only the [brackets]: the Project instructions (item 2), the CLAUDE.md shape, the starter docs, the folder and zip layout, the first message, the workflow summary in 00-general.md. This is the tested method; don't redesign it.
- Generated from the interview: goal, users, product map, stack and data decisions, G-rules, terms, what we don't build, the part split and owned files, waves, acceptance criteria and [test] marks, STYLE.md content, team overrides.

## 2.10 File map

Always = every project; UI = projects with screens or pages; content = guides, sites, docs; app = apps and tools.

| File | Purpose | Writes | Reads | Changes |
| --- | --- | --- | --- | --- |
| Project instructions (settings, not repo) — always | Team workflow and never-list | Owner pastes it | Coordinator and every thread, automatically | When the workflow changes; only new threads see edits |
| Library spec/ (not repo) — always | Starter copy, so the coordinator sees the spec before the repo has it | Owner, at project creation | Coordinator; kickoff thread copies it | Never; GitHub holds the working version |
| Library source materials (not repo) — optional | Research, references | Owner | Only a thread whose part file cites them | Never |
| CLAUDE.md — always | Short map: what to read, where things are, commands, never-list | Kickoff thread, then the skeleton | Every thread, on every step | Rarely |
| docs/spec/00-general.md — always | Shared rules, G1…Gn, terms, what we don't build | Spec chat; later the docs/spec owner of a wave | Every thread | Each wave may add G-rules |
| docs/spec/INDEX.md — always | Parts, owned files, waves, parallel groups | Spec chat; docs/spec owner of a wave | Coordinator only | Each wave adds a section |
| docs/spec/parts/NN-name.md — always | One thread's whole task | Spec chat | That thread and its reviewer | Not after the build |
| docs/spec/waves/NN-name.md — always (empty at start) | Owner's later briefs, verbatim | docs/spec owner of that wave | Coordinator; threads only for cited rules | Once per wave |
| docs/PROGRESS.md — always | Status table, one row per part | Each thread, own row only | Coordinator, owner, a resuming thread | At checkpoints and at the end of a task |
| docs/DECISIONS.md — always | Decision, why, rejected | The thread that decides | Builders before changing stack or structure | When a decision is made |
| docs/STYLE.md — always | Voice (content) or code conventions (app) | Spec chat; reference part or skeleton | Every thread whose work it covers | After the reference part |
| docs/COMPONENTS.md — UI | Reusable blocks | Skeleton (owner of shared components) | Builders that make screens or pages | When a shared block is added |
| docs/BUGS.md — app | Known bugs as bug reports | Reviewer, owner via coordinator | The thread that fixes a bug | When a bug is found or fixed |
| docs/parts/NN-name.notes.md — always | Working notes per part (+ Sources for content) | The part's builder | Its reviewer, the wrap-up part, a resuming thread | During the task; a section per later wave |
| docs/features/<name>.md — later | Spec of a big feature added later | An interview thread | The thread that builds it | Once |
| PR description — always | Review report | Reviewer | Owner | Once per PR |
| Deploy workflow — when the owner asks | Publish after each merge to main | One task | CI | Once |

# 3. What to deliver

When the interview is done, produce items 1–5. Split the spec yourself: you have the whole conversation; a separate thread won't. Items 1–4 go into one zip named <project-slug>-kit.zip; item 5 goes in the chat. If you can't run code in this chat to build the zip, say so and give every file in its own code block, in zip-layout order.

Zip layout:

    spec/00-general.md
    spec/INDEX.md
    spec/parts/01-skeleton.md, 02-….md, …
    repo/CLAUDE.md
    repo/docs/PROGRESS.md
    repo/docs/DECISIONS.md
    repo/docs/STYLE.md
    repo/docs/COMPONENTS.md        (any project with a UI)
    repo/docs/BUGS.md              (apps and tools)
    project-instructions.txt
    first-message.txt

## Item 1. The spec, already split, in spec/

### spec/00-general.md — read by every thread, so short (ceiling ~150 lines)

Sections:
- Goal and users (who, what problem, what "works" means).
- Language: content/interface language; everything agents write is English.
- Stack and where data lives. Architecture: each feature is its own folder; features never edit each other's files; shared code has one owner.
- Product map: screens/pages and their names or URLs, so cross-references work before a part exists.
- Global rules G1…Gn: what every task must follow (data, offline, speed, accessibility, design tokens, no personal data — always one G-rule: no real personal data anywhere, invented sample data only).
- Terms: term | meaning, so every agent uses the same word.
- What we don't build (this list saves the most tokens).
- Checks: rule 2.5 in two lines, and the [test] areas of this project.
- Result format of a task: owned files, notes file, PROGRESS row.
- Notes file (docs/parts/NN-name.notes.md) sections: Open questions; Troubleshooting (symptom | cause | fix, including what was tried and failed); Checkpoint (long tasks); a "<wave> (date)" section per later wave listing what changed and why. Content or fact-heavy projects add Sources (claim | where used | URL | checked on | locator) and New terms; whoever finds a key fact writes its row at that moment.
- How agents work: a 5-line summary that points to the Project instructions for the full workflow (one home for the workflow, so it can't drift).

### spec/INDEX.md — coordinator only

- Parts table: # | part | covers | owns files | depends on | wave | plan first (yes/no) | team (blank = default; or e.g. "reviewer Opus High").
- Shared files and their owner per wave.
- Order: build waves with parallel groups, e.g. 01 → 02 → (03 ∥ 04) → (05 ∥ 06) → 07; and the product waves MVP / v1 / v2.
- Ownership rules: a part edits only its owned files plus its PROGRESS row. Exception: the wrap-up part may touch every file, only to align terms and fix links. A part that needs a change in someone else's file writes it under Open questions in its notes.
- Later waves append a section here: brief file, task IDs → thread, owned files.

### spec/parts/NN-name.md — one per part: one thread's whole world

- Header: Builder · Reviewer (default Opus High · Sonnet High, or the INDEX override) · Depends on · Wave · Plan first.
- Goal (1–2 sentences).
- Includes: scenarios, screens/pages, data and fields (invented examples), rules and edge cases.
- Acceptance criteria: numbered, each checkable in a minute; mark [test] where rule 2.5 applies.
- Excludes: what it doesn't do, and which part does instead.
- Reads: besides 00-general — STYLE.md, COMPONENTS.md, a named Library source, if needed.
- Owns files: exact paths. Output: files it creates. Done when: build passes, criteria pass, notes and PROGRESS row updated.
- Part 01 (skeleton) also holds the starter text of every repo file it finalises.
- Size: a builder finishes a part in one thread; one feature or a small group. Too big: split it into two parts.

## Item 2. Project instructions — project-instructions.txt

Working rules for the coordinator and every thread; they arrive in every thread automatically. Aim for 2,000–4,000 characters once filled; the product limit is 16,000, which is a limit, not a target. What to build stays in docs/spec/. Copy this text and fill only the [brackets]:

    Project: [one line: what, for whom]. Repository: [name]. Stack: [one line]. Deploy: [one line or "not yet"].
    Everything agents write (code, comments, docs, commits, PRs, reports) is in English; [content/UI] is in [language]. The owner may write in [owner's language]; the coordinator writes to threads in English.

    Spec: docs/spec/ — 00-general.md (every thread; global rules G1…Gn), INDEX.md (coordinator only), parts/ (one per task), waves/ (the owner's later briefs). Repo map: CLAUDE.md.

    Reading rule:
    - Each thread gets only the context for its own task: its task IDs, the global rules, its part file or instructions block and the exact files it owns. Not the whole brief, not the whole repo.
    - Only the coordinator reads docs/spec/INDEX.md and whole briefs.
    - Anything agreed in chat goes into a file, or it doesn't exist for the next thread.

    Workflow per task:
    - Builder: Opus (high), own branch from main, does all the work. Tests only for criteria marked [test]; otherwise a passing build is enough. Commits and pushes at meaningful stops, updates its PROGRESS row, reports done once with the branch name. No PR, no merge. The coordinator then resolves its thread.
    - Reviewer: Sonnet (high), fresh thread, gets the branch and the builder's report. Checks quickly: logic and consistency with the spec and the repo, acceptance criteria, 1–2 checks per new interactive element, a quick mobile/desktop look. Flags only what breaks the work or the requirements. No test suites, no repeated builds, no screenshot loops, no web fact-checks. Fixes trivial things in the branch's own files itself.
    - Issues go back to the builder's thread (the coordinator messages it); the same reviewer re-checks those items. If none, the reviewer opens the PR (description = review report) and assigns the owner.
    - Only the owner merges; nobody waits for the merge. Per-part team overrides are in INDEX.md.

    Coordinator:
    - Only orchestrates: splits work, starts threads, routes messages, tracks docs/PROGRESS.md, reports. Never edits files.
    - New brief: before the wave, the thread that owns docs/spec saves it to docs/spec/waves/ in English, adds new global rules and syncs PROGRESS, in a small PR that goes first. Until it is merged, paste the needed rules into each instructions block.
    - Files never overlap between parallel threads. Shared files ([list]) belong to one thread per wave.
    - Quality first, speed second. Parallelism is your call: two at a time until a wave has gone through cleanly.
    - A wave is done when every task has a reviewed PR waiting for the owner. Then a short final report: what changed per part, what was skipped or needs a decision.

    Always:
    - After a PR is open, new work goes to a new branch and a new review.
    - Before fixing a conflict, check the PR's head branch and mergeable state.
    - Two failed fixes of the same problem: a new thread, told what was tried and why it failed.
    - Plan first only for tasks INDEX.md marks so.
    - New work goes to a new thread. Close a thread when its work is handed off or merged.
    - Missing access, fact or decision: say exactly what and stop. Never invent.

    Never: force push, commit to main or delete branches without the owner's OK; merge; secrets or real personal data in the repo, spec, test data or any agent's context.

## Item 3. CLAUDE.md and starter docs — repo/

### repo/CLAUDE.md — every thread reads it on every step: aim for ~30–40 lines, ceiling 80

For each line ask: would an agent make a mistake without it? Shape:

    # [Project]
    [One line: what it is.] [Stack, one line.] [Content/UI language]; everything else English.
    ## Read before any task — and nothing else
    - docs/spec/00-general.md, your own part file in docs/spec/parts/ (or your instructions), docs/STYLE.md
    - docs/PROGRESS.md only to update your own row
    - Never open other part files. docs/spec/INDEX.md is for the coordinator only.
    ## Where things are
    - [code folders, one line each]
    - docs/spec/ (spec; waves/ for later briefs) · docs/DECISIONS.md · docs/COMPONENTS.md · docs/parts/ (notes per part)
    ## Commands
    [install · dev · build · check · test]
    ## Code
    - [3–6 stack rules]
    - A new dependency needs a line in docs/DECISIONS.md. Reuse a block from docs/COMPONENTS.md before making a new one.
    ## Never
    - Force push, commit to main, delete branches, secrets or personal data in the repo.
    - Edit files another part owns. Touch the deploy setup unless your task says so.

### Starter docs (each starts with one line saying who writes and who reads it)

- docs/PROGRESS.md — one table, one row per part; each thread edits only its own row, so threads never fight over the file. Columns: part | title | status (not started / building / in review / PR open / merged) | branch / PR | last step → next step. The reviewer sets "PR open #N"; the docs/spec owner of the next wave flips merged rows. No free-form sections: "tried and failed" goes to notes files, "how to run" to CLAUDE.md.
- docs/DECISIONS.md — decision | why | rejected | part, date. Rule: no new library without an entry. Seed it with the stack decisions from the interview.
- docs/STYLE.md — content projects: voice, page structure, length, examples policy; the reference part adds "reference decisions" and short excerpts. Apps: code conventions, naming, folder layout, UI rules. Seed it from the interview.
- docs/COMPONENTS.md — catalogue of reusable blocks (name, props, two-line usage); empty until the skeleton adds the first ones. Reuse before creating.
- docs/BUGS.md — apps and tools: B-NNN entries with steps, expected, actual, device, status.
- The kickoff thread also creates docs/spec/waves/ and docs/parts/, each with a one-line README.

## Item 4. The first message — first-message.txt

To the coordinator: "Start one thread (Opus, High). It copies spec/ from the Library into the repo as docs/spec/, copies the repo/ files into place (CLAUDE.md at the root, docs/…), creates docs/PROGRESS.md with the table of parts and the other starter files, proposes a scaffold plan and lists questions for me. No code. It opens a PR and stops. Don't start any wave until I've merged that PR and said go. If something is missing, say exactly what and stop." I review this PR myself; no reviewer thread.

## Item 5. The recap — in the chat, in my language, one screen

- What we build: 3–5 lines; waves MVP / v1 / v2; what is deferred and why; the [test] areas.
- My steps, numbered:
  1. Create a private GitHub repository with a README.
  2. Install the Claude GitHub App and give it access to that repository.
  3. Download and unzip the archive. Never upload the zip itself.
  4. On claude.ai/code, create a new project; in Context add the repository and the unzipped folder (if the folder fails, add it later through the Library).
  5. Right after creating it, write: "Wait, don't start anything yet."
  6. Project settings → General: coordinator Opus at the highest effort, threads Opus High. Memory → Project instructions: paste project-instructions.txt.
  7. Send first-message.txt to the coordinator.
  8. Review the kickoff PR, answer its questions, merge it, then say "start wave 1 from docs/spec/INDEX.md".
- One line on the Library copy: the unzipped folder is the starter copy the coordinator sees before the repository has anything; after the kickoff PR the working copy lives on GitHub in docs/spec/, and the Library copy is never edited.
- If anything in the recap is wrong, I'll say so in this chat and you fix every file where it appears and send the zip again.

# 4. Check before zipping

- Every file the agents read is in English; the recap is in my language.
- No real personal data anywhere; all examples invented.
- Every part has owned files; no two parts in the same parallel group share a file; every shared file has one owner.
- Every acceptance criterion is checkable in a minute; [test] marks only where rule 2.5 applies.
- Sizes: CLAUDE.md ≤ 80 lines (aim 30–40); Project instructions 2,000–4,000 characters; 00-general.md ≤ ~150 lines.
- The workflow is fully in the Project instructions and only summarised in 00-general.md.
- Nothing I said in the interview is missing: each feature is in a part, in v1/v2, or in "what we don't build".

===== PUBLIC PROMPT UNTIL HERE =====
