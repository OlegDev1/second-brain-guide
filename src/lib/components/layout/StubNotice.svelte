<!--
  StubNotice: the «Глава в работе» card on chapters that are not written yet.
  Props: chapter.
-->
<script lang="ts">
	import { sectionOf } from '$lib/content';
	import { href } from '$lib/paths';
	import type { Chapter } from '$lib/types';
	import Icon from './Icon.svelte';

	let { chapter }: { chapter: Chapter } = $props();
</script>

<div class="stub" role="status">
	<span class="icon"><Icon name="clock" size={22} /></span>
	<div>
		<p class="title">Глава в работе</p>
		<p>Эту главу ещё пишут. Ссылки на неё уже работают, а текст появится позже.</p>
		<p>
			<a href={href(`/${chapter.section}/`)}>Все главы раздела «{sectionOf(chapter.section).label}»</a>
		</p>
	</div>
</div>

<style>
	.stub {
		display: flex;
		gap: 0.9rem;
		padding: 1.1rem 1.2rem;
		border: 1px dashed var(--line-strong);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}

	.icon {
		color: var(--amber);
		padding-top: 0.15rem;
	}

	p {
		margin: 0;
		color: var(--muted);
	}

	p + p {
		margin-top: 0.5rem;
	}

	.title {
		color: var(--ink);
		font-weight: 650;
	}
</style>
