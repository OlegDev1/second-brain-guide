---
title: Интеграции и API — каталог идей
short: Интеграции
part: "08"
order: 1
slug: a2-integrations
time: 20
level: advanced
prereqs: [guide/11-architecture, advanced/a1-local-first]
updated: 2026-10-23
description: Каталог интеграций для второго мозга — захват, Google, Claude API, уведомления, здоровье и импорт — со сложностью, ценой и разбором голосового Inbox от микрофона до IndexedDB.
---

<LessonHeader
	learn={[
		'Какие интеграции дают второму мозгу больше всего',
		'Когда нужен сервер, а когда хватит браузера',
		'Что надо знать про OAuth Google до первой строчки кода',
		'Как встроить Claude API: структурный ответ, пакеты, поиск по смыслу, свой MCP',
		'Как собрать голосовой Inbox от микрофона до записи в IndexedDB'
	]}
/>

<TLDR>

Интеграция стоит своих денег, если экономит действие каждый день: голосовой Inbox, календарь для «Выбери за меня», напоминания в Telegram. Любой платный ключ живёт на сервере — хватит маленького Cloudflare Worker. Сложность ниже — от 1 (только браузер) до 3 (сервер, OAuth и проверка Google).

</TLDR>

<Callout type="note" title="Для кого эта глава">

