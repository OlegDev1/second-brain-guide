---
title: Local-first и синхронизация между устройствами
short: Local-first
part: "08"
order: 0
slug: a1-local-first
time: 15
level: advanced
prereqs: [guide/06-sync, guide/11-architecture]
updated: 2026-10-23
description: Где хранить данные в браузере, какой путь синхронизации выбрать, как сливать конфликты, шифровать личное и делать бэкап в своё облако.
---

<LessonHeader
	learn={[
		'Чем отличаются IndexedDB с Dexie, SQLite WASM и PGlite',
		'Как работают квоты браузера и когда он стирает данные',
		'Три пути синхронизации и их цена',
		'Как сливать конфликты по полям и зачем гибридные часы',
		'Как шифровать данные до отправки и делать бэкап в своё облако'
	]}
/>

<TLDR>

Для хранения записей хватит встроенной базы браузера (IndexedDB) с удобной надстройкой (Dexie). Одна команда (`navigator.storage.persist()`) просит браузер не стирать эти данные. Чтобы записи совпадали на разных устройствах (синхронизация), выбирают свой сервер, готовый движок или особые структуры данных (CRDT). Одному человеку проще всего правило «побеждает последняя правка» для каждого поля (с гибридными часами). Личное шифруй на телефоне до отправки, как письмо в запечатанном конверте, а запасную копию держи в своём облаке.

</TLDR>

<Callout type="note" title="Для кого эта глава">

