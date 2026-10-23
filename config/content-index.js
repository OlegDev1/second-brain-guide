// Vite plugin: `virtual:content-index` exports the frontmatter of every chapter
// in src/content/{guide,advanced,ref}/*.md, so navigation never loads chapter bodies.
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse } from 'yaml';

const ID = 'virtual:content-index';
const RESOLVED = '\0' + ID;
const SECTIONS = ['guide', 'advanced', 'ref'];
const LEVELS = ['basic', 'advanced'];

function read(root) {
	const chapters = [];
	for (const section of SECTIONS) {
		const dir = join(root, section);
		let files = [];
		try {
			files = readdirSync(dir).filter((f) => f.endsWith('.md'));
		} catch {
			continue;
		}
		for (const file of files) {
			const path = join(dir, file);
			const source = readFileSync(path, 'utf8');
			const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
			if (!match) throw new Error(`${path}: missing frontmatter`);
			const fm = parse(match[1]) ?? {};
			const slug = file.replace(/\.md$/, '');
			if (fm.slug && fm.slug !== slug) throw new Error(`${path}: slug "${fm.slug}" must match the file name`);
			if (!fm.title) throw new Error(`${path}: frontmatter needs a title`);
			if (typeof fm.order !== 'number') throw new Error(`${path}: frontmatter needs a numeric order`);
			if (fm.level && !LEVELS.includes(fm.level)) throw new Error(`${path}: level must be basic or advanced`);
			chapters.push({
				section,
				slug,
				title: String(fm.title),
				short: fm.short ? String(fm.short) : undefined,
				part: fm.part != null ? String(fm.part) : undefined,
				order: fm.order,
				time: typeof fm.time === 'number' ? fm.time : undefined,
				level: fm.level ?? (section === 'advanced' ? 'advanced' : 'basic'),
				prereqs: Array.isArray(fm.prereqs) ? fm.prereqs.map(String) : [],
				updated: fm.updated ? String(fm.updated) : undefined,
				description: fm.description ? String(fm.description) : undefined,
				stub: fm.stub === true
			});
		}
	}
	return chapters.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export function contentIndex() {
	let root;
	return {
		name: 'content-index',
		configResolved(config) {
			root = resolve(config.root, 'src/content');
		},
		resolveId(id) {
			if (id === ID) return RESOLVED;
		},
		load(id) {
			if (id !== RESOLVED) return;
			return `export default ${JSON.stringify(read(root))};`;
		},
		configureServer(server) {
			const reload = (file) => {
				if (!file.startsWith(root) || !file.endsWith('.md')) return;
				const mod = server.moduleGraph.getModuleById(RESOLVED);
				if (mod) server.moduleGraph.invalidateModule(mod);
				server.ws.send({ type: 'full-reload' });
			};
			server.watcher.on('add', reload);
			server.watcher.on('unlink', reload);
			server.watcher.on('change', reload);
		}
	};
}
