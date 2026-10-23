<!--
  Msg: one message inside <ChatTranscript>.
  Props: from = 'you' | 'claude' | 'coordinator' | 'thread' | 'agent', name (overrides the
  label), note (side note on why it works), children (the message).
  Colours follow meaning: you and the coordinator blue, threads and agents violet.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type From = 'you' | 'claude' | 'coordinator' | 'thread' | 'agent';

	let {
		from = 'you',
		name,
		note,
		children
	}: { from?: From; name?: string; note?: string; children: Snippet } = $props();

	const LABELS: Record<From, string> = {
		you: 'Ты',
		claude: 'Claude',
		coordinator: 'Координатор',
		thread: 'Поток',
		agent: 'Агент'
	};
</script>

<li class={['msg', from, { 'has-note': !!note }]}>
	<div class="bubble">
		<p class="who">{name ?? LABELS[from]}</p>
		<div class="text">{@render children()}</div>
	</div>
	{#if note}<p class="note">{note}</p>{/if}
</li>

<style>
	.msg {
		--tone: var(--line-strong);
		--tone-soft: var(--surface);
		--tone-ink: var(--muted);
		display: grid;
		gap: 0.4rem;
		margin: 0 !important;
	}

	.you,
	.coordinator {
		--tone: var(--blue);
		--tone-soft: var(--blue-soft);
		--tone-ink: var(--blue-ink);
	}

	.thread,
	.agent {
		--tone: var(--violet);
		--tone-soft: var(--violet-soft);
		--tone-ink: var(--violet-ink);
	}

	.bubble {
		max-width: 92%;
		padding: 0.65rem 0.9rem;
		border: 1px solid var(--tone);
		border-radius: 14px 14px 14px 4px;
		background: var(--tone-soft);
	}

	.you .bubble {
		justify-self: end;
		border-radius: 14px 14px 4px 14px;
	}

	.who {
		margin: 0 0 0.2rem;
		color: var(--tone-ink);
		font-size: var(--text-xs);
		font-weight: 700;
	}

	.text {
		font-size: var(--text-small);
	}

	.text :global(p) {
		margin: 0;
	}

	.text :global(> * + *) {
		margin-top: 0.5rem;
	}

	.note {
		margin: 0;
		padding-left: 0.75rem;
		border-left: 2px dashed var(--amber);
		color: var(--muted);
		font-size: var(--text-xs);
		line-height: 1.5;
	}

	.you .note {
		justify-self: end;
		max-width: 92%;
	}

	@media (min-width: 768px) {
		.msg.has-note {
			grid-template-columns: minmax(0, 1fr) 12rem;
			align-items: start;
			column-gap: 1rem;
		}

		.bubble {
			max-width: 100%;
		}

		.you .note {
			justify-self: start;
			max-width: none;
		}

		.note {
			margin-top: 0.4rem;
		}
	}
</style>
