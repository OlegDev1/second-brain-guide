<!--
  CommitGraph: static history diagram for chapter 05 (catalog #39). Two commits on main, a
  thread's branch with two commits merged back by PR #3, a bad commit and the revert commit that
  undoes it. Vertical, so it stays readable at 360 px; hashes match the chapter's code blocks.
  Props: caption (optional, replaces the default caption).
-->
<script lang="ts">
	import DiagramFrame from '../DiagramFrame.svelte';
	import type { Tone } from '$lib/types';

	let {
		caption = 'Время идёт сверху вниз. Кружок — коммит, линия ведёт к предыдущему. Ветка потока возвращается в main через PR, а ошибку отменяет новый коммит.'
	}: { caption?: string } = $props();

	const uid = $props.id();

	const LANE = { main: 34, branch: 80 } as const;
	const TEXT_X = 104;
	const WIDTH = 296;
	const TOP = 30;
	const STEP = 58;
	const R = 8;
	const rowY = (row: number) => TOP + row * STEP;

	interface Commit {
		lane: keyof typeof LANE;
		tone: Tone;
		title: string;
		hash: string;
		note?: string;
	}

	const commits: Commit[] = [
		{ lane: 'main', tone: 'green', title: 'Экран Inbox', hash: '5d16eab' },
		{ lane: 'main', tone: 'green', title: 'Таймер фокуса', hash: 'ac97c1d' },
		{ lane: 'branch', tone: 'violet', title: 'Кнопка «Выбери за меня»', hash: '49abc1b', note: 'ветка потока' },
		{ lane: 'branch', tone: 'violet', title: 'Пояснение к кнопке', hash: '61f095e', note: 'ветка потока' },
		{ lane: 'main', tone: 'green', title: 'Мердж PR #3 в main', hash: '2f61c23', note: 'два родителя' },
		{ lane: 'main', tone: 'red', title: 'Фокус 50 минут', hash: 'd7bd791', note: 'ошибка' },
		{ lane: 'main', tone: 'green', title: 'Revert: снова 25 минут', hash: '0e30a8d', note: 'отменяет d7bd791' }
	];

	const last = commits.length - 1;
	const m = LANE.main;
	const b = LANE.branch;
	// The branch leaves main after row 1 and comes back as the merge commit in row 4.
	const branchOut = `M${m} ${rowY(1)} C${m} ${rowY(1) + 34} ${b} ${rowY(2) - 34} ${b} ${rowY(2)}`;
	const branchIn = `M${b} ${rowY(3)} C${b} ${rowY(3) + 34} ${m} ${rowY(4) - 34} ${m} ${rowY(4)}`;
	// Dashed arc from the revert commit back to the commit it undoes.
	const undo = `M${m - R - 2} ${rowY(last) - 2} C${m - 34} ${rowY(last) - 14} ${m - 34} ${rowY(last - 1) + 14} ${m - R - 3} ${rowY(last - 1) + 3}`;
	const pointerY = rowY(last) + 24;
	const height = pointerY + 36;
</script>

<DiagramFrame
	label="История проекта: два коммита в main, ветка потока с двумя коммитами вливается обратно через PR #3, потом ошибочный коммит и revert, который его отменяет. Ветка main указывает на последний коммит."
	{caption}
>
	<div class="graph">
		<svg viewBox="0 0 {WIDTH} {height}" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<marker
					id="commit-arrow-{uid}"
					viewBox="0 0 10 10"
					refX="9"
					refY="5"
					markerWidth="7"
					markerHeight="7"
					orient="auto-start-reverse"
				>
					<path class="arrowhead" d="M0 0 10 5 0 10z" />
				</marker>
			</defs>

			<path class="lane main" d="M{m} {rowY(0)}V{rowY(last)}" />
			<path class="lane branch" d={branchOut} />
			<path class="lane branch" d="M{b} {rowY(2)}V{rowY(3)}" />
			<path class="lane branch" d={branchIn} />
			<path class="arrow dashed" d={undo} marker-end="url(#commit-arrow-{uid})" />

			{#each commits as commit, row (commit.hash)}
				<circle class="node {commit.tone}" cx={LANE[commit.lane]} cy={rowY(row)} r={R} />
				<text class="label" x={TEXT_X} y={rowY(row) - 2}>{commit.title}</text>
				<text class="label small" x={TEXT_X} y={rowY(row) + 15}>
					<tspan class="hash">{commit.hash}</tspan>{#if commit.note}&nbsp;· {commit.note}{/if}
				</text>
			{/each}

			<path class="lane main" d="M{m} {rowY(last) + R}V{pointerY}" />
			<rect class="node green" x={m - 24} y={pointerY} width="48" height="26" />
			<text class="label" x={m} y={pointerY + 18} text-anchor="middle">main</text>
			<text class="label small" x={TEXT_X} y={pointerY + 18}>ветка main указывает сюда</text>
		</svg>
	</div>
</DiagramFrame>

<style>
	.graph {
		max-width: 23rem;
		margin: 0 auto;
	}

	.lane {
		fill: none;
		stroke-width: 2;
	}

	.lane.main {
		stroke: var(--green);
	}

	.lane.branch {
		stroke: var(--violet);
	}

	.hash {
		font-family: var(--font-mono);
	}
</style>
