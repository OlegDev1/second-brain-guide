<!--
  ChatTranscript: a real conversation as bubbles with side notes on why each message works
  (catalog #34). Props: title (optional), children: <Msg> items.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children }: { title?: string; children: Snippet } = $props();
</script>

<figure class="chat">
	{#if title}<figcaption>{title}</figcaption>{/if}
	<ol>{@render children()}</ol>
</figure>

<style>
	.chat {
		margin-inline: 0;
		margin-bottom: 0;
		padding: 1rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--sunk);
	}

	figcaption {
		margin-bottom: 0.75rem;
		font-weight: 650;
	}

	ol {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
