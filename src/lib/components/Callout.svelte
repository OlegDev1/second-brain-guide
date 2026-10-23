<!--
  Callout: coloured box with a fixed meaning (catalog #27).
  Props: type = 'tip' (green) | 'important' (amber) | 'danger' (red) | 'note' (blue), title, children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon, { type IconName } from './layout/Icon.svelte';

	type CalloutType = 'tip' | 'important' | 'danger' | 'note';

	let { type = 'tip', title, children }: { type?: CalloutType; title?: string; children: Snippet } =
		$props();

	const META: Record<CalloutType, { label: string; icon: IconName }> = {
		tip: { label: 'Совет', icon: 'bulb' },
		important: { label: 'Важно', icon: 'flag' },
		danger: { label: 'Осторожно', icon: 'alert' },
		note: { label: 'Заметка', icon: 'info' }
	};
	const meta = $derived(META[type]);
</script>

<aside class="callout {type}" aria-label={title ?? meta.label}>
	<p class="title"><Icon name={meta.icon} size={18} />{title ?? meta.label}</p>
	<div class="body">{@render children()}</div>
</aside>

<style>
	.callout {
		--tone: var(--green);
		--tone-soft: var(--green-soft);
		--tone-ink: var(--green-ink);
		padding: 0.9rem 1.1rem;
		border: 1px solid var(--tone);
		border-left-width: 4px;
		border-radius: var(--radius);
		background: var(--tone-soft);
	}

	.important {
		--tone: var(--amber);
		--tone-soft: var(--amber-soft);
		--tone-ink: var(--amber-ink);
	}

	.danger {
		--tone: var(--red);
		--tone-soft: var(--red-soft);
		--tone-ink: var(--red-ink);
	}

	.note {
		--tone: var(--blue);
		--tone-soft: var(--blue-soft);
		--tone-ink: var(--blue-ink);
	}

	.title {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		margin: 0 0 0.35rem;
		color: var(--tone-ink);
		font-weight: 650;
	}

	.body :global(> :first-child) {
		margin-top: 0;
	}

	.body :global(:where(p)) {
		margin: 0;
	}

	.body :global(> * + *) {
		margin-top: 0.6rem;
	}
</style>
