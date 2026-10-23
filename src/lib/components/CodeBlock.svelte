<!--
  CodeBlock: code with a title bar and a Copy button. Every fenced Markdown block is wrapped
  in it automatically (Shiki highlighting at build time); use it directly only for a title:
  ```bash title="setup.sh"  — or with the `code` prop outside Markdown.
  Props: lang, title, code (plain text, used when there are no children), children.
-->
<script lang="ts">
	import { getContext, setContext, type Snippet } from 'svelte';
	import { copyText } from '$lib/clipboard';
	import Icon from './layout/Icon.svelte';

	let {
		lang = '',
		title = '',
		code,
		children
	}: { lang?: string; title?: string; code?: string; children?: Snippet } = $props();

	const LANG_NAMES: Record<string, string> = {
		bash: 'Терминал',
		shell: 'Терминал',
		sh: 'Терминал',
		powershell: 'PowerShell',
		md: 'Markdown',
		markdown: 'Markdown',
		js: 'JavaScript',
		javascript: 'JavaScript',
		ts: 'TypeScript',
		typescript: 'TypeScript',
		json: 'JSON',
		yaml: 'YAML',
		svelte: 'Svelte',
		html: 'HTML',
		css: 'CSS',
		diff: 'Изменения',
		text: 'Текст'
	};

	// A fenced block inside <CodeBlock title="…"> is wrapped again by the highlighter:
	// the inner one renders only the code and the outer one keeps the title bar.
	const NESTED = 'code-block';
	const nested = getContext<boolean>(NESTED) ?? false;
	setContext(NESTED, true);

	let body: HTMLElement | undefined = $state();
	let copied = $state(false);
	const label = $derived(title || LANG_NAMES[lang] || lang || 'Код');

	async function copy() {
		const text = code ?? body?.querySelector('pre')?.textContent ?? body?.textContent ?? '';
		if (await copyText(text.replace(/\n$/, ''))) {
			copied = true;
			setTimeout(() => (copied = false), 1600);
		}
	}
</script>

{#if nested}
	{@render children?.()}
{:else}
	<figure class="code">
		<figcaption>
			<span class={["label", { file: !!title }]}>{label}</span>
			<button type="button" class="copy" onclick={copy}>
				<Icon name={copied ? 'check' : 'copy'} size={16} />
				<span aria-live="polite">{copied ? 'Скопировано' : 'Копировать'}</span>
			</button>
		</figcaption>
		<div class="body" bind:this={body}>
			{#if children}
				{@render children()}
			{:else if code !== undefined}
				<pre class="shiki plain"><code>{code}</code></pre>
			{/if}
		</div>
	</figure>
{/if}

<style>
	.code {
		margin-inline: 0;
		margin-bottom: 0;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--sunk);
		overflow: hidden;
	}

	figcaption {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding-left: 0.9rem;
		border-bottom: 1px solid var(--line);
		background: var(--surface);
	}

	.label {
		overflow: hidden;
		color: var(--muted);
		font-size: var(--text-xs);
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.label.file {
		color: var(--ink);
		font-family: var(--font-mono);
	}

	.copy {
		display: inline-flex;
		flex: none;
		align-items: center;
		gap: 0.35rem;
		min-height: var(--tap);
		padding: 0 0.8rem;
		border: 0;
		background: none;
		color: var(--muted);
		font-size: var(--text-xs);
		cursor: pointer;
	}

	.copy:hover {
		color: var(--ink);
	}

	.body :global(pre) {
		border-radius: 0;
	}

	.plain {
		color: var(--ink);
		white-space: pre;
	}
</style>
