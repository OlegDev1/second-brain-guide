<script lang="ts">
	import ChapterList from '$lib/components/layout/ChapterList.svelte';
	import Icon from '$lib/components/layout/Icon.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import {
		chapterKey,
		chapterNumber,
		chapterPath,
		getChapter,
		isHighlighted,
		navTitle,
		sectionOf
	} from '$lib/content';
	import { href } from '$lib/paths';
	import { readMarks } from '$lib/progress.svelte';
	import type { Chapter } from '$lib/types';

	// The road: guide chapters grouped into steps a beginner can follow in order.
	const ROAD = [
		{
			title: 'Понять, как это устроено',
			text: 'Вся система на одной картинке, что такое агент и почему метод работает.',
			slugs: ['00-roadmap', '01-how-agents-work']
		},
		{
			title: 'Придумать и описать приложение',
			text: 'Превращаешь идею в понятное ТЗ и готовишь проект, в котором будут работать агенты.',
			slugs: ['02-project', '03-specs-prompts', '04-project-files']
		},
		{
			title: 'Подготовить рабочее место',
			text: 'Каждая версия сохранена, данные не теряются — ошибки перестают быть страшными.',
			slugs: ['05-git-github', '06-sync']
		},
		{
			title: 'Строить с командой агентов',
			text: 'Ставишь задачи агентам, проверяешь их работу и не сжигаешь лимит.',
			slugs: ['07-agent-team', '08-testing', '09-tokens-limits']
		},
		{
			title: 'Сделать быстрым и прочным',
			text: 'Стек и устройство приложения, чтобы оно выдержало десятки модулей.',
			slugs: ['10-stack-speed', '11-architecture']
		},
		{
			title: 'Запустить и защитить',
			text: 'Сайт в интернете или код на твоём устройстве, а личные данные — отдельно от проекта.',
			slugs: ['12-deploy', '13-security']
		},
		{
			title: 'Твой ход',
			text: 'Весь метод на живом примере и готовый промпт, с которого начнётся твой проект.',
			slugs: ['14-how-this-site-was-made', '15-your-prompt']
		}
	];

	const steps = ROAD.map((step) => ({
		...step,
		chapters: step.slugs
			.map((slug) => getChapter('guide', slug))
			.filter((c): c is Chapter => c !== undefined)
	}));

	const first = steps[0]?.chapters[0];
	const guide = sectionOf('guide');
	const ref = sectionOf('ref');
	const advanced = sectionOf('advanced');
</script>

<svelte:head>
	<title>Второй мозг с командой агентов Claude</title>
	<meta
		name="description"
		content="Гайд: как собрать своё приложение «второй мозг» с командой агентов Claude и понять, почему метод работает."
	/>
</svelte:head>

<SiteHeader themeSwitch />

