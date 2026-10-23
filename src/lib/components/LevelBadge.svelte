<!--
  LevelBadge: chapter level. Props: level ('basic' | 'advanced').
-->
<script lang="ts">
	import type { Level } from '$lib/types';

	let { level }: { level: Level } = $props();
	const bars = $derived(level === 'advanced' ? 3 : 1);
</script>

<span class="level" title="Уровень">
	<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
		{#each [0, 1, 2] as i (i)}
			<rect x={i * 4.5} y={8 - i * 3.5} width="3" height={4 + i * 3.5} rx="1" class={{ on: i < bars }} />
		{/each}
	</svg>
	{level === 'advanced' ? 'Advanced' : 'Основы'}
</span>

<style>
	.level {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.1rem 0.5rem;
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		color: var(--muted);
		font-size: var(--text-xs);
		line-height: 1.5;
		white-space: nowrap;
	}

	rect {
		fill: var(--line-strong);
	}

	rect.on {
		fill: var(--ink);
	}
</style>
