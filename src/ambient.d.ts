// Ambient module types for the content pipeline (config/content-index.js, mdsvex).

declare module 'virtual:content-index' {
	const chapters: import('$lib/types').Chapter[];
	export default chapters;
}

declare module '*.md' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
	export const metadata: { headings?: import('$lib/types').Heading[] } & Record<string, unknown>;
}
