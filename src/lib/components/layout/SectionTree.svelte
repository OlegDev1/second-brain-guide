<!--
  SectionTree: every chapter as one flat list, grouped by Гайд / Advanced / Справочник, beside the
  text from 1024 px (catalog #11). Nothing folds: the chapter's own sections live in the right rail.
  A chapter marked in the navigation config (isHighlighted) is green with a flag.
  Props: chapter (current).
-->
<script lang="ts">
	import {
		chapterKey,
		chapterNumber,
		chapterPath,
		chaptersOf,
		isHighlighted,
		SECTIONS,
		shortTitle
	} from '$lib/content';
	import { href } from '$lib/paths';
	import { readMarks } from '$lib/progress.svelte';
	import type { Chapter } from '$lib/types';
	import Icon from './Icon.svelte';

	let { chapter }: { chapter: Chapter } = $props();
</script>

<nav class="tree" aria-label="Все главы">
	{#each SECTIONS as section (section.id)}
		<section class="group">
			<p class="label">{section.label}</p>
			<ul>
				{#each chaptersOf(section.id) as item (item.slug)}
					{@const current = item.slug === chapter.slug && item.section === chapter.section}
					<li>
						<a
							href={href(chapterPath(item))}
							class={{ highlight: isHighlighted(item) }}
							aria-current={current ? 'page' : undefined}
						>
							{#if chapterNumber(item)}<span class="num">{chapterNumber(item)}</span>{/if}
							<span class="title">{shortTitle(item)}</span>
							{#if readMarks.has(chapterKey(item))}
								<span class="read"><Icon name="check" size={14} label="Прочитано" /></span>
							{:else if isHighlighted(item)}
								<span class="flag"><Icon name="flag" size={14} /></span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</nav>

<style>
	.tree {
		font-size: var(--text-small);
	}

	.group + .group {
		margin-top: 1.25rem;
	}

	.label {
		margin: 0 0 0.25rem;
		padding: 0 0.5rem;
		font-size: var(--text-xs);
		font-weight: 650;
		letter-spacing: 0.04em;
		line-height: 2;
		text-transform: uppercase;
		color: var(--muted);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem;
		border-radius: 8px;
		color: var(--muted);
		line-height: 1.35;
		text-decoration: none;
	}

	a:hover {
		background: var(--sunk);
		color: var(--ink);
	}

	a[aria-current='page'] {
		background: var(--accent-soft);
		color: var(--ink);
		font-weight: 600;
	}

	a.highlight {
		margin-top: 0.25rem;
		border: 1px solid var(--green);
		background: var(--green-soft);
		color: var(--green-ink);
		font-weight: 600;
	}

	a.highlight:hover,
	a.highlight[aria-current='page'] {
		box-shadow: inset 0 0 0 1px var(--green);
		color: var(--green-ink);
	}

	.num {
		flex: none;
		min-width: 1.6rem;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--accent-ink);
	}

	.highlight .num {
		color: inherit;
	}

	.title {
		flex: 1;
	}

	.read,
	.flag {
		align-self: center;
		color: var(--green);
	}
</style>
