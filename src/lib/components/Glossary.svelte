<!--
  Glossary: every entry of src/lib/glossary.ts as an A–Я list with anchors, a letter jump
  row and a link to the chapter that explains each term, for /ref/glossary. No props.
-->
<script lang="ts">
	import { glossary } from '$lib/glossary';
	import { href } from '$lib/paths';

	const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'ru'));

	const letterOf = (term: string) => term[0].toLocaleUpperCase('ru');
	// The letter row links to the first entry of each letter.
	const firsts = new Map<string, string>();
	for (const entry of sorted) {
		const letter = letterOf(entry.term);
		if (!firsts.has(letter)) firsts.set(letter, entry.id);
	}
	const letters = [...firsts.keys()];

	// Chapter pages end with a slash: '/guide/05-git-github#branch' → '/guide/05-git-github/#branch'.
	function chapterHref(path: string): string {
		const [page, hash] = path.split('#');
		return href(page.endsWith('/') ? page : `${page}/`) + (hash ? `#${hash}` : '');
	}
</script>

<nav class="letters" aria-label="Буквы">
	{#each letters as letter (letter)}
		<a href="#{firsts.get(letter)}">{letter}</a>
	{/each}
</nav>

<dl class="glossary">
	{#each sorted as entry (entry.id)}
		<div id={entry.id} class="entry">
			<dt>{entry.term} <span class="en">{entry.en}</span></dt>
			<dd>{entry.short} <a href={chapterHref(entry.chapter)}>Подробнее</a></dd>
		</div>
	{/each}
</dl>

<style>
	.letters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		margin-bottom: 1rem;
	}

	.letters a {
		min-width: 2rem;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--line);
		border-radius: 8px;
		text-align: center;
		text-decoration: none;
	}

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
