<!--
  RepoTree: tappable map of the files in the friend's project for chapter 04. Two groups: the
  repository on GitHub and the project settings that live outside it. Tapping a file opens a
  panel right under it: what it is, who writes it, who reads it and when it reaches the context.
  One panel is open at a time, so the tree stays short on a phone.
  Props: caption (optional, replaces the default caption).
-->
<script lang="ts">
	import Icon from '../layout/Icon.svelte';
	import type { Tone } from '$lib/types';

	let {
		caption = 'Нажми на файл: кто его пишет, кто читает и когда он попадает в контекст. Метка справа — для облачного потока проекта: «всегда», «по задаче» или «не в облаке».'
	}: { caption?: string } = $props();

	const uid = $props.id();

	/**
	 * When a file reaches the model in a project's cloud thread: on every step, only when a task
	 * needs it, or not at all (Claude Code reads it only when it runs on your own computer).
	 */
	type Load = 'always' | 'demand' | 'local';

	const LOAD: Record<Load, { label: string; tone: Tone }> = {
		always: { label: 'всегда', tone: 'amber' },
		demand: { label: 'по задаче', tone: 'green' },
		local: { label: 'не в облаке', tone: 'neutral' }
	};

	interface Entry {
		name: string;
		depth: number;
		/** Files have details; folders are plain labels. */
		file?: {
			what: string;
			writes: string;
			writer: Tone;
			reads: string;
			when: string;
			load: Load;
		};
	}

	interface Group {
		title: string;
		tone: Tone;
		entries: Entry[];
	}

	const groups: Group[] = [
		{
			title: 'Репозиторий на GitHub',
			tone: 'green',
			entries: [
				{ name: 'second-brain/', depth: 0 },
				{
					name: 'CLAUDE.md',
					depth: 1,
					file: {
						what: 'Правила репозитория: как запустить, как устроены папки, чего не делать. Короткая карта со ссылками на docs/.',
						writes: 'поток по твоей просьбе, ты правишь',
						writer: 'violet',
						reads: 'каждый поток и субагент',
						when: 'в начале каждой сессии и дальше на каждом шаге',
						load: 'always'
					}
				},
				{
					name: 'AGENTS.md',
					depth: 1,
					file: {
						what: 'То же самое для других агентов (Codex, Cursor). Держи один файл, а второй — ссылкой на него.',
						writes: 'поток, один раз',
						writer: 'violet',
						reads: 'другие агенты; Claude Code — если CLAUDE.md нет или CLAUDE.md ссылается на него',
						when: 'в начале каждой сессии, как CLAUDE.md',
						load: 'always'
					}
				},
				{
					name: '.mcp.json',
					depth: 1,
					file: {
						what: 'Список MCP-серверов проекта: какие внешние инструменты и данные подключены.',
						writes: 'поток по твоей просьбе',
						writer: 'violet',
						reads: 'Claude Code на твоём компьютере; облачные потоки берут коннекторы из аккаунта claude.ai',
						when: 'при старте локальной сессии, после твоего одобрения',
						load: 'local'
					}
				},
				{ name: '.claude/', depth: 1 },
				{
					name: 'settings.json',
					depth: 2,
					file: {
						what: 'Разрешения (что можно без вопроса, что нельзя) и хуки — команды, которые запускаются сами в нужный момент.',
						writes: 'поток по твоей просьбе',
						writer: 'violet',
						reads: 'Claude Code на твоём компьютере, не модель',
						when: 'локально — при каждом действии; облачные потоки проекта его не применяют',
						load: 'local'
					}
				},
				{ name: 'skills/new-module/', depth: 2 },
				{
					name: 'SKILL.md',
					depth: 3,
					file: {
						what: 'Навык: пошаговый рецепт, например как добавить новый модуль-фичу. Сверху — имя и описание.',
						writes: 'поток по твоей просьбе',
						writer: 'violet',
						reads: 'Claude Code на твоём компьютере; облачный поток — только навыки из аккаунта claude.ai',
						when: 'описание — всегда, весь текст — только когда задача подходит',
						load: 'local'
					}
				},
				{ name: 'agents/', depth: 2 },
				{
					name: 'spec-checker.md',
					depth: 3,
					file: {
						what: 'Субагент: роль, инструменты и модель. Например, проверяет фичу по критериям приёмки.',
						writes: 'поток по твоей просьбе',
						writer: 'violet',
						reads: 'Claude Code на твоём компьютере; файл становится инструкцией субагента',
						when: 'когда сессия поручает ему побочную задачу; облачные потоки проекта его не грузят',
						load: 'local'
					}
				},
				{ name: 'docs/', depth: 1 },
				{ name: 'spec/', depth: 2 },
				{
					name: '00-general.md',
					depth: 3,
					file: {
						what: 'Общее ТЗ: цель, стек, общие правила, чего не делаем, как работают агенты. Короткое, потому что его читают все.',
						writes: 'чат ТЗ; первый поток кладёт его в репозиторий',
						writer: 'blue',
						reads: 'каждый поток',
						when: 'когда поток начинает задачу',
						load: 'demand'
					}
				},
				{
					name: 'INDEX.md',
					depth: 3,
					file: {
						what: 'План для координатора: какие части, в каком порядке и кто какие файлы правит.',
						writes: 'чат ТЗ; первый поток кладёт его в репозиторий',
						writer: 'blue',
						reads: 'только координатор',
						when: 'когда координатор раздаёт задачи',
						load: 'demand'
					}
				},
				{ name: 'parts/', depth: 3 },
				{
					name: 'tasks.md',
					depth: 4,
					file: {
						what: 'Часть ТЗ про одну фичу: экраны, данные, правила, критерии приёмки, какие файлы можно трогать.',
						writes: 'чат ТЗ; первый поток кладёт его в репозиторий',
						writer: 'blue',
						reads: 'только поток этой фичи',
						when: 'когда поток открывает его по ссылке из задачи',
						load: 'demand'
					}
				},
				{ name: 'features/', depth: 2 },
				{
					name: 'pick-for-me.md',
					depth: 3,
					file: {
						what: 'ТЗ одной большой фичи, например «Выбери за меня». Пишется в отдельном чате-интервью.',
						writes: 'поток-интервьюер вместе с тобой',
						writer: 'violet',
						reads: 'новый поток, который делает эту фичу',
						when: 'когда поток открывает его по ссылке из задачи',
						load: 'demand'
					}
				},
				{
					name: 'PROGRESS.md',
					depth: 2,
					file: {
						what: 'Состояние проекта: что сделано, что в работе, решения, баги, что не сработало, как запустить.',
						writes: 'каждый поток в конце задачи',
						writer: 'violet',
						reads: 'новый поток перед работой, координатор',
						when: 'когда поток начинает задачу',
						load: 'demand'
					}
				},
				{
					name: 'BUGS.md',
					depth: 2,
					file: {
						what: 'Известные баги: шаги, что ждали, что получили, устройство, статус.',
						writes: 'поток по твоему баг-репорту',
						writer: 'violet',
						reads: 'поток, который чинит',
						when: 'когда задача про баг',
						load: 'demand'
					}
				},
				{
					name: 'DECISIONS.md',
					depth: 2,
					file: {
						what: 'Принятые решения и почему: выбор библиотеки, отказ от фичи, компромиссы.',
						writes: 'поток, когда решение принято',
						writer: 'violet',
						reads: 'поток, прежде чем менять устройство проекта',
						when: 'когда задача задевает уже принятое решение',
						load: 'demand'
					}
				},
				{
					name: 'src/',
					depth: 1,
					file: {
						what: 'Код приложения. Имя папки задаёт стек: в другом проекте она может называться иначе. Читать его тебе не нужно.',
						writes: 'потоки',
						writer: 'violet',
						reads: 'потоки',
						when: 'когда задача про код',
						load: 'demand'
					}
				}
			]
		},
		{
			title: 'Настройки проекта — не в репозитории',
			tone: 'blue',
			entries: [
				{
					name: 'Project instructions',
					depth: 0,
					file: {
						what: 'Инструкции проекта: правила работы команды, до 16 000 символов.',
						writes: 'ты в настройках проекта',
						writer: 'blue',
						reads: 'координатор и каждый поток',
						when: 'в начале каждого потока и дальше на каждом шаге',
						load: 'always'
					}
				},
				{
					name: 'Project memory · MEMORY.md',
					depth: 0,
					file: {
						what: 'Память проекта: заметки, которые Claude записывает, когда ты говоришь «запомни».',
						writes: 'Claude; ты правишь в настройках',
						writer: 'blue',
						reads: 'координатор и каждый поток',
						when: 'в начале каждого потока',
						load: 'always'
					}
				},
				{
					name: 'Library · папка spec/',
					depth: 0,
					file: {
						what: 'Файлы проекта, которые ты добавил: стартовая копия папки с ТЗ, скриншоты, заметки. Сюда же потоки кладут свои файлы.',
						writes: 'ты при создании проекта или кнопкой Add; потоки',
						writer: 'blue',
						reads: 'любой поток, когда задача о них',
						when: 'по требованию: файлы лежат рядом, поток открывает нужный',
						load: 'demand'
					}
				}
			]
		}
	];

	let openKey = $state<string | null>(null);

	function toggle(key: string) {
		openKey = openKey === key ? null : key;
	}
