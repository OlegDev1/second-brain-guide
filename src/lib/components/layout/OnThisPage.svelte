<!--
  OnThisPage: the chapter's sections beside the text from 1024 px (catalog #12).
  `##` sections are larger and darker; `###` subsections are indented, smaller and muted.
  Props: headings, active (id of the section on screen).
-->
<script lang="ts">
	import type { Heading } from '$lib/types';

	let { headings, active }: { headings: Heading[]; active?: string } = $props();
</script>

{#if headings.length}
	<nav class="rail" aria-label="На этой странице">
		<p class="label">На этой странице</p>
		<ul>
			{#each headings as heading (heading.id)}
				<li class={{ sub: heading.depth === 3 }}>
					<a href="#{heading.id}" aria-current={heading.id === active ? 'location' : undefined}>
						{heading.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.label {
		margin: 0 0 0.5rem;
		font-size: var(--text-xs);
		font-weight: 650;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--muted);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		border-left: 1px solid var(--line);
	}

	a {
		display: block;
		margin-left: -1px;
		padding: 0.35rem 0 0.35rem 0.85rem;
		border-left: 2px solid transparent;
		color: var(--ink);
		font-size: var(--text-small);
		font-weight: 550;
		line-height: 1.35;
		text-decoration: none;
		transition:
			color var(--dur) var(--ease),
			border-color var(--dur) var(--ease);
	}

	li:not(.sub) + li:not(.sub) a,
	.sub + li:not(.sub) a {
		margin-top: 0.35rem;
	}

	.sub a {
		padding: 0.2rem 0 0.2rem 1.75rem;
		color: var(--muted);
		font-size: var(--text-xs);
		font-weight: 400;
	}

	a:hover {
		color: var(--accent-ink);
	}

	a[aria-current='location'] {
		border-left-color: var(--accent);
		color: var(--accent-ink);
		font-weight: 650;
	}

	.sub a[aria-current='location'] {
		font-weight: 600;
	}
</style>
