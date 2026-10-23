<!--
  BeforeAfter: one panel with a switch between a weak and an improved version (catalog #29).
  Props: title (optional), beforeLabel = 'Было', afterLabel = 'Стало',
  children: one <Before> and one <After>.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setSideContext, type Side } from './before-after';

	let {
		title,
		beforeLabel = 'Было',
		afterLabel = 'Стало',
		children
	}: { title?: string; beforeLabel?: string; afterLabel?: string; children: Snippet } = $props();

	let side = $state<Side>('before');
	setSideContext(() => side);
</script>

<section class="ba" aria-label={title ?? `${beforeLabel} и ${afterLabel}`}>
	<div class="head">
		{#if title}<p class="title">{title}</p>{/if}
		<div class="switch" role="group" aria-label="Показать версию">
			<button type="button" class="before" aria-pressed={side === 'before'} onclick={() => (side = 'before')}>
				{beforeLabel}
			</button>
			<button type="button" class="after" aria-pressed={side === 'after'} onclick={() => (side = 'after')}>
				{afterLabel}
			</button>
		</div>
	</div>
	{@render children()}
</section>

<style>
	.ba {
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
		overflow: hidden;
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		padding: 0.6rem 0.75rem 0.6rem 1.1rem;
		border-bottom: 1px solid var(--line);
		background: var(--sunk);
	}

	.title {
		margin: 0;
		font-weight: 650;
	}

	.switch {
		display: inline-flex;
		gap: 2px;
		padding: 3px;
		border: 1px solid var(--line);
		border-radius: 12px;
		background: var(--bg);
	}

	button {
		min-height: 2.5rem;
		min-width: 5.5rem;
		padding: 0 0.9rem;
		border: 0;
		border-radius: 9px;
		background: none;
		color: var(--muted);
		font-weight: 600;
		cursor: pointer;
	}

	.before[aria-pressed='true'] {
		background: var(--red-soft);
		color: var(--red-ink);
		box-shadow: inset 0 0 0 1px var(--red);
	}

	.after[aria-pressed='true'] {
		background: var(--green-soft);
		color: var(--green-ink);
		box-shadow: inset 0 0 0 1px var(--green);
	}
</style>
