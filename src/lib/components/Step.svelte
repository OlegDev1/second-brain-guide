<!--
  Step: one action inside <Steps>. Props: title, check ("you should see…" line, optional), children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './layout/Icon.svelte';

	let { title, check, children }: { title: string; check?: string; children?: Snippet } = $props();
</script>

<li class="step">
	<p class="title">{title}</p>
	{#if children}<div class="body">{@render children()}</div>{/if}
	{#if check}
		<p class="check"><Icon name="check" size={16} /><span><b>Должно получиться:</b> {check}</span></p>
	{/if}
</li>

<style>
	.step {
		position: relative;
		counter-increment: step;
		padding: 0 0 1.5rem 2.75rem;
		margin: 0 !important;
	}

	.step::before {
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0;
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border: 1.5px solid var(--blue);
		border-radius: 50%;
		background: var(--blue-soft);
		color: var(--blue-ink);
		font-size: var(--text-small);
		font-weight: 700;
	}

	.step::after {
		content: '';
		position: absolute;
		left: calc(1rem - 1px);
		top: 2.25rem;
		bottom: 0.25rem;
		width: 2px;
		background: var(--line);
	}

	.step:last-child {
		padding-bottom: 0;
	}

	.step:last-child::after {
		display: none;
	}

	.title {
		margin: 0;
		padding-top: 0.15rem;
		font-weight: 650;
	}

	.body {
		margin-top: 0.4rem;
	}

	.body :global(> * + *) {
		margin-top: 0.6rem;
	}

	.body :global(p) {
		margin: 0;
	}

	.check {
		display: flex;
		gap: 0.45rem;
		margin: 0.6rem 0 0;
		padding: 0.45rem 0.7rem;
		border-radius: 8px;
		background: var(--green-soft);
		color: var(--ink);
		font-size: var(--text-small);
	}

	.check :global(.icon) {
		margin-top: 0.2rem;
		color: var(--green);
	}

	.check b {
		color: var(--green-ink);
		font-weight: 650;
	}
</style>
