<!--
  Takeaways: the short list under «Выводы» that closes a chapter (catalog #20).
  Put a Markdown list inside. Props: title (optional label), children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children }: { title?: string; children: Snippet } = $props();
</script>

<section class="takeaways" aria-label={title ?? 'Выводы'}>
	{#if title}<p class="label">{title}</p>{/if}
	<div class="body">{@render children()}</div>
</section>

<style>
	.takeaways {
		padding: 1rem 1.15rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}

	.label {
		margin: 0 0 0.5rem;
		font-weight: 650;
	}

	.body :global(ul) {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.body :global(li) {
		position: relative;
		padding-left: 1.6rem;
	}

	.body :global(li + li) {
		margin-top: 0.5rem;
	}

	.body :global(li::before) {
		content: '';
		position: absolute;
		left: 0.15rem;
		top: 0.45em;
		width: 0.7rem;
		height: 0.4rem;
		border-left: 2px solid var(--blue);
		border-bottom: 2px solid var(--blue);
		transform: rotate(-45deg);
	}

	.body :global(p) {
		margin: 0;
	}
</style>
