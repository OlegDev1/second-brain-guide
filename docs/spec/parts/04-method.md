# Part 04 — The method: project and agent team

**Model:** Opus, High. **Depends on:** 02. **Wave:** 3, in parallel with 03.

## Goal

Chapters `02-project` and `07-agent-team`: an expanded, up-to-date version of the HTML diagram — how a whole project runs from idea to an app on the phone, and how to steer the coordinator, threads and subagents without burning the limit.

## Includes

**Chapter 02 — Organising the whole project**
- Phases: idea and spec → skeleton (stack, folders, design system) → vertical slice (one feature from screen to storage) → features in cycles → speed and polish → Android release.
- What a Claude Code project is now: a coordinator conversation plus threads; each thread is a separate cloud session with its own context, branch and PR. Overview pane: Ready for review, Waiting on you, Working; tabs Library and Pull requests.
- When to use a project, a single cloud session or a plain chat — Anthropic's own criteria.
- First run, per the docs: project instructions → one small task → check thread model and effort → «предлагай потоки и жди моего ок», «не больше двух сразу».
- Checkpoints: after the plan, after the skeleton, on every PR, before release; what to look at in 5 minutes on the phone.
- Definition of done for a feature: works on the deployed site, `PROGRESS.md` updated, PR merged.
- Cutting features vertically and small; models reliably finish tasks worth minutes to hours of human work, not days (PDF slide 7, [19]).
- The friend's backlog in waves: MVP — Inbox, Tasks, Today, Focus timer, «Выбери за меня»; v1 — Daily goals, Habits, Clients with reminders, Meditation; v2 — Tables, Daily productivity analysis, integrations.
- Modules protect against merge conflicts: each feature in its own folder (one paragraph + link to `11-architecture`).

**Chapter 07 — The agent team**
- Levels: coordinator (sees reports, not every step) → threads (full sessions) → subagents inside a thread (side task in its own context, returns a 1–2k-token summary) → agent teams.
- Roles for the second brain: planner, feature coder, reviewer who is not the author, optimiser, cleaner (every few features looks for duplication and bad patterns — at OpenAI this took about 20% of the week, [14]).
- Briefing the coordinator like a chief of staff. Ready commands: «предлагай потоки и жди ок», «не больше двух сразу», «короче апдейты», «сделай эту задачу моделью поменьше», «ответь здесь, без потока».
- Parallel or sequential: an agent spends about 4× the tokens of a chat, a multi-agent system about 15× ([18]); parallelism pays off only on independent modules; merge conflicts are normal ([1]).
- Model and effort: a new project runs every thread on Opus at high effort, the most expensive option; where Opus is needed and where Sonnet or Haiku is enough; per-task model is requested in words.
- Hidden costs: a thread watching a PR wakes up on review comments and failed checks; returning to an old idle thread re-reads its whole history — new work goes to a new thread.

**Must correct** (error in the source materials): the HTML says to replace the coder by hand every 1–2 features and delete the old one. In a project each task already runs in a new thread with a clean context; finished threads go to Resolved. Manual replacement matters only for single sessions. Deleting a project erases its threads, memory and files; branches and PRs on GitHub stay.

**Components and blocks**
- Specialised component owned here: `src/lib/components/method/ProjectDiagram.svelte` (#31) — the whole flow (you → spec → project ⇄ GitHub → coordinator → threads → checks → your review → merge); every node is tappable and links to its chapter by slug; vertical on a phone.
- ChatTranscript (#34) content: a full «Выбери за меня» cycle — brief → plan → code → independent check finds that some tasks never come up → fix → review → merge, with side notes on why each message works.
- A roles table with a ready brief for each role (CompareTable).

## Excludes

- Writing the spec and prompts, project files, skills → part 05.
- Git mechanics → part 02 (link to `05-git-github`).
- Token arithmetic and the calculator → part 03.
- App architecture in depth → part 06.
- Testing the app → part 07.

## Output

`src/content/guide/02-project.md`, `src/content/guide/07-agent-team.md`, `src/lib/components/method/ProjectDiagram.svelte`, `docs/parts/04-method.notes.md`. PR title: `Part 04: chapters 02 and 07`.

## Sources

The researcher saves a source for every key fact into the notes Sources table as it is found, so the fact-checker checks the saved link instead of searching again. Key facts here: everything about Projects — coordinator, threads, Overview groups, default model and effort, usage notes, instructions limit, memory, Resolved (code.claude.com/docs/en/claude-projects); subagents (Claude Code docs); PDF numbers [1], [14], [18], [19] with original URLs.

## Done when

- Build and check pass; every product fact has a source and «проверено: месяц год» on the page.
- ProjectDiagram works on a phone; every node opens the right chapter.
- The "replace the coder" correction is stated clearly.
