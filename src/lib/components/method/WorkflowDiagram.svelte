<!--
  WorkflowDiagram: the whole workflow as one clickable flow (catalog #31), from your idea to the
  finished app: you → spec chat → master spec and narrow per-agent specs → Claude project →
  coordinator → Opus builds / Sonnet checks / PR → GitHub → your merge → deploy or download.
  Every node is a link to the chapter that explains it. Chips on a node show where its files are
  kept; the «Где живут файлы» panel below explains Library vs GitHub, and hovering or focusing one of
  its cards dims the steps that don't use that store. Built from HTML, not SVG, so links stay real
  links for screen readers. Multi-node rows sit side by side when the diagram is at least 34 rem
  wide and stack below that. Used by «Введение» and, through ProjectDiagram, by «Проект».
  Props: caption (optional, replaces the default caption).
-->
<script lang="ts">
	import { href } from '$lib/paths';
	import type { Tone } from '$lib/types';

	let {
		caption = 'Нажми на любой блок — откроется глава о нём. Сплошные стрелки — путь одной задачи, пунктир — возвраты.'
	}: { caption?: string } = $props();

	type Store = 'library' | 'github';

	interface Node {
		title: string;
		sub: string;
		tone: Tone;
		/** Root-relative chapter path with a trailing slash. */
		to: string;
		/** Chapter number shown as the eyebrow. */
		chapter: string;
		/** Where the files of this step are kept. */
		stores?: Store[];
	}

	interface Row {
		nodes: Node[];
		/** What sits between the nodes of a multi-node row: a sequence or a choice. */
		join?: 'then' | 'or';
		/** A short «why» under the row. */
		note?: string;
		/** Dashed return loop under the row. */
		back?: string;
		/** Label of the arrow below the row; none after the last row. */
		next?: string;
	}

	const rows: Row[] = [
		{
			nodes: [
				{ title: 'Ты', sub: 'диктуешь голосом, что должно уметь приложение', tone: 'blue', to: '/guide/03-specs-prompts/', chapter: '03' }
			],
			next: 'голосовые и ответы на вопросы'
		},
		{
			nodes: [
				{ title: 'Чат для ТЗ · Opus', sub: 'обычный чат: расспрашивает, пишет ТЗ и сразу делит его по агентам', tone: 'blue', to: '/guide/15-your-prompt/', chapter: '15' }
			],
			next: 'отдаёт ТЗ архивом — распаковываешь в папку'
		},
		{
			nodes: [
				{ title: 'Главное ТЗ', sub: 'общие правила и index.md — карта частей и порядок работы', tone: 'blue', to: '/guide/03-specs-prompts/', chapter: '03', stores: ['library', 'github'] },
				{ title: 'Узкие ТЗ', sub: 'по файлу на агента: только его задача и его файлы', tone: 'violet', to: '/guide/03-specs-prompts/', chapter: '03', stores: ['library', 'github'] }
			],
			join: 'then',
			note: 'Зачем делить: каждый агент читает общие правила и только свой файл. Узкий контекст — меньше токенов и меньше ошибок.',
			next: 'добавляешь папку в проект'
		},
		{
			nodes: [
				{ title: 'Проект в Claude', sub: 'инструкции проекта и Library с папкой ТЗ', tone: 'neutral', to: '/guide/02-project/', chapter: '02', stores: ['library'] }
			],
			next: 'пишешь координатору «начинай»'
		},
		{
			nodes: [
				{ title: 'Координатор · Opus', sub: 'читает index.md, раздаёт части агентам, следит за прогрессом', tone: 'blue', to: '/guide/07-agent-team/', chapter: '07', stores: ['library', 'github'] }
			],
			next: 'по агенту на задачу, каждый работает в облаке'
		},
		{
			nodes: [
				{ title: 'Opus строит', sub: 'в своей ветке; потом его поток закрывают', tone: 'violet', to: '/guide/07-agent-team/', chapter: '07', stores: ['github'] },
				{ title: 'Sonnet проверяет', sub: 'смысл текста, кнопки, вид на экране', tone: 'amber', to: '/guide/08-testing/', chapter: '08' },
				{ title: 'Пул-реквест', sub: 'сигнал: ветка готова, можно вливать', tone: 'violet', to: '/guide/05-git-github/', chapter: '05', stores: ['github'] }
			],
			join: 'then',
			back: 'есть замечания — обратно к Opus; нет — Sonnet открывает PR',
			next: 'вся работа лежит на GitHub'
		},
		{
			nodes: [
				{ title: 'GitHub', sub: 'код, ветки, PR и файлы прогресса — общая память команды', tone: 'neutral', to: '/guide/06-sync/', chapter: '06', stores: ['github'] }
			],
			next: 'ты смотришь PR'
		},
		{
			nodes: [
				{ title: 'Ты мерджишь', sub: 'ветка вливается в main', tone: 'green', to: '/guide/05-git-github/', chapter: '05', stores: ['github'] }
			],
			back: 'следующая задача — снова координатору',
			next: 'из main'
		},
		{
			nodes: [
				{ title: 'Деплой', sub: 'сайт в интернете: GitHub Pages или сервер', tone: 'green', to: '/guide/12-deploy/', chapter: '12' },
				{ title: 'Скачать', sub: 'код на своё устройство', tone: 'green', to: '/guide/06-sync/', chapter: '06' }
			],
			join: 'or'
		}
	];

	const STORES: Record<Store, { title: string; where: string; text: string; to: string; chapter: string }> = {
		library: {
			title: 'Library',
			where: 'в проекте Claude',
			text: 'Папка с ТЗ и материалы. Координатор видит их с первой минуты — это контекст, с которого он начинает. Живёт, пока жив проект.',
			to: '/guide/04-project-files/',
			chapter: '04'
		},
		github: {
			title: 'GitHub',
			where: 'репозиторий',
			text: 'Код, копия ТЗ, файлы прогресса, заметки и отчёты проверок. Переживёт удаление проекта, открывается с любого устройства, его читает любой агент.',
			to: '/guide/06-sync/',
			chapter: '06'
		}
	};

	const storeIds: Store[] = ['library', 'github'];

	/** The store card under the pointer or focus; the steps that don't use it are dimmed. */
	let focus = $state<Store | null>(null);
</script>

<figure class="flow">
	<ol class="rows">
		{#each rows as row, i (i)}
			<li class="row">
				<div class={['nodes', `n${row.nodes.length}`]}>
					{#each row.nodes as node, n (node.title)}
						{#if n > 0}
							<span class={['join', row.join ?? 'then']} aria-hidden="true">{row.join === 'or' ? 'или' : '→'}</span>
						{/if}
						<a
							class={['node', node.tone, { dim: focus && !node.stores?.includes(focus) }]}
							href={href(node.to)}
						>
							<span class="eyebrow">Глава {node.chapter}</span>
							<span class="title">{node.title}</span>
							<span class="sub">{node.sub}</span>
							{#if node.stores}
								<span class="chips">
									{#each node.stores as store (store)}
										<span class="chip {store}">{STORES[store].title}</span>
									{/each}
								</span>
							{/if}
						</a>
					{/each}
				</div>
				{#if row.note}<p class="note">{row.note}</p>{/if}
				{#if row.back}
					<p class="back"><span aria-hidden="true">↺</span> {row.back}</p>
				{/if}
				{#if row.next}
					<p class="arrow"><span class="line" aria-hidden="true"></span>{row.next}</p>
				{/if}
			</li>
		{/each}
	</ol>

	<section class="stores" aria-label="Где живут файлы">
		<p class="stores-title">Где живут файлы</p>
		<div class="store-grid">
			{#each storeIds as id (id)}
				{@const store = STORES[id]}
				<a
					class="store {id}"
					href={href(store.to)}
					onmouseenter={() => (focus = id)}
					onmouseleave={() => (focus = null)}
					onfocus={() => (focus = id)}
					onblur={() => (focus = null)}
				>
					<span class="eyebrow">Глава {store.chapter}</span>
					<span class="store-head">
						<span class="chip {id}">{store.title}</span>
						<span class="where">{store.where}</span>
					</span>
					<span class="sub">{store.text}</span>
				</a>
			{/each}
		</div>
		<p class="rule">Чего нет в файлах, того следующий агент не знает: каждый поток начинает с чистого листа.</p>
	</section>

	{#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>

<style>
	.flow {
		container-type: inline-size;
		margin-inline: 0;
		margin-bottom: 0;
		padding: 1rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}

	.rows {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.row {
		margin: 0 !important;
	}

	.nodes {
		display: grid;
		gap: 0.3rem;
	}

	.join {
		justify-self: center;
		color: var(--muted);
		font-size: var(--text-xs);
		line-height: 1;
	}

	/* Stacked rows read top to bottom, so the sequence arrow points down. */
	.join.then {
		rotate: 90deg;
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
			transform 0.15s ease,
			opacity 0.15s ease;
	}

	.node:hover {
		box-shadow: 0 0 0 1.5px var(--tone);
		transform: translateY(-1px);
	}

	.node:focus-visible,
	.store:focus-visible {
		outline: 2px solid var(--focus);
		outline-offset: 2px;
	}

	.node.dim {
		opacity: 0.35;
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

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-top: 0.35rem;
	}

	.chip {
		padding: 0 0.45rem;
		border: 1px solid;
		border-radius: 999px;
		background: var(--surface);
		font-size: var(--text-xs);
		font-weight: 600;
		line-height: 1.5;
	}

	.chip.library {
		border-color: var(--blue);
		color: var(--blue-ink);
	}

	.chip.github {
		border-color: var(--green);
		color: var(--green-ink);
	}

	.note {
		margin: 0.4rem 0 0;
		padding: 0.45rem 0.7rem;
		border-left: 3px solid var(--amber);
		border-radius: 0 var(--radius) var(--radius) 0;
		background: var(--amber-soft);
		font-size: var(--text-small);
		line-height: 1.4;
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

	.back {
		margin: 0.4rem 0 0;
		padding: 0.2rem 0.6rem;
		border: 1px dashed var(--line-strong);
		border-radius: var(--radius);
		color: var(--muted);
		font-size: var(--text-xs);
	}

	/* Where files live */
	.stores {
		margin-top: 1.25rem;
		padding-top: 1rem;
		border-top: 1px dashed var(--line-strong);
	}

	.stores-title {
		margin: 0 0 0.6rem;
		font-weight: 700;
	}

	.store-grid {
		display: grid;
		gap: 0.6rem;
	}

	.store {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.65rem 0.8rem;
		border: 1.5px dashed var(--line-strong);
		border-radius: var(--radius);
		color: var(--ink);
		text-decoration: none;
		transition: border-color 0.15s ease;
	}

	.store.library:hover {
		border-color: var(--blue);
	}

	.store.github:hover {
		border-color: var(--green);
	}

	.store-head {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.store-head .chip {
		font-size: var(--text-small);
	}

	.where {
		color: var(--muted);
		font-size: var(--text-xs);
	}

	.rule {
		margin: 0.75rem 0 0;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius);
		background: var(--amber-soft);
		color: var(--amber-ink);
		font-size: var(--text-small);
		font-weight: 600;
	}

	figcaption {
		margin-top: 0.75rem;
		color: var(--muted);
		font-size: var(--text-small);
		text-align: center;
	}

	/* Wide enough: multi-node rows side by side, single nodes centred in a narrower column. */
	@container (min-width: 34rem) {
		.flow {
			padding: 1.25rem 1.5rem;
		}

		.nodes.n1 {
			max-width: 26rem;
		}

		.nodes.n2 {
			grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
			align-items: stretch;
		}

		.nodes.n3 {
			grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
			align-items: stretch;
		}

		.join.then {
			rotate: none;
		}

		.join {
			align-self: center;
		}

		.store-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
