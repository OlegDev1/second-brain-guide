<!--
  PhraseCard: a ready-to-paste phrase with a line on when to use it and a Copy button (catalog #35).
  Props: text (exactly what gets copied), title, when (optional).
-->
<script lang="ts">
	import { copyText } from '$lib/clipboard';
	import Icon from './layout/Icon.svelte';

	let { text, title, when }: { text: string; title?: string; when?: string } = $props();

	let copied = $state(false);

	async function copy() {
		if (await copyText(text)) {
			copied = true;
			setTimeout(() => (copied = false), 1600);
		}
	}
</script>

<article class="phrase">
	{#if title}<p class="title">{title}</p>{/if}
	<blockquote class="text">{text}</blockquote>
	<div class="foot">
		{#if when}<p class="when">{when}</p>{/if}
		<button type="button" onclick={copy}>
			<Icon name={copied ? 'check' : 'copy'} size={16} />
			<span aria-live="polite">{copied ? 'Скопировано' : 'Копировать'}</span>
		</button>
	</div>
</article>

<style>
	.phrase {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 1rem 1.1rem 0.6rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}

	.title {
		margin: 0;
		font-weight: 650;
	}

	.text {
		margin: 0;
		padding: 0.75rem 0.9rem;
		border: 0;
		border-left: 3px solid var(--blue);
		border-radius: 0 8px 8px 0;
		background: var(--blue-soft);
		color: var(--ink);
		white-space: pre-wrap;
	}

	.foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.when {
		margin: 0;
		color: var(--muted);
		font-size: var(--text-small);
	}

	button {
		display: inline-flex;
		flex: none;
		align-items: center;
		gap: 0.35rem;
		margin-left: auto;
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
</style>
