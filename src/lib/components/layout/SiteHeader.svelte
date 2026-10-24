<!--
  SiteHeader: top of the home and section pages: site name, the three tabs
  Гайд / Advanced / Справочник (catalog #17) and search.
  Props: current (active section id, optional), themeSwitch = false (the theme switch
  next to search; the home page uses it instead of the one in the footer).
-->
<script lang="ts">
	import { SECTIONS } from '$lib/content';
	import { href } from '$lib/paths';
	import { search } from '$lib/search.svelte';
	import type { SectionId } from '$lib/types';
	import Icon from './Icon.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let { current, themeSwitch = false }: { current?: SectionId; themeSwitch?: boolean } = $props();
</script>

<header class="site">
	<div class={['inner', { 'with-theme': themeSwitch }]}>
		<a class="brand" href={href('/')}>
			<span class="logo" aria-hidden="true">
				<span class="dot blue"></span><span class="dot violet"></span><span class="dot green"></span>
			</span>
			<span>Второй мозг</span>
		</a>
		<nav aria-label="Разделы">
			<ul>
				{#each SECTIONS as section (section.id)}
					<li>
						<a href={href(`/${section.id}/`)} aria-current={current === section.id ? 'page' : undefined}>
							{section.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="tools">
			{#if themeSwitch}
				<span class="theme narrow"><ThemeSwitch cycle /></span>
				<span class="theme wide"><ThemeSwitch compact /></span>
			{/if}
			<button type="button" class="search" onclick={() => (search.open = true)} aria-label="Поиск">
				<Icon name="search" />
				<span class="search-label">Поиск</span>
				<kbd>/</kbd>
			</button>
		</div>
	</div>
</header>

<style>
	.site {
		position: sticky;
		top: 0;
		z-index: 20;
		background: var(--bg);
		border-bottom: 1px solid var(--line);
	}

	.inner {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-areas: 'brand search' 'nav nav';
		align-items: center;
		max-width: 72rem;
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	.brand {
		grid-area: brand;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		min-height: var(--tap);
		color: var(--ink);
		font-family: var(--font-head);
		font-size: 0.9375rem;
		font-weight: 600;
		text-decoration: none;
		white-space: nowrap;
	}

	.logo {
		display: inline-flex;
		gap: 3px;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: 1.5px solid;
	}

	.dot.blue {
		border-color: var(--blue);
		background: var(--blue-soft);
	}
	.dot.violet {
		border-color: var(--violet);
		background: var(--violet-soft);
	}
	.dot.green {
		border-color: var(--green);
		background: var(--green-soft);
	}

	nav {
		grid-area: nav;
		margin: 0 calc(-1 * var(--gutter));
		overflow-x: auto;
	}

	ul {
		display: flex;
		gap: 0.25rem;
		margin: 0;
		padding: 0 var(--gutter);
		list-style: none;
	}

	nav a {
		display: flex;
		align-items: center;
		min-height: var(--tap);
		padding: 0 0.85rem;
		border-bottom: 2px solid transparent;
		color: var(--muted);
		font-weight: 550;
		text-decoration: none;
		white-space: nowrap;
	}

	nav a:hover {
		color: var(--ink);
	}

	nav a[aria-current='page'] {
		color: var(--ink);
		border-bottom-color: var(--accent);
	}

	.tools {
		grid-area: search;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.theme {
		display: flex;
	}

	.theme.wide {
		display: none;
	}

	.search {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-width: var(--tap);
		min-height: var(--tap);
		justify-content: center;
		padding: 0 0.6rem;
		border: 0;
		border-radius: 10px;
		background: none;
		color: var(--ink);
		cursor: pointer;
	}

	.search:hover {
		background: var(--sunk);
	}

	.search-label,
	kbd {
		display: none;
	}

	kbd {
		padding: 0.05rem 0.4rem;
		border: 1px solid var(--line-strong);
		border-radius: 5px;
		color: var(--muted);
		font-size: 0.75rem;
	}

	@media (min-width: 768px) {
		.inner {
			grid-template-columns: auto 1fr auto;
			grid-template-areas: 'brand nav search';
			gap: 1.5rem;
			min-height: 3.5rem;
		}

		.tools {
			gap: 0.5rem;
		}

		nav {
			margin: 0;
		}

		ul {
			padding: 0;
		}

		nav a {
			min-height: 3.5rem;
		}

		.search {
			padding: 0 0.6rem 0 0.75rem;
			border: 1px solid var(--line);
			background: var(--surface);
			min-width: 12rem;
			justify-content: flex-start;
			color: var(--muted);
		}

		.search-label {
			display: inline;
			flex: 1;
			text-align: left;
		}

		kbd {
			display: inline;
		}
	}

	/* Room for the theme button so the section tabs are not clipped on tablets. */
	@media (min-width: 768px) and (max-width: 1023.98px) {
		.with-theme .search {
			min-width: 10rem;
		}
	}

	@media (min-width: 1024px) {
		.theme.narrow {
			display: none;
		}

		.theme.wide {
			display: flex;
		}
	}
</style>
