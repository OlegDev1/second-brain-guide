<!--
  ChapterList: card grid of a section's chapters with number, time, level and status.
  Props: section (id).
-->
<script lang="ts">
	import { chapterKey, chapterNumber, chapterPath, chaptersOf } from '$lib/content';
	import { href } from '$lib/paths';
	import { readMarks } from '$lib/progress.svelte';
	import type { SectionId } from '$lib/types';
	import LevelBadge from '../LevelBadge.svelte';
	import Icon from './Icon.svelte';

	let { section }: { section: SectionId } = $props();
</script>

<ol class="chapters">
	{#each chaptersOf(section) as chapter (chapter.slug)}
		<li>
			<a href={href(chapterPath(chapter))} class={{ stub: chapter.stub }}>
				<span class="top">
					{#if chapterNumber(chapter)}<span class="num">{chapterNumber(chapter)}</span>{/if}
					{#if readMarks.has(chapterKey(chapter))}
						<span class="read"><Icon name="check" size={16} label="Прочитано" /></span>
					{/if}
				</span>
				<span class="title">{chapter.title}</span>
				{#if chapter.description}<span class="desc">{chapter.description}</span>{/if}
				<span class="meta">
					{#if chapter.stub}
						<span class="status">Глава в работе</span>
					{:else}
						{#if chapter.time}<span>{chapter.time} мин</span>{/if}
						<LevelBadge level={chapter.level} />
					{/if}
				</span>
			</a>
		</li>
	{/each}
</ol>

<style>
	.chapters {
		display: grid;
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		height: 100%;
		padding: 1rem 1.1rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
		color: var(--ink);
		text-decoration: none;
		transition: border-color var(--dur) var(--ease);
	}

	a:hover {
		border-color: var(--accent);
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 1.25rem;
	}

	.num {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--accent-ink);
	}

	.read {
		color: var(--green);
	}

	.title {
		font-weight: 650;
		line-height: 1.35;
	}

	.desc {
		color: var(--muted);
		font-size: var(--text-small);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem;
		margin-top: auto;
		padding-top: 0.25rem;
		color: var(--muted);
		font-size: var(--text-xs);
	}

	.status {
		color: var(--amber-ink);
	}

	.stub .title {
		color: var(--muted);
	}

	@media (min-width: 640px) {
		.chapters {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.chapters {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
