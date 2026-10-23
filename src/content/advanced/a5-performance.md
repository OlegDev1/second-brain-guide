---
title: Производительность в глубину
short: Производительность
part: "08"
order: 4
slug: a5-performance
time: 20
level: advanced
prereqs: [guide/10-stack-speed]
updated: 2026-10-23
description: Руны без лишних пересчётов, разбор бандла, быстрые запросы к IndexedDB, поиск в воркере, длинные списки, анимации и замер на настоящем Android.
---

<LessonHeader
	learn={[
		'Где в Svelte 5 считать: $derived против $effect',
		'Как разобрать бандл на Vite 8 и что вынести в ленивый import()',
		'Как держать IndexedDB быстрой: индексы, пачки, страницы',
		'Как унести поиск в воркер и не грузить главный поток',
		'Как рисовать длинные списки и анимации без рывков',
		'Как мерить Web Vitals прямо в приложении на телефоне'
	]}
/>

<TLDR>

Считай в `$derived`, а `$effect` оставь для связи с внешним миром. Ищи вес в бандле визуализатором и выноси тяжёлое в `import()`. Читай IndexedDB по индексам и страницами, пиши пачками, поиск держи в воркере, а скорость мерь на своём Android через `web-vitals`.

</TLDR>

<Callout type="note" title="Для кого эта глава">

Для автора: ты пишешь на JavaScript и хочешь понимать, почему приложение тормозит. Основы — цели скорости, воркеры, виртуальные списки и `chrome://inspect` — в [«Стек и скорость»](/guide/10-stack-speed). Здесь — что внутри и какой код писать.

</Callout>

## Руны: считать в $derived {#runes}

`$state` делает из массива или объекта глубокий прокси: Svelte следит за каждым полем на любой глубине. Для 5 000 задач из Dexie это лишняя работа, если список всё равно заменяют целиком. Для таких данных есть `$state.raw`: его нельзя менять по месту, только присвоить заново.

`$derived` — значение, которое вычисляется из других. Svelte сам находит зависимости, а при их изменении помечает значение устаревшим и пересчитывает при следующем чтении. Если никто не читает, ничего не считается.

```svelte title="src/routes/today/+page.svelte"
<script lang="ts">
	import type { Item } from '$lib/items/types';

	let items = $state.raw<Item[]>([]); // заменяем целиком после запроса к базе
	let filter = $state<'all' | 'inbox'>('all');

	const visible = $derived(filter === 'all' ? items : items.filter((i) => i.status === 'inbox'));
	const overdue = $derived.by(() => {
		const now = new Date().toISOString();
		return visible.filter((i) => i.dueAt && i.dueAt < now).length;
	});
</script>
```

`$derived(выражение)` равен `$derived.by(() => выражение)`. Вторая форма нужна, когда вычисление не помещается в одно выражение.

### Ошибка: $effect вместо $derived {#effect-vs-derived}

Классическая ошибка пришла из старого Svelte и React: завести переменную и обновлять её в эффекте. Документация Svelte называет `$effect` «аварийным выходом» и прямо пишет, что в эффектах не стоит обновлять состояние.

<BeforeAfter title="Счётчик просроченных задач">
<Before>

```svelte
<script lang="ts">
	let overdue = $state(0);
	$effect(() => {
		overdue = items.filter((i) => i.dueAt && i.dueAt < now).length;
	});
</script>
```

</Before>
<After>

```svelte
<script lang="ts">
	const overdue = $derived(items.filter((i) => i.dueAt && i.dueAt < now).length);
</script>
```

</After>
</BeforeAfter>

У первой версии три проблемы. Эффект запускается после обновления DOM, поэтому один кадр экран показывает старое число. Запись в состояние внутри эффекта запускает ещё один проход обновления. А если эффект читает то, что сам пишет, получается цикл.

`$effect` нужен для внешнего мира: подписаться на `liveQuery`, нарисовать график в `canvas`, повесить слушатель. Эффекты работают только в браузере и не запускаются на сервере.

<Deeper title="А если значение надо иногда переписать руками">

С Svelte 5.25 значение `$derived` можно временно переопределить присваиванием. Это удобно для оптимистичного интерфейса: галочка «выполнено» ставится сразу, а при следующем пересчёте значение снова берётся из источника.

