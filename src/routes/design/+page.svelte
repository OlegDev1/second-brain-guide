<script lang="ts">
	import {
		Accordion,
		After,
		Before,
		BeforeAfter,
		Callout,
		Card,
		ChatTranscript,
		Checklist,
		Chip,
		CodeBlock,
		Deeper,
		DiagramFrame,
		Glossary,
		LessonHeader,
		LevelBadge,
		Msg,
		PhraseCard,
		Step,
		Steps,
		Tab,
		Tabs,
		Takeaways,
		Term,
		TLDR
	} from '$lib/components';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import Samples from './Samples.md';

	const themes = [
		{ id: 'dark', label: 'Тёмная тема' },
		{ id: 'light', label: 'Светлая тема' }
	] as const;

	const surfaces = ['bg', 'surface', 'sunk', 'line', 'line-strong', 'ink', 'muted', 'accent', 'accent-soft', 'mark'];
	const meanings = [
		{ id: 'blue', text: 'ты, координатор, главная мысль, ссылки' },
		{ id: 'violet', text: 'потоки и агенты' },
		{ id: 'amber', text: 'токены, расходы, проверки, «важно»' },
		{ id: 'green', text: 'готово, ветка main, советы' },
		{ id: 'red', text: 'опасно' }
	];
</script>

<svelte:head>
	<title>Дизайн-система — Второй мозг</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<SiteHeader />

