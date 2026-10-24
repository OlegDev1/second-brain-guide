---
title: "Файлы проекта: память, правила, навыки"
short: Файлы проекта
part: "05"
order: 4
slug: 04-project-files
time: 20
level: basic
prereqs: [guide/02-project, guide/03-specs-prompts]
updated: 2026-10-23
description: Какой файл в проекте за что отвечает, кто его пишет и читает и что агент держит в голове на каждом шаге.
---

<script>
	import RepoTree from '$lib/components/files/RepoTree.svelte';
</script>

<LessonHeader
	learn={[
		'С чего начинает каждый новый поток',
		'Зачем нужен CLAUDE.md и почему он короткий',
		'Что лежит в docs/ и в папке .claude/',
		'Чем инструкции и память проекта отличаются от файлов в репозитории'
	]}
/>

<TLDR>

ИИ-помощник знает только то, что записано в файлах. Решение, о котором договорились в чате, для следующего помощника не существует, как устная договорённость, которую никто не записал. Каждый новый помощник первым делом читает инструкции проекта, память проекта и файл с правилами (`CLAUDE.md`), поэтому их держат короткими. Всё остальное (описание задумки, журнал прогресса, список ошибок, принятые решения) лежит в отдельной папке (`docs/`), и помощник открывает это, только когда нужно.

</TLDR>

## Чат забывается, файл — нет {#why-files}

У каждого <Term id="thread">потока</Term> своё <Term id="context-window">контекстное окно</Term>. Новый поток не видит, о чём ты договорился со старым. Если решение осталось только в чате, для следующего агента его нет.

К тому же правилу пришли в OpenAI: всё, что агент не может прочитать во время работы, для него фактически не существует. Обсуждение в чате, документ в Google Docs, договорённость в голове — агенту недоступны. Поэтому всё важное живёт в файлах <Term id="repository">репозитория</Term> и в настройках проекта.

Отсюда простая привычка: приняли решение — попроси записать его в файл. Тогда его прочитает любой поток, сегодня и через месяц.

<PhraseCard
	title="Записать решение"
	text="Запиши это решение в docs/DECISIONS.md: что решили, почему и какие варианты отбросили. Если оно меняет правила работы, обнови CLAUDE.md. Открой PR."
	when="Вы о чём-то договорились в чате"
/>

## С чего начинает поток {#thread-start}

Когда координатор запускает новый поток, тот стартует не с пустого места. В облачном потоке проекта сразу есть (проверено: октябрь 2026):

- <Term id="project-instructions">инструкции проекта</Term>;
- <Term id="project-memory">память проекта</Term> — её оглавление `MEMORY.md`;
- `CLAUDE.md` из корня репозитория;
- код репозитория и файлы проекта из вкладки **Library**;
- <Term id="skill">навыки</Term> и коннекторы, включённые в твоём аккаунте claude.ai.

