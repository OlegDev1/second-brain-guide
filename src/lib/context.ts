import { getContext, setContext } from 'svelte';
import type { Chapter } from './types';

const CHAPTER = Symbol('chapter');

/** Set by the chapter page so components such as LessonHeader can read the frontmatter. */
export function setChapterContext(get: () => Chapter) {
	setContext(CHAPTER, get);
}

export function getChapterContext(): Chapter | undefined {
	return getContext<(() => Chapter) | undefined>(CHAPTER)?.();
}
