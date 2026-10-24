// Glossary for <Term> tooltips and /ref/glossary.
// Seeded from the terminology table in docs/spec/00-general.md; part 10 added the
// new terms from every part's notes file and a chapter link for each entry.

export interface GlossaryEntry {
	/** Stable id, used as <Term id="..."> and as the anchor on /ref/glossary. */
	id: string;
	/** Russian term as used on the site. */
	term: string;
	/** English original. */
	en: string;
	/** One-line definition in Russian. */
	short: string;
	/** Root-relative link to the chapter section that explains the term. */
	chapter: string;
}

export const glossary: GlossaryEntry[] = [
	{ id: 'project', term: 'проект', en: 'project', short: 'Проект в Claude Code: координатор и потоки.', chapter: '/guide/02-project#what-is-project' },
	{ id: 'coordinator', term: 'координатор', en: 'coordinator', short: 'Разговор проекта, который делит работу на задачи и читает отчёты.', chapter: '/guide/07-agent-team#coordinator' },
	{ id: 'thread', term: 'поток', en: 'thread', short: 'Полноценная облачная сессия для одной задачи, со своей веткой и PR.', chapter: '/guide/07-agent-team#threads' },
	{ id: 'subagent', term: 'субагент', en: 'subagent', short: 'Побочная задача внутри потока: свой контекст, в ответ — краткая сводка.', chapter: '/guide/01-how-agents-work#subagent' },
	{ id: 'context-window', term: 'контекстное окно', en: 'context window', short: 'Всё, что модель читает на каждом шаге.', chapter: '/guide/01-how-agents-work#context' },
	{ id: 'token', term: 'токен', en: 'token', short: 'Единица текста, которую модель читает и пишет. Лимиты считают в токенах.', chapter: '/guide/09-tokens-limits#formula' },
	{ id: 'cache', term: 'кэш', en: 'cache', short: 'Скидка за повторное чтение неизменного начала истории.', chapter: '/guide/01-how-agents-work#cache' },
	{ id: 'compaction', term: 'сжатие', en: 'compaction', short: 'Пересказ истории, когда она подходит к лимиту.', chapter: '/guide/01-how-agents-work#compaction' },
	{ id: 'spec', term: 'ТЗ', en: 'spec', short: 'Документ, который описывает, что нужно построить.', chapter: '/guide/03-specs-prompts#why-spec' },
	{ id: 'project-instructions', term: 'инструкции проекта', en: 'project instructions', short: 'Текст, с которого начинается каждый поток.', chapter: '/guide/04-project-files#thread-start' },
	{ id: 'project-memory', term: 'память проекта', en: 'project memory', short: 'Заметки, которые Claude ведёт по проекту (MEMORY.md).', chapter: '/guide/04-project-files#outside-repo' },
	{ id: 'skill', term: 'навык', en: 'skill', short: 'Инструкции, которые подгружаются, когда задача им подходит (SKILL.md).', chapter: '/guide/04-project-files#skills' },
	{ id: 'repository', term: 'репозиторий', en: 'repository', short: 'Папка проекта с полной историей на GitHub.', chapter: '/guide/05-git-github#git-vs-github' },
	{ id: 'commit', term: 'коммит', en: 'commit', short: 'Сохранённый снимок с сообщением и хэшем.', chapter: '/guide/05-git-github#commit' },
	{ id: 'hash', term: 'хэш', en: 'hash', short: 'Отпечаток коммита (SHA).', chapter: '/guide/05-git-github#hash' },
	{ id: 'branch', term: 'ветка', en: 'branch', short: 'Подвижный указатель на цепочку коммитов.', chapter: '/guide/05-git-github#branch' },
	{ id: 'pull-request', term: 'пул-реквест (PR)', en: 'pull request', short: 'Запрос на то, чтобы влить ветку в main.', chapter: '/guide/05-git-github#pull-request' },
	{ id: 'merge', term: 'мердж', en: 'merge', short: 'Вливание одной ветки в другую.', chapter: '/guide/05-git-github#merge-methods' },
	{ id: 'conflict', term: 'конфликт', en: 'conflict', short: 'Два изменения в одном и том же месте.', chapter: '/guide/05-git-github#conflict' },
	{ id: 'revert', term: 'откат коммитом (revert)', en: 'revert', short: 'Новый коммит, который отменяет старый.', chapter: '/guide/05-git-github#revert' },
	{ id: 'deploy', term: 'деплой', en: 'deploy', short: 'Публикация сайта или приложения.', chapter: '/guide/12-deploy#what-is-deploy' },
	{ id: 'pwa', term: 'PWA', en: 'PWA', short: 'Веб-приложение, которое можно установить на телефон.', chapter: '/guide/10-stack-speed#android' },
	{ id: 'mcp', term: 'MCP', en: 'MCP', short: 'Протокол для подключения инструментов и данных к Claude.', chapter: '/guide/04-project-files#mcp' },

	// Added by part 10 from the notes files of parts 02–09.
	{ id: 'squash', term: 'squash', en: 'squash and merge', short: 'Мердж, при котором все коммиты ветки склеиваются в один.', chapter: '/guide/05-git-github#merge-methods' },
	{ id: 'diff', term: 'дифф', en: 'diff', short: 'Какие строки добавлены и какие удалены между двумя версиями.', chapter: '/guide/05-git-github#pull-request' },
	{ id: 'force-push', term: 'force push', en: 'force push', short: 'Принудительная перезапись ветки на GitHub твоей версией; может стереть чужие коммиты.', chapter: '/guide/05-git-github#protected-main' },
	{ id: 'reset', term: 'reset', en: 'reset', short: 'Перенос ветки назад на старый коммит; поздние коммиты пропадают из ветки.', chapter: '/guide/05-git-github#reset' },
	{ id: 'tag', term: 'тег', en: 'tag', short: 'Неподвижная закладка с именем на важном коммите, например v0.1.', chapter: '/guide/05-git-github#releases' },
	{ id: 'branch-protection', term: 'правило защиты ветки', en: 'branch protection rule', short: 'Настройка GitHub, которая запрещает force push и удаление ветки и может требовать PR.', chapter: '/guide/05-git-github#protected-main' },
	{ id: 'fork', term: 'форк', en: 'fork', short: 'Копия репозитория на GitHub со всей историей, связанная с оригиналом.', chapter: '/guide/05-git-github#reuse' },
	{ id: 'model', term: 'модель', en: 'model', short: 'Нейросеть, которая читает контекст и пишет следующий шаг.', chapter: '/guide/01-how-agents-work#layers' },
	{ id: 'harness', term: 'обвязка (harness)', en: 'agent harness', short: 'Программа вокруг модели, которая запускает инструменты и собирает запросы; это Claude Code, а не файл.', chapter: '/guide/04-project-files#harness' },
	{ id: 'tool', term: 'инструмент', en: 'tool', short: 'Действие, которое программа выполняет для модели: прочитать файл, запустить команду.', chapter: '/guide/01-how-agents-work#loop' },
	{ id: 'agent-loop', term: 'цикл агента', en: 'agent loop', short: 'Запрос → модель выбирает шаг → инструмент работает → результат в историю → новый запрос.', chapter: '/guide/01-how-agents-work#loop' },
	{ id: 'context-rot', term: 'деградация длинного контекста', en: 'context rot', short: 'Точность модели падает, когда контекст растёт.', chapter: '/guide/01-how-agents-work#research' },
	{ id: 'session-limit', term: 'пятичасовой лимит', en: 'session limit', short: 'Часть лимита плана, которая сбрасывается каждые пять часов.', chapter: '/guide/09-tokens-limits#limits' },
	{ id: 'weekly-limit', term: 'недельный лимит', en: 'weekly limit', short: 'Часть лимита плана, которая сбрасывается раз в неделю.', chapter: '/guide/09-tokens-limits#limits' },
	{ id: 'usage-credits', term: 'платные кредиты', en: 'usage credits', short: 'Оплаченное заранее использование сверх лимитов плана, по ценам API.', chapter: '/guide/09-tokens-limits#usage-credits' },
	{ id: 'effort', term: 'усилие (effort)', en: 'effort', short: 'Сколько модель думает на каждом шаге; чем выше, тем дороже.', chapter: '/guide/07-agent-team#models' },
	{ id: 'vertical-slice', term: 'вертикальный срез', en: 'vertical slice', short: 'Одна фича целиком, от экрана до хранения, чтобы рано проверить весь путь.', chapter: '/guide/02-project#slices' },
	{ id: 'agent-team', term: 'команда агентов (agent teams)', en: 'agent teams', short: 'Экспериментальный режим Claude Code: главная сессия запускает напарников, и они пишут друг другу.', chapter: '/guide/07-agent-team#subagents' },
	{ id: 'checkpoint', term: 'контрольная точка', en: 'checkpoint', short: 'Заранее назначенный момент, где ты проверяешь работу, прежде чем идти дальше.', chapter: '/guide/02-project#checkpoints' },
	{ id: 'mvp', term: 'MVP', en: 'MVP', short: 'Самая маленькая версия приложения, которой уже можно пользоваться каждый день.', chapter: '/guide/02-project#waves' },
	{ id: 'acceptance-criteria', term: 'критерии приёмки', en: 'acceptance criteria', short: 'Проверки, после которых фича считается готовой; каждая занимает минуту руками.', chapter: '/guide/03-specs-prompts#acceptance' },
	{ id: 'bug-report', term: 'баг-репорт', en: 'bug report', short: 'Сообщение о баге, по которому его может повторить любой: шаги, ожидание, результат, устройство.', chapter: '/guide/03-specs-prompts#bug-report' },
	{ id: 'hook', term: 'хук', en: 'hook', short: 'Команда, которую Claude Code запускает сам в нужный момент, например после каждой правки.', chapter: '/advanced/a3-claude-code-advanced#hooks' },
	{ id: 'permission-rule', term: 'правило разрешений', en: 'permission rule', short: 'Запись allow, ask или deny в .claude/settings.json.', chapter: '/guide/13-security#permissions' },
	{ id: 'connector', term: 'коннектор', en: 'connector', short: 'MCP-сервер, подключённый один раз к аккаунту claude.ai; им пользуются облачные потоки.', chapter: '/advanced/a3-claude-code-advanced#mcp' },
	{ id: 'library', term: 'Library', en: 'Library', short: 'Вкладка проекта с загруженными файлами и файлами от потоков; загрузки — это копии.', chapter: '/guide/06-sync#library-copies' },
	{ id: 'sandbox', term: 'песочница', en: 'sandbox', short: 'Временная облачная машина, где работает поток; её могут забрать после простоя.', chapter: '/guide/06-sync#commit-often' },
	{ id: 'indexeddb', term: 'IndexedDB', en: 'IndexedDB', short: 'База данных браузера на устройстве, привязанная к адресу сайта.', chapter: '/guide/06-sync#data-on-phone' },
	{ id: 'backup', term: 'бэкап', en: 'backup', short: 'Файл экспорта, который лежит не на телефоне.', chapter: '/guide/06-sync#backup' },
	{ id: 'framework', term: 'фреймворк', en: 'framework', short: 'Готовый каркас для экранов, который сам обновляет интерфейс при изменении данных.', chapter: '/guide/10-stack-speed#framework' },
	{ id: 'rune', term: 'руна', en: 'rune', short: 'Символ Svelte 5 вроде $state или $derived, который управляет компилятором.', chapter: '/guide/10-stack-speed#why-svelte' },
	{ id: 'bundle', term: 'бандл', en: 'bundle', short: 'JavaScript-файлы, которые браузер скачивает, чтобы запустить приложение.', chapter: '/advanced/a5-performance' },
	{ id: 'web-worker', term: 'воркер', en: 'web worker', short: 'Фоновый поток браузера для тяжёлой работы, чтобы экран не зависал.', chapter: '/guide/10-stack-speed#workers' },
	{ id: 'capacitor', term: 'Capacitor', en: 'Capacitor', short: 'Нативная оболочка, которая превращает веб-приложение в приложение для Android или iOS.', chapter: '/guide/10-stack-speed#android' },
	{ id: 'module', term: 'модуль', en: 'module', short: 'Одна функция приложения целиком, в своей папке, например src/modules/focus/.', chapter: '/guide/11-architecture#module' },
	{ id: 'architecture', term: 'архитектура', en: 'architecture', short: 'План приложения: что где лежит и кто с кем разговаривает.', chapter: '/guide/11-architecture#what' },
	{ id: 'data-model', term: 'модель данных', en: 'data model', short: 'Форма данных: какие поля есть у записи. Не путать с нейросетью.', chapter: '/guide/11-architecture#terms' },
	{ id: 'core', term: 'ядро', en: 'core', short: 'Общая часть приложения, на которую опираются все модули: хранение, меню, общие кнопки.', chapter: '/guide/11-architecture#terms' },
	{ id: 'event', term: 'событие', en: 'event', short: 'Сообщение «что-то произошло», которое модуль рассылает остальным.', chapter: '/guide/11-architecture#events' },
	{ id: 'stack', term: 'стек', en: 'stack', short: 'Набор инструментов, из которых собрано приложение: фреймворк, база, оболочка для телефона.', chapter: '/guide/10-stack-speed#what-is-stack' },
	{ id: 'migration', term: 'миграция', en: 'migration', short: 'Код, который переводит сохранённые записи на новую версию схемы.', chapter: '/guide/11-architecture#versions' },
	{ id: 'unit-test', term: 'юнит-тест', en: 'unit test', short: 'Короткий тест одной функции, без интерфейса.', chapter: '/guide/08-testing#levels' },
	{ id: 'e2e-test', term: 'end-to-end тест', en: 'end-to-end test', short: 'Тест, который прокликивает приложение в браузере, как пользователь.', chapter: '/guide/08-testing#levels' },
	{ id: 'api-key', term: 'API-ключ', en: 'API key', short: 'Секретная строка, по которой платный сервис узнаёт тебя.', chapter: '/guide/13-security#keys' },
	{ id: 'prompt-injection', term: 'инъекция промпта', en: 'prompt injection', short: 'Текст на странице или в файле, который пытается командовать агентом.', chapter: '/guide/13-security#injection' },
	{ id: 'local-first', term: 'local-first', en: 'local-first', short: 'Главная копия данных живёт на устройстве, а сервер только помогает копиям встретиться.', chapter: '/advanced/a1-local-first' },
	{ id: 'crdt', term: 'CRDT', en: 'CRDT', short: 'Структура данных, которую две копии сливают без сервера и без конфликтов.', chapter: '/advanced/a1-local-first' },
	{ id: 'embedding', term: 'эмбеддинг', en: 'embedding', short: 'Вектор чисел, который кодирует смысл текста, для поиска по смыслу.', chapter: '/advanced/a2-integrations' },
	{ id: 'web-vitals', term: 'Web Vitals', en: 'Web Vitals', short: 'Метрики Google для загрузки, отклика и стабильности вёрстки: LCP, INP, CLS.', chapter: '/advanced/a5-performance' },
	{ id: 'routine', term: 'рутина', en: 'routine', short: 'Облачная задача, которая запускается по расписанию без разговора.', chapter: '/advanced/a3-claude-code-advanced#routines' },
	{ id: 'remote-control', term: 'Remote Control', en: 'Remote Control', short: 'Запуск потока проекта на своём компьютере, с его программами и файлами.', chapter: '/advanced/a3-claude-code-advanced#remote-control' },
	{ id: 'ci', term: 'CI', en: 'continuous integration', short: 'Автоматические проверки, которые запускаются на каждый PR.', chapter: '/advanced/a4-ci-cd#pipeline' },
	{ id: 'batch-api', term: 'пакетная обработка', en: 'Batch API', short: 'Запросы к API, которые выполняются в фоне за полцены.', chapter: '/advanced/a6-economics#savings' }
];

export function getTerm(id: string): GlossaryEntry | undefined {
	return glossary.find((entry) => entry.id === id);
}