<main id="content" class="home">
	<section class="hero">
		<h1>Второй мозг с&nbsp;командой агентов Claude</h1>
		<p class="lead">
			Как собрать своё приложение «второй мозг» с командой агентов Claude — и понять, почему
			этот метод работает.
		</p>
		<div class="actions">
			{#if first}
				<a class="btn primary" href={href(chapterPath(first))}>
					Начать собирать второй мозг <Icon name="arrow-right" size={18} />
				</a>
			{/if}
			<a class="btn" href="#learn">Библиотека знаний</a>
		</div>
	</section>

	<section class="road" id="road" aria-labelledby="road-title">
		<header class="section-head">
			<p class="kicker">Дорога</p>
			<h2 id="road-title">Дорога к своему второму мозгу</h2>
			<p>
				{steps.length} шагов от идеи до готового приложения. Иди по порядку: каждый шаг
				опирается на предыдущие.
			</p>
		</header>

		<ol class="steps">
			{#each steps as step, i (step.title)}
				<li class="step">
					<span class="dot" aria-hidden="true">{i + 1}</span>
					<div class="step-body">
						<h3><span class="visually-hidden">Шаг {i + 1}. </span>{step.title}</h3>
						<p class="step-text">{step.text}</p>
						<ul class="links">
							{#each step.chapters as chapter (chapter.slug)}
								<li>
									<a
										href={href(chapterPath(chapter))}
										class={{ stub: chapter.stub, highlight: isHighlighted(chapter) }}
									>
										<span class="num">{chapterNumber(chapter)}</span>
										<span class="title">{navTitle(chapter)}</span>
										<span class="meta">
											{#if readMarks.has(chapterKey(chapter))}
												<span class="read">
													<Icon name="check" size={16} label="Прочитано" />
												</span>
											{:else if isHighlighted(chapter)}
												<span class="read"><Icon name="flag" size={16} /></span>
											{/if}
											{#if chapter.stub}
												<span class="status">в работе</span>
											{:else if chapter.time}
												<span>{chapter.time} мин</span>
											{/if}
										</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</li>
			{/each}
		</ol>

		<p class="all"><a href={href('/guide/')}>Все главы гайда одним списком</a></p>
	</section>

	<section class="learn" id="learn" aria-labelledby="learn-title">
		<header class="section-head">
			<p class="kicker">Библиотека знаний</p>
			<h2 id="learn-title">Всё по темам</h2>
			<p>
				Проекты Claude, Git, синхронизация, агенты, токены — и всё остальное. Открывай любую тему,
				когда нужно что-то конкретное.
			</p>
		</header>

		{#if first}
			<a class="overview" href={href(chapterPath(first))}>
				<span class="overview-tag"><Icon name="arrow-right" size={16} /> Начни отсюда</span>
				<span class="overview-title">Обзор: вся система на одной картинке</span>
				<span class="overview-text">
					Как идея превращается в ТЗ, ТЗ — в задачи для агентов, а их работа — в готовое
					приложение. Где лежат файлы и кто что делает. Каждый блок схемы ведёт в свою главу.
				</span>
				<span class="overview-go">Открыть «{navTitle(first)}» <Icon name="arrow-right" size={16} /></span>
			</a>
		{/if}

		<div class="shelf">
			<div class="shelf-head">
				<h3>{guide.label}</h3>
				<p>Все главы гайда отдельными темами.</p>
				<a href={href(`/${guide.id}/`)}>Открыть раздел</a>
			</div>
			<ChapterList section={guide.id} />
		</div>

		<div class="shelf">
			<div class="shelf-head">
				<h3>{ref.label}</h3>
				<p>{ref.lead}</p>
				<a href={href(`/${ref.id}/`)}>Открыть раздел</a>
			</div>
			<ChapterList section={ref.id} />
		</div>

		<div class="shelf">
			<div class="shelf-head">
				<h3>{advanced.label}</h3>
				<p>{advanced.lead}</p>
				<a href={href(`/${advanced.id}/`)}>Открыть раздел</a>
			</div>
			<ChapterList section={advanced.id} />
		</div>
	</section>
</main>

<SiteFooter themeSwitch={false} />

<style>
	.home {
		max-width: 72rem;
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	.hero {
		padding: 3rem 0 2.5rem;
		max-width: 46rem;
	}

	.kicker {
		margin: 0 0 0.75rem;
		color: var(--accent-ink);
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h1 {
		font-size: clamp(1.875rem, 1.2rem + 3vw, 3rem);
		line-height: 1.12;
	}

	.lead {
		margin: 1rem 0 0;
		color: var(--muted);
		font-size: 1.125rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 3rem;
		padding: 0 1.2rem;
		border: 1px solid var(--line-strong);
		border-radius: var(--radius);
		background: var(--surface);
		color: var(--ink);
		font-weight: 650;
		text-decoration: none;
	}

	.btn:hover {
		border-color: var(--accent);
	}

	.btn.primary {
		border-color: var(--accent);
		background: var(--accent);
		color: var(--on-accent);
	}

	.section-head {
		max-width: 46rem;
		margin-bottom: 1.5rem;
	}

	.section-head h2 {
		margin: 0;
		font-size: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);
		line-height: 1.2;
	}

	.section-head p:last-child {
		margin: 0.6rem 0 0;
		color: var(--muted);
	}

	/* Road: a numbered vertical line of steps. */
	.road {
		padding: 2rem 0 1rem;
		border-top: 1px solid var(--line);
	}

	.steps {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.step {
		position: relative;
		display: grid;
		grid-template-columns: 2.25rem 1fr;
		gap: 0 1rem;
		padding-bottom: 1.75rem;
	}

	.step:not(:last-child)::before {
		content: '';
		position: absolute;
		top: 2.5rem;
		bottom: 0.25rem;
		left: calc(1.125rem - 1px);
		width: 2px;
		background: var(--line-strong);
	}

	.dot {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		background: var(--blue-soft);
		color: var(--blue-ink);
		font-weight: 700;
	}

	.step-body {
		min-width: 0;
	}

	.step h3 {
		margin: 0.3rem 0 0;
		font-size: 1.2rem;
		line-height: 1.3;
	}

	.step-text {
		margin: 0.35rem 0 0.75rem;
		color: var(--muted);
		max-width: 46rem;
	}

	.links {
		display: grid;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.links a {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-height: var(--tap);
		padding: 0.6rem 0.9rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
		color: var(--ink);
		text-decoration: none;
		transition: border-color var(--dur) var(--ease);
	}

	.links a:hover {
		border-color: var(--accent);
	}

	.links .num {
		flex: none;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--accent-ink);
	}

	.links .title {
		flex: 1;
		min-width: 0;
		font-weight: 600;
		line-height: 1.35;
	}

	.links .meta {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		flex: none;
		color: var(--muted);
		font-size: var(--text-xs);
	}

	.read {
		display: flex;
		color: var(--green);
	}

	.links a.highlight {
		border-color: var(--green);
		background: var(--green-soft);
	}

	.links a.highlight:hover {
		box-shadow: inset 0 0 0 1px var(--green);
	}

	.links a.highlight .num,
	.links a.highlight .title {
		color: var(--green-ink);
	}

	.status {
		color: var(--amber-ink);
	}

	.stub .title {
		color: var(--muted);
	}

	.all {
		margin: 0 0 0 3.25rem;
	}

	/* Learn: reference and advanced, as card grids. */
	.learn {
		margin-top: 2.5rem;
		padding: 2rem 0 1rem;
		border-top: 1px solid var(--line);
	}

	/* The «start here» overview card: blue, the one place to click first in the library. */
	.overview {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		margin-bottom: 2rem;
		padding: 1.1rem 1.25rem;
		border: 1.5px solid var(--accent);
		border-radius: var(--radius-lg);
		background: var(--accent-soft);
		color: var(--ink);
		text-decoration: none;
		transition: box-shadow var(--dur) var(--ease);
	}

	.overview:hover {
		box-shadow: inset 0 0 0 1px var(--accent);
	}

	.overview-tag,
	.overview-go {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		color: var(--accent-ink);
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.overview-go {
		margin-top: 0.25rem;
		font-size: var(--text-small);
		letter-spacing: 0;
		text-transform: none;
	}

	.overview-title {
		font-family: var(--font-head);
		font-size: 1.25rem;
		font-weight: 650;
		line-height: 1.3;
	}

	.overview-text {
		max-width: 46rem;
		color: var(--muted);
	}

	.shelf {
		margin-bottom: 2rem;
	}

	.shelf-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.25rem 1rem;
		margin-bottom: 1rem;
	}

	.shelf-head h3 {
		margin: 0;
		font-size: 1.2rem;
	}

	.shelf-head p {
		flex: 1 1 16rem;
		margin: 0;
		color: var(--muted);
	}

	@media (min-width: 640px) {
		.links {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 768px) {
		.hero {
			padding: 4.5rem 0 3rem;
		}
	}

	@media (min-width: 1024px) {
		.links {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
