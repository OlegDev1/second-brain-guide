<!--
  TLDR: two or three lines that open a chapter (catalog #20). Props: title = 'Коротко', children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title = 'Коротко', children }: { title?: string; children: Snippet } = $props();
</script>

<section class="tldr" aria-label={title}>
	<p class="label">{title}</p>
	<div class="body">{@render children()}</div>
</section>

<style>
	.tldr {
		padding: 1rem 1.15rem;
		border-radius: var(--radius-lg);
		background: var(--blue-soft);
		border: 1px solid color-mix(in srgb, var(--blue) 45%, transparent);
	}

	.label {
		margin: 0 0 0.35rem;
		color: var(--blue-ink);
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.body {
		font-size: 1.0625rem;
		font-weight: 500;
	}

	.body :global(:where(p)) {
		margin: 0;
	}

	.body :global(> * + *) {
		margin-top: 0.5rem;
	}
</style>
