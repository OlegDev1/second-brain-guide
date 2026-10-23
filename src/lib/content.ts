import chapters from 'virtual:content-index';
import type { Chapter, SectionId } from './types';

export interface Section {
	id: SectionId;
	label: string;
	lead: string;
}

export const SECTIONS: Section[] = [
	{ id: 'guide', label: 'Гайд', lead: 'Основной путь: от первой идеи до своего приложения.' },
	{ id: 'advanced', label: 'Advanced', lead: 'Глубже и плотнее: для тех, кто уже пишет код.' },
	{ id: 'ref', label: 'Справочник', lead: 'Фразы, термины, чек-листы и решения проблем.' }
];

export const allChapters: Chapter[] = chapters;

export function isSection(value: string): value is SectionId {
	return SECTIONS.some((s) => s.id === value);
}

export function sectionOf(id: SectionId): Section {
	return SECTIONS.find((s) => s.id === id)!;
}

export function chaptersOf(section: SectionId): Chapter[] {
	return allChapters.filter((c) => c.section === section);
}

export function getChapter(section: string, slug: string): Chapter | undefined {
	return allChapters.find((c) => c.section === section && c.slug === slug);
}

/** "guide/02-project" → chapter, if it exists. */
export function chapterByPath(path: string): Chapter | undefined {
	const [section, slug] = path.replace(/^\/+|\/+$/g, '').split('/');
	return getChapter(section, slug);
}

/** Previous and next chapter inside the same section. */
export function neighbours(chapter: Chapter): { prev?: Chapter; next?: Chapter } {
	const list = chaptersOf(chapter.section);
	const i = list.findIndex((c) => c.slug === chapter.slug);
	return { prev: list[i - 1], next: list[i + 1] };
}

/** "05-git-github" → "05", "a1-local-first" → "A1", reference pages → "". */
export function chapterNumber(chapter: Chapter): string {
	if (chapter.section === 'ref') return '';
	const match = chapter.slug.match(/^([a-z]?\d+)-/i);
	return match ? match[1].toUpperCase() : '';
}

export function chapterPath(chapter: Chapter): string {
	return `/${chapter.section}/${chapter.slug}/`;
}

export function chapterKey(chapter: Chapter): string {
	return `${chapter.section}/${chapter.slug}`;
}

export function shortTitle(chapter: Chapter): string {
	return chapter.short ?? chapter.title;
}
