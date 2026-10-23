<!--
  Breadcrumbs: Главная › section › chapter. Shown under the reading bar from 768 px;
  on a phone the reading bar carries the same path.
  Props: chapter.
-->
<script lang="ts">
	import { chapterNumber, sectionOf } from '$lib/content';
	import { href } from '$lib/paths';
	import type { Chapter } from '$lib/types';

	let { chapter }: { chapter: Chapter } = $props();
	const number = $derived(chapterNumber(chapter));
</script>

<nav class="crumbs" aria-label="Путь по сайту">
	<ol>
		<li><a href={href('/')}>Главная</a></li>
		<li><a href={href(`/${chapter.section}/`)}>{sectionOf(chapter.section).label}</a></li>
		<li aria-current="page">{number ? `${number}. ` : ''}{chapter.title}</li>
	</ol>
</nav>

<style>
	.crumbs {
		display: none;
		font-size: var(--text-xs);
		color: var(--muted);
	}

	ol {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li + li::before {
		content: '›';
		margin-right: 0.25rem;
		color: var(--line-strong);
	}

	a {
		color: var(--muted);
		text-decoration: none;
	}

	a:hover {
		color: var(--ink);
		text-decoration: underline;
	}

	@media (min-width: 768px) {
		.crumbs {
			display: block;
		}
	}
</style>
