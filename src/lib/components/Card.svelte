<!--
  Card: one idea per card. Props: title, eyebrow, href (whole card becomes a link),
  tone = 'neutral' | 'blue' | 'violet' | 'amber' | 'green' | 'red', children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { href as withBase } from '$lib/paths';
	import type { Tone } from '$lib/types';

	let {
		title,
		eyebrow,
		href,
		tone = 'neutral',
		children
	}: { title?: string; eyebrow?: string; href?: string; tone?: Tone; children?: Snippet } = $props();

	const link = $derived(href?.startsWith('/') ? withBase(href) : href);
</script>

{#snippet body()}
	{#if eyebrow}<span class="eyebrow">{eyebrow}</span>{/if}
	{#if title}<span class="title">{title}</span>{/if}
	{#if children}<div class="content">{@render children()}</div>{/if}
{/snippet}

{#if link}
	<a class="card {tone}" href={link}>{@render body()}</a>
{:else}
	<div class="card {tone}">{@render body()}</div>
{/if}

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 1rem 1.1rem;
		border: 1px solid var(--line);
		border-top: 3px solid var(--line-strong);
		border-radius: var(--radius-lg);
		background: var(--surface);
		color: var(--ink);
		text-decoration: none;
	}

	a.card {
		transition: border-color var(--dur) var(--ease);
	}

	a.card:hover {
		border-color: var(--accent);
	}

	.blue {
		border-top-color: var(--blue);
	}
	.violet {
		border-top-color: var(--violet);
	}
	.amber {
		border-top-color: var(--amber);
	}
	.green {
		border-top-color: var(--green);
	}
	.red {
		border-top-color: var(--red);
	}

	.eyebrow {
		color: var(--muted);
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.title {
		font-weight: 650;
		line-height: 1.35;
	}

	.content {
		color: var(--muted);
		font-size: var(--text-small);
	}

	.content :global(:where(p)) {
		margin: 0;
	}

	.content :global(> * + *) {
		margin-top: 0.5rem;
	}
</style>
