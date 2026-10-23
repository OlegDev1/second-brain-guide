<!--
  Accordion: one collapsed item that opens in place (catalog #21). Stack several for a list;
  give them the same `group` so only one stays open.
  Props: title, open = false, group (optional), children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './layout/Icon.svelte';

	let {
		title,
		open = false,
		group,
		children
	}: { title: string; open?: boolean; group?: string; children: Snippet } = $props();
</script>

<details class="accordion" {open} name={group}>
	<summary>
		<span>{title}</span>
		<Icon name="chevron" size={18} />
	</summary>
	<div class="body">{@render children()}</div>
</details>

<style>
	.accordion {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
	}

	:global(.accordion + .accordion) {
		margin-top: 0.5rem !important;
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		min-height: var(--tap);
		padding: 0.55rem 1rem;
		font-weight: 600;
		cursor: pointer;
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary :global(.icon) {
		color: var(--muted);
		transition: transform var(--dur) var(--ease);
	}

	details[open] summary :global(.icon) {
		transform: rotate(180deg);
	}

	.body {
		padding: 0 1rem 1rem;
	}

	.body :global(:where(p)) {
		margin: 0;
	}

	.body :global(> * + *) {
		margin-top: 0.6rem;
	}
</style>
