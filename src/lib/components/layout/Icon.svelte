<!--
  Icon: small stroke icons used by the site chrome and components.
  Props: name (see PATHS), size = 20 (px), label (omit for decorative icons).
-->
<script lang="ts" module>
	const PATHS = {
		search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4.35-4.35',
		chevron: 'm6 9 6 6 6-6',
		'arrow-left': 'M19 12H5m6-6-6 6 6 6',
		'arrow-right': 'M5 12h14m-6-6 6 6-6 6',
		close: 'M6 6l12 12M18 6 6 18',
		check: 'm5 12 5 5 9-10',
		copy: 'M9 9h10v11H9zM5 15V4h11',
		sun: 'M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14-1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
		moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z',
		monitor: 'M3 5h18v11H3zm5 15h8m-4-4v4',
		list: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',
		home: 'm3 11 9-7 9 7m-15-1v10h12V10',
		clock: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
		info: 'M12 11v6m0-10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
		alert: 'M12 9v4m0 4h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
		bulb: 'M9 18h6m-5 3h4m-2-18a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
		flag: 'M5 21V4m0 0h12l-2 4 2 4H5'
	} as const;

	export type IconName = keyof typeof PATHS;
</script>

<script lang="ts">
	let { name, size = 20, label }: { name: IconName; size?: number; label?: string } = $props();
</script>

<svg
	class="icon"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.8"
	stroke-linecap="round"
	stroke-linejoin="round"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
>
	<path d={PATHS[name]} />
</svg>

<style>
	.icon {
		flex: none;
		display: block;
	}
</style>
