<!--
  Glossary: every entry of src/lib/glossary.ts as an A–Я list with anchors, for /ref/glossary.
  No props.
-->
<script lang="ts">
	import { glossary } from '$lib/glossary';

	const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'ru'));
</script>

<dl class="glossary">
	{#each sorted as entry (entry.id)}
		<div id={entry.id} class="entry">
			<dt>{entry.term} <span class="en">{entry.en}</span></dt>
			<dd>{entry.short}</dd>
		</div>
	{/each}
</dl>

<style>
	.glossary {
		margin: 0;
	}

	.entry {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--line);
		scroll-margin-top: calc(var(--bar-h) + 1rem);
	}

	.entry:target {
		background: var(--accent-soft);
		border-radius: 8px;
		padding-inline: 0.75rem;
	}

	dt {
		font-weight: 650;
	}

	.en {
		margin-left: 0.4rem;
		color: var(--muted);
		font-size: var(--text-xs);
		font-weight: 400;
	}

	dd {
		margin: 0.2rem 0 0;
		color: var(--muted);
	}
</style>
