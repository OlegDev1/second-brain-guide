# Part 05 notes: chapters 03, 04 and 15

Chapters: `src/content/guide/03-specs-prompts.md`, `src/content/guide/04-project-files.md`,
`src/content/guide/15-your-prompt.md`. Component: `src/lib/components/files/RepoTree.svelte`.

## Sources

All rows checked on 2026-10-23. Anchors: `03` = `/guide/03-specs-prompts`, `04` = `/guide/04-project-files`,
`15` = `/guide/15-your-prompt`.

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| Project CLAUDE.md lives in `./CLAUDE.md` or `./.claude/CLAUDE.md`; personal `CLAUDE.local.md` | 04#claude-md | https://code.claude.com/docs/en/memory#choose-where-to-put-claude-md-files | 2026-10-23 | "can be stored in either `./CLAUDE.md` or `./.claude/CLAUDE.md`" |
| CLAUDE.md is read at the start of every session | 04#claude-md | https://code.claude.com/docs/en/memory#claude-md-files | 2026-10-23 | "Claude reads them at the start of every session." |
| Target under 200 lines; longer files cost context and reduce adherence | 04#claude-md | https://code.claude.com/docs/en/memory#write-effective-instructions | 2026-10-23 | "target under 200 lines per CLAUDE.md file" |
| `@path` imports, up to four hops; imports don't cut context cost | 04#claude-md (Deeper) | https://code.claude.com/docs/en/memory#import-additional-files | 2026-10-23 | "with a maximum depth of four hops" |
| Project-root CLAUDE.md survives `/compact`, re-read from disk | 04#always-loaded | https://code.claude.com/docs/en/memory#instructions-seem-lost-after-compact | 2026-10-23 | "Project-root CLAUDE.md survives compaction" |
| Claude Code reads AGENTS.md only when no CLAUDE.md exists | 04#agents-md | https://code.claude.com/docs/en/memory#agents-md | 2026-10-23 | "Claude Code can read `AGENTS.md` as your project instructions" |
| With both files, put an `@AGENTS.md` import into CLAUDE.md | 04#agents-md | https://code.claude.com/docs/en/memory#share-one-file-with-other-coding-tools | 2026-10-23 | "putting an `@AGENTS.md` import in a `CLAUDE.md` next to it" |
| `/init` generates a starter CLAUDE.md | 04#claude-md | https://code.claude.com/docs/en/memory#set-up-a-project-claude-md | 2026-10-23 | "Run `/init` to generate a starting CLAUDE.md automatically." |
| Skill path `.claude/skills/<name>/SKILL.md`; only `description` recommended | 04#skills | https://code.claude.com/docs/en/skills#frontmatter-reference | 2026-10-23 | "All fields are optional. Only `description` is recommended" |
| Skill description always in context, full skill loads when invoked | 04#skills, 04#always-loaded | https://code.claude.com/docs/en/skills#control-who-invokes-a-skill | 2026-10-23 | "Description always in context, full skill loads when invoked." |
| Descriptions budget ~1% of the context window | 04#skills (Deeper) | https://code.claude.com/docs/en/skills#skill-descriptions-are-cut-short | 2026-10-23 | "The budget scales at 1% of the model's context window." |
| Custom commands (`.claude/commands/`) merged into skills, old files still work | 04#claude-folder | https://code.claude.com/docs/en/skills | 2026-10-23 | Note at top: "Custom commands have been merged into skills." |
| Subagent file `.claude/agents/<name>.md`; `name` and `description` required | 04#subagents | https://code.claude.com/docs/en/sub-agents#supported-frontmatter-fields | 2026-10-23 | "Only `name` and `description` are required." |
| Subagent works in its own context and returns only a summary | 04#subagents | https://code.claude.com/docs/en/sub-agents | 2026-10-23 | "does that work in its own context and returns only the summary" |
| `.claude/settings.json` committed and shared; `settings.local.json` personal | 04#settings | https://code.claude.com/docs/en/settings#settings-files-and-who-they-affect | 2026-10-23 | "Commit `.claude/settings.json` so everyone who clones the repository" |
| `permissions` holds `allow` / `ask` / `deny` rules like `Bash(npm run lint)` | 04#settings | https://code.claude.com/docs/en/settings#edit-a-settings-file | 2026-10-23 | "Each entry under `permissions` is a rule that names a tool" |
| Hooks run at lifecycle points, deterministic control | 04#settings | https://code.claude.com/docs/en/hooks-guide | 2026-10-23 | "which gives you deterministic control" |
| `PostToolUse` hook with `Edit|Write` matcher, e.g. auto-format | 04#settings | https://code.claude.com/docs/en/hooks-guide#auto-format-code-after-edits | 2026-10-23 | "uses the `PostToolUse` event with an `Edit|Write` matcher" |
| CLAUDE.md is advisory, hooks are deterministic | 04#settings | https://code.claude.com/docs/en/best-practices#set-up-hooks | 2026-10-23 | "Unlike CLAUDE.md instructions which are advisory, hooks are deterministic" |
| `.mcp.json` at the root = project MCP servers, in version control | 04#mcp | https://code.claude.com/docs/en/mcp#project-scope | 2026-10-23 | "Check `.mcp.json` into version control" |
| Claude Code asks approval before using project MCP servers | 04#mcp | https://code.claude.com/docs/en/mcp#project-scope | 2026-10-23 | "prompts for approval in interactive sessions before using project-scoped servers" |
| Explore → plan → code | 03#message | https://code.claude.com/docs/en/best-practices#explore-first-then-plan-then-code | 2026-10-23 | "Separate research and planning from implementation" |
| Let Claude interview you; spec to SPEC.md; fresh session to implement | 03#interview, 03#feature-spec | https://code.claude.com/docs/en/best-practices#let-claude-interview-you | 2026-10-23 | "Once the spec is complete, start a fresh session to execute it." |
| Give Claude a way to verify its work | 03#message | https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work | 2026-10-23 | "Give Claude a check it can run: tests, a build, a screenshot" |
| After two failed corrections, `/clear` and a better prompt | 03#no-circles | https://code.claude.com/docs/en/best-practices#avoid-common-failure-patterns | 2026-10-23 | "After two failed corrections, `/clear` and write a better initial prompt" |
| For each CLAUDE.md line: would removing it cause mistakes? | 04#claude-md | https://code.claude.com/docs/en/best-practices#write-an-effective-claude-md | 2026-10-23 | "Would removing this cause Claude to make mistakes?" |
| Be specific, reference files, paste screenshots | 03#message | https://code.claude.com/docs/en/best-practices#provide-specific-context-in-your-prompts | 2026-10-23 | "paste screenshots/images, or pipe data directly" |
| Harness = the program around the model (Claude Code is the harness) | 04#harness | https://code.claude.com/docs/en/glossary#agentic-harness | 2026-10-23 | "Claude Code is the harness; Claude is the model inside it." |
| Harness supplies file access, shell, permissions, memory loading, loop | 04#harness | https://code.claude.com/docs/en/how-claude-code-works#the-agentic-loop | 2026-10-23 | "what the term agentic harness refers to" |
| PDF slide 6: PROGRESS.md contents (done, next, decisions, bugs, how to run, what failed) | 04#progress | PDF «Как устроена ИИ-команда», slide 6 → [17] https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents | 2026-10-23 | Slide 6 block «Что держать в PROGRESS.md» |
| PDF slide 7: big feature goes to SPEC.md first, implementation in a new chat | 03#feature-spec | PDF slide 7 → [3] https://code.claude.com/docs/en/best-practices#let-claude-interview-you | 2026-10-23 | Slide 7 «Сначала план, потом код» |
| Project = one coordinating conversation plus the threads it starts | 15#steps | https://code.claude.com/docs/en/claude-projects#how-a-project-is-organized | 2026-10-23 | "one coordinating conversation with Claude plus the threads it starts" |
| A cloud thread starts with repos and files, instructions and memory, repo CLAUDE.md, account connectors — not repo skills, settings.json, .mcp.json | 04#thread-start, 04#claude-folder | https://code.claude.com/docs/en/claude-projects#how-a-project-is-organized | 2026-10-23 | "but not the repositories' skills, `.claude/settings.json`, or `.mcp.json`" |
| Cloud threads: repo skills, agents, commands, `.mcp.json`, permission rules, hooks not loaded | 04#claude-folder | https://code.claude.com/docs/en/claude-projects#what-threads-pick-up-from-your-repositories | 2026-10-23 | Table row "Agents and commands under `.claude/`": "Not loaded." |
| Only root CLAUDE.md, `.claude/CLAUDE.md`, `.claude/rules/` loaded in cloud threads | 04#claude-md | https://code.claude.com/docs/en/claude-projects#what-threads-pick-up-from-your-repositories | 2026-10-23 | "`CLAUDE.md` files in subdirectories and path-specific rules aren't loaded" |
| Skills for cloud threads: enable them on the claude.ai account | 04#skills | https://code.claude.com/docs/en/claude-projects#get-skills-plugins-connectors-and-tools-into-threads | 2026-10-23 | "Skills committed to a repository's `.claude/skills/` don't load in cloud threads." |
| Thread run on your computer via Remote Control uses what's installed there | 04#claude-folder | https://code.claude.com/docs/en/claude-projects#get-skills-plugins-connectors-and-tools-into-threads | 2026-10-23 | "A thread that Claude runs on your machine through Remote Control uses what's installed there." |
| Project instructions: sent to each new thread and to the conversation, up to 16,000 characters | 04#outside-repo, 15#output | https://code.claude.com/docs/en/claude-projects#give-a-project-standing-context | 2026-10-23 | Table row "Project instructions": "up to 16,000 characters" |
| Path: Project settings > Memory > Project instructions | 04#outside-repo, 15#steps | https://code.claude.com/docs/en/claude-projects#write-project-instructions | 2026-10-23 | "then go to Memory > Project instructions" |
| Instruction changes reach new threads only | 04#outside-repo | https://code.claude.com/docs/en/claude-projects#project-settings-reference | 2026-10-23 | "reach new threads, not threads already running" |
| Project memory: files with a `MEMORY.md` index read by every cloud thread at start; written on request; edited in Project settings > Memory | 04#outside-repo | https://code.claude.com/docs/en/claude-projects#give-a-project-standing-context | 2026-10-23 | "Every cloud thread reads the index file `MEMORY.md` when it starts" |
| Project memory is separate from repo CLAUDE.md files | 04#outside-repo | https://code.claude.com/docs/en/claude-projects#give-a-project-standing-context | 2026-10-23 | "Project memory is also separate from the `CLAUDE.md` files" |
| Library files readable under `/mnt/project-files`; added in New project → Context or Library → Add | 04#thread-start, 15#steps | https://code.claude.com/docs/en/claude-projects#add-files-and-folders | 2026-10-23 | "in the **New project** dialog's **Context** field" |
| New project: Projects in sidebar (or under More) → New project; fields Name, Goal, Context; Create project | 15#steps | https://code.claude.com/docs/en/claude-projects#start-a-new-project-from-scratch | 2026-10-23 | "Then select **New project**." |
| Project instructions are set after the project exists | 15#steps | https://code.claude.com/docs/en/claude-projects#start-a-new-project-from-scratch | 2026-10-23 | "project instructions, which you set after the project exists" |
| On the first project Claude takes a turn of its own unless you send a message first | 15#steps | https://code.claude.com/docs/en/claude-projects#start-a-new-project-from-scratch | 2026-10-23 | "Claude takes a turn of its own as soon as the project is created" |
| Models and effort: Project settings > General → Thread model/effort, Coordinator model/effort; default Opus, high for threads, low for coordinator | 15#steps | https://code.claude.com/docs/en/claude-projects#choose-models-and-let-claude-manage-context | 2026-10-23 | "Set models and effort in **Project settings > General**." |
| Effort levels in Claude Code: low, medium, high, xhigh, max | 15#steps | https://code.claude.com/docs/en/model-config#adjust-effort-level | 2026-10-23 | Effort levels table |
| Projects need the Claude GitHub App on each repository (github.com/apps/claude) | 15#steps | https://code.claude.com/docs/en/claude-projects#set-up-github-access | 2026-10-23 | "Install the Claude GitHub App and grant it the repositories" |
| Projects: public beta on Pro and Max | 15#steps | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "Projects are in public beta on Pro and Max plans" |
| Regular chat: model name next to send → Effort → Low / Medium / High / Extra high / Max | 03#by-voice, 15#when-where | https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings | 2026-10-23 | "Click the model name next to the send button." |
| Dictation on mobile: microphone icon in the input field turns speech into text; Russian in beta | 03#by-voice | https://support.claude.com/en/articles/10065434-use-dictation-on-claude-mobile | 2026-10-23 | "Dictation turns your speech into text so you can send a written prompt" |
| Attach files and images: "+" → "Add files or photos", drag-drop, paste | 03#by-voice | https://support.claude.com/en/articles/8241126-upload-files-to-claude | 2026-10-23 | "+" button → "Add files or photos" |
| Interview prompt: "Keep interviewing ... then write a complete spec to SPEC.md" | 03#interview | https://code.claude.com/docs/en/best-practices#let-claude-interview-you | 2026-10-23 | "then write a complete spec to SPEC.md" |
| More than two corrections on the same issue → `/clear`, start fresh with what you learned | 03#no-circles | https://code.claude.com/docs/en/best-practices#course-correct-early-and-often | 2026-10-23 | "corrected Claude more than twice on the same issue" |
| Without a check "looks done" is the only signal and you become the verification loop | 03#message | https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work | 2026-10-23 | "you become the verification loop" |
| [13] Multi-turn underspecified tasks: average drop of 39% | 03#interview (Deeper) | PDF [13] → https://arxiv.org/abs/2505.06120 | 2026-10-23 | Abstract: "an average drop of 39% across six generation tasks" |
| [13] After a wrong turn models get lost and do not recover | 03#interview (Deeper), 03#no-circles | https://arxiv.org/abs/2505.06120 | 2026-10-23 | Abstract: "they get lost and do not recover" |
| [13] Users: a new conversation may help; consolidate before retrying | 03#no-circles | https://arxiv.org/html/2505.06120 | 2026-10-23 | §7.4: "a new conversation may lead to improved outcomes" |
| [14] Short AGENTS.md (~100 lines) as a map; docs/ is the system of record | 04#claude-md | PDF [14] → https://openai.com/index/harness-engineering/ | 2026-10-23 | "A short AGENTS.md (roughly 100 lines)" |
| [14] Knowledge the agent can't access in context effectively doesn't exist | 04#why-files | https://openai.com/index/harness-engineering/ | 2026-10-23 | "anything it can't access in-context while running effectively doesn't exist" |
| [14] Knowledge in Google Docs, chat threads or people's heads is not accessible | 04#why-files | https://openai.com/index/harness-engineering/ | 2026-10-23 | "Knowledge that lives in Google Docs, chat threads, or people's heads" |
| [17] Progress file log + git history; new session reads git log and progress file first | 04#progress | PDF [17] → https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents | 2026-10-23 | "Read the git logs and progress files to get up to speed" |
| [17] Run a basic end-to-end test before a new feature | 04#progress | https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents | 2026-10-23 | "run through a basic end-to-end test before implementing" |
| [17] One feature at a time | 04#progress | https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents | 2026-10-23 | "asked to work on only one feature at a time" |
| Characters per token depend on the model and the language | 15#english | https://platform.claude.com/docs/en/about-claude/glossary | 2026-10-23 | Entry "Tokens": "depends on the model and the language" |
| Claude's scores in other languages are measured relative to English (100%) | 15#english | https://platform.claude.com/docs/en/build-with-claude/multilingual-support | 2026-10-23 | "expressed as a percentage relative to English performance (100%)" |
| GitHub: New repository → choose visibility → optional README → Create repository | 15#steps | https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository | 2026-10-23 | "Choose a repository visibility." |

