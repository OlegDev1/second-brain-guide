<!--
  Checklist: items with ticks and a done counter; ticks stay in localStorage (catalog #38).
  Props: id (unique, stable: the storage key), items (string[]), title (optional).
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { load, save } from '$lib/storage';

	let { id, items, title }: { id: string; items: string[]; title?: string } = $props();

	const uid = $props.id();
	let done = $state<boolean[]>([]);
	const count = $derived(items.filter((_, i) => done[i]).length);

	onMount(() => {
		done = load<boolean[]>(`checklist:${id}`, []);
	});

	function toggle(index: number, checked: boolean) {
		const next = [...done];
		next[index] = checked;
		done = next;
		save(`checklist:${id}`, done);
	}
</script>

<section class="checklist" aria-labelledby="{uid}-title">
	<header>
		<p class="title" id="{uid}-title">{title ?? 'Чек-лист'}</p>
		<p class="count" aria-live="polite">{count} из {items.length}</p>
	</header>
	<div class="bar" aria-hidden="true">
		<span style:transform="scaleX({items.length ? count / items.length : 0})"></span>
	</div>
	<ul>
		{#each items as item, i (i)}
			<li>
				<label>
					<input
						type="checkbox"
						checked={done[i] ?? false}
						onchange={(event) => toggle(i, event.currentTarget.checked)}
					/>
					<span>{item}</span>
				</label>
			</li>
		{/each}
	</ul>
</section>

<style>
	.checklist {
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
		overflow: hidden;
	}

	header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.85rem 1.1rem 0.6rem;
	}

	.title {
		margin: 0;
		font-weight: 650;
	}

	.count {
		margin: 0;
		color: var(--muted);
		font-size: var(--text-small);
		font-variant-numeric: tabular-nums;
	}

	.bar {
		height: 3px;
		background: var(--sunk);
	}

	.bar span {
		display: block;
		height: 100%;
		background: var(--green);
		transform-origin: 0 50%;
		transition: transform var(--dur) var(--ease);
	}

	ul {
		margin: 0;
		padding: 0.35rem 0.5rem 0.5rem;
		list-style: none;
	}

	li + li {
		margin-top: 0 !important;
	}

	label {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		min-height: var(--tap);
		padding: 0.55rem 0.6rem;
		border-radius: 8px;
		cursor: pointer;
	}

	label:hover {
		background: var(--sunk);
	}

	input {
		flex: none;
		width: 1.25rem;
		height: 1.25rem;
		margin: 0.15rem 0 0;
		accent-color: var(--green);
		cursor: pointer;
	}

	input:checked + span {
		color: var(--muted);
		text-decoration: line-through;
		text-decoration-color: var(--line-strong);
	}
</style>
