<!--
  CommitRow: tiny mock of one row in GitHub's commit list for chapter 05 «Как читать историю».
  Commit title on top, author and time below, short hash on the right. Not a screenshot: only the
  three things the reader should find on the real page.
  Props: title, author, when, hash, caption (all optional; defaults match the chapter's example).
-->
<script lang="ts">
	import DiagramFrame from '../DiagramFrame.svelte';

	let {
		title = 'Make focus 50 minutes',
		author = 'твой-логин',
		when = 'committed 2 days ago',
		hash = 'd7bd791',
		caption = 'Так выглядит одна строка в списке коммитов на GitHub: сверху сообщение, под ним автор и время, справа короткий хэш.'
	}: { title?: string; author?: string; when?: string; hash?: string; caption?: string } = $props();
</script>

<DiagramFrame
	label="Строка коммита на GitHub: сообщение «{title}», под ним автор {author}, справа короткий хэш {hash}"
	{caption}
>
	<div class="row">
		<svg viewBox="0 0 320 76" xmlns="http://www.w3.org/2000/svg">
			<rect class="node neutral" x="2" y="2" width="316" height="72" />
			<text class="label" x="18" y="32">{title}</text>
			<circle class="avatar" cx="25" cy="52" r="7" />
			<text class="label small" x="38" y="56">{author} · {when}</text>
			<rect class="node green" x="242" y="24" width="62" height="28" />
			<text class="label small hash" x="273" y="42" text-anchor="middle">{hash}</text>
		</svg>
	</div>
</DiagramFrame>

<style>
	.row {
		max-width: 26rem;
		margin: 0 auto;
	}

	.avatar {
		fill: var(--violet-soft);
		stroke: var(--violet);
		stroke-width: 1.5;
	}

	.hash {
		font-family: var(--font-mono);
	}
</style>
