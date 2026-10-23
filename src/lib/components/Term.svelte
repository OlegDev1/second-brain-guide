<!--
  Term: a marked word; tap shows a one-line definition and a link to the glossary (catalog #25).
  Props: id (entry id in src/lib/glossary.ts), children (the word as it appears in the text;
  defaults to the glossary term).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getTerm } from '$lib/glossary';
	import { href } from '$lib/paths';

	let { id, children }: { id: string; children?: Snippet } = $props();

	const entry = $derived(getTerm(id));
	const uid = $props.id();
	let button: HTMLButtonElement | undefined = $state();
	let pop: HTMLElement | undefined = $state();

	function place(event: Event) {
		if ((event as ToggleEvent).newState !== 'open' || !button || !pop) return;
		const rect = button.getBoundingClientRect();
		const width = Math.min(320, window.innerWidth - 24);
		const left = Math.min(Math.max(12, rect.left + rect.width / 2 - width / 2), window.innerWidth - width - 12);
		pop.style.width = `${width}px`;
		pop.style.left = `${left}px`;
		const below = rect.bottom + 8;
		const height = pop.offsetHeight;
		pop.style.top = below + height > window.innerHeight - 12 ? `${rect.top - height - 8}px` : `${below}px`;
	}
</script>

<!-- No whitespace between the parts: the term sits inside running text. -->
{#if entry}<button bind:this={button} type="button" class="term" popovertarget="{uid}-term"
		>{#if children}{@render children()}{:else}{entry.term}{/if}</button
	><span
		bind:this={pop}
		id="{uid}-term"
		class="pop"
		popover="auto"
		ontoggle={place}
		data-pagefind-ignore
		><strong>{entry.term}</strong><span class="en">{entry.en}</span><span class="def"
			>{entry.short}</span
		><a href={href(`/ref/glossary/#${entry.id}`)}>Все термины</a></span
	>{:else if children}{@render children()}{/if}

<style>
	.term {
		display: inline;
		padding: 0;
		border: 0;
		background: none;
		color: inherit;
		font: inherit;
		text-decoration: underline dotted var(--muted);
		text-decoration-thickness: 1.5px;
		text-underline-offset: 0.22em;
		cursor: help;
	}

	.term:hover {
		text-decoration-color: var(--accent-ink);
	}

	.pop {
		position: fixed;
		inset: auto;
		margin: 0;
		padding: 0.8rem 0.95rem;
		border: 1px solid var(--line-strong);
		border-radius: var(--radius);
		background: var(--surface);
		color: var(--ink);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
		font-size: var(--text-small);
		line-height: 1.5;
	}

	.pop:popover-open {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.en {
		color: var(--muted);
		font-size: var(--text-xs);
	}

	.def {
		margin-top: 0.2rem;
	}

	a {
		margin-top: 0.4rem;
		font-size: var(--text-xs);
	}
</style>
