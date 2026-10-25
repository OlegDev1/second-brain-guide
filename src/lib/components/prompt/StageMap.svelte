<!--
  StageMap: a chapter's stages as numbered tiles that link to their sections, so the reader
  sees the whole path before the details. Three columns with arrows when there is room,
  a vertical list on phones.
  Props: stages: { title, where, text, href }[] (href is an in-page anchor such as '#prompt'),
  label (optional: what the list is, read by screen readers).
-->
<script lang="ts">
	type Stage = { title: string; where: string; text: string; href: string };

	let { stages, label = 'Этапы' }: { stages: Stage[]; label?: string } = $props();
</script>

<nav class="map" aria-label={label}>
	<ol>
		{#each stages as stage, i (stage.href)}
			<li>
				<a href={stage.href}>
					<span class="eyebrow">Этап {i + 1} · {stage.where}</span>
					<span class="title">{stage.title}</span>
					<span class="text">{stage.text}</span>
				</a>
			</li>
		{/each}
	</ol>
</nav>

<style>
	.map {
		container-type: inline-size;
	}

	ol {
		display: grid;
		gap: 1.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		position: relative;
		margin: 0 !important;
	}

	/* Arrow between tiles: points down in the list, right in the row. */
	li + li::before {
		content: '';
		position: absolute;
		top: -0.75rem;
		left: 50%;
		width: 0.55rem;
		height: 0.55rem;
		border-right: 2px solid var(--line-strong);
		border-bottom: 2px solid var(--line-strong);
		transform: translate(-50%, -75%) rotate(45deg);
	}

	a {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		height: 100%;
		padding: 0.9rem 1rem 1rem;
		border: 1px solid var(--line);
		border-top: 3px solid var(--green);
		border-radius: var(--radius-lg);
		background: var(--surface);
		color: var(--ink);
		text-decoration: none;
		transition: border-color var(--dur) var(--ease);
	}

	a:hover {
		border-color: var(--accent);
	}

	.eyebrow {
		color: var(--green-ink);
		font-size: var(--text-xs);
		font-weight: 650;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.title {
		font-weight: 650;
	}

	.text {
		color: var(--muted);
		font-size: var(--text-small);
		line-height: 1.5;
	}

	@container (min-width: 36rem) {
		ol {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		li + li::before {
			top: 50%;
			left: -0.75rem;
			transform: translate(-75%, -50%) rotate(-45deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		a {
			transition: none;
		}
	}
</style>
