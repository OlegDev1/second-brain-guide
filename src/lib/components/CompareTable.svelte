<!--
  CompareTable: options as columns, criteria as rows (catalog #28). Wrap a Markdown table;
  on a phone it scrolls sideways inside its own box. Props: caption (optional), children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { caption, children }: { caption?: string; children: Snippet } = $props();
</script>

<figure class="compare">
	{#if caption}<figcaption>{caption}</figcaption>{/if}
	{@render children()}
</figure>

<style>
	.compare {
		margin-inline: 0;
		margin-bottom: 0;
	}

	figcaption {
		margin-bottom: 0.5rem;
		font-weight: 650;
	}

	.compare :global(td:first-child),
	.compare :global(th:first-child) {
		position: sticky;
		left: 0;
		background: var(--sunk);
		font-weight: 600;
	}

	.compare :global(.table-scroll) {
		margin: 0;
	}
</style>
