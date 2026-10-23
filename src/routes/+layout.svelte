<script lang="ts">
	import '../app.css';
	import { onMount, type Snippet } from 'svelte';
	import SearchDialog from '$lib/components/layout/SearchDialog.svelte';
	import { readMarks } from '$lib/progress.svelte';
	import { theme } from '$lib/theme.svelte';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		theme.init();
		readMarks.init();
	});
</script>

<a class="skip" href="#content">К содержанию</a>

{@render children()}

<SearchDialog />

<style>
	.skip {
		position: absolute;
		left: 0.5rem;
		top: -3rem;
		z-index: 50;
		padding: 0.6rem 1rem;
		border-radius: 8px;
		background: var(--accent);
		color: var(--on-accent);
	}

	.skip:focus {
		top: 0.5rem;
	}
</style>
