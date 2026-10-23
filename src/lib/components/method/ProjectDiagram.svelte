<!--
  ProjectDiagram: the whole method as one clickable flow (catalog #31), from your idea to the app on
  the phone: you → spec → project ⇄ GitHub → coordinator → threads → checks → your review → merge →
  deploy, with the two loops (fixes after checks, the next feature). Every node is a link to the
  chapter that explains it. Built from HTML, not SVG, so links stay real links for screen readers;
  the column is vertical at every width.
  Props: caption (optional, replaces the default caption).
-->
<script lang="ts">
	import { href } from '$lib/paths';
	import type { Tone } from '$lib/types';

	let {
		caption = 'Нажми на любой блок — откроется глава о нём. Сплошные стрелки — путь одной фичи, пунктир — возвраты.'
	}: { caption?: string } = $props();

	interface Node {
		title: string;
		sub: string;
		tone: Tone;
		/** Root-relative chapter path, with a trailing slash before any #anchor. */
		to: string;
		/** Chapter number shown as the eyebrow. */
		chapter: string;
	}

	interface Row {
		nodes: [Node] | [Node, Node];
		/** Label of the arrow below the row; none after the last row. */
		next?: string;
		/** Dashed return arrow drawn under the forward arrow. */
		back?: string;
	}

	const rows: Row[] = [
		{
			nodes: [{ title: 'Ты', sub: 'идея, решения, ок', tone: 'blue', to: '/guide/02-project/#checkpoints', chapter: '02' }],
			next: 'рассказываешь голосом и текстом'
		},
		{
			nodes: [{ title: 'ТЗ', sub: 'что строим и как работают агенты', tone: 'blue', to: '/guide/03-specs-prompts/', chapter: '03' }],
			next: 'кладёшь в репозиторий'
		},
		{
			nodes: [
				{ title: 'Проект', sub: 'инструкции, память, файлы', tone: 'neutral', to: '/guide/04-project-files/', chapter: '04' },
				{ title: 'GitHub', sub: 'код и вся история', tone: 'neutral', to: '/guide/05-git-github/', chapter: '05' }
			],
			next: 'ставишь задачу словами'
		},
		{
			nodes: [{ title: 'Координатор', sub: 'делит работу, читает отчёты', tone: 'blue', to: '/guide/07-agent-team/#coordinator', chapter: '07' }],
			next: 'запускает по потоку на задачу'
		},
		{
			nodes: [{ title: 'Потоки', sub: 'своя сессия, ветка и PR', tone: 'violet', to: '/guide/07-agent-team/#threads', chapter: '07' }],
			next: 'открывают PR',
			back: 'замечания — обратно потоку'
		},
		{
			nodes: [{ title: 'Проверки', sub: 'сборка, тесты, ревьюер — не автор', tone: 'amber', to: '/guide/08-testing/', chapter: '08' }],
			next: 'всё зелёное'
		},
		{
			nodes: [{ title: 'Твоё ревью', sub: '5 минут на телефоне', tone: 'blue', to: '/guide/02-project/#checkpoints', chapter: '02' }],
			next: 'ок'
		},
		{
			nodes: [{ title: 'Мердж', sub: 'ветка вливается в main', tone: 'green', to: '/guide/05-git-github/#pull-request', chapter: '05' }],
			next: 'main публикуется',
			back: 'следующая фича — снова координатору'
		},
		{
			nodes: [{ title: 'Приложение', sub: 'на сайте и на телефоне', tone: 'green', to: '/guide/12-deploy/', chapter: '12' }]
		}
	];
</script>

<figure class="flow">
	<ol>
		{#each rows as row, i (i)}
			<li class="row">
				<div class={['nodes', { pair: row.nodes.length === 2 }]}>
					{#each row.nodes as node, n (node.title)}
						{#if n === 1}<span class="sync" aria-hidden="true">⇄</span>{/if}
						<a class="node {node.tone}" href={href(node.to)}>
							<span class="eyebrow">Глава {node.chapter}</span>
							<span class="title">{node.title}</span>
							<span class="sub">{node.sub}</span>
						</a>
					{/each}
				</div>
				{#if row.next}
					<p class="arrow"><span class="line" aria-hidden="true"></span>{row.next}</p>
				{/if}
				{#if row.back}
					<p class="arrow back"><span aria-hidden="true">↺</span> {row.back}</p>
				{/if}
			</li>
		{/each}
	</ol>
	{#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>

<style>
	.flow {
		margin-inline: 0;
		margin-bottom: 0;
		padding: 1rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}

	ol {
		max-width: 26rem;
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}

	.row {
		margin: 0 !important;
	}

	.nodes {
		display: grid;
	}

	.nodes.pair {
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: stretch;
		gap: 0.4rem;
	}

	.sync {
		align-self: center;
		color: var(--muted);
		font-size: 1.25rem;
	}

	.node {
		--tone: var(--line-strong);
		--tone-soft: var(--sunk);
		--tone-ink: var(--ink);
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		min-height: 44px;
		padding: 0.55rem 0.8rem;
		border: 1.5px solid var(--tone);
		border-radius: var(--radius);
		background: var(--tone-soft);
		color: var(--ink);
		text-decoration: none;
		transition:
			box-shadow 0.15s ease,
			transform 0.15s ease;
	}

	.node:hover {
		box-shadow: 0 0 0 1.5px var(--tone);
		transform: translateY(-1px);
	}

	.node:focus-visible {
		outline: 2px solid var(--focus);
		outline-offset: 2px;
	}

	.blue {
		--tone: var(--blue);
		--tone-soft: var(--blue-soft);
		--tone-ink: var(--blue-ink);
	}

	.violet {
		--tone: var(--violet);
		--tone-soft: var(--violet-soft);
		--tone-ink: var(--violet-ink);
	}

	.amber {
		--tone: var(--amber);
		--tone-soft: var(--amber-soft);
		--tone-ink: var(--amber-ink);
	}

	.green {
		--tone: var(--green);
		--tone-soft: var(--green-soft);
		--tone-ink: var(--green-ink);
	}

	.eyebrow {
		color: var(--muted);
		font-size: var(--text-xs);
	}

	.title {
		color: var(--tone-ink);
		font-weight: 700;
	}

	.sub {
		font-size: var(--text-small);
		line-height: 1.35;
	}

	.arrow {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin: 0;
		padding: 0.15rem 0 0.15rem 1.25rem;
		color: var(--muted);
		font-size: var(--text-xs);
	}

	.line {
		position: relative;
		flex: none;
		width: 2px;
		height: 1.6rem;
		background: var(--line-strong);
	}

	.line::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: -4px;
		border-top: 6px solid var(--line-strong);
		border-inline: 5px solid transparent;
	}

	.arrow.back {
		margin: 0 0 0.35rem;
		padding: 0.2rem 0.6rem;
		border: 1px dashed var(--line-strong);
		border-radius: var(--radius);
	}

	figcaption {
		margin-top: 0.75rem;
		color: var(--muted);
		font-size: var(--text-small);
		text-align: center;
	}
</style>
