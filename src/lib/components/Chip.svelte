<!--
  Chip: small inline label. Props: tone = 'neutral' | 'blue' | 'violet' | 'amber' | 'green' | 'red', children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Tone } from '$lib/types';

	let { tone = 'neutral', children }: { tone?: Tone; children: Snippet } = $props();
</script>

<span class="chip {tone}">{@render children()}</span>

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.05rem 0.55rem;
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		background: var(--sunk);
		color: var(--ink);
		font-size: var(--text-xs);
		font-weight: 550;
		line-height: 1.6;
		white-space: nowrap;
		vertical-align: 0.1em;
	}

	.blue {
		border-color: var(--blue);
		background: var(--blue-soft);
		color: var(--blue-ink);
	}
	.violet {
		border-color: var(--violet);
		background: var(--violet-soft);
		color: var(--violet-ink);
	}
	.amber {
		border-color: var(--amber);
		background: var(--amber-soft);
		color: var(--amber-ink);
	}
	.green {
		border-color: var(--green);
		background: var(--green-soft);
		color: var(--green-ink);
	}
	.red {
		border-color: var(--red);
		background: var(--red-soft);
		color: var(--red-ink);
	}
</style>
