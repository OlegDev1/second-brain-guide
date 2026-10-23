<!--
  SearchDialog: site-wide search over Pagefind (catalog #15). The index is built after
  `vite build` and loaded only when the dialog first opens. Opens from the search buttons,
  with "/" or Ctrl/Cmd + K. No props; state lives in src/lib/search.svelte.ts.
-->
<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { href } from '$lib/paths';
	import { search } from '$lib/search.svelte';
	import Sheet from './Sheet.svelte';

	interface PagefindResult {
		url: string;
		meta: { title?: string };
		excerpt: string;
		sub_results?: { title: string; url: string; excerpt: string }[];
	}

	interface Pagefind {
		options(options: Record<string, unknown>): Promise<void>;
		init(): Promise<void>;
		debouncedSearch(
			query: string,
			options?: Record<string, unknown>,
			timeout?: number
		): Promise<{ results: { data(): Promise<PagefindResult> }[] } | null>;
	}

	let query = $state('');
	let status = $state<'idle' | 'loading' | 'ready' | 'unavailable'>('idle');
	let results = $state<PagefindResult[]>([]);
	let pagefind: Pagefind | undefined;
	let input: HTMLInputElement | undefined = $state();

	async function load() {
		if (pagefind || status === 'loading' || status === 'unavailable') return;
		status = 'loading';
		try {
			pagefind = (await import(/* @vite-ignore */ href('/pagefind/pagefind.js'))) as Pagefind;
			await pagefind.options({ baseUrl: href('/') });
			await pagefind.init();
			status = 'ready';
			if (query) run(query);
		} catch {
			status = 'unavailable';
		}
	}

	async function run(value: string) {
		if (!pagefind) return;
		const term = value.trim();
		if (!term) {
			results = [];
			return;
		}
		const found = await pagefind.debouncedSearch(term, {}, 150);
		if (!found) return;
		results = await Promise.all(found.results.slice(0, 8).map((r) => r.data()));
	}

	$effect(() => {
		if (search.open) {
			load();
			input?.focus();
		}
	});

	afterNavigate(() => {
		search.open = false;
	});

	function onkeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement | null;
		const typing = target?.closest('input, textarea, select, [contenteditable="true"]');
		if ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			search.open = true;
		} else if (event.key === '/' && !typing && !search.open) {
			event.preventDefault();
			search.open = true;
		}
	}

	/** Pagefind excerpts are escaped text with <mark> around hits; render them without {@html}. */
	function parts(excerpt: string): { text: string; mark: boolean }[] {
		const decode = (html: string) =>
			new DOMParser().parseFromString(html, 'text/html').documentElement.textContent ?? '';
		return excerpt
			.split(/(<mark>.*?<\/mark>)/)
			.filter(Boolean)
			.map((chunk) =>
				chunk.startsWith('<mark>')
					? { text: decode(chunk.slice(6, -7)), mark: true }
					: { text: decode(chunk), mark: false }
			);
	}

	function clean(url: string) {
		return url.replace(/index\.html(?=$|#)/, '').replace(/\.html(?=$|#)/, '/');
	}
</script>

<svelte:window {onkeydown} />

<Sheet bind:open={search.open} title="Поиск" position="top">
	<div class="search">
		<label class="field">
			<span class="visually-hidden">Что найти</span>
			<input
				bind:this={input}
				bind:value={query}
				oninput={() => run(query)}
				type="search"
				placeholder="Например: ветка, токены, ТЗ"
				autocomplete="off"
				spellcheck="false"
			/>
		</label>

		{#if status === 'unavailable'}
			<p class="hint">
				Поиск работает в собранной версии сайта: <code>npm run build</code>, затем
				<code>npm run preview</code>.
			</p>
		{:else if status === 'loading'}
			<p class="hint">Загружаю поиск…</p>
		{:else if query.trim() && !results.length}
			<p class="hint">Ничего не нашлось. Попробуй другое слово.</p>
		{/if}

		{#if results.length}
			<ul class="results" aria-label="Результаты поиска">
				{#each results as result (result.url)}
					<li>
						<a href={clean(result.url)} onclick={() => (search.open = false)}>
							<span class="title">{result.meta.title ?? clean(result.url)}</span>
							<span class="excerpt">
								{#each parts(result.excerpt) as part, i (i)}
									{#if part.mark}<mark>{part.text}</mark>{:else}{part.text}{/if}
								{/each}
							</span>
						</a>
						{#if result.sub_results?.length}
							<ul class="subs">
								{#each result.sub_results.slice(0, 3) as sub (sub.url)}
									{#if sub.title !== result.meta.title}
										<li>
											<a href={clean(sub.url)} onclick={() => (search.open = false)}>
												<span class="title">{sub.title}</span>
											</a>
										</li>
									{/if}
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</Sheet>

<style>
	.search {
		padding: 0.5rem 0.5rem 0;
	}

	.field input {
		width: 100%;
		height: 3rem;
		padding: 0 1rem;
		border: 1px solid var(--line-strong);
		border-radius: 12px;
		background: var(--sunk);
		color: var(--ink);
		font: inherit;
	}

	.field input::placeholder {
		color: var(--muted);
	}

	.field input:focus-visible {
		outline: 2px solid var(--focus);
		outline-offset: 1px;
	}

	.hint {
		margin: 1rem 0.5rem 0.5rem;
		color: var(--muted);
		font-size: var(--text-small);
	}

	.results,
	.subs {
		margin: 0.75rem 0 0;
		padding: 0;
		list-style: none;
	}

	.results > li + li {
		margin-top: 0.25rem;
	}

	.results a {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-height: var(--tap);
		padding: 0.6rem 0.75rem;
		border-radius: 10px;
		color: var(--ink);
		text-decoration: none;
	}

	.results a:hover,
	.results a:focus-visible {
		background: var(--sunk);
	}

	.title {
		font-weight: 600;
	}

	.excerpt {
		color: var(--muted);
		font-size: var(--text-small);
		line-height: 1.45;
	}

	.subs {
		margin: 0 0 0.25rem 1rem;
		border-left: 1px solid var(--line);
	}

	.subs a {
		min-height: 2.5rem;
		justify-content: center;
		font-size: var(--text-small);
	}

	.subs .title {
		font-weight: 500;
		color: var(--muted);
	}
</style>
