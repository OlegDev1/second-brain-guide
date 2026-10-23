# Part 05 — Specs, project files and your prompt

**Model:** Opus, High. **Depends on:** 02. **Wave:** 4, in parallel with 06.

## Goal

Chapters `03-specs-prompts`, `04-project-files` and `15-your-prompt`: how to write so agents never guess, which file does what, and a ready prompt that turns the friend's voice notes into a complete project kit.

## Includes

**Chapter 03 — Specs and prompts**
- Spec by voice: a regular chat with Opus at maximum effort, voice messages one after another, plus files (screenshots of apps he likes, this guide, notes). Then an "interview": Opus asks questions one block at a time.
- Spec structure: goal and audience; scenarios; screens; data and fields; rules and edge cases; acceptance criteria; speed, offline, Android; what we don't do; open questions.
- Acceptance criteria on «Выбери за меня»: only unfinished tasks; empty state at 0; the only task at 1; every task can come up; never the same task twice in a row when there are more.
- A big feature gets its own spec in `docs/features/<name>.md`; implementation runs in a separate thread (PDF slide 7).
- Anatomy of a message to an agent: context → task → constraints → how to check → how to report. Plan first, code second.
- A good bug report: steps, expected, actual, screenshot, device.
- Don't correct in circles: after two failed corrections, a new thread that states what didn't work ([13]).

**Chapter 04 — Project files: memory, rules, skills**
- `CLAUDE.md`: repo rules, read by every thread and kept in context on every step — so short: a map with links ([3], [14]).
- `AGENTS.md`: the same idea for other agents; keep one and link the other.
- `docs/spec/`, `docs/features/*.md`: what we build. `docs/PROGRESS.md` (formerly HANDOFF): done, in progress, decisions and why, known bugs, what failed, how to run (PDF slide 6). `docs/BUGS.md`, `docs/DECISIONS.md`.
- `.claude/skills/<name>/SKILL.md` — skills; `.claude/agents/<name>.md` — subagents; `.claude/commands/`; `.claude/settings.json` — permissions and hooks; `.mcp.json` — MCP servers.
- Project instructions (up to 16,000 characters, sent to every thread) and project memory (`MEMORY.md`, written on «запомни», editable in settings) — not in the repo.
- What is always loaded and what on demand: a skill shows only its description until needed.
- OpenAI's rule: a decision made in chat doesn't exist for the next agent ([14]).

