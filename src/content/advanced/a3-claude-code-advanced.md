---
title: "Claude Code: продвинутые приёмы"
short: Claude Code глубже
part: "09"
order: 2
slug: a3-claude-code-advanced
time: 10
level: advanced
prereqs: [guide/04-project-files, guide/07-agent-team]
updated: 2026-10-24
description: Субагенты со своей моделью, навыки, хуки, разрешения, MCP, рутины и поток на своём компьютере — что из этого работает в облачных потоках проекта.
---

<LessonHeader
	learn={[
		'Что из папки .claude/ работает в облачных потоках, а что нет',
		'Как дать субагенту свои инструменты и модель',
		'Как написать описание навыка, чтобы он срабатывал вовремя',
		'Какие хуки поставить для Svelte-проекта',
		'Когда нужны рутины и поток на своём компьютере'
	]}
/>

<TLDR>

Облачный поток проекта читает `CLAUDE.md`, но не грузит навыки, субагентов, хуки, разрешения и `.mcp.json` из репозитория. Навыки и MCP для облака включают в аккаунте, остальное работает на твоём компьютере через Remote Control. Хуки — единственное, что срабатывает всегда, без просьбы.

</TLDR>

<Callout type="note" title="Для кого эта глава">

Для автора. Основы папки `.claude/` — в [«Файлы проекта»](/guide/04-project-files#claude-folder), роли потоков и субагентов — в [«Команда агентов»](/guide/07-agent-team). Здесь — как выжать из них больше на приложении друга.

</Callout>

## Облако и компьютер: что где работает {#where}

Главное ограничение: облачный поток проекта берёт из репозитория только `CLAUDE.md`, `.claude/CLAUDE.md` и `.claude/rules/` в корне (проверено: октябрь 2026). Остальное из `.claude/` там молчит.

| В репозитории | В облачном потоке | Что делать |
| --- | --- | --- |
| `CLAUDE.md`, `.claude/rules/` | Загружаются | Ничего |
| `.claude/skills/` | Не загружаются | Включить навык в аккаунте claude.ai |
| `.claude/agents/`, команды | Не загружаются | Поток на своём компьютере |
| `.mcp.json` | Не загружается | Коннекторы аккаунта |
| Разрешения и хуки в `settings.json` | Не применяются | Одобрять в потоке или компьютер |
| `env` в `settings.json` | Не применяется | Облачное окружение проекта |

Поэтому всё ниже про субагентов и хуки — для Claude Code на компьютере или для потока, который проект запустил у тебя через Remote Control (проверено: октябрь 2026).

## Субагенты со своей моделью {#subagents}

Файл `.claude/agents/<name>.md` описывает субагента. Обязательны только `name` и `description`; поле `tools` ограничивает инструменты, `model` выбирает модель: `haiku`, `sonnet`, `opus` или `inherit` (проверено: октябрь 2026).

```markdown title=".claude/agents/spec-checker.md"
---
name: spec-checker
description: Сверяет экран с ТЗ из docs/features/. Используй после правок экрана.
tools: Read, Grep, Glob
model: haiku
---
Прочитай ТЗ фичи и код экрана. Верни список расхождений, по строке на пункт. Код не меняй.
```

Субагент выгоднее потока, когда задача шумная, самостоятельная и её итог помещается в сводку: найти, где хранятся отметки привычек, сверить экран с ТЗ. Поток нужен, когда работе нужна своя ветка и PR.

## Навыки: всё решает описание {#skills}

В контексте всегда лежит только описание навыка; полный текст грузится, когда Claude решит, что навык подходит (проверено: октябрь 2026). Документация советует ставить главный случай первым и называть условия: «Use when…». Описание и `when_to_use` вместе обрезаются на 1 536 символах.

Три навыка, которые окупаются на втором мозге:

- **new-module** — каркас модуля в `src/modules/<name>/`, паспорт, регистрация в реестре.
- **db-migration** — новая версия схемы Dexie, миграция и тест на старых данных.
- **release** — сборка, номер версии, заметки к релизу, APK.

```yaml title=".claude/skills/db-migration/SKILL.md"
---
name: db-migration
description: Меняет схему данных Dexie. Use when a task adds or renames a field, a table or an index.
---
```

## Хуки: проверка без просьб {#hooks}

Хук — команда, которую Claude Code запускает сам в нужный момент. `CLAUDE.md` — совет, хук — правило: он срабатывает всегда (проверено: октябрь 2026). Событие `PostToolUse` с фильтром `Edit|Write` идёт после каждой правки, `PreToolUse` — до действия, и выход с кодом 2 его блокирует.

```json title=".claude/settings.json"
{
	"hooks": {
		"PostToolUse": [
			{
				"matcher": "Edit|Write",
				"hooks": [
					{ "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write" },
					{ "type": "command", "command": "npx svelte-check --threshold error" }
				]
			}
		],
		"PreToolUse": [
			{
				"matcher": "Bash",
				"hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-danger.sh" }]
			}
		]
	}
}
```

```bash title=".claude/hooks/block-danger.sh"
#!/bin/bash
COMMAND=$(jq -r '.tool_input.command')
if echo "$COMMAND" | grep -qE 'push (.* )?(--force|-f)( |$)|rm -rf'; then
  echo "Blocked: force push and rm -rf are not allowed" >&2
  exit 2
fi
exit 0
```

<Callout type="important" title="«Хук в репозитории защитит main от потоков»">

В облачных потоках проекта хуки не запускаются. Там `main` защищают правило в инструкциях проекта и правило защиты ветки на GitHub — см. [«Безопасность»](/guide/13-security).

</Callout>

## Разрешения с одним и несколькими репо {#permissions}

Правила `allow`, `ask` и `deny` в `.claude/settings.json` проверяются в порядке deny → ask → allow (проверено: октябрь 2026). В облачных потоках проекта они не применяются ни с одним репозиторием, ни с несколькими: поток спрашивает одобрение у тебя в самом потоке.

Несколько репозиториев меняют другое: поток читает `CLAUDE.md` из корня каждого. Если правила в них спорят, держи общие правила в инструкциях проекта, а в `CLAUDE.md` — только то, что касается этого репо.

## MCP: Svelte, GitHub, коннекторы {#mcp}

- **Svelte MCP** — документация Svelte 5 и `svelte-autofixer`, который ловит старый синтаксис вроде `export let`. Для облачных потоков его подключают как коннектор.
- **GitHub** уже встроен: облачные потоки работают с репозиторием через Claude GitHub App, отдельный MCP не нужен (проверено: октябрь 2026).
- **Коннекторы** подключают один раз на claude.ai/customize/connectors, и ими пользуется каждый облачный поток (проверено: октябрь 2026).

## Рутины по расписанию {#routines}

Задачу, которая повторяется без разговора, проще сделать облачной задачей по расписанию (routine), чем держать для неё поток (проверено: октябрь 2026). Проект тоже может завести такую задачу, если попросить.

Три рутины для второго мозга: недельная уборка кода, обновление зависимостей с одним PR, отчёт о скорости по `web-vitals`.

<PhraseCard
	title="Недельная уборка"
	when="Фич стало много, код начал повторяться"
	text="Заведи задачу по расписанию: каждый понедельник ищи дубли кода, мёртвые файлы и отступления от правил CLAUDE.md. Исправь мелочи одним PR в новой ветке, крупное опиши в отчёте. Ничего не мерджи."
/>

## Поток на своём компьютере {#remote-control}

Когда задаче нужно то, что есть только у тебя, — эмулятор Android, локальная база, API за VPN — попроси проект запустить поток на твоём компьютере через Remote Control (проверено: октябрь 2026). Нужен Claude Code v2.1.280 или новее, а поток работает, только пока компьютер не спит.

Такой поток использует то, что установлено у тебя: навыки, субагентов, хуки и MCP из `.claude/`. Это способ включить всё из этой главы, не уходя из проекта.

## Выводы {#takeaways}

<Takeaways>

- Облачный поток проекта читает `CLAUDE.md` и `.claude/rules/`, но не навыки, субагентов, команды, хуки, разрешения и `.mcp.json` репозитория.
- Хук в репозитории не защищает `main` от облачных потоков; это делают инструкции проекта и правило защиты ветки.
- Субагенту можно дать узкий набор инструментов и дешёвую модель: так шумная разведка не забивает контекст потока.
- Навык срабатывает по описанию, поэтому главный случай и условия «Use when…» идут первыми.
- Повторяющуюся задачу без разговора отдают рутине, а задачу с эмулятором или локальной базой — потоку на своём компьютере.

</Takeaways>

## Что сделать сейчас {#next-steps}

<Checklist
	id="advanced-a3-next-steps"
	title="Три шага"
	items={[
		'Проверь, что Svelte MCP подключён как коннектор в аккаунте claude.ai',
		'Перенеси нужные навыки из .claude/skills/ в аккаунт или запусти поток через Remote Control',
		'Заведи одну рутину: недельную уборку кода'
	]}
/>

## Источники {#sources}

- Claude Code Docs: [Let Claude coordinate ongoing work with Projects](https://code.claude.com/docs/en/claude-projects), [Create custom subagents](https://code.claude.com/docs/en/sub-agents), [Extend Claude with skills](https://code.claude.com/docs/en/skills), [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide), [Configure permissions](https://code.claude.com/docs/en/permissions), [Automate work with scheduled tasks](https://code.claude.com/docs/en/routines), [Continue local sessions from any device with Remote Control](https://code.claude.com/docs/en/remote-control).
- Svelte: [MCP overview](https://svelte.dev/docs/mcp/overview).