Если запись в эффекте всё-таки неизбежна и появился цикл, оберни чтение в `untrack`. Это последнее средство: чаще всего код просто просится в `$derived`. Для редких случаев, когда код должен сработать до обновления DOM, есть `$effect.pre`.

</Deeper>

## Бандл: сначала измерь {#bundle}

SvelteKit сам делит код по страницам: браузер грузит только код текущего экрана. Но статический `import` тянет модуль в бандл страницы, даже если он нужен раз в неделю. Найти такие модули помогает визуализатор бандла.

Vite 8 собирает проект через Rolldown — один бандлер на Rust вместо прежней пары esbuild и Rollup. Большинство плагинов Vite работают без изменений. Документация SvelteKit советует `rollup-plugin-visualizer`; его версия 7.1.1 рисует карту бандла на Vite 8.3.5 этого сайта.

```js title="vite.config.js"
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
	plugins: [sveltekit(), visualizer({ filename: 'stats.html', template: 'treemap', gzipSize: true })]
});
```

```bash
npm i -D rollup-plugin-visualizer
# плагин записан в devDependencies
npm run build
# в корне проекта появился stats.html
```

Плагину нужен Node.js 22 или новее. Открой `stats.html` и ищи крупные прямоугольники: библиотеку графиков, полный набор иконок, локали дат. У Rolldown есть и встроенный анализатор `bundleAnalyzerPlugin`, но он пока экспериментальный и выдаёт отчёт в JSON или Markdown, без карты.

### Тяжёлое — в import() {#lazy-import}

График в аналитике нужен только на экране аналитики, и даже там — не в первую секунду. Динамический `import()` выносит его в отдельный чанк, который скачивается при первом показе.

```svelte title="src/routes/analytics/+page.svelte"
{#await import('$lib/analytics/WeekChart.svelte') then { default: WeekChart }}
	<WeekChart {days} />
{/await}
```

Чтобы переход на экран казался мгновенным, SvelteKit умеет заранее скачать код по ссылке. Атрибут `data-sveltekit-preload-code` принимает `eager`, `viewport`, `hover` или `tap`; `data-sveltekit-preload-data` — `hover` или `tap`. На телефоне нет наведения, поэтому для нижнего меню подходит `viewport`: код экранов качается, как только ссылки видны.

## IndexedDB: индексы и пачки {#indexeddb}

Медленная база почти всегда значит одно из трёх: запрос без индекса, запись по одной или загрузка всего сразу. Все три лечатся в Dexie парой строк.

**Индексы** объявляют в схеме строкой. Первое поле — первичный ключ, дальше индексы: `&` — уникальный, `*` — по каждому элементу массива, `[a+b]` — составной.

```ts title="src/lib/db.ts"
import Dexie, { type EntityTable } from 'dexie';
import type { Item } from '$lib/items/types';

export const db = new Dexie('second-brain') as Dexie & { items: EntityTable<Item, 'id'> };

db.version(3).stores({
	// id — строка (UUID), поэтому без ++
	items: 'id, type, status, dueAt, updatedAt, *tags, [type+status], [status+dueAt]'
});
```

Составной индекс `[status+dueAt]` отвечает на главный вопрос экрана Today — «активные задачи по сроку» — без перебора всей таблицы. `*tags` находит все записи с тегом «семья» одним запросом.

**Пачки.** Документация Dexie пишет, что `bulkPut()` быстрее, чем `put()` в цикле: ждать подтверждения нужно только для последней записи. Про `bulkAdd()` она скромнее: «немного быстрее». Импорт из Todoist или восстановление бэкапа пиши одной пачкой в одной транзакции.

```ts title="src/lib/items/import.ts"
await db.transaction('rw', db.items, async () => {
	await db.items.bulkPut(parsed); // никаких fetch внутри: транзакция закроется
});
```

<Callout type="important" title="«Внутри транзакции можно подождать сеть»">

Нельзя. IndexedDB закрывает транзакцию, как только в ней ничего не происходит в течение одного тика. Если ждать внутри `fetch` или таймер, Dexie бросит `TransactionInactiveError`. Сначала получи данные, потом открой транзакцию и запиши.

