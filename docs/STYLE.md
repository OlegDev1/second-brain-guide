# Style

Voice and writing rules for every chapter. Started by part 01 as a copy of the Style
section of `docs/spec/00-general.md`; part 02 extends it with voice decisions and examples.
Where this file differs from `00-general.md`, this file wins.

## Rules

- Advanced in substance, simple in wording. Sentences up to 25 words, paragraphs up to 3 sentences, no filler.
- Two depth levels: the main text is clear to the friend; «Глубже» blocks answer "but why"; Advanced is denser.
- Every chapter: lesson header (what you'll learn, prerequisites, time) → TL;DR → body → «Выводы» → «Что сделать сейчас» (1–3 actions) → «Источники».
- Length: Guide chapters 1,500–3,500 words, Advanced 1,500–3,000. If a chapter needs more, tell the coordinator; don't split it yourself.
- Headings: `##` for sections, `###` for subsections. Section titles are short (up to about 40 characters) and say the point, because they appear in the reading bar at the top of the page and in its section list.
- Visuals: only components and tokens from the design system (`/design`, `docs/COMPONENTS.md`). No new colours or one-off styles. Dark theme is the default.
- Colours carry meaning everywhere, in callouts and diagrams: blue — you, the coordinator, the main idea; violet — threads and agents; amber — tokens, cost, checks, important; green — done, `main`, tips; red — danger.
- From part 02 on, `docs/STYLE.md` holds voice decisions and short examples from the reference chapter; where it differs from this section, STYLE.md wins.

## Reference decisions

Set by part 02 in the reference chapter `src/content/guide/05-git-github.md`. Later parts follow
these instead of reading the whole chapter.

1. **Voice.** «ты», like a colleague who has done it before. No intros such as «В этой главе мы…»: a section opens with its point. Each «why» gets one clause, not a paragraph.
2. **Definitions.** A section about a thing opens with «X — …» in one sentence; the first use of a glossary word is wrapped in `<Term>`. English goes in brackets only for names the reader will meet in English: `правило защиты ветки (branch protection rule)`.
3. **UI names.** Buttons, tabs and settings are **bold** and in English exactly as on screen: **Pull requests**, **Revert**, **Resolve conflicts**. Settings paths use arrows: Project settings → Memory → Project instructions.
4. **Headings.** `##` states the point in up to about 40 characters, as «Noun — short meaning» or a claim («Откат: ничего не теряется»). Every `##` and `###` gets a stable Latin `{#id}`. `###` is for recipes or sub-ideas inside a big section.
5. **TL;DR.** Two or three sentences, under 60 words, with the chapter's main claims. Inline code is fine; no links and no components inside.
6. **«Глубже».** Only for «how it works inside» that the friend can skip without losing any action. At most one per `##` section. The title is a question or «Что внутри …». It may hold one code block and a short list, never a step the reader must do.
7. **One running example.** One story runs through the chapter, with the same names and hashes in text, code and diagram (chapter 05: the focus timer and the «Выбери за меня» branch). Examples come only from the friend's app.
8. **Commands are context.** Say once that the thread runs them; the reader's own action is a ready phrase. Run every command in a scratch repository and paste the run into the notes file. A `bash` block holds commands only, with the result as a `#` comment under each command, so Copy gives runnable text; longer output goes in a separate `text` block titled with the command, e.g. `title="git log --oneline"`.
9. **PhraseCard.** Every procedure the friend can delegate ends with one. The phrase names the object (hash, file, PR), the method and the limits: «…в новой ветке, открой PR, ничего не форсь». `when` names the situation, not the action.
10. **Callouts.** At most one per `##` section, plus one `danger` inside a `###` recipe that loses work. `important` (amber) corrects a common misconception: quote the wrong idea, then the fix. `danger` (red) only for steps that lose work or cannot be undone. `tip` for a shortcut, `note` rarely.
11. **CompareTable** when three or more options share the same criteria: up to 5 columns and 5 rows, cells up to about 6 words, options as columns. **Steps** for website procedures of 3–6 steps; `check` only where a visible result proves the step worked.
12. **Tabs Телефон / Компьютер** use `group="device"` and that label order. Phone usually means «ask the thread» with a PhraseCard; computer means the website steps.
13. **Anthropic facts** end with «(проверено: месяц год)», month in lowercase Russian, e.g. «(проверено: октябрь 2026)», in the same sentence as the fact. No number, limit or price without a row in the notes Sources table.
14. **Neighbouring topics.** Don't re-explain a topic another chapter owns; give one sentence and a link with the chapter title in «»: `[«Синхронизация»](/guide/06-sync)`.
15. **Closing blocks and length.** «Выводы»: 5–6 bullets, each a full sentence that stands alone; repeat the corrected misconception. «Что сделать сейчас»: a `Checklist` with `id="guide-NN-next-steps"` and 2–3 actions that take minutes. «Источники»: links grouped by publisher, link text is the page title in its own language. A Guide chapter runs about 2,500–3,000 words; `time` in frontmatter is words divided by about 140, rounded to 5 minutes.

### Excerpt: TL;DR

```svelte
<TLDR>

Git хранит каждую версию проекта как цепочку коммитов, а GitHub держит эту цепочку в облаке. Каждый поток работает в своей ветке и приносит работу в `main` через PR. Ошибку отменяют новым коммитом — revert: история остаётся целой, ничего не пропадает.

</TLDR>
```

### Excerpt: «Глубже»

```svelte
<Deeper title="Можно ли вернуть коммиты после reset">

Иногда да. Git ведёт журнал `git reflog`: куда указывали ветки раньше. По нему можно найти хэш пропавшего коммита и вернуть его.

Но журнал локальный: он есть только в той копии репозитория, где делали reset. Копия облачного потока исчезает вместе с его машиной после простоя. На GitHub страница **Activity** репозитория покажет, что был force push и кто его сделал.

</Deeper>
```

### Excerpt: «Что сделать сейчас»

```svelte
## Что сделать сейчас {#next-steps}

<Checklist
	id="guide-05-next-steps"
	title="Три шага"
	items={[
		'Открой репозиторий на GitHub и найди последний коммит: сообщение, автора и короткий хэш',
		'Добавь правило про main в инструкции проекта',
		'Скопируй фразу «Безопасный откат» в заметки, чтобы она была под рукой'
	]}
/>
```
