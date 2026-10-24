<!--
  TLDR: a short plain-language summary that opens a chapter (catalog #20). Props: title = 'Коротко', children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title = 'Коротко', children }: { title?: string; children: Snippet } = $props();
</script>

<section class="tldr" aria-label={title}>
	<p class="label">
		<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
			<path d="M9 18h6M10 21h4" />
			<path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.3 1.1 2.2h5c0-.9.5-1.7 1.1-2.2A6 6 0 0 0 12 3Z" />
		</svg>
		{title}
	</p>
	<div class="body">{@render children()}</div>
</section>

<style>
	.tldr {
		padding: 1.15rem 1.25rem 1.25rem;
		border-radius: var(--radius-lg);
		background: var(--blue-soft);
		border: 1px solid color-mix(in srgb, var(--blue) 45%, transparent);
		border-left: 5px solid var(--blue);
	}

	.label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0 0 0.6rem;
		color: var(--blue-ink);
		font-family: var(--font-head);
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.2;
	}

	.icon {
		flex: none;
		width: 1.4rem;
		height: 1.4rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.body {
		font-size: 1.0625rem;
		font-weight: 500;
		line-height: 1.6;
	}

	.body :global(:where(p)) {
		margin: 0;
	}

	.body :global(> * + *) {
		margin-top: 0.5rem;
	}

	@media (max-width: 480px) {
		.tldr {
			padding: 1rem 1rem 1.1rem;
		}

		.label {
			font-size: 1.125rem;
		}
	}
</style>
