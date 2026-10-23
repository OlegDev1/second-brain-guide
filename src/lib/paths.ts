import { resolve } from '$app/paths';

/** Prefixes a root-relative path with the base path (GitHub Pages serves the site under /<repo>). */
export function href(path: string): string {
	return (resolve as (path: string) => string)(path);
}
