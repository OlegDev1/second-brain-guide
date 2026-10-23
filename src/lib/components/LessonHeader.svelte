<!--
  LessonHeader: what you'll learn, what you need first and how long it takes (catalog #19).
  Reads time, level and prereqs from the chapter frontmatter; props override them.
  Props: learn (string[]), time (minutes), level, prereqs (chapter paths like "guide/02-project" or plain text).
-->
<script lang="ts">
	import { chapterByPath, chapterNumber, chapterPath } from '$lib/content';
	import { getChapterContext } from '$lib/context';
	import { href } from '$lib/paths';
	import type { Level } from '$lib/types';
	import LevelBadge from './LevelBadge.svelte';
	import Icon from './layout/Icon.svelte';

	let {
		learn = [],
		time,
		level,
		prereqs
	}: { learn?: string[]; time?: number; level?: Level; prereqs?: string[] } = $props();

	const chapter = getChapterContext();
	const minutes = $derived(time ?? chapter?.time);
	const lvl = $derived(level ?? chapter?.level ?? 'basic');
	const needs = $derived(
		(prereqs ?? chapter?.prereqs ?? []).map((item) => ({ text: item, chapter: chapterByPath(item) }))
	);
</script>

<section class="lesson" aria-label="О главе">
	<div class="meta">
		{#if minutes}<span class="time"><Icon name="clock" size={16} />{minutes} мин</span>{/if}
		<LevelBadge level={lvl} />
	</div>
	{#if learn.length}
		<div class="block">
			<p class="label">Чему научишься</p>
			<ul>
				{#each learn as item (item)}<li>{item}</li>{/each}
			</ul>
		</div>
	{/if}
	<div class="block">
		<p class="label">Что нужно до начала</p>
		{#if needs.length}
			<ul>
				{#each needs as need (need.text)}
					<li>
						{#if need.chapter}
							<a href={href(chapterPath(need.chapter))}>
								{chapterNumber(need.chapter) ? `${chapterNumber(need.chapter)}. ` : ''}{need.chapter.title}
							</a>
						{:else}
							{need.text}
						{/if}
					</li>
				{/each}
			</ul>
		{:else}
			<p class="none">Ничего, можно начинать.</p>
		{/if}
	</div>
</section>

<style>
	.lesson {
		display: grid;
		gap: 1rem;
		padding: 1rem 1.15rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		color: var(--muted);
		font-size: var(--text-small);
	}

	.time {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.label {
		margin: 0 0 0.35rem;
		color: var(--muted);
		font-size: var(--text-xs);
		font-weight: 650;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	ul {
		margin: 0;
		padding-left: 1.2rem;
	}

	li + li {
		margin-top: 0.25rem;
	}

	.none {
		margin: 0;
	}

	@media (min-width: 640px) {
		.lesson {
			grid-template-columns: 1fr 1fr;
		}

		.meta {
			grid-column: 1 / -1;
		}
	}
</style>