</script>

<figure class="repo-tree">
	{#each groups as group, g (group.title)}
		<section class="group {group.tone}" aria-label={group.title}>
			<p class="group-title">{group.title}</p>
			<ul>
				{#each group.entries as entry, i (entry.name + i)}
					{@const key = `${g}-${i}`}
					{@const panelId = `${uid}-${key}`}
					<li style:--depth={entry.depth}>
						{#if entry.file}
							{@const load = LOAD[entry.file.load]}
							<button
								type="button"
								class="row file"
								aria-expanded={openKey === key}
								aria-controls={panelId}
								onclick={() => toggle(key)}
							>
								<span class="name">{entry.name}</span>
								<span class="load {load.tone}">{load.label}</span>
								<Icon name="chevron" size={16} />
							</button>
							{#if openKey === key}
								<div class="panel" id={panelId}>
									<p>{entry.file.what}</p>
									<dl>
										<dt>Пишет</dt>
										<dd><span class="who {entry.file.writer}">{entry.file.writes}</span></dd>
										<dt>Читает</dt>
										<dd>{entry.file.reads}</dd>
										<dt>Когда</dt>
										<dd>{entry.file.when}</dd>
									</dl>
								</div>
							{/if}
						{:else}
							<span class="row dir"><span class="name">{entry.name}</span></span>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/each}
	<figcaption>{caption}</figcaption>
</figure>

<style>
	.repo-tree {
		margin: 1.5rem 0;
	}

	.group {
		border: 1px solid var(--line);
		border-left: 3px solid var(--line-strong);
		border-radius: var(--radius);
		background: var(--surface);
		padding: 0.5rem 0;
	}

	.group + .group {
		margin-top: 0.75rem;
	}

	.group.green {
		border-left-color: var(--green);
	}

	.group.blue {
		border-left-color: var(--blue);
	}

	.group-title {
		margin: 0;
		padding: 0.25rem 1rem 0.4rem;
		color: var(--muted);
		font-size: var(--text-xs);
		font-weight: 600;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		margin: 0;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		min-height: var(--tap);
		padding: 0.35rem 0.75rem 0.35rem calc(0.75rem + var(--depth) * 0.85rem);
		font-family: var(--font-mono);
		font-size: var(--text-small);
		text-align: left;
	}

	.dir {
		min-height: 2rem;
		color: var(--muted);
	}

	.file {
		border: 0;
		background: none;
		color: var(--ink);
		cursor: pointer;
	}

	.file:hover {
		background: var(--sunk);
	}

	.file[aria-expanded='true'] {
		background: var(--sunk);
	}

	.name {
		min-width: 0;
		overflow-wrap: anywhere;
	}

	.load {
		margin-left: auto;
		flex-shrink: 0;
		padding: 0 0.45rem;
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		background: var(--sunk);
		color: var(--muted);
		font-family: var(--font-body, inherit);
		font-size: var(--text-xs);
		line-height: 1.6;
		white-space: nowrap;
	}

	.load.amber {
		border-color: var(--amber);
		background: var(--amber-soft);
		color: var(--amber-ink);
	}

	.load.green {
		border-color: var(--green);
		background: var(--green-soft);
		color: var(--green-ink);
	}

	.file :global(.icon) {
		flex-shrink: 0;
		color: var(--muted);
		transition: transform var(--dur) var(--ease);
	}

	.file[aria-expanded='true'] :global(.icon) {
		transform: rotate(180deg);
	}

	.panel {
		margin: 0 0.75rem 0.5rem calc(0.75rem + var(--depth) * 0.85rem);
		padding: 0.6rem 0.8rem;
		border-left: 2px solid var(--line-strong);
		font-size: var(--text-small);
	}

	.panel p {
		margin: 0 0 0.5rem;
	}

	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.25rem 0.75rem;
		margin: 0;
	}

	dt {
		color: var(--muted);
	}

	dd {
		margin: 0;
	}

	.who {
		font-weight: 600;
	}

	.who.blue {
		color: var(--blue-ink);
	}

	.who.violet {
		color: var(--violet-ink);
	}

	figcaption {
		margin-top: 0.6rem;
		color: var(--muted);
		font-size: var(--text-small);
	}
</style>