## New terms

| EN | RU | Definition |
| --- | --- | --- |
| acceptance criteria | критерии приёмки | List of checks after which a feature counts as done; each takes a minute by hand. |
| bug report | баг-репорт | Message about a bug that lets anyone repeat it: steps, expected, actual, screenshot, device. |
| interview | интервью | The model asks you questions block by block before it writes a spec. |
| effort | усилие (effort) | How long the model thinks before answering; levels Low … Max. |
| dictation | диктовка | Speech turned into text in the Claude app before sending. |
| harness | обвязка (harness) | The program around the model (Claude Code); not a file. |
| hook | хук | Command Claude Code runs by itself at a set moment, e.g. after each edit. |
| permission rule | правило разрешений | `allow` / `ask` / `deny` entry in `.claude/settings.json`. |
| Library | Library | Project tab with the files you added and the files threads produced. |
| connector | коннектор | MCP server connected once to the claude.ai account; cloud threads use it. |

## Ready phrases

| Title | Chapter#anchor | Phrase |
| --- | --- | --- |
| Начать интервью | 03#interview | Не пиши ТЗ, пока не поймёшь всё. Задавай вопросы по одному блоку за раз: экраны, данные, правила, крайние случаи, что важнее всего. Если что-то слишком сложно для первой версии, скажи и предложи перенести. |
| ТЗ большой фичи | 03#feature-spec | Возьми у меня интервью про фичу [название] и запиши ТЗ в docs/features/[name].md: цель, экраны, данные, правила и крайние случаи, критерии приёмки, чего не делаем. Код не пиши. Открой PR с этим файлом и остановись. |
| Сначала план | 03#plan-first | Сначала изучи нужные файлы и пришли план: что поменяешь, в каких файлах и как проверишь. Код не пиши, пока я не скажу OK. |
| Баг-репорт | 03#bug-report | Баг в [фича]. Шаги: [что нажимал по порядку]. Ожидал: [что должно быть]. Получил: [что случилось]. Скриншот прикрепил. Устройство: [телефон, браузер]. Сначала повтори баг и найди причину, потом чини в новой ветке и открой PR. |
| Перезапуск задачи | 03#no-circles | Начни задачу [название] заново в новой ветке. ТЗ: [файл]. Прошлый поток пробовал [что пробовал], не сработало, потому что [почему]. Не повторяй этот путь. Сначала пришли план. |
| Записать решение | 04#why-files | Запиши это решение в docs/DECISIONS.md: что решили, почему и какие варианты отбросили. Если оно меняет правила работы, обнови CLAUDE.md. Открой PR. |
| Запомнить | 04#outside-repo | Запомни: [факт или решение]. Это важно для всех будущих потоков. |
| Промпт для ТЗ проекта | 15#prompt | The full prompt from the part file (long; copy it from the page). |
| Поправить комплект | 15#conversation | В пересказе неверно: [что не так]. Исправь это во всех файлах, где оно встречается, и пришли заново только изменённые блоки. |
| Остановить старт | 15#setup | Подожди, пока ничего не начинай. Я сначала настрою проект и пришлю первое сообщение. |
| Первая волна | 15#launch | Начни первую волну MVP из docs/spec/. Одна фича — один поток, своя ветка и один PR. Не больше двух потоков одновременно. На каждом PR остановись и жди моей проверки. |

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| A skill in `.claude/skills/` is ignored by project threads | Cloud threads of a project don't load repo skills | Enable the skill on the claude.ai account, or run the thread on your computer via Remote Control |
| Hooks or permission rules from `.claude/settings.json` don't work in a thread | Cloud threads don't apply them | Approve inside the thread; use hooks only in local sessions |
| A new rule in project instructions is not followed | Changes reach only new threads | Start a new thread |
| The thread ignores half of `CLAUDE.md` | File too long; adherence drops | Cut it to a map under 200 lines, move details to `docs/` |
| The model keeps making the same mistake after corrections | Long history of failed attempts | After two failed corrections start a new thread that says what didn't work |
| Claude starts working right after the project is created | First project: Claude takes its own first turn | Send «Подожди, пока ничего не начинай» right away |
| Threads can't see the repository | Claude GitHub App not installed on it | Install it at github.com/apps/claude and grant the repository |

