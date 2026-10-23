import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { allChapters, getChapter } from '$lib/content';
import type { Heading } from '$lib/types';
import type { EntryGenerator, PageLoad } from './$types';

const modules = import.meta.glob<{ default: Component; metadata?: { headings?: Heading[] } }>(
	'/src/content/*/*.md'
);

export const entries: EntryGenerator = () =>
	allChapters.map((c) => ({ section: c.section, slug: c.slug }));

export const load: PageLoad = async ({ params }) => {
	const chapter = getChapter(params.section, params.slug);
	const loader = modules[`/src/content/${params.section}/${params.slug}.md`];
	if (!chapter || !loader) error(404, 'Такой главы нет');
	const module = await loader();
	return { chapter, component: module.default, headings: module.metadata?.headings ?? [] };
};