Чего нет: навыков из папки `.claude/skills/` репозитория, файла `.claude/settings.json` и `.mcp.json` (проверено: октябрь 2026). Зачем они тогда нужны, разберём ниже, в разделе [про папку .claude/](#claude-folder).

<Callout type="important" title="«ТЗ при создании — всё, что знает агент»">

Так было в старых схемах, но сейчас это неверно. Поток начинает с инструкций, памяти, `CLAUDE.md`, кода и файлов **Library**. ТЗ, приложенное при создании, — лишь один из этих файлов, и поток откроет его, когда понадобится.

</Callout>

## Карта файлов проекта {#map}

Вот как выглядит проект «второго мозга» целиком. Сверху — репозиторий на GitHub, снизу — то, что хранится в настройках проекта, а не в коде.

<RepoTree />

Цвет у «Пишет» подсказывает автора: синий — ты или координатор, фиолетовый — поток. Метка справа говорит, когда файл попадает в контекст облачного потока.

## CLAUDE.md — короткая карта {#claude-md}

`CLAUDE.md` — файл с правилами репозитория: как запустить проект, как устроены папки и чего не делать. Он лежит в корне репозитория или в `.claude/CLAUDE.md` (проверено: октябрь 2026). Claude читает его в начале каждой сессии, и дальше он остаётся в контексте на каждом шаге.

Раз он читается на каждом шаге, каждая строка стоит <Term id="token">токенов</Term> сотни раз за задачу. Anthropic советует держать `CLAUDE.md` короче 200 строк: длинный файл съедает контекст, и правила из него соблюдаются хуже (проверено: октябрь 2026). В OpenAI сделали так же: короткий файл около 100 строк, а подробности — в `docs/`.

Поэтому `CLAUDE.md` — карта, а не учебник. В нём правила, которые нужны в каждой задаче, и ссылки на файлы для остального. Про каждую строку спроси себя: «Ошибётся ли агент, если её убрать?» Если нет — убирай.

```markdown title="CLAUDE.md"
# Second brain

Personal productivity PWA. Svelte 5 + SvelteKit, data in IndexedDB, works offline, fast on Android.

## Read first
- docs/spec/<feature>.md — the spec of the feature you work on, and nothing else
- docs/PROGRESS.md — what is done, in progress and known to be broken
- docs/DECISIONS.md — before changing structure or adding a dependency

## Layout
- src/lib/modules/<feature>/ — one folder per feature (inbox, tasks, pick-for-me, focus, habits, clients)
- A module never imports another module's internals; shared code goes to src/lib/shared/

## Commands
npm run dev · npm run build · npm run check

## Rules
- One task = one branch = one PR. Never push to main, never force push.
- Before saying "done": build and check pass; go through the acceptance criteria.
- At the end of a task, update your row in docs/PROGRESS.md.
- If something is missing, ask. Don't invent.
```

Первый вариант можно не писать руками. Команда `/init` создаёт стартовый `CLAUDE.md` по коду репозитория (проверено: октябрь 2026). Потом его стоит сократить до карты.

<Deeper title="Что внутри: импорты и сжатие">

В `CLAUDE.md` можно подключать другие файлы строкой вида `@docs/STYLE.md`. Подключённый файл тоже может подключать файлы — до четырёх уровней (проверено: октябрь 2026). Но экономии это не даёт: подключённый текст всё равно попадает в контекст целиком.

Когда история подходит к лимиту, Claude её сжимает. `CLAUDE.md` из корня при этом не теряется: после сжатия Claude перечитывает его с диска (проверено: октябрь 2026). А вот правило, сказанное только в чате, сжатие может упростить или потерять.

</Deeper>

## AGENTS.md: один файл, вторая ссылка {#agents-md}

`AGENTS.md` — тот же файл правил, только для других агентов: Codex, Cursor и подобных. Если ты пользуешься ещё чем-то кроме Claude, держи правила в одном файле, а во втором — ссылку на него. Два файла с разными правилами рано или поздно разойдутся.

Claude Code сам читает `AGENTS.md`, только если `CLAUDE.md` нет (проверено: октябрь 2026). Если нужны оба, напиши правила в `AGENTS.md`, а в `CLAUDE.md` оставь одну строку-импорт:

```markdown title="CLAUDE.md"
@AGENTS.md
```

Если других агентов нет, `AGENTS.md` не нужен вовсе. Хватит одного `CLAUDE.md`.

## docs/ — что строим и где мы {#docs}

В папке `docs/` лежит всё, что агенты читают по задаче, а не на каждом шаге. Это экономит контекст: поток открывает только свой файл.

- `docs/spec/` — ТЗ проекта, разбитое по фичам: `inbox.md`, `tasks.md`, `focus.md`. Поток фичи читает только свой файл.
- `docs/features/<name>.md` — ТЗ большой фичи, написанное после интервью. Как его собрать, — в главе [«ТЗ и промпты»](/guide/03-specs-prompts#feature-spec).
- `docs/PROGRESS.md` — состояние проекта.
- `docs/BUGS.md` — известные баги.
- `docs/DECISIONS.md` — принятые решения и почему.

### PROGRESS.md — передача дел {#progress}

`PROGRESS.md` (раньше его называли HANDOFF) — файл, по которому новый поток понимает, где проект сейчас. В нём шесть частей: что сделано, что в работе, решения и почему, известные баги, что пробовали и не сработало, как запустить и проверить.

Так делают в Anthropic с долгими задачами: каждая новая сессия сначала читает файл прогресса и историю Git, запускает простую проверку и только потом берёт новую задачу. Ещё одно их правило — одна фича за раз.

Если потоки обновляют `PROGRESS.md` в конце каждой задачи, задавать вопросы старому чату не нужно. Новый поток прочитает файл за пару минут и не потеряет детали.

### BUGS.md и DECISIONS.md {#bugs-decisions}

`BUGS.md` — список багов в формате баг-репорта: шаги, что ждали, что получили, устройство и статус. Поток, который чинит, берёт отсюда шаги, чтобы повторить ошибку.

`DECISIONS.md` — журнал решений: что выбрали, почему и что отбросили. Без него новый поток может «улучшить» то, от чего вы уже отказались, например вернуть библиотеку, которую убрали за медленную работу на Android.

## Папка .claude/ — для Claude Code {#claude-folder}

В папке `.claude/` лежат файлы, которые читает Claude Code — программа вокруг модели. Есть ещё `.mcp.json` в корне репозитория.

- `.claude/skills/<name>/SKILL.md` — навыки.
- `.claude/agents/<name>.md` — описания <Term id="subagent">субагентов</Term>.
- `.claude/commands/` — свои команды. Сейчас их объединили с навыками, старые файлы продолжают работать (проверено: октябрь 2026).
- `.claude/settings.json` — разрешения и хуки.
- `.mcp.json` — подключённые <Term id="mcp">MCP</Term>-серверы.

<Callout type="important" title="«Положу навык в репозиторий — потоки его подхватят»">

В облачных потоках проекта — нет. Навыки, субагенты и команды из `.claude/`, правила из `settings.json` и `.mcp.json` там не загружаются (проверено: октябрь 2026). Навыки для облачных потоков включают в аккаунте claude.ai, а инструменты подключают как коннекторы.

</Callout>

Зачем тогда эти файлы? Они работают, когда Claude Code запущен на твоём компьютере, в том числе когда поток проекта идёт на нём через Remote Control (проверено: октябрь 2026). Как это настроить, — в главе [«Claude Code: продвинутые приёмы»](/advanced/a3-claude-code-advanced). На старте они тебе не нужны.

### Навыки — SKILL.md {#skills}

Навык — инструкция, которая подгружается, когда задача под неё подходит. Например, рецепт «как добавить новый модуль-фичу»: какие папки создать, где зарегистрировать экран, что проверить.

Хитрость в загрузке. В контексте всегда лежит только короткое описание навыка, а весь текст подгружается, когда навык нужен (проверено: октябрь 2026). Поэтому навыков может быть много, а места они почти не занимают.

### Субагенты {#subagents}

Субагент — помощник внутри потока. Он делает побочную задачу в своём контексте и возвращает только краткую сводку (проверено: октябрь 2026). Файл в `.claude/agents/` описывает его роль: имя, описание, какие инструменты можно, какая модель.

Пример — «проверяющий по ТЗ»: он читает критерии приёмки и проходит их по одному. Основной поток при этом не тратит контекст на десятки файлов.

### Настройки и хуки {#settings}

`settings.json` хранит разрешения: что можно делать без вопроса (`allow`), что — с вопросом (`ask`), а что нельзя (`deny`) (проверено: октябрь 2026). Например, разрешить сборку `npm run build` и запретить читать файл с ключами `.env`.

Хук — команда, которая запускается сама в нужный момент. Например, после каждой правки файла хук `PostToolUse` форматирует код. Разница с `CLAUDE.md` важная: инструкцию агент может пропустить, а хук срабатывает всегда (проверено: октябрь 2026).

### MCP — .mcp.json {#mcp}

`.mcp.json` в корне — список MCP-серверов проекта: внешних инструментов и данных, к которым Claude может обращаться. Перед первым использованием таких серверов Claude Code спрашивает разрешения (проверено: октябрь 2026). В облачных потоках проекта вместо них работают коннекторы аккаунта claude.ai.

## Шаблоны файлов {#templates}

Эти шаблоны можно скопировать в репозиторий как есть. Они на английском, потому что их читают агенты; почему так, — в главе [«Твой промпт»](/guide/15-your-prompt#english).

<Accordion title="docs/PROGRESS.md" group="templates">

```markdown title="docs/PROGRESS.md"
# Progress

Each thread updates this file at the end of its task.

## Features
| Feature | Status | PR | Notes |
| --- | --- | --- | --- |
| Inbox | done | #2 | |
| Pick for me | in progress | #5 | waits for review |
| Focus timer | not started | — | |

## Decisions (short; details in DECISIONS.md)
- Data stays on the device in IndexedDB.

## Known bugs (details in BUGS.md)
- Focus timer resets after the app was in the background.

## Tried and failed
- setInterval for the timer: stops in the background on Android.

## How to run and check
npm install · npm run dev · npm run build · npm run check
```

</Accordion>

<Accordion title="docs/BUGS.md" group="templates">

```markdown title="docs/BUGS.md"
# Bugs

## B1. Focus timer resets in the background — open
- Steps: start a 25 min focus → leave the app for 5 min → come back
- Expected: about 20 min left
- Actual: shows 25:00 and stands still
- Device: Android, Chrome, installed PWA
- Notes: screenshot in the PR
```

</Accordion>

<Accordion title="docs/DECISIONS.md" group="templates">

```markdown title="docs/DECISIONS.md"
# Decisions

## D1. Data stays on the device (2026-10-20)
- Decision: store everything in IndexedDB, no server.
- Why: works offline, opens fast on Android, nothing to pay for.
- Rejected: a cloud database — needs login and network.
- Revisit if: sync between phone and laptop becomes a must.
```

</Accordion>

<Accordion title=".claude/skills/new-module/SKILL.md" group="templates">

```markdown title=".claude/skills/new-module/SKILL.md"
---
name: new-module
description: Use when adding a new feature module to the app (a new screen with its own data).
---

1. Create src/lib/modules/<feature>/ with index.ts, a store and the screen component.
2. Register the screen in src/lib/shared/routes.ts. Touch no other module.
3. Keep the data in the module's own IndexedDB store.
4. Go through the acceptance criteria in docs/spec/<feature>.md one by one.
5. Run npm run build and npm run check before saying "done".
```

</Accordion>

<Accordion title=".claude/agents/spec-checker.md" group="templates">

```markdown title=".claude/agents/spec-checker.md"
---
name: spec-checker
description: Checks a finished feature against its acceptance criteria. Use after a feature is built, before the PR.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You check one feature against docs/spec/<feature>.md.
For each acceptance criterion: say how you checked it and whether it passes.
Do not change code. Return a short list: criterion, pass or fail, evidence.
```

</Accordion>

## Не в репозитории: настройки проекта {#outside-repo}

Две вещи живут не в репозитории, а в настройках проекта: инструкции проекта и память проекта. Их не видно в коде на GitHub, но их получает каждый новый поток.

**Инструкции проекта** — текст до 16 000 символов, который получают координатор и каждый новый поток (проверено: октябрь 2026). Там правила работы команды: одна задача — один поток, не пушить в `main`, когда останавливаться и ждать тебя. Путь: Project settings → Memory → Project instructions. Изменения доходят только до новых потоков, уже запущенные их не увидят (проверено: октябрь 2026).

**Память проекта** — заметки, которые Claude ведёт сам. Скажи «запомни» в разговоре проекта или в потоке — и он запишет требование, решение или подводный камень. Каждый облачный поток в начале читает оглавление `MEMORY.md`, а остальные файлы открывает по необходимости. Посмотреть и поправить их можно в Project settings → Memory (проверено: октябрь 2026).

<CompareTable caption="Где что хранить">

| | `CLAUDE.md` | Инструкции проекта | Память проекта |
| --- | --- | --- | --- |
| Где | В репозитории | В настройках проекта | В настройках проекта |
| Кто пишет | Поток через PR | Ты | Claude по «запомни» |
| Что класть | Правила кода | Правила работы команды | Факты и решения |
| Кто читает | Каждый поток | Координатор и потоки | Каждый поток |

</CompareTable>

<PhraseCard
	title="Запомнить"
	text="Запомни: [факт или решение]. Это важно для всех будущих потоков."
	when="Ты сказал то, что не должно потеряться, а файл для этого не подходит"
/>

Как устроены координатор и потоки, — в главе [«Проект в Claude Code»](/guide/02-project).

## Что в контексте всегда {#always-loaded}

Чем больше текста лежит в контексте постоянно, тем меньше места остаётся для самой задачи. Поэтому полезно знать, что агент держит в голове всегда, а что берёт по запросу.

<CompareTable caption="Облачный поток проекта">

| | Всегда | По задаче | Не грузится |
| --- | --- | --- | --- |
| Правила | Инструкции, `CLAUDE.md` | — | `settings.json` |
| Память | Оглавление `MEMORY.md` | Остальные заметки | — |
| Знания | Описания навыков | Текст навыка, `docs/` | `.claude/skills/` репо |
| Файлы | — | Код, **Library** | `.mcp.json` |

</CompareTable>

Отсюда правило: в постоянные файлы — только то, что нужно в каждой задаче. Остальное — в `docs/` со ссылкой из `CLAUDE.md`. Сколько это стоит в токенах, разобрано в главе [«Токены и лимиты»](/guide/09-tokens-limits).

## harness.md — такого файла нет {#harness}

В старых схемах встречается «файл harness.md». Такого стандартного файла нет. Обвязка (harness) — это программа вокруг модели, а не файл: Claude Code — обвязка, Claude — модель внутри неё (проверено: октябрь 2026).

Обвязка даёт модели доступ к файлам и терминалу, спрашивает разрешения, подгружает память и крутит цикл «подумал → сделал → посмотрел». Настраивают её файлами, у которых есть стандартные имена.

<Callout type="important" title="«Создай harness.md с правилами»">

Такой файл никто не прочитает. Правила пиши в `CLAUDE.md` или `AGENTS.md`, навыки — в `SKILL.md`, субагентов — в `.claude/agents/<name>.md`.

</Callout>

## Выводы {#takeaways}

<Takeaways>

- Решение из чата для следующего агента не существует: всё важное записывай в файлы.
- Новый поток начинает с инструкций проекта, памяти, `CLAUDE.md`, кода и файлов **Library**, а не только с ТЗ.
- `CLAUDE.md` читается на каждом шаге, поэтому он короткий: карта со ссылками на `docs/`.
- `PROGRESS.md` позволяет передать дела новому потоку без вопросов старому чату.
- Навыки, субагенты, хуки и `.mcp.json` из репозитория работают в Claude Code на компьютере, но не в облачных потоках проекта.
- Файла `harness.md` нет: обвязка — это программа вокруг модели, а правила живут в `CLAUDE.md`.

</Takeaways>

## Что сделать сейчас {#next-steps}

<Checklist
	id="guide-04-next-steps"
	title="Три шага"
	items={[
		'Открой карту файлов выше и нажми на CLAUDE.md, PROGRESS.md и Project memory',
		'Скопируй шаблон PROGRESS.md в заметки',
		'Скопируй фразу «Записать решение», чтобы она была под рукой'
	]}
/>

## Источники {#sources}

- Claude Code Docs: [How Claude remembers your project](https://code.claude.com/docs/en/memory), [Extend Claude with skills](https://code.claude.com/docs/en/skills), [Create custom subagents](https://code.claude.com/docs/en/sub-agents), [Settings files and precedence](https://code.claude.com/docs/en/settings), [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide), [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp), [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices), [Let Claude coordinate ongoing work with Projects](https://code.claude.com/docs/en/claude-projects), [Glossary](https://code.claude.com/docs/en/glossary), [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works).
- Anthropic Engineering: [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).
- OpenAI: [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/).