## Open questions

1. **Correction differs from the part file.** The part file says a thread starts with "`CLAUDE.md` and skills from the repo". The Projects docs say cloud threads load the repo's `CLAUDE.md` but not its skills, agents, commands, `.claude/settings.json` or `.mcp.json`; skills come from the claude.ai account. Chapter 04 follows the docs and states this as a second «important» correction. Part 09 (`a3-claude-code-advanced`) may want to align.
2. **"English = fewer tokens".** No official page gives a number for Russian vs English tokens. Chapter 15 says only what is sourced: characters per token depend on the language, and Anthropic measures other languages relative to English. Plus the practical reason: code and docs are already in English.
3. **Empty repository.** The Projects docs don't say whether a project works with a repository that has no commits. Chapter 15 tells the reader to create a README so the repository has a first commit.
4. **Auto-import bug in `config/markdown.js`.** Fixed in review (PR #8): the "already imported" check now looks only inside `<script>` blocks, and chapter 03 no longer imports components by hand.
5. **Coordinator effort for the kickoff.** The part file says "highest effort for the kickoff, then Low". The chapter says "the highest available" and to switch back to Low after the first PR; the Projects page itself doesn't list level names.
6. **Mobile screenshots.** The upload help page doesn't say how to attach images on mobile, so chapter 03 describes the "+" menu on claude.ai and dictation on the phone only.
7. **Word counts.** Prose without code: chapter 03 about 2,100 words, 04 about 2,150 (plus templates), 15 about 1,400 plus the prompt. All inside the 1,500–3,500 range, a little under STYLE's 2,500 target.

## Fixes wave (2026-10-24)

Changes made by the fixes wave, so later agents know why the chapters differ from the part file.

- **Chapter 03.** New opening section: one master spec plus narrow per-agent parts, a flowchart of where the spec goes (Library = start copy, GitHub `docs/spec/` = working version) and why. «Разделы ТЗ» became «Структуру ТЗ строит чат»: the reader dictates, the chat structures; our structure (`00-general.md`, `INDEX.md`, `parts/`), the template zip and the two-agent rule (Opus builds, its thread is closed; Sonnet checks; the builder is reopened only for issues). New section «Наш пример» (N4): our conditions, the owner's agent-workflow diagram (`src/lib/assets/spec/agents-scheme.webp`, captioned that Haiku is no longer used), how `docs/spec/` is structured, and a shortened real coordinator → builder message.
- **Template pack (N3).** Source in `docs/templates/spec-pack/`, zip in `static/downloads/spec-pack.zip`; rebuild command in `docs/templates/README.md`. Based on `docs/spec/00-general.md`, `INDEX.md` and a part file, with project content stripped and "Template note" lines kept.
- **Chapter 15.** Title is now «Промпт для старта». The prompt lives in `docs/templates/spec-pack/starter-prompt.txt` and the chapter imports it with `?raw`, so page and zip never drift. The prompt now asks the spec chat to split the spec itself into `spec/` (00-general, INDEX, parts), forbids personal data (G7), sets the two-agent workflow and asks for one zip. The section «От репозитория до первой фичи» is now «Как начать» (`#steps`): unzip, add the folder (never the zip) when creating the project, Library as the fallback; coordinator effort is Max or Extra high per the owner's brief, no "back to Low".
- **Chapter 04.** New plain intro «Три группы файлов» before the folder breakdown; `docs/spec/` bullet and RepoTree aligned with the 00-general / INDEX / parts structure; `src/` in RepoTree now explains where it comes from.

Open after this wave:

8. **«Как начать» stays a section of chapter 15**, not a separate page: a new page would touch navigation and the home page, which belong to another thread. If the owner wants it as its own sidebar item, it needs a new slug and a home-page entry.
9. **Old link text.** `src/content/ref/phrases.md` still says «Твой ход: …» and «Твой промпт» for chapter 15. The ref pages belong to part 10.
10. **The part file prompt is superseded.** The verbatim prompt in `docs/spec/parts/05-specs-files-prompt.md` is the pre-wave version; the source of truth is now `docs/templates/spec-pack/starter-prompt.txt`.