**Chapter 15 — Your turn: the prompt that writes your project spec**
- When: after chapters 02–05. Where: a regular chat with Opus at maximum effort; voice; screenshots allowed.
- What comes out: `SPEC.md` in English, Project instructions, `CLAUDE.md`, the first message to the project, a one-screen Russian recap.
- Why the files are in English: fewer tokens, more precise agents; the recap keeps it checkable.
- Then step by step (Steps #23): empty private repo → Claude GitHub App → New project with the repo and `SPEC.md` in Context → immediately "Hold on, don't start anything yet" → Project settings: Coordinator Opus (highest effort for the kickoff, then Low), Thread Opus High, Project instructions → first message → review the PR → first feature.
- The prompt below goes on the page **verbatim** in a PhraseCard with Copy. Square brackets are placeholders.

**Must correct** (errors in the source materials)
- `harness.md` is not a standard file; the harness is the program around the model. Files: `CLAUDE.md`, `AGENTS.md`, `SKILL.md`, subagent definitions.
- "The spec attached at creation is all a new agent knows" (HTML): a thread now starts with project instructions, project memory, `CLAUDE.md` and skills from the repo, and the Library files.
- "Thinking mode Extra or Max": UI names change; say "maximum effort" and check the UI on the date.

**Components and blocks**
- Specialised component owned here: `src/lib/components/files/RepoTree.svelte` — a tappable repo tree; each file shows who writes it, who reads it and when.
- Accordion with templates of `PROGRESS.md`, `BUGS.md`, `DECISIONS.md`, one `SKILL.md`, one subagent — each in a CodeBlock with Copy.
- BeforeAfter (#29) for a prompt, a feature spec and a bug report. Checklist (#38) "spec completeness" and "before sending the prompt".

## Excludes

- How projects and threads work → part 04; link.
- Git → part 02. Token practices → part 03.
- Advanced Claude Code (hooks in depth, routines, Remote Control) → part 09 (`a3-claude-code-advanced`).

## Output

`src/content/guide/03-specs-prompts.md`, `src/content/guide/04-project-files.md`, `src/content/guide/15-your-prompt.md`, `src/lib/components/files/RepoTree.svelte`, `docs/parts/05-specs-files-prompt.notes.md`. PR title: `Part 05: chapters 03, 04 and 15`.

## Sources

The researcher saves a source for every key fact into the notes Sources table as it is found, so the fact-checker checks the saved link instead of searching again. Key facts here: `CLAUDE.md` loading, skills, subagents, settings and hooks, `.mcp.json` (Claude Code docs); project instructions limit and project memory (Projects docs); PDF [3], [13], [14], [17] with original URLs.

## Done when

- Build and check pass; the prompt on the page matches the text below exactly.
- RepoTree works on a phone.
- All three corrections are stated.

## Prompt for chapter 15 (verbatim, Russian)

```text
Я хочу сделать приложение «второй мозг» для себя с помощью команды агентов Claude в проекте Claude Code: координатор раздаёт задачи потокам, код хранится на GitHub. Сейчас я расскажу голосом, что хочу. Твоя задача — превратить это в готовый комплект для проекта.

Мои фичи (дальше дополню голосом):
- [например: входящие, задачи, «выбери за меня», таймер фокуса, привычки, клиенты с напоминаниями, кнопка медитации, цели дня, анализ продуктивности дня]

Как работать со мной:
1. Сначала задавай вопросы, по одному блоку за раз: экраны, данные, правила, телефон или компьютер, что важнее всего. Не пиши ТЗ, пока не понял всё.
2. Если что-то слишком сложно для первой версии, скажи и предложи перенести в v1 или v2.

Что выдать в конце. Всё, что читают агенты, пиши на английском: так меньше токенов и точнее работа.
1. SPEC.md — ТЗ проекта:
   - цель и для кого;
   - стек: Svelte 5 + SvelteKit, данные хранятся локально на устройстве (IndexedDB), приложение очень быстрое на Android, PWA. Если какой-то фиче нужно другое (например, точные напоминания по времени), объясни почему и предложи вариант;
   - модель данных и архитектура: каждая фича — отдельный модуль в своей папке, модули не лезут в чужой код;
   - фичи по волнам MVP / v1 / v2. Для каждой: что делает, экраны, данные, крайние случаи, критерии приёмки — как проверить, что работает;
   - чего не делаем;
   - как работают агенты: одна фича — один поток, своя ветка и один PR; не больше двух потоков одновременно; в конце задачи поток обновляет docs/PROGRESS.md; промежуточную работу регулярно коммитит и пушит; на каждом PR останавливается и ждёт моей проверки; если чего-то не хватает — спрашивает, а не додумывает;
   - проверки: автор проверяет свою фичу по критериям приёмки; короткие тесты только для логики со случайностью, временем и напоминаниями; отдельный поток на модели поменьше проверяет фичу по критериям; без тяжёлых наборов тестов и CI на старте;
   - экономия токенов: ТЗ разбивается на файлы по фичам, каждый поток читает только свой файл; короткий CLAUDE.md; новая задача — новый поток.
2. Текст для Project instructions — до 16 000 символов.
3. CLAUDE.md — до 80 строк.
4. Первое сообщение в проект: разбить SPEC.md на docs/spec/ по фичам, создать CLAUDE.md и docs/PROGRESS.md с таблицей фич, предложить план каркаса и вопросы ко мне. Код пока не писать, открыть PR и остановиться.
5. По-русски, на один экран: короткий пересказ ТЗ, чтобы я проверил, что ты понял меня правильно, и что мне сделать по шагам.

Каждый файл — отдельным блоком кода, чтобы я мог скопировать.
```
