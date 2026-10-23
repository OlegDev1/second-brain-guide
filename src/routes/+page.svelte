<script lang="ts">
	import ChapterList from '$lib/components/layout/ChapterList.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import { SECTIONS } from '$lib/content';
	import { href } from '$lib/paths';
	import type { SectionId } from '$lib/types';

	let tab = $state<SectionId>('guide');

	function onkeydown(event: KeyboardEvent) {
		const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
		if (!step) return;
		event.preventDefault();
		const i = SECTIONS.findIndex((s) => s.id === tab);
		const next = SECTIONS[(i + step + SECTIONS.length) % SECTIONS.length];
		tab = next.id;
		document.getElementById(`tab-${next.id}`)?.focus();
	}
</script>

<svelte:head>
	<title>Второй мозг с командой агентов Claude</title>
	<meta
		name="description"
		content="Гайд: как собрать своё приложение «второй мозг» с командой агентов Claude и понять, почему метод работает."
	/>
</svelte:head>

<SiteHeader />

<main id="content" class="home">
	<section class="hero">
		<p class="eyebrow">Гайд</p>
		<h1>Второй мозг с&nbsp;командой агентов Claude</h1>
		<p class="lead">
			Как собрать своё приложение «второй мозг» с командой агентов Claude — и понять, почему
			этот метод работает.
		</p>
	</section>

	<section class="hub" aria-label="Разделы гайда">
		<div class="tabs" role="tablist" aria-label="Разделы">
			{#each SECTIONS as section (section.id)}
				<button
					type="button"
					role="tab"
					id="tab-{section.id}"
					aria-selected={tab === section.id}
					aria-controls="panel-{section.id}"
					tabindex={tab === section.id ? 0 : -1}
					onclick={() => (tab = section.id)}
					{onkeydown}
				>
					{section.label}
				</button>
			{/each}
		</div>
		{#each SECTIONS as section (section.id)}
			<div
				role="tabpanel"
				id="panel-{section.id}"
				aria-labelledby="tab-{section.id}"
				hidden={tab !== section.id}
			>
				<div class="panel-head">
					<p>{section.lead}</p>
					<a href={href(`/${section.id}/`)}>Открыть раздел</a>
				</div>
				<ChapterList section={section.id} />
			</div>
		{/each}
	</section>
</main>

<SiteFooter />

<style>
	.home {
		max-width: 72rem;
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	.hero {
		padding: 3rem 0 2rem;
		max-width: 46rem;
	}

	.eyebrow {
		margin: 0 0 0.75rem;
		color: var(--accent-ink);
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h1 {
		font-size: clamp(1.875rem, 1.2rem + 3vw, 3rem);
		line-height: 1.12;
	}

	.lead {
		margin: 1rem 0 0;
		color: var(--muted);
		font-size: 1.125rem;
	}

	.tabs {
		display: flex;
		gap: 0.25rem;
		margin-bottom: 1.25rem;
		padding: 4px;
		border: 1px solid var(--line);
		border-radius: 14px;
		background: var(--sunk);
		overflow-x: auto;
	}

	.tabs button {
		flex: 1 0 auto;
		min-height: var(--tap);
		padding: 0 0.75rem;
		border: 0;
		border-radius: 10px;
		background: none;
		color: var(--muted);
		font-weight: 600;
		cursor: pointer;
	}

	.tabs button:hover {
		color: var(--ink);
	}

	.tabs button[aria-selected='true'] {
		background: var(--surface);
		color: var(--ink);
		box-shadow: 0 0 0 1px var(--line-strong);
	}

	.panel-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		margin-bottom: 1rem;
	}

	.panel-head p {
		margin: 0;
		color: var(--muted);
	}

	@media (min-width: 640px) {
		.tabs {
			width: fit-content;
		}

		.tabs button {
			flex: none;
			padding: 0 1.1rem;
		}
	}

	@media (min-width: 768px) {
		.hero {
			padding: 4.5rem 0 2.5rem;
		}
	}
</style>
