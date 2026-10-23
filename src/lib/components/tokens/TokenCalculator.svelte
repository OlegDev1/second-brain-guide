<!--
  TokenCalculator: estimates how many tokens a thread reads and what they cost in plain input
  tokens (catalog #36). Total = steps × average context; the cached share is billed at
  readPrice, the rest at writePrice (new content is written to the cache). Model output and
  thinking are not counted. Always labelled «оценка, а не счёт». Used in chapter 09; part 09
  reuses it with other prices or presets.
  Props: steps (starting number of steps, default 400), context (starting average context in
  tokens, default 330 000), cacheShare (starting share of cache reads in %, default 95),
  readPrice (cache read multiplier, default 0.1), writePrice (cache write multiplier,
  default 1.25), presets ({ label, steps, context, cacheShare }[]; [] hides the buttons),
  title (optional).
-->
<script lang="ts">
	import { untrack } from 'svelte';

	interface Preset {
		label: string;
		steps: number;
		context: number;
		cacheShare: number;
	}

	const DEFAULT_PRESETS: Preset[] = [
		{ label: 'Один длинный чат', steps: 400, context: 330_000, cacheShare: 95 },
		{ label: 'Потоки по 80 тыс.', steps: 400, context: 80_000, cacheShare: 95 }
	];

	let {
		steps = 400,
		context = 330_000,
		cacheShare = 95,
		readPrice = 0.1,
		writePrice = 1.25,
		presets = DEFAULT_PRESETS,
		title = 'Калькулятор токенов'
	}: {
		steps?: number;
		context?: number;
		cacheShare?: number;
		readPrice?: number;
		writePrice?: number;
		presets?: Preset[];
		title?: string;
	} = $props();

	const uid = $props.id();

	// The props are starting values; the reader moves local copies.
	let stepsValue = $state(untrack(() => steps));
	let contextValue = $state(untrack(() => context));
	let shareValue = $state(untrack(() => cacheShare));

	const total = $derived(stepsValue * contextValue);
	const cost = $derived(
		total * ((shareValue / 100) * readPrice + (1 - shareValue / 100) * writePrice)
	);
	const ratio = $derived(total ? cost / total : 0);

	const number = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 });
	const price = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 3 });

	function tokens(n: number): string {
		if (n >= 1e9) return `${number.format(n / 1e9)} млрд`;
		if (n >= 1e6) return `${number.format(n / 1e6)} млн`;
		if (n >= 1e3) return `${number.format(n / 1e3)} тыс.`;
		return number.format(n);
	}

	function apply(preset: Preset) {
		stepsValue = preset.steps;
		contextValue = preset.context;
		shareValue = preset.cacheShare;
	}

	function isActive(preset: Preset): boolean {
		return (
			preset.steps === stepsValue &&
			preset.context === contextValue &&
			preset.cacheShare === shareValue
		);
	}
</script>

<section class="calc" aria-labelledby="{uid}-title">
	<header>
		<p class="title" id="{uid}-title">{title}</p>
		<p class="badge">оценка, а не счёт</p>
	</header>

	{#if presets.length}
		<div class="presets" role="group" aria-label="Готовые случаи">
			{#each presets as preset (preset.label)}
				<button type="button" aria-pressed={isActive(preset)} onclick={() => apply(preset)}>
					{preset.label}
				</button>
			{/each}
		</div>
	{/if}

	<div class="fields">
		<div class="field">
			<div class="row">
				<label for="{uid}-steps">Шагов в задаче</label>
				<output for="{uid}-steps">{number.format(stepsValue)}</output>
			</div>
			<input id="{uid}-steps" type="range" min="10" max="2000" step="10" bind:value={stepsValue} />
		</div>
		<div class="field">
			<div class="row">
				<label for="{uid}-context">Средний контекст на шаге</label>
				<output for="{uid}-context">{tokens(contextValue)} токенов</output>
			</div>
			<input
				id="{uid}-context"
				type="range"
				min="10000"
				max="1000000"
				step="10000"
				bind:value={contextValue}
			/>
		</div>
		<div class="field">
			<div class="row">
				<label for="{uid}-share">Доля чтений из кэша</label>
				<output for="{uid}-share">{shareValue}%</output>
			</div>
			<input id="{uid}-share" type="range" min="0" max="100" step="5" bind:value={shareValue} />
		</div>
	</div>

	<dl class="result" aria-live="polite">
		<div>
			<dt>Прочитано токенов</dt>
			<dd>{tokens(total)}</dd>
		</div>
		<div>
			<dt>Цена в обычных токенах</dt>
			<dd class="cost">≈ {tokens(cost)}</dd>
		</div>
		<div>
			<dt>От цены без кэша</dt>
			<dd>{Math.round(ratio * 100)}%</dd>
		</div>
	</dl>

	<div class="bar" aria-hidden="true">
		<span style:transform="scaleX({Math.min(ratio, 1)})"></span>
	</div>

	<p class="note">
		Чтение из кэша ×{price.format(readPrice)}, остальное — запись в кэш ×{price.format(writePrice)}
		от цены обычного ввода. Ответы модели и её рассуждения сюда не входят.
	</p>
</section>

<style>
	.calc {
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--surface);
		overflow: hidden;
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		padding: 0.85rem 1.1rem 0.6rem;
	}

	.title {
		margin: 0;
		font-weight: 650;
	}

	.badge {
		margin: 0;
		padding: 0.1rem 0.6rem;
		border: 1px solid var(--amber);
		border-radius: 999px;
		background: var(--amber-soft);
		color: var(--amber-ink);
		font-size: var(--text-xs);
		font-weight: 600;
	}

	.presets {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0 1.1rem 0.5rem;
	}

	.presets button {
		min-height: var(--tap);
		padding: 0 0.9rem;
		border: 1px solid var(--line-strong);
		border-radius: var(--radius);
		background: var(--sunk);
		font-size: var(--text-small);
		font-weight: 550;
		cursor: pointer;
	}

	.presets button:hover {
		border-color: var(--amber);
	}

	.presets button[aria-pressed='true'] {
		border-color: var(--amber);
		background: var(--amber-soft);
		color: var(--amber-ink);
	}

	.fields {
		display: grid;
		gap: 0.75rem;
		padding: 0.5rem 1.1rem 0.75rem;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0 1rem;
	}

	label {
		font-size: var(--text-small);
	}

	output {
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	input[type='range'] {
		display: block;
		width: 100%;
		min-height: var(--tap);
		margin: 0;
		accent-color: var(--amber);
		cursor: pointer;
	}

	.result {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		gap: 1px;
		margin: 0;
		border-top: 1px solid var(--line);
		background: var(--line);
	}

	.result div {
		padding: 0.75rem 1.1rem;
		background: var(--sunk);
	}

	dt {
		color: var(--muted);
		font-size: var(--text-xs);
	}

	dd {
		margin: 0.15rem 0 0;
		font-size: 1.35rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	dd.cost {
		color: var(--amber-ink);
	}

	.bar {
		height: 6px;
		background: var(--sunk);
	}

	.bar span {
		display: block;
		height: 100%;
		background: var(--amber);
		transform-origin: 0 50%;
		transition: transform var(--dur) var(--ease);
	}

	.note {
		margin: 0;
		padding: 0.6rem 1.1rem 0.85rem;
		color: var(--muted);
		font-size: var(--text-xs);
	}
</style>
