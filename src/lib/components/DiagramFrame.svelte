<!--
  DiagramFrame: wrapper for an inline SVG diagram. Use the classes from src/app.css inside the
  SVG: rect.node.blue|violet|amber|green|red|neutral, text.label(.small), path.arrow(.dashed),
  .arrowhead. Draw a vertical layout for phones.
  Props: label (required: what the diagram shows, read by screen readers), caption, children (<svg>).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { label, caption, children }: { label: string; caption?: string; children: Snippet } = $props();
</script>

<figure class="diagram">
	<div class="canvas" role="img" aria-label={label}>
		{@render children()}
	</div>
	{#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>

<style>
	.diagram {
		margin-inline: 0;
		margin-bottom: 0;
		padding: 1rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}

	.canvas {
		max-width: 34rem;
		margin: 0 auto;
	}

	figcaption {
		margin-top: 0.75rem;
		color: var(--muted);
		font-size: var(--text-small);
		text-align: center;
	}
</style>
