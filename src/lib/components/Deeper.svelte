<!--
  Deeper: the «Глубже» disclosure that answers "but why" without slowing the main text (catalog #24).
  Props: title (the question), children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './layout/Icon.svelte';

	let { title, children }: { title: string; children: Snippet } = $props();
</script>

<details class="deeper">
	<summary>
		<span class="kicker">Глубже</span>
		<span class="title">{title}</span>
		<Icon name="chevron" size={18} />
	</summary>
	<div class="body">{@render children()}</div>
</details>

<style>
	.deeper {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--sunk);
	}

	summary {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-height: var(--tap);
		padding: 0.5rem 0.9rem;
		cursor: pointer;
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.kicker {
		flex: none;
		padding: 0.05rem 0.5rem;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--accent-ink);
		font-size: var(--text-xs);
		font-weight: 650;
	}

	.title {
		flex: 1;
		font-weight: 600;
		line-height: 1.35;
	}

	summary :global(.icon) {
		color: var(--muted);
		transition: transform var(--dur) var(--ease);
	}

	details[open] summary :global(.icon) {
		transform: rotate(180deg);
	}

	.body {
		padding: 0.25rem 1rem 1rem;
		font-size: var(--text-small);
	}

	.body :global(> * + *) {
		margin-top: 0.75rem;
	}

	.body :global(p) {
		margin: 0;
	}
</style>
