<!--
  SectionTree: every chapter grouped by Гайд / Advanced / Справочник, beside the text
  from 1024 px (catalog #11). The current chapter unfolds into its sections.
  Props: chapter (current), headings, active (id of the section on screen).
-->
<script lang="ts">
	import { chapterKey, chapterNumber, chapterPath, chaptersOf, SECTIONS } from '$lib/content';
	import { href } from '$lib/paths';
	import { readMarks } from '$lib/progress.svelte';
	import type { Chapter, Heading } from '$lib/types';
	import Icon from './Icon.svelte';

	let { chapter, headings, active }: { chapter: Chapter; headings: Heading[]; active?: string } =
		$props();

	const sections = $derived(headings.filter((h) => h.depth === 2));
</script>

<nav class="tree" aria-label="Все главы">
	{#each SECTIONS as section (section.id)}
		<details open={section.id === chapter.section}>
			<summary>
				<span>{section.label}</span>
				<Icon name="chevron" size={16} />
			</summary>
			<ul>
				{#each chaptersOf(section.id) as item (item.slug)}
					{@const current = item.slug === chapter.slug && item.section === chapter.section}
					<li>
						<a href={href(chapterPath(item))} aria-current={current ? 'page' : undefined}>
							{#if chapterNumber(item)}<span class="num">{chapterNumber(item)}</span>{/if}
							<span class="title">{item.short ?? item.title}</span>
							{#if readMarks.has(chapterKey(item))}
								<span class="read"><Icon name="check" size={14} label="Прочитано" /></span>
							{/if}
						</a>
						{#if current && sections.length}
							<ul class="sections">
								{#each sections as heading (heading.id)}
									<li>
										<a
											href="#{heading.id}"
											aria-current={heading.id === active ? 'location' : undefined}
										>
											{heading.text}
										</a>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</details>
	{/each}
</nav>

<style>
	.tree {
		font-size: var(--text-small);
	}

	details + details {
		margin-top: 0.75rem;
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 2.25rem;
		padding: 0 0.5rem;
		border-radius: 8px;
		font-size: var(--text-xs);
		font-weight: 650;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--muted);
		cursor: pointer;
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary:hover {
		color: var(--ink);
	}

	details[open] summary :global(.icon) {
		transform: rotate(180deg);
	}

	summary :global(.icon) {
		transition: transform var(--dur) var(--ease);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem;
		border-radius: 8px;
		color: var(--muted);
		line-height: 1.35;
		text-decoration: none;
	}

	a:hover {
		background: var(--sunk);
		color: var(--ink);
	}

	a[aria-current='page'] {
		background: var(--accent-soft);
		color: var(--ink);
		font-weight: 600;
	}

	.num {
		flex: none;
		min-width: 1.6rem;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--accent-ink);
	}

	.title {
		flex: 1;
	}

	.read {
		align-self: center;
		color: var(--green);
	}

	.sections {
		margin: 0.25rem 0 0.5rem 1.6rem;
		border-left: 1px solid var(--line);
	}

	.sections a {
		margin-left: -1px;
		padding: 0.3rem 0.5rem 0.3rem 0.75rem;
		border-left: 2px solid transparent;
		border-radius: 0;
		font-size: var(--text-xs);
	}

	.sections a:hover {
		background: none;
	}

	.sections a[aria-current='location'] {
		border-left-color: var(--accent);
		color: var(--ink);
	}
</style>
