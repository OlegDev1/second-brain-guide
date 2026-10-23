<!--
  PrevNext: two cards at the end of a chapter (catalog #14).
  Props: prev, next (chapters in the same section, either may be missing).
-->
<script lang="ts">
	import { chapterNumber, chapterPath } from '$lib/content';
	import { href } from '$lib/paths';
	import type { Chapter } from '$lib/types';
	import Icon from './Icon.svelte';

	let { prev, next }: { prev?: Chapter; next?: Chapter } = $props();
</script>

{#if prev || next}
	<nav class="pager" aria-label="Соседние главы">
		{#if prev}
			<a class="card prev" href={href(chapterPath(prev))} rel="prev">
				<span class="dir"><Icon name="arrow-left" size={16} /> Назад</span>
				<span class="title">
					{#if chapterNumber(prev)}<span class="num">{chapterNumber(prev)}</span>{/if}
					{prev.title}
				</span>
			</a>
		{/if}
		{#if next}
			<a class="card next" href={href(chapterPath(next))} rel="next">
				<span class="dir">Дальше <Icon name="arrow-right" size={16} /></span>
				<span class="title">
					{#if chapterNumber(next)}<span class="num">{chapterNumber(next)}</span>{/if}
					{next.title}
				</span>
			</a>
		{/if}
	</nav>
{/if}

<style>
	.pager {
		display: grid;
		gap: 0.75rem;
		margin-top: 3rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 1rem 1.1rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
		color: var(--ink);
		text-decoration: none;
		transition: border-color var(--dur) var(--ease);
	}

	.card:hover {
		border-color: var(--accent);
	}

	.dir {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: var(--text-xs);
		color: var(--muted);
	}

	.title {
		font-weight: 600;
		line-height: 1.35;
	}

	.num {
		margin-right: 0.35rem;
		color: var(--accent-ink);
		font-family: var(--font-mono);
		font-size: 0.875em;
	}

	.next {
		text-align: right;
		align-items: flex-end;
	}

	@media (min-width: 640px) {
		.pager {
			grid-template-columns: 1fr 1fr;
		}

		.next {
			grid-column: 2;
		}
	}
</style>