</Callout>

**Не грузи всё на старте.** Экрану Today нужны десятки записей, а не пять тысяч. Бери страницу по индексу и продолжай с последнего ключа. `offset()` для этого не годится: Dexie сама предупреждает, что он плохо подходит для страниц, потому что каждый раз проходит пропущенные записи.

```ts title="src/lib/items/queries.ts"
export function activePage(afterDueAt = '', limit = 50) {
	return db.items
		.where('[status+dueAt]')
		.between(['active', afterDueAt], ['active', Dexie.maxKey], false, true)
		.limit(limit)
		.toArray();
}
```

`liveQuery()` превращает запрос в наблюдаемое значение, и Svelte читает его как стор через `$`. Запрос перезапускается, когда завершённая запись меняет его результат. Значит, экран обновится сам, без ручных подписок в `$effect`.

### SQLite в воркере {#sqlite-worker}

Если выбрал SQLite WASM, а не Dexie, вся работа с базой живёт в воркере. Быстрый синхронный доступ к файлам в OPFS (`FileSystemSyncAccessHandle`) есть только в выделенных воркерах (dedicated worker). Главный поток шлёт запросы сообщениями и получает строки ответом. Какой движок выбрать и чем они платят за скорость, — в [«Local-first»](/advanced/a1-local-first#storage).

## Поиск и аналитика в воркере {#search-worker}

Длинная задача (long task) — работа, которая занимает главный поток на 50 мс и дольше. Всё это время экран не отвечает на касания. Построение индекса поиска по 5 000 заметок или подсчёт серий привычек за год легко превращаются в такие задачи.

Для полнотекстового поиска есть две проверенные библиотеки:

- **MiniSearch** — маленькая, без зависимостей, держит индекс в памяти: префиксы, нечёткий поиск, подсказки и вес полей;
- **FlexSearch** — для больших объёмов: умеет воркеры сама и хранит индекс в IndexedDB между запусками.

Для второго мозга хватит MiniSearch в своём воркере. Общаться с воркером удобно через **Comlink**: библиотека на 1,1 КБ превращает `postMessage` в обычный вызов функции.

```ts title="src/lib/search/search.worker.ts"
import * as Comlink from 'comlink';
import MiniSearch from 'minisearch';
import type { Item } from '$lib/items/types';

const index = new MiniSearch<Item>({ fields: ['title', 'body', 'tags'], storeFields: ['title', 'type'] });

export const api = {
	load: (items: Item[]) => index.addAll(items),
	search: (q: string) => index.search(q, { prefix: true, fuzzy: 0.2 }).slice(0, 20)
};

Comlink.expose(api);
```

```ts title="src/lib/search/client.ts"
import * as Comlink from 'comlink';

const worker = new Worker(new URL('./search.worker.ts', import.meta.url), { type: 'module' });
export const search = Comlink.wrap<typeof import('./search.worker').api>(worker);
```

Главный поток вызывает `await search.search('мама')` как обычную функцию, а индекс строится и ищет в фоне. Воркер может и сам читать записи из IndexedDB: база доступна в воркерах, гонять пять тысяч записей через `postMessage` не обязательно.

<Deeper title="А если работу не унести в воркер">

Тогда режь её на куски и отдавай управление браузеру между ними. Для этого есть `scheduler.yield()`: после него браузер успевает обработать касание и вернуться к твоему циклу.

По данным web.dev, `scheduler.yield()` есть в Chrome 129 и Firefox 142, а в Safari его нет. MDN не считает API базовым (Baseline), поэтому держи запасной путь через `setTimeout`.

```ts
const yieldToMain = () =>
	'scheduler' in globalThis && 'yield' in scheduler ? scheduler.yield() : new Promise((r) => setTimeout(r, 0));
```

</Deeper>

## Длинные списки без рывков {#long-lists}

Виртуальный список рисует только видимые строки — это основа из [«Стек и скорость»](/guide/10-stack-speed#virtual-lists). Для Svelte 5 удобен **virtua**: компонент `VList` из `virtua/svelte` требует Svelte 5 или новее. У TanStack Virtual тоже есть адаптер для Svelte, но он построен на сторах, и его документация не говорит про руны.

Есть и вариант легче — CSS-свойство `content-visibility: auto`. Браузер пропускает вёрстку и отрисовку строк за пределами экрана, но элементы остаются в DOM. В примере web.dev оно сократило первую отрисовку с 232 до 30 мс; работает в Chrome 85, Firefox 125 и Safari 18.

<CompareTable caption="Как рисовать список задач">

| | Обычный список | content-visibility | virtua |
| --- | --- | --- | --- |
| В DOM | Все строки | Все строки | Только видимые |
| Сложность | Нет | Одна строка CSS | Компонент и высоты |
| Поиск по странице | Работает | Работает | Только видимое |
| Когда брать | Десятки строк | Сотни строк | Тысячи строк |

</CompareTable>

Пороги в последней строке — ориентир, а не правило: проверяй замером на своём телефоне. Для `content-visibility` задай `contain-intrinsic-size: auto 56px`, иначе полоса прокрутки будет прыгать.

## Анимации: transform и opacity {#animations}

Браузер рисует кадр в несколько этапов: стили, вёрстка, отрисовка, композиция. Только два свойства — `transform` и `opacity` — меняются на последнем этапе, без пересчёта вёрстки. Анимируй их, а не `height`, `top` или `width`.

Открытие карточки задачи — это `transform: translateY()` и `opacity`, а не рост `height` от нуля. Свойство `will-change` MDN называет последним средством: каждый вынесенный слой занимает память, а на телефоне её мало.

### View Transitions между экранами {#view-transitions}

View Transitions — API браузера для плавного перехода между двумя состояниями страницы. Браузер снимает старый экран, применяет изменения и сам анимирует разницу. Переход внутри одного документа работает в Chrome 111, Safari 18 и Firefox 144; с октября 2025 года это Baseline.

```svelte title="src/routes/+layout.svelte"
<script lang="ts">
	import { onNavigate } from '$app/navigation';
	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

{@render children()}
```

Проверка `if (!document.startViewTransition)` оставляет старым браузерам обычный переход. Дальше всё решает CSS: дай заголовку задачи в списке и на её экране одно и то же `view-transition-name`, и браузер плавно перенесёт его с места на место.

## Замер на настоящем Android {#measure}

Как подключить телефон через `chrome://inspect`, — в [«Стек и скорость»](/guide/10-stack-speed#measure). Здесь — два шага глубже: честное замедление на ноутбуке и метрики изнутри приложения.

**Замедление.** Панель **Performance** замедляет процессор относительно твоего ноутбука, а не до конкретного телефона. Поэтому DevTools предлагают откалибровать пресеты под слабый и средний мобильный телефон. Калибровка для быстрых проверок, а финальный замер — всё равно на телефоне.

**Метрики в приложении.** Core Web Vitals — три метрики Google: LCP (когда показан главный контент), INP (как быстро интерфейс отвечает на действие) и CLS (насколько прыгает вёрстка). «Хорошо» — это LCP до 2,5 с, INP до 200 мс и CLS до 0,1 у 75% визитов. INP заменил прежнюю метрику FID 12 марта 2024 года.

Библиотека `web-vitals` весит около 3 КБ и отдаёт эти метрики колбэками. Сборка `web-vitals/attribution` добавляет, какой элемент и какое событие виноваты. Складывай значения в ту же IndexedDB — данные не уходят с телефона, а вечерний обзор может их показать.

```ts title="src/lib/perf/vitals.ts"
import { onCLS, onINP, onLCP } from 'web-vitals/attribution';
import { db } from '$lib/db';

function save(metric: { name: string; value: number; rating: string; attribution: unknown }) {
	db.table('vitals').add({ at: new Date().toISOString(), name: metric.name, value: metric.value, rating: metric.rating });
}

onCLS(save);
onINP(save);
onLCP(save);
```

Для таблицы `vitals` добавь в схему `vitals: '++id, name, at'` и подними номер версии. Через неделю обычной жизни у тебя будет реальный INP на твоём телефоне, а не лабораторная оценка.

<PhraseCard
	title="Разбор производительности"
	when="Экран тормозит или INP выше 200 мс"
	text="Найди главную причину медленного экрана Today: собери stats.html через rollup-plugin-visualizer, проверь запросы к Dexie на индексы и найди длинные задачи больше 50 мс. Пришли три находки с цифрами. Исправь одну, самую крупную, в новой ветке и открой PR."
/>

## Выводы {#takeaways}

<Takeaways>

- Всё, что вычисляется из состояния, живёт в `$derived`, а `$effect` нужен только для связи с внешним миром.
- Запись состояния в `$effect` — не способ посчитать значение: это лишний проход обновления и риск цикла.
- Сначала измерь бандл визуализатором, потом выноси тяжёлое в `import()`; SvelteKit уже делит код по страницам.
- IndexedDB быстрая, если читать по индексам и страницами, а писать пачками в одной транзакции без ожидания сети.
- Поиск и тяжёлая аналитика уходят в воркер, длинные списки — в `content-visibility` или virtua, анимации — в `transform` и `opacity`.
- Настоящие цифры даёт только твой телефон: `web-vitals` внутри приложения покажет реальный INP.

</Takeaways>

## Что сделать сейчас {#next-steps}

<Checklist
	id="advanced-a5-next-steps"
	title="Три шага"
	items={[
		'Найди в коде $effect, которые пишут в $state, и перепиши их на $derived',
		'Собери stats.html и найди три самых тяжёлых модуля',
		'Проверь, что у запросов экрана Today есть составной индекс в схеме Dexie'
	]}
/>

## Источники {#sources}

- Svelte: [$state](https://svelte.dev/docs/svelte/$state), [$derived](https://svelte.dev/docs/svelte/$derived), [$effect](https://svelte.dev/docs/svelte/$effect), [SvelteKit: Performance](https://svelte.dev/docs/kit/performance), [SvelteKit: Link options](https://svelte.dev/docs/kit/link-options), [Unlocking view transitions in SvelteKit 1.24](https://svelte.dev/blog/view-transitions).
- Vite и Rolldown: [Vite 8.0 is out!](https://vite.dev/blog/announcing-vite8), [Bundle Analyzer Plugin](https://rolldown.rs/builtin-plugins/bundle-analyzer), [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer).
- Dexie.js: [Version.stores()](https://dexie.org/docs/Version/Version.stores()), [Table.bulkPut()](https://dexie.org/docs/Table/Table.bulkPut()), [Table.bulkAdd()](https://dexie.org/docs/Table/Table.bulkAdd()), [Collection.offset()](https://dexie.org/docs/Collection/Collection.offset()), [Dexie.transaction()](https://dexie.org/docs/Dexie/Dexie.transaction()), [liveQuery()](https://dexie.org/docs/liveQuery()).
- MDN: [IDBObjectStore: getAll()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll), [FileSystemSyncAccessHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemSyncAccessHandle), [PerformanceLongTaskTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming), [Scheduler: yield()](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/yield), [will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change), [content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility).
- web.dev: [Web Vitals](https://web.dev/articles/vitals), [INP becomes a Core Web Vital on March 12](https://web.dev/blog/inp-cwv-march-12), [Optimize long tasks](https://web.dev/articles/optimize-long-tasks), [content-visibility](https://web.dev/articles/content-visibility), [Stick to compositor-only properties and manage layer count](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count), [Same-document view transitions are now Baseline Newly available](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available).
- Chrome for Developers: [Remote debug Android devices](https://developer.chrome.com/docs/devtools/remote-debugging), [Performance features reference](https://developer.chrome.com/docs/devtools/performance/reference), [What's new in view transitions (2025 update)](https://developer.chrome.com/blog/view-transitions-in-2025).
- Библиотеки: [MiniSearch](https://lucaong.github.io/minisearch/), [FlexSearch](https://github.com/nextapps-de/flexsearch), [Comlink](https://github.com/GoogleChromeLabs/comlink), [virtua](https://github.com/inokawa/virtua), [TanStack Virtual: Svelte](https://tanstack.com/virtual/latest/docs/framework/svelte/svelte-virtual), [web-vitals](https://github.com/GoogleChrome/web-vitals).
