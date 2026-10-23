# Components

Generic components for chapters. See them live, in both themes, at `/design`.

## How to write a chapter

- File: `src/content/<guide|advanced|ref>/<slug>.md`. The slug must match the file name.
- Frontmatter:

  ```yaml
  ---
  title: Git и GitHub          # full title (h1, lists, search)
  short: Git и GitHub          # optional: shorter title for the reading bar
  part: "02"                   # spec part that owns the chapter
  order: 5                     # position inside the section
  slug: 05-git-github
  time: 25                     # reading time in minutes
  level: basic                 # basic | advanced
  prereqs: [guide/02-project]  # chapter paths or plain text
  updated: 2026-10-23
  description: One sentence for cards and search engines (optional)
  ---
  ```

  Remove `stub: true` when you replace a stub. Quote a value that contains a colon.
- Components below need **no import**: a build step adds it (`config/markdown.js`).
- Leave a blank line between a component tag and Markdown inside it, or the Markdown is not parsed.
- `##` and `###` headings get ids automatically. For a stable Latin anchor write `## Ветки {#branches}`.
- Links: root-relative, no base path, e.g. `[ветки](/guide/05-git-github#branches)`. The build adds the base path and trailing slash.
- Fenced code blocks get Shiki highlighting and a Copy button. Add a file name with `` ```bash title="setup.sh" ``.
- Markdown tables scroll sideways on a phone by themselves.
- Inline SVG diagrams: wrap in `DiagramFrame` and use only the classes listed there.

## Framing

### LessonHeader
Props: `learn: string[]`, `time?: number`, `level?: 'basic' | 'advanced'`, `prereqs?: string[]`. Time, level and prereqs default to the frontmatter.
```svelte
<LessonHeader learn={['Что такое ветка', 'Как открыть PR']} />
```

### TLDR
Props: `title = 'Коротко'`. Two or three lines that open the chapter.
```svelte
<TLDR>Каждая задача живёт в своей ветке.</TLDR>
```

### Takeaways
Props: `title?`. Put a Markdown list inside, under `## Выводы`.
```svelte
<Takeaways>

- Ветка — подвижный указатель.

</Takeaways>
```

### Callout
Props: `type = 'tip' | 'important' | 'danger' | 'note'` (green / amber / red / blue), `title?`.
```svelte
<Callout type="danger" title="Не делай force push">Он стирает чужие коммиты.</Callout>
```

### Deeper
The «Глубже» disclosure. Props: `title` (the question).
```svelte
<Deeper title="Почему агенты не видят чаты друг друга">У каждого потока своё контекстное окно.</Deeper>
```

### Term
Glossary tooltip. Props: `id` (entry in `src/lib/glossary.ts`); children = the word as written. New terms go to your notes file; part 10 adds them.
```svelte
Каждый <Term id="thread">поток</Term> открывает <Term id="pull-request" />.
```

### Accordion
Props: `title`, `open = false`, `group?` (same group = only one open).
```svelte
<Accordion title="Почему Claude остановился?" group="faq">Скорее всего, кончился лимит.</Accordion>
```

## Procedures

### Steps / Step
Numbered stepper, 3–8 steps. `Step` props: `title`, `check?` («Должно получиться: …»).
```svelte
<Steps><Step title="Создай ветку" check="видно имя ветки" /><Step title="Сделай коммит" /></Steps>
```

### Tabs / Tab
Props: `labels: string[]`, `group?` (tabs with the same group switch together and are remembered). One `Tab` per label, same order.
```svelte
<Tabs labels={['macOS', 'Windows']} group="os"><Tab>Открой Терминал.</Tab><Tab>Открой PowerShell.</Tab></Tabs>
```

### Checklist
Ticks are saved in the browser. Props: `id` (unique, never change it), `items: string[]`, `title?`.
```svelte
<Checklist id="end-of-session" title="Перед концом сессии" items={['HANDOFF.md', 'Коммит', 'Push']} />
```

## Explaining

### CompareTable
Wrap a Markdown table: options as columns, criteria as rows. Props: `caption?`. The first column sticks while scrolling.
```svelte
<CompareTable caption="Какую модель взять">

| | Opus | Sonnet |
| --- | --- | --- |
| Для чего | Сложное | Основное |

</CompareTable>
```

### BeforeAfter / Before / After
Switch between a weak and an improved version. Props: `title?`, `beforeLabel = 'Было'`, `afterLabel = 'Стало'`.
```svelte
<BeforeAfter title="Промпт"><Before>«Сделай приложение».</Before><After>«Добавь экран Inbox…»</After></BeforeAfter>
```

### ChatTranscript / Msg
`Msg` props: `from = 'you' | 'claude' | 'coordinator' | 'thread' | 'agent'`, `name?`, `note?` (side note on why it works).
```svelte
<ChatTranscript><Msg from="you" note="Одна задача">Добавь кнопку.</Msg><Msg from="thread">PR открыт.</Msg></ChatTranscript>
```

### PhraseCard
Ready phrase with a Copy button. Props: `text` (what gets copied), `title?`, `when?`.
```svelte
<PhraseCard title="Передача дел" text="Напиши HANDOFF.md: что сделано и что осталось." when="Перед концом сессии" />
```

### CodeBlock
Every fenced block already uses it. Use it directly only to wrap a fence with a file title, or with `code` outside Markdown. Props: `lang?`, `title?`, `code?`.
```svelte
<CodeBlock title="CLAUDE.md">

(fenced block here)

</CodeBlock>
```

### DiagramFrame
Wrapper for inline SVG. Props: `label` (required, read aloud), `caption?`. Inside the SVG use only: `rect.node.blue|violet|amber|green|red|neutral` (radius 10, 1.5 px stroke), `text.label` / `text.label.small`, `path.arrow` / `path.arrow.dashed` (loops, optional steps), `.arrowhead` for markers. Keep labels short and the layout vertical.
```svelte
<DiagramFrame label="Ты пишешь координатору, он запускает поток"><svg viewBox="0 0 320 140">…</svg></DiagramFrame>
```

## Small parts

### Card
One idea per card. Props: `title?`, `eyebrow?`, `href?` (whole card is a link; root-relative paths get the base), `tone?`.
```svelte
<Card title="Inbox" eyebrow="Экран" tone="blue">Всё входящее в одном месте.</Card>
```

### Chip
Props: `tone = 'neutral' | 'blue' | 'violet' | 'amber' | 'green' | 'red'`.
```svelte
<Chip tone="green">main</Chip> <Chip tone="violet">поток</Chip>
```

### LevelBadge
Props: `level: 'basic' | 'advanced'`.
```svelte
<LevelBadge level="advanced" />
```

### Glossary
The full A–Я list from `src/lib/glossary.ts` with anchors; used on `/ref/glossary`. No props.
```svelte
<Glossary />
```

## Colours

Only tokens from `src/app.css`. Meaning is fixed: `blue` — you, the coordinator, the main idea, links; `violet` — threads and agents; `amber` — tokens, cost, checks, important; `green` — done, `main`, tips; `red` — danger. Each has `--<colour>` (stroke), `--<colour>-soft` (fill) and `--<colour>-ink` (text on the fill).
