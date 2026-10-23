<script lang="ts">
	import ChapterShell from '$lib/components/layout/ChapterShell.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const Content = $derived(data.component);
</script>

<svelte:head>
	<title>{data.chapter.title} — Второй мозг</title>
	{#if data.chapter.description}<meta name="description" content={data.chapter.description} />{/if}
</svelte:head>

{#key data.chapter}
	<ChapterShell chapter={data.chapter} headings={data.headings}>
		<Content />
	</ChapterShell>
{/key}
