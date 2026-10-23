<!--
  Sheet: modal panel on a native <dialog>. Bottom sheet on a phone, a centred panel from 640 px.
  Props: open (bindable), title, position = 'bottom' | 'top', children, footer (snippet).
  Escape, the close button and a tap on the backdrop close it; focus returns to the opener.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';

	let {
		open = $bindable(false),
		title,
		position = 'bottom',
		children,
		footer
	}: {
		open?: boolean;
		title: string;
		position?: 'bottom' | 'top';
		children: Snippet;
		footer?: Snippet;
	} = $props();

	const id = $props.id();
	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	});
</script>

<dialog
	bind:this={dialog}
	class="sheet {position}"
	aria-labelledby="{id}-title"
	onclose={() => (open = false)}
	onclick={(event) => {
		if (event.target === dialog) open = false;
	}}
>
	<div class="panel">
		<header>
			{#if position === 'bottom'}<span class="grabber" aria-hidden="true"></span>{/if}
			<h2 id="{id}-title">{title}</h2>
			<button type="button" class="close" onclick={() => (open = false)} aria-label="Закрыть">
				<Icon name="close" />
			</button>
		</header>
		<div class="body">
			{@render children()}
		</div>
		{#if footer}
			<footer>{@render footer()}</footer>
		{/if}
	</div>
</dialog>

<style>
	.sheet {
		padding: 0;
		border: 1px solid var(--line);
		background: var(--surface);
		color: var(--ink);
		max-width: 100%;
		width: 100%;
		max-height: 85dvh;
		margin: auto 0 0;
		border-radius: 16px 16px 0 0;
		box-shadow: var(--shadow-sheet);
		overflow: hidden;
	}

	.sheet.top {
		margin: 0 0 auto;
		border-radius: 0 0 16px 16px;
		max-height: 90dvh;
	}

	.sheet[open] {
		display: flex;
		animation: rise var(--dur) var(--ease);
	}

	.sheet.top[open] {
		animation-name: drop;
	}

	.sheet::backdrop {
		background: var(--scrim);
	}

	.panel {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 0;
	}

	header {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 0.5rem 0.5rem 1.25rem;
		border-bottom: 1px solid var(--line);
	}

	.grabber {
		position: absolute;
		top: 0.4rem;
		left: 50%;
		width: 2.25rem;
		height: 4px;
		margin-left: -1.125rem;
		border-radius: 2px;
		background: var(--line-strong);
	}

	h2 {
		flex: 1;
		font-family: var(--font-body);
		font-size: 1rem;
		font-weight: 650;
		letter-spacing: 0;
	}

	.close {
		display: grid;
		place-items: center;
		width: var(--tap);
		height: var(--tap);
		border: 0;
		border-radius: var(--radius);
		background: none;
		color: var(--muted);
		cursor: pointer;
	}

	.close:hover {
		background: var(--sunk);
		color: var(--ink);
	}

	.body {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: 0.5rem 0.5rem 1rem;
	}

	footer {
		padding: 0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom));
		border-top: 1px solid var(--line);
	}

	@media (min-width: 640px) {
		.sheet,
		.sheet.top {
			width: min(34rem, calc(100% - 2rem));
			margin: calc(var(--bar-h) + 0.75rem) auto auto;
			border-radius: var(--radius-lg);
			max-height: calc(100dvh - var(--bar-h) - 2rem);
			box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
		}

		.sheet[open],
		.sheet.top[open] {
			animation-name: drop;
		}

		.grabber {
			display: none;
		}
	}

	@keyframes rise {
		from {
			transform: translateY(24px);
			opacity: 0;
		}
	}

	@keyframes drop {
		from {
			transform: translateY(-12px);
			opacity: 0;
		}
	}
</style>
