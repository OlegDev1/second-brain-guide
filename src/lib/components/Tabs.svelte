<!--
  Tabs: variants of the same instruction (Mac / Windows, app / Claude Code). Tabs with the same
  `group` switch together across the page and the choice is remembered (catalog #22).
  Props: labels (string[]), group (optional), children: one <Tab> per label, in the same order.
-->
<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { chooseTab, restoreTabGroups, setTabsContext, tabGroups } from './tabs.svelte';

	let { labels, group, children }: { labels: string[]; group?: string; children: Snippet } =
		$props();

	const uid = $props.id();
	let local = $state<string>();
	let count = 0;

	const activeLabel = $derived.by(() => {
		const shared = group ? tabGroups[group] : undefined;
		if (shared && labels.includes(shared)) return shared;
		if (local && labels.includes(local)) return local;
		return labels[0];
	});
	const active = $derived(labels.indexOf(activeLabel));

	setTabsContext({
		uid,
		register: () => count++,
		get active() {
			return active;
		}
	});

	onMount(restoreTabGroups);

	function select(index: number) {
		const label = labels[index];
		local = label;
		if (group) chooseTab(group, label);
	}

	function onkeydown(event: KeyboardEvent, index: number) {
		const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
		if (!step) return;
		event.preventDefault();
		const next = (index + step + labels.length) % labels.length;
		select(next);
		document.getElementById(`${uid}-tab-${next}`)?.focus();
	}
</script>

<div class="tabs">
	<div class="list" role="tablist">
		{#each labels as label, i (label)}
			<button
				type="button"
				role="tab"
				id="{uid}-tab-{i}"
				aria-selected={i === active}
				aria-controls="{uid}-panel-{i}"
				tabindex={i === active ? 0 : -1}
				onclick={() => select(i)}
				onkeydown={(event) => onkeydown(event, i)}
			>
				{label}
			</button>
		{/each}
	</div>
	{@render children()}
</div>

<style>
	.tabs {
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
		overflow: hidden;
	}

	.list {
		display: flex;
		gap: 0.25rem;
		padding: 0 0.5rem;
		overflow-x: auto;
		border-bottom: 1px solid var(--line);
		background: var(--sunk);
	}

	button {
		flex: none;
		min-height: var(--tap);
		padding: 0 0.85rem;
		border: 0;
		border-bottom: 2px solid transparent;
		background: none;
		color: var(--muted);
		font-weight: 550;
		cursor: pointer;
	}

	button:hover {
		color: var(--ink);
	}

	button[aria-selected='true'] {
		color: var(--ink);
		border-bottom-color: var(--accent);
	}
</style>
