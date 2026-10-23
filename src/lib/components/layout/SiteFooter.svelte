<!--
  SiteFooter: site name and the theme switch. No props.
-->
<script lang="ts">
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<footer class="site-footer">
	<div class="inner">
		<p>Второй мозг с командой агентов Claude</p>
		<ThemeSwitch />
	</div>
</footer>

<style>
	.site-footer {
		margin-top: 4rem;
		border-top: 1px solid var(--line);
	}

	.inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: 72rem;
		margin: 0 auto;
		padding: 1.5rem var(--gutter) calc(1.5rem + env(safe-area-inset-bottom));
	}

	p {
		margin: 0;
		color: var(--muted);
		font-size: var(--text-small);
	}
</style>
