<!--
  PromptCard: a long prompt shown collapsed, with Copy and Expand buttons at the side.
  Copy always copies the whole text, collapsed or not. The collapsed view is tall enough
  to show the first lines, so the reader sees where to fill in their own details.
  Props: text (exactly what gets copied), title, when (optional),
  fields (optional: how many leading lines are fill-in lines; their [brackets] are highlighted).
-->
<script lang="ts">
	import { copyText } from '$lib/clipboard';
	import Icon from '../layout/Icon.svelte';

	let {
		text,
		title,
		when,
		fields = 0
	}: { text: string; title?: string; when?: string; fields?: number } = $props();

	const id = $props.id();

	let open = $state(false);
	let copied = $state(false);
	let card: HTMLElement;

	const lines = $derived(text.split('\n'));
	// Fill-in lines split into plain parts and [placeholder] parts.
	const head = $derived(
		lines.slice(0, fields).map((line) => line.split(/(\[[^\]]+\])/).filter(Boolean))
	);
	const rest = $derived(lines.slice(fields).join('\n'));
	const size = $derived(`${lines.length} ${plural(lines.length)}`);

	function plural(n: number) {
		const d = n % 10;
		const dd = n % 100;
		if (d === 1 && dd !== 11) return 'строка';
		if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return 'строки';
		return 'строк';
	}

	async function copy() {
		if (await copyText(text)) {
			copied = true;
			setTimeout(() => (copied = false), 1600);
		}
	}

	function toggle() {
		open = !open;
		// After collapsing from far down, bring the card back into view.
		if (!open && card.getBoundingClientRect().top < 0) card.scrollIntoView({ block: 'start' });
	}
</script>

{#snippet copyButton()}
	<button type="button" onclick={copy}>
		<Icon name={copied ? 'check' : 'copy'} size={16} />
		<span aria-live="polite">{copied ? 'Скопировано' : 'Копировать'}</span>
	</button>
{/snippet}

{#snippet toggleButton()}
	<button type="button" aria-expanded={open} aria-controls="{id}-body" onclick={toggle}>
		<span class="chevron" class:up={open}><Icon name="chevron" size={16} /></span>
		<span>{open ? 'Свернуть' : 'Развернуть'}</span>
	</button>
{/snippet}

<article class="prompt" bind:this={card}>
	<header>
		<div class="meta">
			{#if title}<p class="title">{title}</p>{/if}
			<p class="size">{size}</p>
		</div>
		<div class="actions">
			{@render copyButton()}
			{@render toggleButton()}
		</div>
	</header>

	<div class="body" class:open id="{id}-body">
		<pre class="text">{#each head as parts}{#each parts as part}{#if part.startsWith('[')}<mark
							class="slot">{part}</mark
						>{:else}{part}{/if}{/each}{'\n'}{/each}{rest}</pre>
	</div>

	{#if open || when}
		<footer>
			{#if when}<p class="when">{when}</p>{/if}
			{#if open}
				<div class="actions">
					{@render copyButton()}
					{@render toggleButton()}
				</div>
			{/if}
		</footer>
	{/if}
</article>

<style>
	.prompt {
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
		overflow: hidden;
	}

	header,
	footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem 0.75rem;
		padding: 0.5rem 0.6rem 0.5rem 1.1rem;
	}

	header {
		border-bottom: 1px solid var(--line);
	}

	footer {
		border-top: 1px solid var(--line);
	}

	.meta {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		min-width: 0;
	}

	.title {
		margin: 0;
		font-weight: 650;
	}

	.size,
	.when {
		margin: 0;
		color: var(--muted);
		font-size: var(--text-xs);
	}

	.actions {
		display: flex;
		gap: 0.4rem;
		margin-left: auto;
	}

	button {
		display: inline-flex;
		flex: none;
		align-items: center;
		gap: 0.35rem;
		min-height: var(--tap);
		padding: 0 0.8rem;
		border: 1px solid var(--line);
		border-radius: 10px;
		background: var(--sunk);
		color: var(--ink);
		font-size: var(--text-small);
		cursor: pointer;
	}

	button:hover {
		border-color: var(--accent);
	}

	.chevron {
		display: inline-flex;
		transition: transform var(--dur) var(--ease);
	}

	.chevron.up {
		transform: rotate(180deg);
	}

	.body {
		position: relative;
		max-height: 17rem;
		overflow: hidden;
		background: var(--sunk);
	}

	.body.open {
		max-height: none;
	}

	/* Fade the cut-off edge so it reads as "there is more". */
	.body:not(.open)::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 4rem;
		background: linear-gradient(to bottom, transparent, var(--sunk));
		pointer-events: none;
	}

	.text {
		margin: 0;
		padding: 0.9rem 1.1rem;
		border: 0;
		border-radius: 0;
		background: none;
		color: var(--ink);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		line-height: 1.6;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	.slot {
		padding: 0.05rem 0.2rem;
		border-radius: 4px;
		outline: 1px dashed var(--blue);
		background: var(--blue-soft);
		color: var(--blue-ink);
	}

	@media (prefers-reduced-motion: reduce) {
		.chevron {
			transition: none;
		}
	}
</style>
