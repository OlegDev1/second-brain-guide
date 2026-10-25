<!--
  PromptFields: the fill-in lines at the top of a prompt, numbered and highlighted the same way
  as in PromptCard, so the reader finds each line in the card and knows what to write there.
  Props: fields: { label, hint, examples? }[] — label exactly as in the prompt ('Stack:'),
  hint says what to write, examples are short sample answers.
-->
<script lang="ts">
	type Field = { label: string; hint: string; examples?: string[] };

	let { fields }: { fields: Field[] } = $props();
</script>

<ol class="fields">
	{#each fields as field, i (field.label)}
		<li>
			<p class="line"><span class="n" aria-hidden="true">{i + 1}</span><code>{field.label}</code></p>
			<p class="hint">{field.hint}</p>
			{#if field.examples?.length}
				<p class="examples">Например: {field.examples.map((e) => `«${e}»`).join(' или ')}</p>
			{/if}
		</li>
	{/each}
</ol>

<style>
	.fields {
		display: grid;
		gap: 0.6rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		margin: 0 !important;
		padding: 0.6rem 0.8rem 0.7rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
	}

	.line {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		margin: 0;
		padding: 0.3rem 0.5rem;
		border-radius: 6px;
		background: var(--blue-soft);
		box-shadow: inset 0 0 0 1px var(--blue);
	}

	/* Same badge as the numbered lines in PromptCard. */
	.n {
		display: inline-grid;
		flex: none;
		place-items: center;
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 5px;
		background: var(--blue);
		color: var(--surface);
		font-size: var(--text-xs);
		font-weight: 700;
	}

	.line code {
		padding: 0;
		border: 0;
		background: none;
		color: var(--blue-ink);
		font-size: var(--text-small);
		font-weight: 650;
	}

	.hint,
	.examples {
		margin: 0.45rem 0 0;
	}

	.examples {
		color: var(--muted);
		font-size: var(--text-small);
	}
</style>
