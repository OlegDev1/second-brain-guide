<!--
  Tab: one panel inside <Tabs>; its label comes from the parent's `labels`, by position.
  Props: children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getTabsContext } from './tabs.svelte';

	let { children }: { children: Snippet } = $props();

	const tabs = getTabsContext();
	const index = tabs.register();
</script>

<div
	class="panel"
	role="tabpanel"
	id="{tabs.uid}-panel-{index}"
	aria-labelledby="{tabs.uid}-tab-{index}"
	hidden={tabs.active !== index}
>
	{@render children()}
</div>

<style>
	.panel {
		padding: 1rem 1.1rem;
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