Для автора: ты знаешь JavaScript и хочешь, чтобы второй мозг жил на телефоне и ноутбуке сразу. Почему данные лежат на телефоне и как сделать бэкап руками, — в [«Синхронизация»](/guide/06-sync#data-on-phone). Модель записи и миграции — в [«Архитектура приложения»](/guide/11-architecture#item).

</Callout>

## Local-first: данные сначала у тебя {#local-first}

Local-first — подход, при котором главная копия данных живёт на устройстве, а сервер только помогает копиям встретиться. Термин ввели Ink & Switch в эссе 2019 года. Там семь идеалов; для второго мозга важны три: никаких спиннеров, сеть необязательна, данные принадлежат тебе.

На практике это значит: каждое действие сначала пишется в локальную базу и сразу видно. Синхронизация идёт в фоне и может отставать на минуты или дни. Вся сложность главы — в том, что две копии иногда расходятся.

## Хранилище в браузере {#storage}

Браузер даёт сайту несколько хранилищ, но для базы подходят два: **IndexedDB** — встроенная база объектов, и **OPFS** — приватная файловая система сайта. Поверх них работают три движка.

<CompareTable caption="Чем хранить записи в браузере">

| | Dexie | SQLite WASM | PGlite |
| --- | --- | --- | --- |
| Поверх чего | IndexedDB | OPFS в воркере | IndexedDB или OPFS |
| Запросы | Индексы, JS | SQL | SQL Postgres |
| Вес | Маленький | Модуль WASM | Меньше 3 МБ gzip |
| Реактивность | `liveQuery()` | Своя | Live queries |
| Подвох | Нет SQL | Одно соединение | Тяжёлый старт |

</CompareTable>

**Dexie** — обёртка над IndexedDB, с которой начинает [«Стек и скорость»](/guide/10-stack-speed#local-db). Она даёт схему с версиями, пачки записей и `liveQuery()`: запрос, который сам перезапускается при изменении данных, даже из другой вкладки.

**SQLite WASM** — официальная сборка SQLite для браузера. У неё два способа хранить файл в OPFS. Способ `opfs` требует общей памяти (SharedArrayBuffer), а значит заголовков COOP и COEP на ответе сервера. GitHub Pages свои заголовки ставить не даёт — так отвечают в обсуждениях сообщества GitHub, а в документации Pages такой настройки нет. Поэтому на Pages подходит только `opfs-sahpool`: ему заголовки не нужны, и документация SQLite называет его самым быстрым из вариантов OPFS. Цена — одно соединение с базой: вторая вкладка должна ждать.

**PGlite** — настоящий Postgres, собранный в WASM, весом меньше 3 МБ в gzip. Он хранит базу в IndexedDB во всех браузерах или в OPFS в воркере, но этот вариант не работает в Safari. Плюс — расширения вроде `pgvector` для поиска по смыслу и live queries.

<Callout type="important" title="«SQLite в браузере в разы быстрее IndexedDB»">

Официальных замеров, которые это подтверждают, нет ни у SQLite, ни у Chrome. Скорость зависит от формы запросов: Dexie по хорошему индексу отвечает за миллисекунды. Меряй на своих данных и на своём телефоне, как в [«Производительность»](/advanced/a5-performance#indexeddb).

</Callout>

### Квоты и вытеснение {#quotas}

Браузер выделяет сайту место по своим правилам. По данным MDN, Chrome даёт одному сайту до 60% диска. Firefox в обычном режиме — меньшее из 10% диска и 10 ГиБ, а в постоянном — до 50%. Safari — около 60% диска для сайтов в самом браузере.

По умолчанию хранилище «по возможности» (best-effort). Когда на диске кончается место, браузер стирает данные сайтов, которые открывали давнее всех. Постоянное хранилище стирает только сам пользователь.

```ts title="src/lib/storage.ts"
export async function ensurePersistent() {
	const granted = (await navigator.storage.persisted()) || (await navigator.storage.persist());
	const { usage = 0, quota = 0 } = await navigator.storage.estimate();
	return { granted, usedMB: Math.round(usage / 1e6), quotaMB: Math.round(quota / 1e6) };
}
```

Firefox на `persist()` спрашивает пользователя, а Chrome и Safari решают молча — по тому, как ты пользуешься сайтом. Покажи результат на экране настроек: если `granted` ложно, напомни про бэкап.

У Safari есть отдельное правило про семь дней без касаний, его разбирает [«Синхронизация»](/guide/06-sync#data-on-phone). На Android оно не действует, но если ноутбук — Mac с Safari, не считай его копию надёжной: опирайся на синхронизацию и бэкап.

## Три пути синхронизации {#sync-paths}

Синхронизация — это доставка изменений между копиями и слияние, когда они разошлись. Её можно построить тремя способами, и они сильно различаются по цене.

<CompareTable caption="Как связать телефон и ноутбук">

| | Свой бэкенд | Движок синхронизации | CRDT-библиотека |
| --- | --- | --- | --- |
| Примеры | Supabase, PocketBase | PowerSync, Electric, Zero | Yjs, Automerge |
| Сложность | Свой протокол | Конфиг и правила | Модель данных |
| Офлайн | Пишешь сам | Встроен | Встроен |
| Конфликты | Пишешь сам | Решает сервер | Сливаются сами |
| Привязка | Низкая | Высокая | Средняя |

</CompareTable>

**Свой бэкенд** — база на сервере и твой код, который отправляет и забирает изменения. **Supabase** даёт Postgres и realtime-подписки; бесплатный план — 500 МБ базы, а проект засыпает после недели без активности (проверено: октябрь 2026). Встроенной офлайн-синхронизации нет: для неё Supabase предлагает партнёра — PowerSync. **PocketBase** — бэкенд одним файлом на Go с SQLite и realtime; версия 0.40, и до 1.0 совместимость не обещают.

**Движок синхронизации** — готовый слой, который держит копию базы на клиенте и сам гоняет изменения. **PowerSync** синхронизирует Postgres, MongoDB и MySQL с SQLite на клиенте; бесплатный облачный проект отключают после недели простоя. **Electric** синхронизирует только чтение — «формы» данных из Postgres по HTTP, а запись идёт через твой API. **Zero** от Rocicorp тоже работает поверх Postgres и общедоступен с марта 2026 года. Для тех, кто уже на Dexie, есть **Dexie Cloud**: бесплатный план на 3 пользователей и 100 МБ.

**CRDT-библиотека** — структура данных, которую любые две копии сливают без сервера и без конфликтов. **Yjs** хорош для общего текста; у него есть провайдеры `y-indexeddb` для хранения и `y-websocket` для сети. **Automerge** хранит JSON-подобные документы; версия 3 летом 2025 года сократила расход памяти больше чем в 10 раз.

Статусы в этой области меняются быстро, поэтому проверяй их перед выбором. Вот что видно на официальных страницах на октябрь 2026:

| Проект | Статус |
| --- | --- |
| Electric | 1.0, стабильный API с марта 2025 |
| Zero | Общедоступен с марта 2026 года |
| PowerSync | Облако и self-hosted под лицензией FSL |
| Triplit | Команда ушла в Supabase в октябре 2025, в платформу Supabase его не встраивают |
| InstantDB | Команда ушла в OpenAI, облако закрывают 31.08.2027 |
| Jazz | 2.0 в альфе, новая реляционная модель |

Triplit и InstantDB для нового проекта не бери: код открыт, но у проекта нет обещанного будущего: за обновлениями придётся следить самому.

<Deeper title="Что выбрать для одного человека">

У второго мозга один пользователь, два-три устройства и тысячи записей. Это самый простой случай синхронизации: нет прав доступа и нет одновременной правки одной записи двумя людьми.

Поэтому движок с Postgres здесь избыточен. Разумный путь — Dexie Cloud, если не хочешь сервера, или маленький свой бэкенд с журналом изменений и слиянием по полям. CRDT стоит брать точечно — только для текста заметок.

</Deeper>

## Конфликты: слияние по полям {#conflicts}

Конфликт синхронизации — когда одну запись изменили на двух устройствах, пока они не видели друг друга. В метро ты отметил задачу «подарок маме» выполненной, а дома на ноутбуке поменял ей срок. Обе правки должны выжить.

**Last-write-wins по полям** решает это: у каждого поля своя отметка времени, и при слиянии побеждает более поздняя. Статус возьмётся с телефона, срок — с ноутбука. Целая запись с одной отметкой потеряла бы одну из правок.

```ts title="src/lib/sync/merge.ts"
import type { Item } from '$lib/items/types';

// Для каждого поля — отметка гибридных часов последней правки.
export type Clocks = Partial<Record<keyof Item, string>>;

export function mergeItem(a: Item, ca: Clocks, b: Item, cb: Clocks): [Item, Clocks] {
	const out = { ...a };
	const clocks = { ...ca };
	for (const key of Object.keys(cb) as (keyof Item)[]) {
		if (!ca[key] || cb[key]! > ca[key]!) {
			(out as Record<string, unknown>)[key] = b[key];
			clocks[key] = cb[key];
		}
	}
	return [out, clocks];
}
```

Удаление — тоже правка поля: запись не стирают, а ставят ей `deletedAt`. Иначе второе устройство при следующей синхронизации вернёт её обратно.

### Гибридные часы вместо Date.now() {#hlc}

Часы телефона и ноутбука расходятся на секунды, а иногда на часы. Если сравнивать `Date.now()`, правка с отстающего устройства проиграет, даже если была позже. **Гибридные логические часы** (HLC) из статьи Кулкарни и Демирбаса чинят это: отметка — пара «физическое время и счётчик».

```ts title="src/lib/sync/hlc.ts"
let last = { ms: 0, n: 0 };
const node = crypto.randomUUID().slice(0, 8); // id устройства

const pack = (t: { ms: number; n: number }) =>
	`${t.ms.toString().padStart(15, '0')}-${t.n.toString().padStart(5, '0')}-${node}`;

/** Отметка для локальной правки. */
export function tick(): string {
	const now = Date.now();
	last = now > last.ms ? { ms: now, n: 0 } : { ms: last.ms, n: last.n + 1 };
	return pack(last);
}

/** Учесть отметку, пришедшую с другого устройства. */
export function receive(remote: string): void {
	const [ms, n] = remote.split('-').map(Number);
	const now = Date.now();
	const top = Math.max(now, last.ms, ms);
	let count = 0;
	if (top === last.ms && top === ms) count = Math.max(last.n, n) + 1;
	else if (top === last.ms) count = last.n + 1;
	else if (top === ms) count = n + 1;
	last = { ms: top, n: count };
}
```

Отметки — строки фиксированной длины, поэтому их можно сравнивать как строки. Хвост с id устройства разводит две правки с одинаковым временем. Храни `node` в базе, а не генерируй при каждом запуске.

### Текст заметок — в CRDT {#text-crdt}

Для статуса и срока last-write-wins годится, а для текста — нет. Если ты дописал абзац в заметку на телефоне, а на ноутбуке поправил первую строку, победит одна версия целиком. Тут нужен CRDT: Yjs сливает правки по символам.

```ts title="src/lib/notes/body.ts"
import * as Y from 'yjs';

export function mergeBody(local: Uint8Array, remote: Uint8Array): { state: Uint8Array; text: string } {
	const doc = new Y.Doc();
	Y.applyUpdate(doc, local);
	Y.applyUpdate(doc, remote);
	return { state: Y.encodeStateAsUpdate(doc), text: doc.getText('body').toString() };
}
```

Состояние Yjs храни в `data` записи как байты, а в `body` — готовый текст для поиска. Так CRDT живёт только там, где он нужен, а остальная модель остаётся простой.

## Шифрование своих данных {#e2e}

Сквозное шифрование (end-to-end) — данные шифруются на устройстве, и сервер видит только шифротекст. Для второго мозга с телефонами клиентов и заметками после медитации это разумный минимум. Web Crypto в браузере умеет всё нужное без библиотек.

Ключ выводится из пароля через PBKDF2, а данные шифруются AES-GCM. OWASP рекомендует для PBKDF2-HMAC-SHA256 600 000 итераций. Вектор инициализации (IV) должен быть новым для каждого шифрования; рекомендуемая длина — 96 бит, хранить его можно открыто.

```ts title="src/lib/crypto.ts"
const enc = new TextEncoder();

export async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
	const base = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
	return crypto.subtle.deriveKey(
		{ name: 'PBKDF2', salt, iterations: 600_000, hash: 'SHA-256' },
		base,
		{ name: 'AES-GCM', length: 256 },
		false,
		['encrypt', 'decrypt']
	);
}

export async function seal(key: CryptoKey, data: unknown): Promise<Uint8Array> {
	const iv = crypto.getRandomValues(new Uint8Array(12)); // 96 бит, новый каждый раз
	const body = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(data)));
	const out = new Uint8Array(12 + body.byteLength);
	out.set(iv);
	out.set(new Uint8Array(body), 12);
	return out;
}
```

AES-GCM ещё и проверяет целостность: подменённый шифротекст не расшифруется. Соль храни рядом с данными, она не секрет. 600 000 итераций на телефоне заметно долги, поэтому выводи ключ один раз при входе. Пароль и ключ на сервер не уходят никогда.

У шифрования есть цена. Сервер больше не может искать, сортировать и сливать поля — он видит только байты. Значит, движки, чья сила — запросы и фильтры по полям на сервере, вроде Electric или Zero, теряют главное преимущество. Лучше подходит свой простой бэкенд, который хранит зашифрованные изменения и раздаёт их устройствам.

<Callout type="danger" title="Забытый пароль — потерянные данные">

Ключа нет нигде, кроме твоей головы. Если пароль забыт, а единственная копия на сервере зашифрована, восстановить её невозможно. Держи незашифрованный бэкап на своём устройстве или запиши пароль в менеджер паролей.

</Callout>

## Миграции при синхронизации {#migrations}

Как устроены версии схемы и `upgrade()` в Dexie, — в [«Архитектура приложения»](/guide/11-architecture#versions). Синхронизация добавляет новую беду: телефон уже обновился, а ноутбук ещё нет. Старый клиент получает записи нового формата и должен их не сломать.

Три правила спасают от этого:

- **только добавляй**: новые поля необязательны, старые не переименовывай и не меняй тип;
- **не выбрасывай незнакомое**: при слиянии копируй поля, которых клиент не знает, как есть;
- **версия на записи**: поле `v` в каждой записи говорит, по какой схеме она записана.

```ts title="src/lib/db.ts"
db.version(4)
	.stores({ items: 'id, type, status, dueAt, updatedAt, *tags, [type+status], [status+dueAt]' })
	.upgrade((tx) =>
		tx.table('items').toCollection().modify((item) => {
			item.v ??= 4;
			item.data ??= {};
		})
	);
```

Если переименование неизбежно, делай его в два выпуска. Сначала пиши оба поля и читай новое, а через месяц, когда все устройства обновились, перестань писать старое.

## Бэкап в своё облако {#backup}

Ручной экспорт в JSON описан в [«Синхронизация»](/guide/06-sync#backup). Следующий шаг — автоматический бэкап туда, где ты и так хранишь файлы. Сервер для этого не нужен.

**Google Drive, папка приложения.** У Drive есть скрытая папка `appDataFolder`: её не видно ни тебе в интерфейсе Drive, ни другим приложениям. Доступ к ней даёт область (scope) `drive.appdata`, которую Google считает нечувствительной, — проверка приложения проходит проще. Как получить токен и загрузить файл, — в [«Интеграции»](/advanced/a2-integrations#google).

**Файл на диске.** `showSaveFilePicker()` открывает системный диалог и даёт записать файл прямо в выбранное место. Он есть в Chrome 86 и Chrome для Android 132 и новее, но нет в Firefox и Safari. Поэтому всегда держи запасной путь — обычную ссылку на скачивание.

```ts title="src/lib/backup/save.ts"
export async function saveBackup(blob: Blob, name = `second-brain-${new Date().toISOString().slice(0, 10)}.json`) {
	if ('showSaveFilePicker' in window) {
		const handle = await window.showSaveFilePicker({ suggestedName: name });
		const file = await handle.createWritable();
		await file.write(blob);
		return file.close();
	}
	const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: name });
	a.click();
	URL.revokeObjectURL(a.href);
}
```

Шифруй бэкап тем же `seal()` до загрузки в облако. Тогда утечка аккаунта Google не раскроет твоих клиентов.

<PhraseCard
	title="Синхронизация по полям"
	when="Второй мозг нужен и на ноутбуке"
	text="Добавь синхронизацию записей между устройствами: отметки гибридных часов на каждое поле, слияние last-write-wins по полям, удаление через deletedAt. Текст заметок не трогай, его сделаем через Yjs отдельно. Схему Dexie меняй только добавлением полей. Работай в новой ветке и открой PR, ничего не форсь."
/>

## Выводы {#takeaways}

<Takeaways>

- Local-first значит, что главная копия данных живёт на устройстве, а синхронизация идёт в фоне.
- Для второго мозга хватит Dexie; SQLite WASM на GitHub Pages возможен только через `opfs-sahpool`.
- «SQLite в браузере в разы быстрее IndexedDB» — без официальных замеров это миф: меряй на своих данных.
- Вызови `navigator.storage.persist()`, иначе при нехватке места браузер может стереть базу.
- Для одного человека проще всего last-write-wins по полям с гибридными часами и CRDT только для текста.
- Шифруй личное на устройстве до отправки и держи бэкап в своём облаке, но помни: забытый пароль не восстановить.

</Takeaways>

## Что сделать сейчас {#next-steps}

<Checklist
	id="advanced-a1-next-steps"
	title="Три шага"
	items={[
		'Добавь вызов navigator.storage.persist() и покажи его результат в настройках',
		'Запиши в ТЗ, какой путь синхронизации выбираешь и почему',
		'Проверь, что схема Dexie меняется только добавлением полей'
	]}
/>

## Источники {#sources}

- Ink & Switch: [Local-first software](https://www.inkandswitch.com/essay/local-first/).
- MDN: [Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria), [Origin private file system](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system), [SubtleCrypto: encrypt()](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt), [SubtleCrypto: deriveKey()](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey), [AesGcmParams](https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams), [Window: showSaveFilePicker()](https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker).
- WebKit: [Full Third-Party Cookie Blocking and More](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/).
- Dexie.js: [Dexie.js](https://dexie.org/), [liveQuery()](https://dexie.org/docs/liveQuery()), [Version.upgrade()](https://dexie.org/docs/Version/Version.upgrade()), [Dexie Cloud Pricing](https://dexie.org/cloud/pricing).
- SQLite: [About the SQLite WASM Project](https://sqlite.org/wasm/doc/trunk/about.md), [Persistent Storage Options](https://sqlite.org/wasm/doc/trunk/persistence.md).
- GitHub: [Community discussion #84963](https://github.com/orgs/community/discussions/84963), [Community discussion #13309](https://github.com/orgs/community/discussions/13309).
- PGlite: [PGlite](https://pglite.dev/), [Filesystems](https://pglite.dev/docs/filesystems), [Extensions](https://pglite.dev/extensions/).
- Бэкенды: [Supabase Pricing](https://supabase.com/pricing), [Supabase: PowerSync](https://supabase.com/partners/integrations/powersync), [PocketBase](https://github.com/pocketbase/pocketbase).
- Движки синхронизации: [PowerSync Overview](https://docs.powersync.com/intro/powersync-overview), [PowerSync Pricing](https://www.powersync.com/pricing), [PowerSync Open Source](https://www.powersync.com/open-source), [Electric: Intro](https://electric.ax/docs/intro), [Electric 1.0 released](https://electric.ax/blog/2025/03/17/electricsql-1.0-released), [Zero: Project Status](https://zero.rocicorp.dev/docs/status), [Zero 1.0](https://zero.rocicorp.dev/docs/release-notes/1.0), [Triplit joins Supabase](https://supabase.com/blog/triplit-joins-supabase), [Instant team joins OpenAI](https://www.instantdb.com/essays/instant_team_joins_openai), [Jazz docs](https://jazz.tools/docs).
- CRDT: [crdt.tech](https://crdt.tech/), [Yjs Docs](https://docs.yjs.dev/), [y-indexeddb](https://docs.yjs.dev/ecosystem/database-provider/y-indexeddb), [y-websocket](https://docs.yjs.dev/ecosystem/connection-provider/y-websocket), [Automerge](https://automerge.org/docs/hello/), [Automerge 3.0](https://automerge.org/blog/automerge-3/), [Logical Physical Clocks](https://www.cse.buffalo.edu/~demirbas/publications/hlc.pdf).
- OWASP: [Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).
- Google: [Store application-specific data](https://developers.google.com/workspace/drive/api/guides/appdata).
