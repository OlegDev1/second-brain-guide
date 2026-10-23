# Part 04 notes: chapters 02 and 07

Chapters: `src/content/guide/02-project.md`, `src/content/guide/07-agent-team.md`.
Component: `src/lib/components/method/ProjectDiagram.svelte`.

## Sources

All rows checked on 2026-10-23. `02#` means `/guide/02-project#…`, `07#` means `/guide/07-agent-team#…`.
"Projects page" is https://code.claude.com/docs/en/claude-projects.

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| A project is one ongoing conversation where Claude coordinates work and starts a thread per task | 02#what-is-project | Projects page | 2026-10-23 | Intro: "A project is one ongoing conversation where Claude coordinates" |
| Projects are in public beta on Pro and Max; not on Team or Enterprise yet | 02#what-is-project | Projects page | 2026-10-23 | Note box at the top: "Projects are in public beta on Pro and Max plans" |
| Projects are at claude.ai/code, the desktop app and the iOS/Android mobile app; not in the terminal CLI or IDE plugins | 02#what-is-project, 02#checkpoints | Projects page | 2026-10-23 | Sections "Create a project" and "Limitations" |
| The coordinator sees what threads report back, not every step | 02#what-is-project, 07#coordinator | Projects page | 2026-10-23 | "How a project is organized": "It sees what threads report back, not every step" |
| Each thread is a separate session with its own context window; a cloud thread works on its own branch and opens a PR | 02#what-is-project, 07#threads | Projects page | 2026-10-23 | "How a project is organized": "Threads: the workers." |
| Every cloud thread starts with repos and files, project instructions and memory, each repo's CLAUDE.md, account connectors, a cloud environment | 02#what-is-project | Projects page | 2026-10-23 | "What every cloud thread starts with" |
| Overview groups: Ready for review, Waiting on you, Working, Landing, Idle, Resolved; tabs Library, Pull requests, Scheduled tasks | 02#overview | Projects page | 2026-10-23 | Section "See what needs you in Overview", table of groups |
| Resolved: marked by you, by Claude after the last step such as a merge, or automatically after a week idle; can be reopened | 02#overview, 07#replace-coder | Projects page | 2026-10-23 | Table row "Resolved" |
| When to use a project: a goal that outlasts one session and keeps producing tasks; e.g. "Build what docs/spec.md describes" | 02#when-project | Projects page | 2026-10-23 | Section "When to use a project" |
| One task that fits in a session → start a cloud session yourself; work needing your machine → local session | 02#when-project | Projects page | 2026-10-23 | Section "When something else fits better" |
| The earlier claude.ai chat Projects group conversations and files without threads or a coordinator | 02#when-project | Projects page | 2026-10-23 | "How projects relate…": "groups conversations and reference files without threads or a coordinator" |
| First batch: write instructions → one small task → check Thread model and Thread effort → propose threads and run a few at a time | 02#first-run | Projects page | 2026-10-23 | Section "Your first batch", steps 1–4 |
| A new project runs every thread on Opus at high effort, which draws on the plan fastest | 02#first-run, 07#models | Projects page | 2026-10-23 | "Your first batch" step 3: "A new project runs every thread on Opus at high effort" |
| Coordinator defaults to Opus at low effort; settings Thread/Coordinator model and effort in Project settings > General | 07#models | Projects page | 2026-10-23 | "Choose models and let Claude manage context": "high effort for threads and low effort for the conversation" |
| For one task with another model, ask in the task; for a running thread use its model picker | 07#models | Projects page | 2026-10-23 | Same section: "To use a different model for one task, ask for it in the task" |
| Project instructions go to each new thread and the coordinator, up to 16,000 characters | 02#first-run | Projects page | 2026-10-23 | Table "Give a project standing context", row "Project instructions" |
| A useful brief: purpose, where work happens, how a thread checks its work, what to do when something is missing, what needs your go-ahead | 02#first-run | Projects page | 2026-10-23 | Section "Write project instructions" |
| Project memory: files Claude keeps; every cloud thread reads `MEMORY.md` at start | 02#what-is-project | Projects page | 2026-10-23 | Table row "Project memory" |
| Ready coordinator phrases: propose threads and wait; at most two at a time; shorter updates; smaller model; answer here instead of a thread | 07#briefing | Projects page | 2026-10-23 | Section "Tune how Claude runs a project", bullet list |
| Such preferences are saved to memory but are not enforced; a thread limit isn't a hard cap; put it in instructions to apply exactly | 07#briefing | Projects page | 2026-10-23 | "They're instructions Claude keeps to, not enforced settings" |
| No fixed number of threads; enforced limit is 200 new threads per day | 07#parallel | Projects page | 2026-10-23 | "What draws on your plan": "The enforced limit is 200 new threads per day" |
| A project uses plan limits faster than a single session; on Pro expect to hit the limit sooner | 02#what-is-project, 07#hidden-costs | Projects page | 2026-10-23 | "What draws on your plan": "uses your limits faster than a single session does" |
| An idle thread watching a PR wakes up when CI fails or a review comment arrives; ask it to stop watching | 07#hidden-costs | Projects page | 2026-10-23 | "What draws on your plan", bullet "Threads watching a pull request" |
| After a thread opens a PR it watches it with auto-fix: pushes fixes for CI, addresses comments | 07#hidden-costs | Projects page | 2026-10-23 | "Review a thread's pull request": "watches the pull request with auto-fix turned on" |
| A follow-up to a thread idle longer than the cache lifetime (an hour on Pro/Max) re-reads its whole conversation; a fresh thread can use less | 07#hidden-costs | Projects page | 2026-10-23 | "See and reduce a project's usage", first bullet |
| An idle project with no running threads, watched PRs or new messages uses nothing | 07#hidden-costs | Projects page | 2026-10-23 | "A project with no running threads… doesn't use your plan" |
| Threads compact automatically; the coordinator works from recent messages, threads and memory | 07#replace-coder | Projects page | 2026-10-23 | "You don't manage context windows in a project." |
| Delete removes the project with its threads, memory and files; can't be undone; GitHub branches and PRs aren't affected | 07#delete-project | Projects page | 2026-10-23 | "Pause, archive, or delete a project", bullet "Delete" |
| Card buttons Resolve conflicts, Fix CI, Address comments, Merge it, Review PR, Create PR | 02#checkpoints | Projects page | 2026-10-23 | "Review a thread's pull request": "its card in the conversation can show a button" |
| A permission prompt waits inside the thread; telling the coordinator doesn't reach it | 02#checkpoints | Projects page | 2026-10-23 | Section "Unblock a thread waiting on approval" |
| Uncommitted changes can be lost if the sandbox can't resume; ask to commit and push work in progress | 02#first-run | Projects page | 2026-10-23 | "Limitations": "uncommitted changes can be lost" |
| Several threads guessed or stalled: usually one setup gap; ask the coordinator to list assumptions, resolve wrong threads, fix once, rerun one thread | 02#stalled | Projects page | 2026-10-23 | Troubleshooting "Threads guessed or stalled instead of asking", steps 1–3 |
| A running thread with no messages is usually still working; open it, answer a permission prompt there | 02#stalled | Projects page | 2026-10-23 | Troubleshooting "A thread looks stuck" |
| A thread that reaches the plan limit waits and continues when it resets; Stop the thread or Pause the project to prevent it | 07#hidden-costs | Projects page | 2026-10-23 | "Usage and cost": "waits and continues on its own when the limit resets" |
| Pause interrupts every running thread and the conversation | 07#hidden-costs | Projects page | 2026-10-23 | "Pause, archive, or delete a project", bullet "Pause" |
| Archive hides the project and archives its threads | 07#delete-project | Projects page | 2026-10-23 | Same section, bullet "Archive" |
| Agent teams: one session starts teammate sessions for a single task and ends with it | 07#levels | Projects page | 2026-10-23 | "How projects relate…", bullet "Agent teams" |
| A subagent runs inside one session, does a side task in its own context and returns a summary; a thread can use subagents | 07#levels | Projects page | 2026-10-23 | "How projects relate…", bullet "Subagents" |
| Subagent: own context window; returns only the summary; counts toward the same usage limits | 07#levels | https://code.claude.com/docs/en/sub-agents | 2026-10-23 | Intro: "does that work in its own context and returns only the summary" |
| Use subagents when output is verbose, the work is self-contained and can return a summary | 07#levels | https://code.claude.com/docs/en/sub-agents | 2026-10-23 | "Choose between subagents and main conversation": "The work is self-contained and can return a summary" |
| Agent teams are experimental, off by default; teammates message each other; use significantly more tokens | 07#levels | https://code.claude.com/docs/en/agent-teams | 2026-10-23 | Warning box: "Agent teams are experimental and disabled by default." |
| Agent teams fit independent work; for sequential tasks or same-file edits a single session or subagents are better | 07#parallel | https://code.claude.com/docs/en/agent-teams | 2026-10-23 | "When to use agent teams": "For sequential tasks, same-file edits" |
| Model aliases: opus for complex reasoning, sonnet for daily coding, haiku for simple tasks | 07#models | https://code.claude.com/docs/en/model-config | 2026-10-23 | Table "Model aliases": "Uses the latest Opus model for complex reasoning tasks" |
| Lower effort is faster and cheaper for simple tasks; higher effort reasons deeper | 07#models | https://code.claude.com/docs/en/model-config | 2026-10-23 | "Adjust effort level": "Lower effort is faster and cheaper" |
| A fresh context improves review since Claude isn't biased toward code it just wrote (Writer/Reviewer) | 07#roles | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "A fresh context improves code review" |
| Tell a reviewer to flag only gaps that affect correctness or requirements | 07#roles (transcript) | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "flag only gaps that affect correctness or the stated requirements" |
| After two failed corrections, start fresh with a better prompt | 07#replace-coder | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "If you've corrected Claude more than twice on the same issue" |
| PDF slide 7, [19]: models almost always finish tasks under ~4 min of human work and rarely over ~4 h | 02#slices | https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ | 2026-10-23 | "almost 100% success rate on tasks taking humans less than 4 minutes" |
| [19]: 50% time horizon of Claude 3.7 Sonnet ≈ 50 minutes; horizon doubles about every 7 months since 2019 | 02#slices (Deeper) | https://arxiv.org/abs/2503.14499 | 2026-10-23 | Abstract: "doubling approximately every seven months since 2019" |
| Deck [8], slide 7: a subagent may use tens of thousands of tokens but returns a 1,000–2,000-token summary | 07#levels, 07#subagents | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 2026-10-23 | "returns only a condensed, distilled summary of its work" |
| [18]: agents use about 4× the tokens of chat; multi-agent systems about 15× | 07#parallel | https://www.anthropic.com/engineering/multi-agent-research-system | 2026-10-23 | "agents typically use about 4× more tokens than chat interactions" |
| [18]: domains with shared context or many dependencies between agents are a poor fit for multi-agent | 07#parallel | https://www.anthropic.com/engineering/multi-agent-research-system | 2026-10-23 | "are not a good fit for multi-agent systems today" |
| [1]: 16 agents, nearly 2,000 sessions, ~$20,000, 100,000-line compiler | 07#parallel | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-23 | "Over nearly 2,000 Claude Code sessions and $20,000 in API costs" |
| [1]: merge conflicts are frequent, Claude handles them | 07#parallel | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-23 | "Merge conflicts are frequent, but Claude is smart enough" |
| [1]: 16 agents on one task didn't help, each was stuck on the same task | 07#parallel | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-23 | "each was stuck solving the same task" |
| [14]: the team spent every Friday (20% of the week) cleaning up "AI slop" | 07#roles | https://openai.com/index/harness-engineering/ | 2026-10-23 | "spend every Friday (20% of the week) cleaning up" |
| [14]: Codex replicates existing patterns, even suboptimal ones | 07#roles | https://openai.com/index/harness-engineering/ | 2026-10-23 | "replicates patterns that already exist in the repository" |
| [14]: background tasks scan for deviations and open refactoring PRs, like garbage collection | 07#roles | https://openai.com/index/harness-engineering/ | 2026-10-23 | "This functions like garbage collection." |

