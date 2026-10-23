<script lang="ts">
	import { page } from '$app/state';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import { href } from '$lib/paths';
</script>

<svelte:head>
	<title>Страница не найдена — Второй мозг</title>
</svelte:head>

<SiteHeader />

<main id="content" class="error">
	<p class="code">{page.status}</p>
	<h1>{page.status === 404 ? 'Такой страницы нет' : 'Что-то сломалось'}</h1>
	<p>Попробуй поиск или начни с <a href={href('/')}>главной</a>.</p>
</main>

<SiteFooter />

<style>
	.error {
		max-width: 44rem;
		margin: 0 auto;
		padding: 4rem var(--gutter) 2rem;
	}

	.code {
		margin: 0;
		color: var(--accent-ink);
		font-family: var(--font-mono);
	}

	h1 {
		margin-top: 0.5rem;
	}

	p {
		color: var(--muted);
	}
</style>
