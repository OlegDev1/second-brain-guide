<!--
  Steps: numbered vertical stepper for 3–8 actions (catalog #23). Children: <Step> items.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<ol class="steps">{@render children()}</ol>

<style>
	.steps {
		counter-reset: step;
		/* Top margin comes from the prose flow, so the first number clears the heading above. */
		margin-inline: 0;
		margin-bottom: 0;
		padding: 0;
		list-style: none;
	}
</style>
