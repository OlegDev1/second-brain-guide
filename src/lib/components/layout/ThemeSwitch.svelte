<!--
  ThemeSwitch: dark / light / system, saved in localStorage (see src/lib/theme.svelte.ts).
  Props: compact = false (icons only), cycle = false (one icon button that steps through
  the three choices, for tight spots like the phone header).
-->
<script lang="ts">
	import { theme, type ThemeChoice } from '$lib/theme.svelte';
	import Icon, { type IconName } from './Icon.svelte';

	let { compact = false, cycle = false }: { compact?: boolean; cycle?: boolean } = $props();

	const options: { value: ThemeChoice; label: string; icon: IconName }[] = [
		{ value: 'dark', label: 'Тёмная', icon: 'moon' },
		{ value: 'light', label: 'Светлая', icon: 'sun' },
		{ value: 'system', label: 'Системная', icon: 'monitor' }
	];

	const index = $derived(Math.max(0, options.findIndex((o) => o.value === theme.choice)));
	const next = $derived(options[(index + 1) % options.length]);
</script>

{#if cycle}
	<button
		type="button"
		class="cycle"
		aria-label="Тема: {options[index].label}. Переключить на «{next.label}»"
		title="Тема: {options[index].label}"
		onclick={() => theme.set(next.value)}
	>
		<Icon name={options[index].icon} size={18} />
	</button>
{:else}
	<div class="switch" role="radiogroup" aria-label="Тема оформления">
		{#each options as option (option.value)}
			<button
				type="button"
				role="radio"
				aria-checked={theme.choice === option.value}
				aria-label={compact ? option.label : undefined}
				title={option.label}
				onclick={() => theme.set(option.value)}
			>
				<Icon name={option.icon} size={18} />
				{#if !compact}<span>{option.label}</span>{/if}
			</button>
		{/each}
	</div>
{/if}

<style>
	.switch {
		display: inline-flex;
		gap: 2px;
		padding: 3px;
		border: 1px solid var(--line);
		border-radius: 12px;
		background: var(--sunk);
	}

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		min-width: var(--tap);
		min-height: var(--tap);
		padding: 0 0.6rem;
		border: 0;
		border-radius: 9px;
		background: none;
		color: var(--muted);
		font-size: var(--text-small);
		cursor: pointer;
		transition: background var(--dur) var(--ease);
	}

	button:hover {
		color: var(--ink);
	}

	.cycle {
		padding: 0;
		border-radius: 10px;
	}

	.cycle:hover {
		background: var(--sunk);
	}

	button[aria-checked='true'] {
		background: var(--surface);
		color: var(--ink);
		box-shadow: 0 0 0 1px var(--line-strong);
	}
</style>
