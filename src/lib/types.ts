export type SectionId = 'guide' | 'advanced' | 'ref';

export type Level = 'basic' | 'advanced';

export interface Heading {
	depth: 2 | 3;
	text: string;
	id: string;
}

/** One chapter, built from its Markdown frontmatter by config/content-index.js. */
export interface Chapter {
	section: SectionId;
	slug: string;
	title: string;
	/** Short title for the reading bar; falls back to `title`. */
	short?: string;
	/** Spec part that owns the chapter, e.g. "02". */
	part?: string;
	order: number;
	/** Reading time in minutes. */
	time?: number;
	level: Level;
	/** Chapter paths such as "guide/02-project". */
	prereqs: string[];
	updated?: string;
	description?: string;
	/** True while the chapter is a «Глава в работе» stub. */
	stub: boolean;
}

export type Tone = 'blue' | 'violet' | 'amber' | 'green' | 'red' | 'neutral';
