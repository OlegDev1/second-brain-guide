// Build-time Markdown helpers for mdsvex: heading ids, link rewriting,
// Shiki highlighting and auto-imports of the generic components.
import GithubSlugger from 'github-slugger';
import { createHighlighter } from 'shiki';
import { escapeSvelte } from 'mdsvex';

/** Generic components that chapters can use without an import. */
export const AUTO_IMPORTS = [
	'Accordion',
	'After',
	'Before',
	'BeforeAfter',
	'Callout',
	'Card',
	'ChatTranscript',
	'Checklist',
	'Chip',
	'CodeBlock',
	'CompareTable',
	'Deeper',
	'DiagramFrame',
	'Glossary',
	'LessonHeader',
	'LevelBadge',
	'Msg',
	'PhraseCard',
	'Step',
	'Steps',
	'Tab',
	'Tabs',
	'Takeaways',
	'Term',
	'TLDR'
];

/** Walk a unist tree depth-first; `fn` may return a replacement list for the node. */
function walk(node, fn, parent = null) {
	fn(node, parent);
	if (node.children) for (const child of [...node.children]) walk(child, fn, node);
}

function textOf(node) {
	// Inline components such as <Term id="cache">кэш</Term> are `html` nodes: keep their text, drop the tags.
	if (node.type === 'html') return '';
	if (typeof node.value === 'string') return node.value;
	return (node.children ?? []).map(textOf).join('');
}

const CUSTOM_ID = /\s*(?:\{|&#123;)#([\w-]+)(?:\}|&#125;)\s*$/;

function decodeEntities(text) {
	return text
		.replace(/&#123;/g, '{')
		.replace(/&#125;/g, '}')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
}

/**
 * Gives every `##` and `###` heading an id and stores the list in the
 * frontmatter as `headings` (used by the reading bar, rail and tree).
 * `## Title {#custom-id}` sets a stable Latin id.
 */
export function remarkHeadings() {
	return (tree, file) => {
		const slugger = new GithubSlugger();
		const headings = [];
		walk(tree, (node) => {
			if (node.type !== 'heading' || node.depth < 2 || node.depth > 3) return;
			let text = decodeEntities(textOf(node)).trim();
			let id;
			const match = text.match(CUSTOM_ID);
			if (match) {
				id = match[1];
				text = text.slice(0, match.index).trim();
				const last = [...node.children].reverse().find((c) => typeof c.value === 'string');
				if (last) last.value = last.value.replace(CUSTOM_ID, '');
				slugger.slug(id);
			} else {
				id = slugger.slug(text);
			}
			node.data = node.data ?? {};
			node.data.hProperties = { ...(node.data.hProperties ?? {}), id };
			headings.push({ depth: node.depth, text, id });
		});
		file.data.fm = { ...(file.data.fm ?? {}), headings };
	};
}

/** `/guide/05-git-github#a` → `<base>/guide/05-git-github/#a` (trailingSlash: 'always'). */
export function withBase(base, href) {
	const match = href.match(/^([^?#]*)(.*)$/);
	let path = match[1];
	const rest = match[2];
	if (!/\.[a-z0-9]+$/i.test(path) && !path.endsWith('/')) path += '/';
	return `${base}${path}${rest}`;
}

/** Hand-written `<a href="/…">` in Markdown arrives as a raw node; give it the base path too. */
function withBaseInRawLinks(html, base) {
	return html.replace(/<a\s[^>]*>/g, (tag) =>
		tag.replace(/(\bhref=)(["'])(\/(?!\/)[^"']*)\2/, (_, name, quote, url) => `${name}${quote}${withBase(base, url)}${quote}`)
	);
}

/** Makes root-relative links base-aware and wraps tables so they scroll on a phone. */
export function rehypeSite({ base }) {
	return () => (tree) => {
		walk(tree, (node, parent) => {
			if (node.type === 'raw' && typeof node.value === 'string' && node.value.includes('<a')) {
				node.value = withBaseInRawLinks(node.value, base);
				return;
			}
			if (node.type !== 'element') return;
			if (node.tagName === 'a') {
				const href = node.properties?.href;
				if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
					node.properties.href = withBase(base, href);
				}
			}
			if (node.tagName === 'table' && parent && !parent.properties?.className?.includes?.('table-scroll')) {
				const wrapper = {
					type: 'element',
					tagName: 'div',
					properties: { className: ['table-scroll'], tabIndex: 0, role: 'region', ariaLabel: 'Таблица' },
					children: [node]
				};
				// A keyboard-scrollable region (WCAG 2.1.1); Svelte's a11y rule doesn't know the pattern.
				const ignore = { type: 'raw', value: '<!-- svelte-ignore a11y_no_noninteractive_tabindex -->' };
				parent.children.splice(parent.children.indexOf(node), 1, ignore, wrapper);
			}
		});
	};
}

const LANGS = [
	'bash',
	'shell',
	'powershell',
	'javascript',
	'typescript',
	'json',
	'jsonc',
	'yaml',
	'markdown',
	'svelte',
	'html',
	'css',
	'diff',
	'sql',
	'toml',
	'ini',
	'python'
];

const highlighter = await createHighlighter({
	themes: ['github-dark-default', 'github-light-default'],
	langs: LANGS
});

function attr(value) {
	return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/[{}]/g, '');
}

/** mdsvex highlighter: Shiki at build time, wrapped in <CodeBlock> for the copy button. */
export async function highlight(code, lang, meta) {
	const known = lang && highlighter.getLoadedLanguages().includes(lang);
	const html = highlighter.codeToHtml(code, {
		lang: known ? lang : 'text',
		themes: { dark: 'github-dark-default', light: 'github-light-default' },
		defaultColor: false
	});
	const title = meta?.match(/title="([^"]*)"/)?.[1];
	const props = [lang ? `lang="${attr(lang)}"` : '', title ? `title="${attr(title)}"` : '']
		.filter(Boolean)
		.join(' ');
	return `<CodeBlock ${props}>{@html \`${escapeSvelte(html)}\`}</CodeBlock>`;
}

/**
 * Svelte preprocessor that runs after mdsvex: imports the generic components a
 * chapter uses, and turns mdsvex's `<script context="module">` into `<script module>`.
 */
export function autoImport({ from }) {
	return {
		name: 'auto-import',
		markup({ content, filename }) {
			if (!filename?.endsWith('.md')) return;
			let code = content.replace(/<script context="module">/, '<script module>');
			const used = AUTO_IMPORTS.filter(
				(name) =>
					new RegExp(`<${name}[\\s/>]`).test(code) &&
					!new RegExp(`import[^;]*\\b${name}\\b[^;]*from`).test(code)
			);
			if (used.length) {
				const line = `import { ${used.join(', ')} } from '${from}';`;
				const instance = /<script(?![^>]*\bmodule\b)(?![^>]*context=)[^>]*>/;
				code = instance.test(code)
					? code.replace(instance, (tag) => `${tag}\n\t${line}`)
					: `<script>\n\t${line}\n</script>\n${code}`;
			}
			return { code };
		}
	};
}
