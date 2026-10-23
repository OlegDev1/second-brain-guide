import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { base } from './config/site.js';
import { autoImport, highlight, rehypeSite, remarkHeadings } from './config/markdown.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			smartypants: false,
			remarkPlugins: [remarkHeadings],
			rehypePlugins: [rehypeSite({ base })],
			highlight: { highlighter: highlight }
		}),
		autoImport({ from: '$lib/components' }),
		vitePreprocess()
	],
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html', strict: true }),
		paths: { base },
		prerender: {
			// Chapters may link to anchors in chapters that are still stubs.
			handleMissingId: 'warn'
		}
	}
};

export default config;
