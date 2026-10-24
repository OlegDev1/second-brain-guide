<!--
  ChapterShell: the chapter page frame. Reading bar on top; from 1024 px the section tree
  on the left and the "on this page" rail on the right, text in the centre (max 44 rem).
  Tracks the section on screen and the reading progress, and marks finished chapters as read.
  Props: chapter, headings, children (the chapter body).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { chapterKey, chapterNumber, neighbours } from '$lib/content';
	import { setChapterContext } from '$lib/context';
	import { readMarks } from '$lib/progress.svelte';
	import type { Chapter, Heading } from '$lib/types';
	import LevelBadge from '../LevelBadge.svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import OnThisPage from './OnThisPage.svelte';
	import PrevNext from './PrevNext.svelte';
	import ReadingBar from './ReadingBar.svelte';
	import SectionTree from './SectionTree.svelte';
	import SiteFooter from './SiteFooter.svelte';
	import StubNotice from './StubNotice.svelte';

	let {
		chapter,
		headings,
		children
	}: { chapter: Chapter; headings: Heading[]; children: Snippet } = $props();

	setChapterContext(() => chapter);

	let article: HTMLElement | undefined = $state();
	let active = $state<string | undefined>();
	let progress = $state(0);

	const number = $derived(chapterNumber(chapter));
	const pager = $derived(neighbours(chapter));

	$effect(() => {
		if (!article) return;
		const key = chapterKey(chapter);
		const stub = chapter.stub;
		const targets = headings
			.map((h) => document.getElementById(h.id))
			.filter((el): el is HTMLElement => el !== null);
		let frame = 0;

		const update = () => {
			frame = 0;
			// A heading reached by an anchor link stops at the scroll padding, so it counts
			// as on screen from there (plus a little slack for rounding).
			const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
			const line = (Number.isNaN(pad) ? 60 : pad) + 8;
			let index = -1;
			for (const [i, el] of targets.entries()) {
				if (el.getBoundingClientRect().top <= line) index = i;
				else break;
			}
			const max = document.documentElement.scrollHeight - window.innerHeight;
			// At the end of the page the last headings cannot reach the top, so a linked one
			// that is visible wins.
			if (max > 0 && window.scrollY >= max - 2 && location.hash) {
				const hashed = targets.findIndex((el) => `#${el.id}` === decodeURIComponent(location.hash));
				if (hashed > index && targets[hashed].getBoundingClientRect().top < window.innerHeight) {
					index = hashed;
				}
			}
			active = targets[index]?.id;
			progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
			// A page that fits on one screen cannot be "scrolled to the end", so it is never marked.
			if (max > 0 && progress > 0.97 && !stub) readMarks.mark(key);
		};

		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		window.addEventListener('hashchange', schedule);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			window.removeEventListener('hashchange', schedule);
		};
	});
</script>

<ReadingBar {chapter} {headings} {active} {progress} />

<div class="layout">
	<aside class="left">
		<div class="sticky">
			<SectionTree {chapter} />
		</div>
	</aside>

	<main id="content" class="main">
		<Breadcrumbs {chapter} />
		<article bind:this={article} data-pagefind-body>
			<header class="head">
				{#if number}
					<p class="eyebrow" data-pagefind-ignore>Глава {number}</p>
				{/if}
				<h1>{chapter.title}</h1>
				{#if !chapter.stub}
					<p class="meta" data-pagefind-ignore>
						{#if chapter.time}<span>{chapter.time} мин чтения</span>{/if}
						<LevelBadge level={chapter.level} />
						{#if chapter.updated}<span>Обновлено {chapter.updated}</span>{/if}
					</p>
				{/if}
			</header>

			{#if chapter.stub}
				<StubNotice {chapter} />
			{/if}

			<div class="prose">
				{@render children()}
			</div>
		</article>
		<PrevNext prev={pager.prev} next={pager.next} />
	</main>

	<aside class="right">
		<div class="sticky">
			<OnThisPage {headings} {active} />
		</div>
	</aside>
</div>

<SiteFooter />

<style>
	.layout {
		max-width: 90rem;
		margin: 0 auto;
		padding: 1.25rem var(--gutter) 0;
	}

	.left,
	.right {
		display: none;
	}

	.main {
		min-width: 0;
		max-width: var(--content-max);
		margin: 0 auto;
	}

	.head {
		margin: 1rem 0 1.75rem;
	}

	.eyebrow {
		margin: 0 0 0.5rem;
		color: var(--accent-ink);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.04em;
	}

	h1 {
		font-size: clamp(1.625rem, 1.2rem + 2vw, 2.25rem);
		line-height: 1.2;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 1rem;
		margin: 0.9rem 0 0;
		color: var(--muted);
		font-size: var(--text-xs);
	}

	.prose {
		margin-top: 1.5rem;
	}

	@media (min-width: 1024px) {
		.layout {
			display: grid;
			grid-template-columns: 12.5rem minmax(0, var(--content-max)) 11rem;
			justify-content: center;
			gap: 2rem;
			padding-top: 1.5rem;
		}

		.left,
		.right {
			display: block;
		}

		.main {
			margin: 0;
		}

		.sticky {
			position: sticky;
			top: calc(var(--bar-h) + 1.5rem);
			max-height: calc(100dvh - var(--bar-h) - 3rem);
			overflow-y: auto;
			overscroll-behavior: contain;
			padding-bottom: 1rem;
		}

		.head {
			margin-top: 1.25rem;
		}
	}

	@media (min-width: 1280px) {
		.layout {
			grid-template-columns: 15rem minmax(0, var(--content-max)) 13rem;
			gap: 3rem;
		}
	}
</style>
