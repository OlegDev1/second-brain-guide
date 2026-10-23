<script lang="ts">
	import ChapterList from '$lib/components/layout/ChapterList.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.section.label} — Второй мозг</title>
	<meta name="description" content={data.section.lead} />
</svelte:head>

<SiteHeader current={data.section.id} />

<main id="content" class="section">
	<header>
		<h1>{data.section.label}</h1>
		<p>{data.section.lead}</p>
	</header>
	<ChapterList section={data.section.id} />
</main>

<SiteFooter />

<style>
	.section {
		max-width: 72rem;
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	header {
		padding: 2.5rem 0 1.5rem;
	}

	h1 {
		font-size: clamp(1.75rem, 1.3rem + 2vw, 2.5rem);
	}

	p {
		margin: 0.75rem 0 0;
		color: var(--muted);
	}
</style>
