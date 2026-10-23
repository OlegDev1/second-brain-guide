// Glossary for <Term> tooltips and /ref/glossary.
// Seeded from the terminology table in docs/spec/00-general.md; part 10 adds new terms.

export interface GlossaryEntry {
	/** Stable id, used as <Term id="..."> and as the anchor on /ref/glossary. */
	id: string;
	/** Russian term as used on the site. */
	term: string;
	/** English original. */
	en: string;
	/** One-line definition in Russian. */
	short: string;
}

export const glossary: GlossaryEntry[] = [
	{ id: 'project', term: 'проект', en: 'project', short: 'Проект в Claude Code: координатор и потоки.' },
	{ id: 'coordinator', term: 'координатор', en: 'coordinator', short: 'Разговор проекта, который делит работу на задачи и читает отчёты.' },
	{ id: 'thread', term: 'поток', en: 'thread', short: 'Полноценная облачная сессия для одной задачи, со своей веткой и PR.' },
	{ id: 'subagent', term: 'субагент', en: 'subagent', short: 'Побочная задача внутри потока: свой контекст, в ответ — краткая сводка.' },
	{ id: 'context-window', term: 'контекстное окно', en: 'context window', short: 'Всё, что модель читает на каждом шаге.' },
	{ id: 'token', term: 'токен', en: 'token', short: 'Единица текста, которую модель читает и пишет. Лимиты считают в токенах.' },
	{ id: 'cache', term: 'кэш', en: 'cache', short: 'Скидка за повторное чтение неизменного начала истории.' },
	{ id: 'compaction', term: 'сжатие', en: 'compaction', short: 'Пересказ истории, когда она подходит к лимиту.' },
	{ id: 'spec', term: 'ТЗ', en: 'spec', short: 'Документ, который описывает, что нужно построить.' },
	{ id: 'project-instructions', term: 'инструкции проекта', en: 'project instructions', short: 'Текст, с которого начинается каждый поток.' },
	{ id: 'project-memory', term: 'память проекта', en: 'project memory', short: 'Заметки, которые Claude ведёт по проекту (MEMORY.md).' },
	{ id: 'skill', term: 'навык', en: 'skill', short: 'Инструкции, которые подгружаются, когда задача им подходит (SKILL.md).' },
	{ id: 'repository', term: 'репозиторий', en: 'repository', short: 'Папка проекта с полной историей на GitHub.' },
	{ id: 'commit', term: 'коммит', en: 'commit', short: 'Сохранённый снимок с сообщением и хэшем.' },
	{ id: 'hash', term: 'хэш', en: 'hash', short: 'Отпечаток коммита (SHA).' },
	{ id: 'branch', term: 'ветка', en: 'branch', short: 'Подвижный указатель на цепочку коммитов.' },
	{ id: 'pull-request', term: 'пул-реквест (PR)', en: 'pull request', short: 'Запрос на то, чтобы влить ветку в main.' },
	{ id: 'merge', term: 'мердж', en: 'merge', short: 'Вливание одной ветки в другую.' },
	{ id: 'conflict', term: 'конфликт', en: 'conflict', short: 'Два изменения в одном и том же месте.' },
	{ id: 'revert', term: 'откат коммитом (revert)', en: 'revert', short: 'Новый коммит, который отменяет старый.' },
	{ id: 'deploy', term: 'деплой', en: 'deploy', short: 'Публикация сайта или приложения.' },
	{ id: 'pwa', term: 'PWA', en: 'PWA', short: 'Веб-приложение, которое можно установить на телефон.' },
	{ id: 'mcp', term: 'MCP', en: 'MCP', short: 'Протокол для подключения инструментов и данных к Claude.' }
];

export function getTerm(id: string): GlossaryEntry | undefined {
	return glossary.find((entry) => entry.id === id);
}
