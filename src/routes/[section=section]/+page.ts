import type { EntryGenerator, PageLoad } from './$types';
import { SECTIONS, sectionOf } from '$lib/content';
import type { SectionId } from '$lib/types';

export const entries: EntryGenerator = () => SECTIONS.map((s) => ({ section: s.id }));

export const load: PageLoad = ({ params }) => {
	return { section: sectionOf(params.section as SectionId) };
};