Для автора: ты пишешь на JavaScript и выбираешь, что подключить ко второму мозгу. Модель записи и события модулей — в [«Архитектура приложения»](/guide/11-architecture#events). Каждая интеграция ниже — отдельный модуль, который создаёт или читает записи. Добавляй свои идеи в те же таблицы.

</Callout>

## Как читать каталог {#how-to-read}

У каждой идеи четыре оценки: что она даёт, какой API, сложность и нужен ли сервер. **Сложность 1** — только браузер; **2** — сервер или плагин Capacitor; **3** — несколько частей сразу: сервер, OAuth, нативный плагин или проверка у провайдера. Цены и лимиты взяты с официальных страниц в октябре 2026 года — перепроверяй их перед стартом.

**Сервер** нужен по двум причинам: спрятать платный ключ или сделать что-то, пока телефон спит. Для обоих хватит Cloudflare Worker: на бесплатном плане 100 000 запросов в день, 10 мс процессорного времени на вызов и 5 cron-триггеров на аккаунт. Ключи кладутся командой `npx wrangler secret put` и в код не попадают.

<Callout type="danger" title="Ключ в коде PWA — ключ для всех">

Всё, что лежит в коде сайта, видит любой посетитель. SDK Anthropic по умолчанию отказывается работать в браузере, а опция `dangerouslyAllowBrowser` по документации раскрывает ключ в клиентском коде (проверено: октябрь 2026). Ключи Claude, OpenAI и Google Cloud держи только в Worker.

</Callout>

## Захват: мысль за пять секунд {#capture}

Главная беда любого Inbox — трение. Чем меньше шагов от мысли до записи, тем больше мыслей доживает до вечернего разбора.

<CompareTable caption="Захват">

| | Голосовой Inbox | «Поделиться» | Фото доски или чека | NFC-метка |
| --- | --- | --- | --- | --- |
| Что даёт | Фраза → запись с полями | Ссылка из любого приложения | Снимок → список задач | Касание → старт фокуса |
| API | Web Speech или STT + Claude | Web Share Target | Claude API с картинками | Web NFC |
| Сложность | 2 | 1 | 2 | 1 |
| Сервер | Да, для ключей | Нет | Да, для ключа | Нет |

</CompareTable>

**Голос в браузере.** Web Speech API бесплатен, но в Chrome звук уходит на сервер распознавания, и без сети он не работает. Распознавание на устройстве (`processLocally`) появилось в Chrome 139, но по данным MDN только на компьютере, не на Android. В Firefox API нет, в Safari — с префиксом.

**Облачное распознавание** точнее и работает с записью, сделанной офлайн. Цены на октябрь 2026:

<CompareTable caption="Распознавание речи в облаке">

| | OpenAI | Deepgram | AssemblyAI | ElevenLabs |
| --- | --- | --- | --- | --- |
| Модель | gpt-transcribe | Nova-3 | Universal-3.5 Pro | Scribe v2 |
| Цена | $0,0045/мин | $0,0043/мин | $0,21/час | $0,22/час |
| На старте | — | $200 кредита | До 185 часов | — |
| Заметка | Старые модели закроют 26.02.2027 | Русский есть | Без карты | 90+ языков, русский |

</CompareTable>

Минута голоса стоит меньше цента у любого из них. У OpenAI файл до 25 МБ; `whisper-1` и модели `gpt-4o-*-transcribe` помечены устаревшими и отключатся 26 февраля 2027 года (проверено: октябрь 2026).

**Whisper на телефоне.** transformers.js запускает Whisper прямо в браузере, на процессоре через WASM или на видеокарте через `device: 'webgpu'`. У whisper.cpp есть пример сборки в WebAssembly. Звук не покидает телефон, но модель надо скачать, а слабый телефон думает долго — меряй на своём.

**«Поделиться».** Web Share Target добавляет второй мозг в системное меню «Поделиться» — только для установленной PWA и только в Chrome для Android 76 и новее. Файлы приходят POST-запросом `multipart/form-data`. В Capacitor то же делает `@capgo/capacitor-share-target`; он обновлялся в октябре 2026, а `send-intent` — последний раз в феврале 2025.

**Фото.** Claude API принимает JPEG, PNG, GIF и WebP: до 10 МБ и 8000×8000 пикселей на картинку, до 100 картинок в запросе (проверено: октябрь 2026). Сжимай снимок на телефоне до ~2000 пикселей по длинной стороне: так быстрее и дешевле.

**NFC.** Web NFC читает и пишет NDEF-метки только в Chrome для Android 89 и новее, по HTTPS и после касания пользователя. Касание меткой на столе при открытом приложении запускает 25 минут фокуса — без поиска кнопки.

## Google: календарь и задачи {#google}

Google API бесплатны в пределах квот. Везде нужен OAuth, а для чтения почты — ещё и правила для ограниченных областей.

<CompareTable caption="Google: время и задачи">

| | Calendar | Tasks | Gmail |
| --- | --- | --- | --- |
| Что даёт | Окна между встречами | Импорт старых списков | Письма с меткой → Inbox |
| API | `events`, `freeBusy.query` | `tasks.list`, `tasks.insert` | `messages.list` с `q` |
| Сложность | 2 | 2 | 3 |
| Подвох | Чувствительная область | Срок без времени | Ограниченная область |

</CompareTable>

**Calendar.** Задачи со временем становятся событиями, а `freeBusy.query` показывает занятость. Так «Выбери за меня» видит, что до звонка 40 минут, и предлагает короткую задачу, а не длинную. Квота — 10 000 запросов в минуту на проект и 600 на пользователя.

**Tasks.** У поля `due` API хранит только дату, а время отбрасывает. Поэтому напоминание «позвонить в 15:00» через Tasks не сделать — для него Calendar или свои уведомления.

**Gmail.** `messages.list` принимает тот же синтаксис поиска, что строка в Gmail: `label:второй-мозг is:unread`. Но почти все области Gmail, включая `gmail.readonly`, — ограниченные (restricted). Публичному приложению с ними нужна ежегодная проверка безопасности CASA; личное использование в исключениях.

<CompareTable caption="Google: файлы и места">

| | Docs и Drive | Sheets | Maps и геозоны |
| --- | --- | --- | --- |
| Что даёт | Вечерний обзор документом, бэкап | Клиенты и аналитика в таблице | «Рядом магазин — покажи список» |
| API | `documents.create`, `appDataFolder` | `values.append` | Places (New), Routes |
| Сложность | 2 | 2 | 3 |
| Сервер | Нет | Нет | Ключ и плагин |

</CompareTable>

**Docs и Drive.** `documents.create` создаёт пустой документ с заголовком, а текст добавляет `batchUpdate`. Бэкап из [«Local-first»](/advanced/a1-local-first#backup) идёт в скрытую `appDataFolder` с нечувствительной областью `drive.appdata` — проверка не нужна.

**Sheets.** `values.append` дописывает строку в таблицу клиентов или дневную сводку. Лимит — 300 запросов в минуту на проект и 60 на пользователя, поэтому пиши сводку раз в день, а не на каждое действие.

**Maps.** С марта 2025 года вместо кредита $200 у каждого SKU свой бесплатный месячный лимит: например, 10 000 запросов Routes Essentials и Autocomplete Essentials. Геозону «у магазина» ставит плагин: `@capgo/background-geolocation` бесплатен, у Transistor Software лицензия для релиза стоит от $399.

### OAuth: что знать заранее {#oauth}

OAuth — вход через Google, после которого приложение получает токен доступа к твоим данным. До первой строчки кода настраивают **OAuth consent screen** в Google Cloud: название, области доступа и статус публикации.

<Callout type="important" title="«Приложение только для меня — токен будет вечным»">

Нет. Пока приложение в статусе **Testing**, в нём до 100 тестовых пользователей, а их разрешения и refresh-токены истекают через 7 дней. Для личного приложения это значит: раз в неделю входить заново или пройти проверку и перейти в **In production**.

</Callout>

Сам токен доступа живёт час. В браузерной схеме Google Identity Services (token model) приложение получает только его — после касания пользователя и без refresh-токена. Для фоновой работы без тебя нужен поток с кодом авторизации и сервером, который хранит refresh-токен.

Области делятся на три уровня. Нечувствительные (`drive.appdata`, `drive.file`) проходят без проверки. Чувствительные, как чтение календаря, требуют проверки для публичного приложения. Ограниченные, как почти весь Gmail, требуют ещё и аудита CASA.

## Claude API внутри приложения {#claude-api}

Claude API превращает свободный текст в структуру и объясняет выбор. Все вызовы идут через Worker, а ключ лежит в его секретах.

<CompareTable caption="Claude API">

| | Фраза → напоминание | «Выбери за меня» с причиной | Вечерний обзор | Поиск по смыслу |
| --- | --- | --- | --- | --- |
| Что даёт | Запись, связанная с контактом | Выбор и одна фраза почему | Сводка дня и недели | Находит заметку без точных слов |
| API | Structured outputs | Structured outputs | Message Batches | Voyage AI + векторы локально |
| Сложность | 2 | 2 | 2 | 3 |
| Модель | Haiku 5.5 | Haiku или Sonnet 5.5 | Sonnet 5.5 | — |

</CompareTable>

**Модель.** Для разбора фраз и классификации хватит самой дешёвой: Haiku 5.5 стоит $0,10 за миллион входных токенов и $0,50 за миллион выходных, если запрос короче 100 000 токенов (проверено: октябрь 2026). Sonnet 5.5 — $2 и $10, его бери для обзоров, где важен текст.

**Структурный ответ.** Structured outputs заставляют модель вернуть JSON строго по схеме: параметр `output_config.format` с `type: "json_schema"` или `strict: true` у инструмента, без бета-заголовка (проверено: октябрь 2026). В схеме нужен `additionalProperties: false`. «Позвонить Пете завтра в 15» становится `{ type: 'task', title: 'Позвонить Пете', dueAt: '…T15:00', contact: 'Петя' }`, а приложение само находит контакт по имени.

<Callout type="important" title="«Чтобы получить JSON, заставь вызвать инструмент»">

На Opus 5.5 и Sonnet 5.5 принудительный выбор инструмента через `tool_choice` `any` или `tool` возвращает ошибку 400 (проверено: октябрь 2026). Документация советует `auto` со `strict: true` или сразу `output_config.format`. Haiku 5.5 принудительный выбор принимает.

</Callout>

**Пакеты.** Message Batches API стоит вдвое дешевле обычных вызовов: большинство пакетов готово за час, а незавершённые истекают через 24 часа (проверено: октябрь 2026). Вечерний обзор и недельная аналитика не срочные — отправь пакет в 22:00 и покажи результат утром.

**Поиск по смыслу.** У Anthropic нет своей модели эмбеддингов: документация советует Voyage AI (проверено: октябрь 2026). У Voyage `voyage-4-lite` стоит $0,02 за миллион токенов, а первые 200 млн токенов на аккаунт бесплатны. Векторы храни в IndexedDB рядом с записью и сравнивай косинусом в воркере — для тысяч заметок отдельная векторная база не нужна.

**Кэш промпта.** Если каждый вызов начинается с одной и той же длинной инструкции, кэш снижает цену её чтения до 0,1 от обычной, а у Sonnet 5.5 — до 0,05 (проверено: октябрь 2026). У моделей 5.5 кэшируется начало длиной от 512 токенов. Расчёты и стратегия — в [«Экономика»](/advanced/a6-economics).

### Свой MCP-сервер второго мозга {#own-mcp}

<Term id="mcp">MCP</Term>-сервер второго мозга даёт Claude на сайте и в приложении доступ к твоим задачам: «что у меня на завтра», «добавь в Inbox». Его можно поднять на Cloudflare Workers: транспорт Streamable HTTP, обработчик `createMcpHandler`, вход через `@cloudflare/workers-oauth-provider`. Прежний класс `McpAgent` Cloudflare пометила устаревшим.

В Claude такой сервер подключается как свой коннектор: **Customize → Connectors → Add custom connector**, на бесплатном плане — один (проверено: октябрь 2026). Claude ходит к серверу из облака Anthropic, поэтому адрес должен быть публичным.

<Deeper title="Почему MCP — сложность 3">

Записи живут в IndexedDB на телефоне, а Worker туда не дотянется. Значит, MCP-серверу нужна своя копия данных — например, в D1, где на бесплатном плане 5 ГБ на аккаунт. Это и есть синхронизация из [«Local-first»](/advanced/a1-local-first#sync-paths).

Отсюда порядок: сначала синхронизация и серверная копия, потом MCP. Если данные зашифрованы на устройстве, MCP-серверу понадобится ключ, и сквозное шифрование потеряет смысл. Реши заранее, что из этого тебе важнее.

</Deeper>

## Уведомления и мессенджеры {#notifications}

Почему чистая PWA не гарантирует напоминание точно в срок, — в [«Стек и скорость»](/guide/10-stack-speed#android). Если не хочешь Capacitor, напоминание отправляет сервер.

<CompareTable caption="Уведомления">

| | Telegram-бот | Web Push | Письмо-дайджест |
| --- | --- | --- | --- |
| Что даёт | Напоминания, захват, утренний план | Системное уведомление PWA | Недельный обзор в почте |
| API | Bot API + cron в Worker | Push API, VAPID | Resend или Postmark |
| Сложность | 2 | 3 | 2 |
| Бесплатно | Да | Да | 3 000 или 100 писем в месяц |

</CompareTable>

**Telegram.** Бот получает сообщения через `setWebhook` прямо в Worker, а проверяет их по заголовку `X-Telegram-Bot-Api-Secret-Token`. Напоминания шлёт cron-триггер; cron в Cloudflare считается по UTC, поэтому 09:00 по Москве — это `0 6 * * *`. Лимит Telegram — не больше сообщения в секунду в один чат, для одного человека с запасом.

Откуда Worker знает про напоминания? Самое простое — телефон при каждом изменении кладёт в KV список «что и когда напомнить». На бесплатном плане KV — 1 000 записей и 100 000 чтений в день, а все задачи на сервер уходить не обязаны.

**Web Push.** Нужны Service Worker, `PushManager.subscribe()` с ключом VAPID (RFC 8292) и сервер, который отправляет push. На iPhone Web Push работает с iOS 16.4 и только для PWA, добавленной на домашний экран. Библиотека `web-push` написана для Node.js; работает ли она в Worker, документация не говорит — проверь до выбора.

**Письмо.** Бесплатный Resend даёт 3 000 писем в месяц и 100 в день, Postmark — 100 в месяц. Для одного дайджеста в неделю хватит любого.

## Здоровье, контекст и импорт {#context-import}

<CompareTable caption="Здоровье и контекст">

| | Health Connect | Погода Open-Meteo | Spotify |
| --- | --- | --- | --- |
| Что даёт | Сон и шаги → энергия дня | Дождь — задачи дома | Плейлист для фокуса или медитации |
| API | Плагин Capacitor | REST без ключа | Web API, Playback SDK |
| Сложность | 2 | 1 | 3 |
| Подвох | Только Android-обёртка | Только некоммерческое | Нужен Premium |

</CompareTable>

**Health Connect** встроен в Android 14, а на Android 9–13 ставится приложением из Google Play. Из PWA к нему не попасть, нужен плагин: `capacitor-health` или `@capgo/capacitor-health` — второй читает и сон, и пульс. Без отдельного разрешения плагин видит только последние 30 дней.

**Open-Meteo** бесплатен для некоммерческого использования, без ключа, до 10 000 запросов в день. Прогноз на день — один запрос утром.

**Spotify** в 2026 году ужесточил режим разработки: для режима разработки нужен аккаунт Premium, а пользователей на один Client ID — не больше пяти. Рекомендации для новых приложений закрыты с ноября 2024 года, поэтому «плейлист для фокуса» — это выбор из твоих плейлистов, а не подборка.

<CompareTable caption="Импорт и автоматизации">

| | Notion | Todoist | Obsidian | ICS-лента | Вебхуки |
| --- | --- | --- | --- | --- | --- |
| Что даёт | Перенос базы заметок | Перенос задач | Перенос хранилища | Задачи в любом календаре | Связка с чем угодно |
| API | REST, токен интеграции | API v1, `/sync` | Файлы Markdown | RFC 5545 | n8n, Make, Zapier |
| Сложность | 2 | 1 | 1 | 2 | 2 |
| Сервер | Да, прячет токен | Проверь CORS | Нет | Да, раздаёт ленту | Да |

</CompareTable>

**Notion** ограничивает интеграцию 180 запросами в минуту, а с версии API 2025-09-03 запросы идут к источникам данных (data sources). **Todoist** выдаёт личный токен в **Settings → Integrations → Developer**. **Obsidian** хранит заметки обычными файлами Markdown со свойствами в YAML в начале файла: импорт — это выбор папки и разбор файлов, без API.

**ICS-лента** — адрес, по которому календарь сам забирает твои задачи в формате iCalendar. Её раздаёт Worker, значит, задачам со сроком нужна серверная копия. **Вебхуки**: n8n можно поднять у себя бесплатно для личного использования, а Webhooks by Zapier доступны только на платных планах.

## Модули за пределами списка {#more-modules}

Идеи, которые ложатся на ту же модель записи и почти не требуют API:

- **дневник и настроение** — оценка дня в вечернем обзоре, график за месяц;
- **интервальное повторение** — карточки из заметок, алгоритм вроде SM-2 в воркере;
- **цели → ключевые результаты → задачи** — цепочка через `links` записей;
- **энергия по часам** — отметка «бодр или устал» плюс сон из Health Connect, и «Выбери за меня» знает лучшее время для сложного;
- **еженедельный обзор по GTD** — чек-лист: разобрать Inbox, просмотреть проекты, выбрать фокус недели;
- **граф связанных заметок** — те же `links`, нарисованные как сеть;
- **трекер расходов** — сумма и категория из фото чека через Claude API.

## Разбор: голосовой Inbox {#voice-inbox}

Цепочка целиком: телефон пишет звук, Worker распознаёт его и отдаёт Claude, Claude возвращает поля, а телефон кладёт запись в IndexedDB. Ключи OpenAI и Anthropic живут только в Worker.

<DiagramFrame label="Голосовой Inbox: телефон записывает звук, Worker распознаёт и разбирает фразу, запись ложится в IndexedDB" caption="Сеть нужна только в середине: запись звука и сохранение — на телефоне">
<svg viewBox="0 0 320 300">
<defs><marker id="a2-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path class="arrowhead" d="M0,0 L10,5 L0,10 z" /></marker></defs>
<rect class="node blue" x="60" y="10" width="200" height="44" rx="10" />
<text class="label" x="160" y="37" text-anchor="middle">Телефон: MediaRecorder</text>
<rect class="node violet" x="60" y="88" width="200" height="44" rx="10" />
<text class="label" x="160" y="115" text-anchor="middle">Worker: распознавание</text>
<rect class="node amber" x="60" y="166" width="200" height="44" rx="10" />
<text class="label" x="160" y="193" text-anchor="middle">Claude: фраза → поля</text>
<rect class="node green" x="60" y="244" width="200" height="44" rx="10" />
<text class="label" x="160" y="271" text-anchor="middle">Телефон: запись в Dexie</text>
<path class="arrow" d="M160,54 L160,86" marker-end="url(#a2-arrow)" />
<path class="arrow" d="M160,132 L160,164" marker-end="url(#a2-arrow)" />
<path class="arrow" d="M160,210 L160,242" marker-end="url(#a2-arrow)" />
</svg>
</DiagramFrame>

**Worker.** Один маршрут принимает звук и текущее время телефона, а отдаёт расшифровку и поля записи. Время с часовым поясом нужно, чтобы «завтра в 15» превратилось в точную дату.

```ts title="worker/src/index.ts"
interface Env { OPENAI_KEY: string; ANTHROPIC_KEY: string; APP_TOKEN: string }

const cors = {
	'access-control-allow-origin': 'https://you.github.io',
	'access-control-allow-headers': 'authorization'
};

const schema = {
	type: 'object',
	properties: {
		type: { type: 'string', enum: ['task', 'note', 'contact'] },
		title: { type: 'string' },
		dueAt: { type: 'string', description: 'ISO 8601 с часовым поясом или пустая строка' },
		contact: { type: 'string', description: 'Имя человека или пустая строка' },
		tags: { type: 'array', items: { type: 'string' } }
	},
	required: ['type', 'title', 'dueAt', 'contact', 'tags'],
	additionalProperties: false
};

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
		if (req.headers.get('authorization') !== `Bearer ${env.APP_TOKEN}`) return new Response('forbidden', { status: 403 });

		const form = await req.formData();
		const now = String(form.get('now'));

		const stt = new FormData();
		stt.append('file', form.get('audio') as File, 'note.webm');
		stt.append('model', 'gpt-transcribe');
		const sttRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
			method: 'POST',
			headers: { authorization: `Bearer ${env.OPENAI_KEY}` },
			body: stt
		});
		const { text } = (await sttRes.json()) as { text: string };

		const claude = await fetch('https://api.anthropic.com/v1/messages', {
			method: 'POST',
			headers: { 'x-api-key': env.ANTHROPIC_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
			body: JSON.stringify({
				model: 'claude-haiku-5-5',
				max_tokens: 300,
				system: `Ты разбираешь фразу для Inbox. Сейчас ${now}. Верни поля записи.`,
				messages: [{ role: 'user', content: text }],
				output_config: { format: { type: 'json_schema', schema } }
			})
		});
		const msg = (await claude.json()) as { content: { type: string; text: string }[] };
		const fields = JSON.parse(msg.content[0].text);

		return Response.json({ text, fields }, { headers: cors });
	}
};
```

`APP_TOKEN` — твой личный пароль к Worker: он лежит в настройках приложения на телефоне, а не в коде. Его не жалко сменить, а ключи провайдеров при этом не светятся. В реальном коде проверь ещё `sttRes.ok`, `stop_reason` ответа Claude и размер файла — у OpenAI предел 25 МБ.

**Телефон.** Запись идёт через `MediaRecorder`, и сеть ей не нужна. Если ответа нет, запись остаётся в Inbox как звук без расшифровки, и её можно отправить позже.

```ts title="src/lib/capture/voice.ts"
import { db } from '$lib/db';
import type { Item } from '$lib/items/types';

export async function recordOnce(ms = 8000): Promise<Blob> {
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	const rec = new MediaRecorder(stream);
	const chunks: Blob[] = [];
	rec.ondataavailable = (e) => chunks.push(e.data);
	const done = new Promise<void>((r) => (rec.onstop = () => r()));
	rec.start();
	setTimeout(() => rec.stop(), ms);
	await done;
	stream.getTracks().forEach((t) => t.stop());
	return new Blob(chunks, { type: rec.mimeType });
}

export async function captureVoice(workerUrl: string, appToken: string) {
	const audio = await recordOnce();
	const form = new FormData();
	form.append('audio', audio);
	form.append('now', new Date().toString()); // со смещением часового пояса

	const res = await fetch(workerUrl, { method: 'POST', headers: { authorization: `Bearer ${appToken}` }, body: form });
	const { text, fields } = await res.json();

	const now = new Date().toISOString();
	const item: Item = {
		id: crypto.randomUUID(),
		type: fields.type,
		title: fields.title,
		status: 'inbox',
		createdAt: now,
		updatedAt: now,
		dueAt: fields.dueAt || undefined,
		tags: fields.tags,
		links: [],
		data: { source: 'voice', transcript: text, contactName: fields.contact || undefined }
	};
	await db.items.add(item);
	return item;
}
```

Контакт по имени ищет уже приложение: `contactName` «Петя» сверяется с записями типа `contact`, и найденный `id` попадает в `links`. Так Claude не видит твою базу контактов, а получает только одну фразу.

Цена одной заметки на восемь секунд: около $0,0006 за распознавание и доли цента за разбор фразой Haiku 5.5. Сотня заметок в месяц обойдётся дешевле чашки кофе.

<PhraseCard
	title="Голосовой Inbox"
	when="Хочешь надиктовать мысль вместо набора"
	text="Сделай голосовой Inbox: кнопка записи на экране Inbox, Cloudflare Worker с маршрутом, который распознаёт звук через OpenAI gpt-transcribe и разбирает фразу Claude Haiku 5.5 со structured outputs, и запись в Dexie со статусом inbox. Ключи только в секретах Worker через wrangler secret put, в коде приложения ключей нет. Работай в новой ветке и открой PR, ничего не форсь."
/>

## Выводы {#takeaways}

<Takeaways>

- Интеграция окупается, если экономит действие каждый день: голосовой Inbox, календарь и напоминания дают больше всего.
- Платные ключи живут только на сервере, и для второго мозга хватает бесплатного Cloudflare Worker.
- «Приложение только для меня — токен вечный» — неверно: в статусе Testing refresh-токены Google истекают через 7 дней.
- Для разбора фраз хватит Haiku 5.5 со structured outputs, а обзоры дешевле отправлять пакетом через Batch API.
- Свой MCP-сервер и ICS-лента требуют серверной копии данных, поэтому идут после синхронизации.
- Голосовой Inbox собирается из трёх кусков: запись на телефоне, Worker с распознаванием и Claude, запись в Dexie.

</Takeaways>

## Что сделать сейчас {#next-steps}

<Checklist
	id="advanced-a2-next-steps"
	title="Три шага"
	items={[
		'Выбери из каталога три интеграции и впиши их в ТЗ со сложностью',
		'Заведи аккаунт Cloudflare и проверь, что wrangler видит его',
		'Отметь в ТЗ, каким интеграциям нужна серверная копия данных'
	]}
/>

## Источники {#sources}

- Anthropic: [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview), [Pricing](https://platform.claude.com/docs/en/about-claude/pricing), [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs), [Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools), [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing), [Embeddings](https://platform.claude.com/docs/en/build-with-claude/embeddings), [Voyage AI: Pricing](https://docs.voyageai.com/docs/pricing), [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), [Vision](https://platform.claude.com/docs/en/build-with-claude/vision), [TypeScript SDK](https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/typescript), [API Key Best Practices](https://support.claude.com/en/articles/9767949-api-key-best-practices-keeping-your-keys-safe-and-secure), [Get started with custom connectors using remote MCP](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp).
- Model Context Protocol: [Transports](https://modelcontextprotocol.io/specification/latest/basic/transports).
- Cloudflare: [Build a Remote MCP server](https://developers.cloudflare.com/agents/guides/remote-mcp-server/), [createMcpHandler](https://developers.cloudflare.com/agents/api-reference/mcp-handler-api/), [Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/), [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/), [KV limits](https://developers.cloudflare.com/kv/platform/limits/), [D1 limits](https://developers.cloudflare.com/d1/platform/limits/).
- Распознавание речи: [MDN: SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition), [New in Chrome 139](https://developer.chrome.com/blog/new-in-chrome-139), [OpenAI: Speech to text](https://developers.openai.com/api/docs/guides/speech-to-text), [OpenAI: Pricing](https://developers.openai.com/api/docs/pricing), [Deepgram: Pricing](https://deepgram.com/pricing), [Deepgram: Models & Languages](https://developers.deepgram.com/docs/models-languages-overview), [AssemblyAI: Pricing](https://www.assemblyai.com/pricing), [ElevenLabs: Speech to Text](https://elevenlabs.io/docs/capabilities/speech-to-text), [ElevenLabs: API pricing](https://elevenlabs.io/pricing/api), [Transformers.js](https://huggingface.co/docs/transformers.js/index), [Transformers.js: WebGPU](https://huggingface.co/docs/transformers.js/guides/webgpu), [whisper.cpp](https://github.com/ggml-org/whisper.cpp).
- Захват: [MDN: share_target](https://developer.mozilla.org/en-US/docs/Web/Manifest/share_target), [Receiving shared data with the Web Share Target API](https://developer.chrome.com/docs/capabilities/web-apis/web-share-target), [capacitor-share-target](https://github.com/Cap-go/capacitor-share-target), [send-intent](https://github.com/carsten-klaffke/send-intent), [Interact with NFC devices on Chrome for Android](https://developer.chrome.com/docs/capabilities/nfc).
- Google: [Calendar API: Manage quotas](https://developers.google.com/workspace/calendar/api/guides/quota), [Calendar: Freebusy: query](https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query), [Tasks API: Resource tasks](https://developers.google.com/workspace/tasks/reference/rest/v1/tasks), [Docs API: documents.create](https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/create), [Drive: Store application-specific data](https://developers.google.com/workspace/drive/api/guides/appdata), [Drive: Choose scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth), [Sheets API: Usage limits](https://developers.google.com/workspace/sheets/api/limits), [Gmail: users.messages.list](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list), [Gmail: Choose scopes](https://developers.google.com/workspace/gmail/api/auth/scopes), [Restricted scope verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification), [Maps: March 2025 changes](https://developers.google.com/maps/billing-and-pricing/march-2025), [Maps: Pricing](https://developers.google.com/maps/billing-and-pricing/pricing), [Manage app audience](https://support.google.com/cloud/answer/15549945), [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2), [Token types](https://docs.cloud.google.com/docs/authentication/token-types), [Using the token model](https://developers.google.com/identity/oauth2/web/guides/use-token-model).
- Геозоны: [Capgo background-geolocation](https://github.com/Cap-go/capacitor-background-geolocation), [Transistor Software background-geolocation](https://github.com/transistorsoft/capacitor-background-geolocation), [Transistor Software: Purchase](https://docs.transistorsoft.com/purchase/?platform=capacitor).
- Уведомления: [Telegram Bot API](https://core.telegram.org/bots/api), [Telegram Bots FAQ](https://core.telegram.org/bots/faq), [MDN: Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API), [RFC 8292](https://datatracker.ietf.org/doc/html/rfc8292), [WebKit: Web Push for Web Apps on iOS and iPadOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/), [web-push](https://github.com/web-push-libs/web-push), [Resend: Pricing](https://resend.com/pricing), [Postmark: Pricing](https://postmarkapp.com/pricing).
- Здоровье и контекст: [Health Connect: Get started](https://developer.android.com/health-and-fitness/health-connect/get-started), [capacitor-health](https://github.com/mley/capacitor-health), [@capgo/capacitor-health](https://github.com/Cap-go/capacitor-health), [Open-Meteo: Terms](https://open-meteo.com/en/terms), [Spotify: Quota modes](https://developer.spotify.com/documentation/web-api/concepts/quota-modes), [Spotify: Changes to the Web API](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api), [Spotify: Update on developer access](https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security).
- Импорт: [Notion: Request limits](https://developers.notion.com/reference/request-limits), [Notion: Upgrading to 2025-09-03](https://developers.notion.com/guides/get-started/upgrade-guide-2025-09-03), [Todoist API v1](https://developer.todoist.com/api/v1/), [Todoist: Find your API token](https://www.todoist.com/help/articles/find-your-api-token-Jpzx9IIlB), [Obsidian: Properties](https://obsidian.md/help/properties), [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html), [n8n: LICENSE.md](https://github.com/n8n-io/n8n/blob/master/LICENSE.md), [Zapier: Pricing](https://zapier.com/pricing).
