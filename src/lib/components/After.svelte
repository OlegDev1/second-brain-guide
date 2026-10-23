<!--
  After: the "after" version inside <BeforeAfter>. Props: children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getSide } from './before-after';

	let { children }: { children: Snippet } = $props();
	const side = getSide();
</script>

<div class="panel after" hidden={side() !== 'after'}>
	{@render children()}
</div>

<style>
	.panel {
		padding: 1rem 1.1rem;
		border-left: 4px solid var(--green);
	}

	.panel :global(> :first-child) {
		margin-top: 0;
	}

	.panel :global(> * + *) {
		margin-top: 0.75rem;
	}

	.panel :global(p) {
		margin: 0;
	}
</style>
