// Builds the Pagefind search index after `vite build`.
// Written twice: to build/ (what gets deployed) and to SvelteKit's preview output,
// so search also works under `npm run preview`.
import * as pagefind from 'pagefind';

const { index, errors } = await pagefind.createIndex({ forceLanguage: 'ru' });
if (!index) throw new Error(`Pagefind: ${errors.join(', ')}`);

const { page_count, errors: indexErrors } = await index.addDirectory({
	path: 'build',
	// Chapters only; navigation pages carry no data-pagefind-body.
	glob: '{guide,advanced,ref}/*/index.html'
});
if (indexErrors.length) throw new Error(`Pagefind: ${indexErrors.join(', ')}`);

for (const outputPath of ['build/pagefind', '.svelte-kit/output/client/pagefind']) {
	const { errors: writeErrors } = await index.writeFiles({ outputPath });
	if (writeErrors.length) throw new Error(`Pagefind: ${writeErrors.join(', ')}`);
}

console.log(`Pagefind: indexed ${page_count} pages`);
await pagefind.close();
