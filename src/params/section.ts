import type { ParamMatcher } from '@sveltejs/kit';
import { isSection } from '$lib/content';

export const match = ((param: string) => isSection(param)) satisfies ParamMatcher;