## New terms

| EN | RU | Definition |
| --- | --- | --- |
| vertical slice | вертикальный срез | One feature built end to end, from screen to storage, so the whole path is proven early. |
| agent team | команда агентов (agent teams) | Experimental Claude Code mode: a lead session starts teammates that message each other. |
| effort | усилие (effort) | How much the model reasons per step; higher costs more tokens. |
| Overview | Overview | Project pane that groups threads by state: Ready for review, Waiting on you, Working… |
| Resolved | Resolved | Overview group for finished threads; they can be reopened. |
| definition of done | критерий готовности | What must be true before a feature counts as finished. |
| checkpoint | контрольная точка | A planned moment where you review before work continues. |
| backlog | бэклог | Ordered list of features not built yet. |
| MVP | MVP | Smallest version of the app you can already use every day. |

## Ready phrases

- **Первое сообщение проекту** (02#first-run): «Прочитай docs/SPEC.md. Предложи план по волнам и первые потоки, но ничего не запускай без моего ок. Не больше двух потоков сразу.»
- **Разбор ошибок потоков** (02#stalled): «По каждому открытому потоку напиши: что ты ему поручил, что он додумал сам или не смог получить и чего он сейчас ждёт. Ничего не чини, сначала покажи список.»
- **Правила для координатора** (07#briefing): «Правила на эту волну: предлагай потоки и жди моего ок, не больше двух сразу. Пиши только когда что-то готово или застряло. Каждый PR проверяет отдельный ревьюер, не автор. Короткие вопросы решай здесь, без потока. Запомни это.»
- **Предлагай и жди** (07#briefing): «Предлагай потоки и жди моего ок перед запуском.»
- **Не больше двух** (07#briefing): «Не больше двух потоков сразу.»
- **Короче апдейты** (07#briefing): «Пиши короче: только когда что-то готово или застряло.»
- **Модель поменьше** (07#briefing): «Сделай эту задачу моделью поменьше: Sonnet, усилие medium.»
- **Ответь здесь** (07#briefing): «Ответь здесь, без потока.»
- **Брифы ролей** (07#roles): planner, feature coder, reviewer, optimiser, cleaner — the texts are in the CompareTable and the PhraseCards in chapter 07.
- **Новая работа — новый поток** (07#hidden-costs): «Это новая задача: начни для неё новый поток, старый не трогай.»

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| A thread shows "running" but the coordinator is silent | Claude doesn't post each step; the thread may be waiting on a permission prompt | Open the thread from Overview; answer the prompt inside the thread |
| Several threads guessed wrong or stalled | A gap in project instructions or environment | Ask the coordinator to list what each thread assumed; fix the instructions once; rerun one thread first |
| Limit runs out fast on day one | Every thread on Opus at high effort, many threads at once | Lower Thread model/effort in Project settings → General; «не больше двух потоков сразу» |
| Usage rises while you do nothing | Threads watching PRs wake on CI failures and review comments | Merge or close the PR, or tell the thread to stop watching |
| A small follow-up costs a lot | Reviving a thread idle past the cache lifetime re-reads its whole history | Ask for a new thread for new work |
| Merge conflict between two threads | Both edited the same files | Keep features in their own folders; run dependent tasks one after another |

## Open questions

- The deck (slide 7) words the METR result as "models of 2025"; METR's post says "current models" (March 2025). The chapter says «модели начала 2025 года» and adds the doubling trend in «Глубже». Reviewer may tighten if needed.
- The original HTML recommends Max $100 and thinking modes "Extra/Max"; chapter 02 doesn't repeat plan advice, which belongs to part 03 (tokens and limits).
