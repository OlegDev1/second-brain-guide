<!--
  ReadingBar: slim sticky bar on every chapter page.
  Left: chapter → sheet with all chapters (#16, #11). Middle: current section → list of
  sections (#12). Right: search (#15) and previous / next (#14). A 2 px progress line below.
  From 1024 px the chapter selector is hidden: the sidebar already lists every chapter.
  Props: chapter, headings, active (id of the heading on screen), progress (0–1).
-->
<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import {
		chapterKey,
		chapterNumber,
		chapterPath,
		chaptersOf,
		navTitle,
		neighbours,
		SECTIONS,
		sectionOf,
		shortTitle
	} from '$lib/content';
	import { href } from '$lib/paths';
	import { readMarks } from '$lib/progress.svelte';
	import { search } from '$lib/search.svelte';
	import type { Chapter, Heading } from '$lib/types';
	import Icon from './Icon.svelte';
	import Sheet from './Sheet.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let {
		chapter,
		headings,
		active,
		progress
	}: { chapter: Chapter; headings: Heading[]; active?: string; progress: number } = $props();

	let chaptersOpen = $state(false);
	let sectionsOpen = $state(false);

	const number = $derived(chapterNumber(chapter));
	const pager = $derived(neighbours(chapter));

	/** The `##` section the reader is in (an active `###` maps to its parent). */
	const currentSection = $derived.by(() => {
		const index = headings.findIndex((h) => h.id === active);
		for (let i = index; i >= 0; i--) if (headings[i].depth === 2) return headings[i];
		return undefined;
	});

	afterNavigate(() => {
		chaptersOpen = false;
		sectionsOpen = false;
	});
</script>

<header class="bar">
	<div class="inner">
		<a class="home" href={href('/')} aria-label="На главную">
			<Icon name="home" />
		</a>

		<button
			type="button"
			class="chapter"
			aria-haspopup="dialog"
			aria-label="Оглавление. Сейчас: {sectionOf(chapter.section).label}, {number
				? `глава ${number}, `
				: ''}{chapter.title}"
			onclick={() => (chaptersOpen = true)}
		>
			<span class="crumb">{sectionOf(chapter.section).label}</span>
			<span class="name">
				{#if number}<span class="num">{number}</span>{/if}
				<span class="short">{shortTitle(chapter)}</span>
			</span>
		</button>

		<button
			type="button"
			class="section"
			aria-haspopup="dialog"
			aria-label="Разделы главы. Сейчас: {currentSection?.text ?? 'начало главы'}"
			disabled={!headings.length}
			onclick={() => (sectionsOpen = true)}
		>
			<span class="current">{currentSection?.text ?? 'Разделы'}</span>
			<Icon name="chevron" size={16} />
		</button>

		<div class="actions">
			<button type="button" class="icon-btn" aria-label="Поиск" onclick={() => (search.open = true)}>
				<Icon name="search" />
			</button>
			{#if pager.prev}
				<a class="icon-btn" href={href(chapterPath(pager.prev))} aria-label="Предыдущая глава: {pager.prev.title}">
					<Icon name="arrow-left" />
				</a>
			{:else}
				<span class="icon-btn" aria-hidden="true"><Icon name="arrow-left" /></span>
			{/if}
			{#if pager.next}
				<a class="icon-btn" href={href(chapterPath(pager.next))} aria-label="Следующая глава: {pager.next.title}">
					<Icon name="arrow-right" />
				</a>
			{:else}
				<span class="icon-btn" aria-hidden="true"><Icon name="arrow-right" /></span>
			{/if}
		</div>
	</div>
	<div class="progress" aria-hidden="true">
		<span style:transform="scaleX({progress})"></span>
	</div>
</header>

<Sheet bind:open={chaptersOpen} title="Оглавление">
	{#each SECTIONS as section (section.id)}
		<section class="group">
			<h3>{section.label}</h3>
			<ul class="list">
				{#each chaptersOf(section.id) as item (item.slug)}
					{@const current = item.section === chapter.section && item.slug === chapter.slug}
					<li>
						<a
							href={href(chapterPath(item))}
							aria-current={current ? 'page' : undefined}
							onclick={() => (chaptersOpen = false)}
						>
							{#if chapterNumber(item)}<span class="num">{chapterNumber(item)}</span>{/if}
							<span class="title">{navTitle(item)}</span>
							{#if readMarks.has(chapterKey(item))}
								<span class="read"><Icon name="check" size={16} label="Прочитано" /></span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
	{#snippet footer()}
		<div class="sheet-footer">
			<a href={href('/')}>На главную</a>
			<ThemeSwitch compact />
		</div>
	{/snippet}
</Sheet>

<Sheet bind:open={sectionsOpen} title="Разделы главы">
	<ul class="list">
		{#each headings as heading (heading.id)}
			<li class={{ sub: heading.depth === 3 }}>
				<a
					href="#{heading.id}"
					aria-current={heading.id === active ? 'location' : undefined}
					onclick={() => (sectionsOpen = false)}
				>
					<span class="title">{heading.text}</span>
				</a>
			</li>
		{/each}
	</ul>
</Sheet>

<style>
	.bar {
		position: sticky;
		top: 0;
		z-index: 20;
		background: var(--bg);
		border-bottom: 1px solid var(--line);
	}

	.inner {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		height: var(--bar-h);
		padding: 0 0.25rem 0 0.5rem;
		max-width: 90rem;
		margin: 0 auto;
	}

	button,
	a {
		-webkit-tap-highlight-color: transparent;
	}

	.home {
		display: none;
	}

	.chapter,
	.section {
		display: flex;
		min-width: 0;
		height: var(--tap);
		padding: 0 0.5rem;
		border: 0;
		border-radius: 8px;
		background: none;
		color: var(--ink);
		text-align: left;
		cursor: pointer;
	}

	.chapter:hover,
	.section:hover:not(:disabled),
	.icon-btn:is(a, button):hover {
		background: var(--sunk);
	}

	.chapter {
		flex: 0 1 auto;
		max-width: 44%;
		flex-direction: column;
		justify-content: center;
	}

	.crumb {
		font-size: 0.6875rem;
		line-height: 1.1;
		color: var(--muted);
	}

	.name {
		display: flex;
		align-items: baseline;
		gap: 0.35rem;
		min-width: 0;
		font-size: 0.875rem;
		font-weight: 650;
		line-height: 1.3;
	}

	.num {
		flex: none;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--accent-ink);
	}

	.short,
	.current {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.section {
		flex: 1 1 0;
		align-items: center;
		gap: 0.25rem;
		border-left: 1px solid var(--line);
		border-radius: 0 8px 8px 0;
		color: var(--muted);
		font-size: 0.8125rem;
	}

	.section:disabled {
		cursor: default;
	}

	.section:disabled :global(.icon) {
		display: none;
	}

	.current {
		flex: 0 1 auto;
	}

	.actions {
		display: flex;
		flex: none;
	}

	.icon-btn {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: var(--tap);
		border: 0;
		border-radius: 8px;
		background: none;
		color: var(--ink);
		cursor: pointer;
	}

	span.icon-btn {
		color: var(--line-strong);
		cursor: default;
	}

	.progress {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -1px;
		height: 2px;
		overflow: hidden;
	}

	.progress span {
		display: block;
		height: 100%;
		background: var(--accent);
		transform-origin: 0 50%;
		will-change: transform;
	}

	/* Sheets */
	.group + .group {
		margin-top: 0.75rem;
	}

	h3 {
		margin: 0.5rem 0.75rem 0.25rem;
		font-size: var(--text-xs);
		font-weight: 650;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.list a {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-height: var(--tap);
		padding: 0.4rem 0.75rem;
		border-radius: 10px;
		color: var(--ink);
		text-decoration: none;
		line-height: 1.35;
	}

	.list .sub a {
		padding-left: 1.75rem;
		color: var(--muted);
		font-size: var(--text-small);
	}

	.list a:hover {
		background: var(--sunk);
	}

	.list a[aria-current] {
		background: var(--accent-soft);
		color: var(--ink);
		font-weight: 600;
	}

	.list .num {
		min-width: 1.75rem;
	}

	.list .title {
		flex: 1;
	}

	.read {
		color: var(--green);
	}

	.sheet-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.inner {
			gap: 0.5rem;
			padding: 0 0.75rem;
		}

		.chapter {
			max-width: 40%;
		}

		.icon-btn {
			width: var(--tap);
		}
	}

	@media (min-width: 1024px) {
		.home {
			display: grid;
			place-items: center;
			width: var(--tap);
			height: var(--tap);
			border-radius: 8px;
			color: var(--muted);
		}

		.home:hover {
			background: var(--sunk);
			color: var(--ink);
		}

		/* The left sidebar lists every chapter on desktop, so the bar drops the chapter selector. */
		.chapter {
			display: none;
		}

		.section {
			border-left: 0;
			border-radius: 8px;
		}
	}
</style>