<main id="content" class="design">
	<header class="intro">
		<h1>Дизайн-система</h1>
		<p>
			Все общие компоненты в тёмной и светлой теме. Авторы глав берут только их и токены из
			<code>src/app.css</code>; описание — в <code>docs/COMPONENTS.md</code>.
		</p>
	</header>

	<div class="themes">
		{#each themes as theme (theme.id)}
			<section class="scope" data-theme={theme.id} aria-label={theme.label}>
				<h2 class="scope-title">{theme.label}</h2>
				<div class="prose">
					<h3>Токены</h3>
					<div class="swatches">
						{#each surfaces as token (token)}
							<div class="swatch">
								<span class="chip-color" style:background="var(--{token})"></span>
								<code>--{token}</code>
							</div>
						{/each}
					</div>

					<h3>Цвета со смыслом</h3>
					<ul class="meanings">
						{#each meanings as m (m.id)}
							<li>
								<span
									class="chip-color"
									style:background="var(--{m.id}-soft)"
									style:border-color="var(--{m.id})"
								></span>
								<b style:color="var(--{m.id}-ink)">{m.id}</b>
								<span>{m.text}</span>
							</li>
						{/each}
					</ul>

					<h3>Типографика</h3>
					<p class="type-h1">Заголовок главы</p>
					<p class="type-h2">Раздел говорит главное</p>
					<p>
						Основной текст: Golos Text, 17 px, межстрочный 1,6. <strong>Ключевые числа жирным</strong>,
						<a href="#content">ссылки синим</a>, <code>код и файлы</code> — JetBrains Mono.
						<mark>Выделение</mark> — маркером.
					</p>

					<h3>LessonHeader</h3>
					<LessonHeader
						learn={['Что такое ветка и зачем она нужна', 'Как открыть пул-реквест']}
						time={20}
						level="basic"
						prereqs={['guide/02-project', 'Аккаунт на GitHub']}
					/>

					<h3>TLDR и Takeaways</h3>
					<TLDR><p>Каждая задача живёт в своей ветке. В <code>main</code> она попадает только через PR.</p></TLDR>
					<Takeaways>
						<ul>
							<li>Ветка — подвижный указатель на цепочку коммитов.</li>
							<li>PR — запрос влить ветку в main.</li>
						</ul>
					</Takeaways>

					<h3>Callout</h3>
					<Callout type="tip"><p>Попроси HANDOFF.md до конца сессии.</p></Callout>
					<Callout type="important"><p>Длинная история стоит больше токенов.</p></Callout>
					<Callout type="danger" title="Не делай force push"><p>Он стирает чужие коммиты.</p></Callout>
					<Callout type="note"><p>Лимиты сбрасываются по расписанию.</p></Callout>

					<h3>Deeper</h3>
					<Deeper title="Почему агенты не видят чаты друг друга">
						<p>У каждого потока своё контекстное окно. Общее у них — только репозиторий и память проекта.</p>
					</Deeper>

					<h3>Term</h3>
					<p>
						Каждый <Term id="thread">поток</Term> работает в своей <Term id="branch">ветке</Term> и
						открывает <Term id="pull-request" />.
					</p>

					<h3>Steps</h3>
					<Steps>
						<Step title="Создай ветку" check="в терминале видно имя новой ветки">
							<p>Одна задача — одна ветка.</p>
						</Step>
						<Step title="Сделай коммит" />
						<Step title="Открой PR" check="на GitHub появилась кнопка Merge" />
					</Steps>

					<h3>Tabs</h3>
					<Tabs labels={['macOS', 'Windows']} group="os">
						<Tab><p>Открой «Терминал» через Spotlight.</p></Tab>
						<Tab><p>Открой PowerShell через меню «Пуск».</p></Tab>
					</Tabs>
					<Tabs labels={['macOS', 'Windows']} group="os">
						<Tab><p>Вторая группа переключается вместе с первой.</p></Tab>
						<Tab><p>Выбор запоминается.</p></Tab>
					</Tabs>

					<h3>Accordion</h3>
					<Accordion title="Почему Claude остановился?" group="faq-{theme.id}">
						<p>Скорее всего, закончился лимит.</p>
					</Accordion>
					<Accordion title="Когда сбрасываются лимиты?" group="faq-{theme.id}">
						<p>По расписанию твоего плана.</p>
					</Accordion>

					<h3>CompareTable и CodeBlock</h3>
					<Samples />
					<CodeBlock lang="bash" code="npm run build" />

					<h3>BeforeAfter</h3>
					<BeforeAfter title="Промпт">
						<Before><p>«Сделай приложение для задач».</p></Before>
						<After><p>«Добавь экран Inbox: список, поле ввода сверху, сохранение в localStorage».</p></After>
					</BeforeAfter>

					<h3>PhraseCard</h3>
					<PhraseCard
						title="Передача дел"
						text="Напиши HANDOFF.md: что сделано, что осталось, где риски."
						when="Перед концом длинной сессии"
					/>

					<h3>Checklist</h3>
					<Checklist
						id="design-{theme.id}"
						title="Перед концом сессии"
						items={['HANDOFF.md написан', 'Коммит сделан', 'Push выполнен']}
					/>

					<h3>ChatTranscript</h3>
					<ChatTranscript>
						<Msg from="you" note="Одна задача и понятный результат">
							<p>Добавь кнопку «Выбери за меня» на экран задач.</p>
						</Msg>
						<Msg from="coordinator"><p>Запускаю поток. Он сделает ветку и PR.</p></Msg>
						<Msg from="thread" note="Поток отчитывается коротко"><p>PR открыт, проверки прошли.</p></Msg>
					</ChatTranscript>

					<h3>DiagramFrame</h3>
					<DiagramFrame label="Ты пишешь координатору, он запускает два потока, их работа попадает в main" caption="Вертикальная схема для телефона">
						<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<marker id="arrow-{theme.id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
									<path class="arrowhead" d="M0 0 10 5 0 10z" />
								</marker>
							</defs>
							<rect class="node blue" x="100" y="10" width="120" height="44" />
							<text class="label" x="160" y="37" text-anchor="middle">Ты</text>
							<rect class="node blue" x="80" y="90" width="160" height="44" />
							<text class="label" x="160" y="117" text-anchor="middle">Координатор</text>
							<rect class="node violet" x="20" y="170" width="120" height="44" />
							<text class="label" x="80" y="197" text-anchor="middle">Поток 1</text>
							<rect class="node violet" x="180" y="170" width="120" height="44" />
							<text class="label" x="240" y="197" text-anchor="middle">Поток 2</text>
							<rect class="node green" x="100" y="246" width="120" height="44" />
							<text class="label" x="160" y="273" text-anchor="middle">main</text>
							<path class="arrow" d="M160 54v34" marker-end="url(#arrow-{theme.id})" />
							<path class="arrow" d="M140 134 90 168" marker-end="url(#arrow-{theme.id})" />
							<path class="arrow" d="M180 134l50 34" marker-end="url(#arrow-{theme.id})" />
							<path class="arrow dashed" d="M80 214l50 30" marker-end="url(#arrow-{theme.id})" />
							<path class="arrow dashed" d="M240 214l-50 30" marker-end="url(#arrow-{theme.id})" />
						</svg>
					</DiagramFrame>

					<h3>Card, Chip, LevelBadge</h3>
					<div class="cards">
						<Card title="Inbox" eyebrow="Экран" tone="blue"><p>Всё входящее в одном месте.</p></Card>
						<Card title="Ссылка на главу" href="/guide/05-git-github/" tone="green"><p>Вся карточка кликабельна.</p></Card>
					</div>
					<p class="chips">
						<Chip>нейтральный</Chip>
						<Chip tone="blue">ты</Chip>
						<Chip tone="violet">поток</Chip>
						<Chip tone="amber">токены</Chip>
						<Chip tone="green">main</Chip>
						<Chip tone="red">опасно</Chip>
						<LevelBadge level="basic" />
						<LevelBadge level="advanced" />
					</p>

					<h3>Glossary</h3>
					<Glossary />
				</div>
			</section>
		{/each}
	</div>
</main>

<SiteFooter />

<style>
	.design {
		max-width: 90rem;
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	.intro {
		max-width: 44rem;
		padding: 2.5rem 0 1.5rem;
	}

	.intro p {
		color: var(--muted);
	}

	.themes {
		display: grid;
		gap: 1.5rem;
	}

	.scope {
		min-width: 0;
		padding: 1.25rem var(--gutter) 2rem;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
	}

	.scope-title {
		font-size: 1.125rem;
	}

	.prose :global(h3) {
		margin-top: 2.25rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line);
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: var(--text-small);
		font-weight: 500;
	}

	.swatches {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
		gap: 0.5rem;
	}

	.swatch {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: var(--text-xs);
	}

	.chip-color {
		flex: none;
		width: 1.75rem;
		height: 1.75rem;
		border: 1.5px solid var(--line-strong);
		border-radius: 8px;
	}

	.meanings {
		padding: 0 !important;
		list-style: none;
	}

	.meanings li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: var(--text-small);
	}

	.meanings b {
		min-width: 3.5rem;
	}

	.type-h1 {
		font-family: var(--font-head);
		font-size: 2rem;
		font-weight: 600;
		line-height: 1.2;
	}

	.type-h2 {
		font-family: var(--font-head);
		font-size: 1.375rem;
		font-weight: 600;
	}

	.cards {
		display: grid;
		gap: 0.75rem;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	@media (min-width: 640px) {
		.cards {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 1200px) {
		.themes {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
