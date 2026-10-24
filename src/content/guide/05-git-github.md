---
title: Git и GitHub
part: "02"
order: 5
slug: 05-git-github
time: 20
level: basic
prereqs: [guide/02-project]
updated: 2026-10-23
description: Как Git хранит историю, зачем каждому потоку своя ветка и как откатить любую ошибку, не потеряв работу.
---

<script>
	import CommitGraph from '$lib/components/git/CommitGraph.svelte';
</script>

<LessonHeader
	learn={[
		'Чем Git отличается от GitHub',
		'Что такое коммит, хэш, ветка и пул-реквест',
		'Зачем каждому потоку своя ветка и почему main под защитой',
		'Как откатить любую ошибку и ничего не потерять'
	]}
/>

<TLDR>

Git — это программа, которая хранит каждую версию проекта, как цепочку сохранений в игре (коммитов). GitHub держит эту цепочку в интернете, чтобы она не потерялась и была доступна отовсюду. Каждый помощник работает в своей отдельной копии (ветке) и не мешает остальным, а готовую работу приносит в главную версию (`main`) через заявку на проверку (PR). Если что-то сломалось, ошибку отменяют новым сохранением (revert): старая история остаётся целой, ничего не пропадает.

</TLDR>

## Git и GitHub: история и облако {#git-vs-github}

**Git** — программа, которая хранит историю папки проекта: каждую версию, которую ты сохранил. Она знает, что поменялось, когда и кто это сделал. Если что-то сломалось, Git помнит, как было до этого.

**GitHub** — сайт, где эта история хранится в облаке. Туда <Term id="thread">потоки</Term> отправляют свою работу, там ты читаешь их <Term id="pull-request">PR</Term> и нажимаешь кнопку <Term id="merge">мерджа</Term>. Git — механизм истории, GitHub — место, где она лежит и где с ней удобно работать.

Папка проекта вместе со всей историей называется <Term id="repository">репозиторий</Term>. У твоего «второго мозга» он один: в нём Inbox, задачи, таймер фокуса, привычки и всё остальное.

Создавай репозиторий приватным: при создании выбери **Private**. Приватный репозиторий видишь только ты и те, кому ты дал доступ. Публичный может открыть любой человек, а пользователи GitHub вправе сделать себе его копию — форк.

Как код ходит между облаком, ноутбуком и хостингом, разберём в главе [«Синхронизация»](/guide/06-sync). Здесь — только история.

## Коммит — снимок с подписью {#commit}

{null}<Term id="commit">Коммит</Term> — сохранённый снимок всех файлов проекта в один момент. К снимку прикреплены сообщение, автор, время и ссылка на предыдущий коммит. Из таких ссылок и складывается история: каждый коммит знает своего «родителя».

Сообщение отвечает на вопрос «что изменилось»: `Add focus timer`, `Fix pause in focus timer`. Потоки пишут сообщения сами, а ты по ним потом находишь нужный момент.

Коммит — не правка одного файла, а снимок всего проекта. Поэтому к любому коммиту можно вернуться целиком: и Inbox, и таймер будут такими, какими были в ту минуту.

### Хэш — отпечаток коммита {#hash}

У каждого коммита есть <Term id="hash">хэш</Term> — уникальный номер вроде `d7bd7911ade2f5d26b2408ba441faaa7a0262354`. Это 40 символов: цифры и буквы от a до f. Обычно хватает первых семи — `d7bd791`: столько Git и показывает в короткой истории.

Вот история маленького проекта, по строке на коммит. Свежий коммит — сверху:

```text title="git log --oneline"
d7bd791 Make focus 50 minutes
2f61c23 Merge pull request #3 from feature/pick-for-me
61f095e Explain pick-for-me
49abc1b Add pick-for-me button
ac97c1d Add focus timer
5d16eab Add Inbox screen
```

Хэш — твой способ точно сказать агенту, о каком моменте речь: «верни как было в `ac97c1d`». Короткие хэши ты будешь часто видеть в истории и в отчётах потоков.

Историю нельзя тихо подделать. Хэш считается из содержимого коммита, а в содержимое входит хэш родителя. Поменяй хоть букву в старом коммите — изменится его хэш, а за ним хэши всех коммитов после него.

<Deeper title="Что внутри коммита">

Коммит — маленький текстовый объект. `HEAD` значит «коммит, на котором ты сейчас», и Git может показать его целиком:

```text title="git cat-file -p HEAD"
tree b8cff7a242e4400bd117c30c9e3f6a8beca36c0a
parent 2f61c23e546248778b30bd41f144ffc0c9b38e3b
author Ты <you@example.com> 1791270000 +0300
committer Ты <you@example.com> 1791270000 +0300

Make focus 50 minutes
```

- `tree` — ссылка на снимок всех файлов.
- `parent` — полный хэш предыдущего коммита. У коммита-мерджа родителей два.
- `author` и `committer` — кто и когда. Число — секунды с 1 января 1970 года, `+0300` — часовой пояс.
- Последняя строка — сообщение.

Хэш коммита считается по всему этому тексту алгоритмом SHA-1. Поэтому правка одной буквы в сообщении самого старого коммита меняет все шесть хэшей из примера выше: `d7bd791`, например, превращается в `65cfd56`.

Git постепенно переходит с SHA-1 на более стойкий SHA-256. Идея при этом та же: отпечаток зависит от содержимого и от родителя.

</Deeper>

## Ветка — подвижная закладка {#branch}

{null}<Term id="branch">Ветка</Term> — подвижный указатель на коммит. Представь закладку, которая сама переезжает на новую страницу, когда ты её дописал. Новый коммит в ветке — и указатель сдвигается на него.

Главная ветка называется `main`: так GitHub по умолчанию называет её в каждом новом репозитории. В `main` лежит рабочая версия приложения — та, что уходит на <Term id="deploy">деплой</Term> и которой ты пользуешься.

Создать ветку — значит поставить ещё одну закладку на тот же коммит. Дальше коммиты новой ветки идут своей линией, а `main` стоит на месте. Вот как это выглядит в истории выше:

<CommitGraph />

Поток сделал ветку от «Таймера фокуса», добавил в ней кнопку «Выбери за меня» и пояснение. Потом ветку влили в `main` через PR #3. Ниже — ошибочный коммит и его отмена, о ней поговорим в разделе [про откат](#rollback).

### Зачем каждому потоку своя ветка {#thread-branch}

Каждый <Term id="thread">поток</Term> в проекте начинает новую ветку от `main` и работает только в ней (проверено: октябрь 2026). Один поток делает «Выбери за меня», другой — напоминания о звонках клиентам. Они не видят черновиков друг друга и не портят друг другу файлы.

Их работа встречается только в `main` и только через PR, который ты проверил. Если поток сделал ерунду, ты просто не вливаешь его ветку, и `main` остаётся чистым. Как координатор раздаёт задачи потокам, разобрано в главах [«Проект»](/guide/02-project) и [«Команда агентов»](/guide/07-agent-team).

## PR — заявка на вход в main {#pull-request}

{null}<Term id="pull-request">Пул-реквест</Term> — заявка «влейте мою ветку в `main`». Это главное место проверки: всё, что поменял поток, ты видишь до того, как оно попадёт в рабочую версию.

На странице PR три вкладки, которые стоит открыть:

- **Conversation** — описание задачи, комментарии и отзывы.
- **Files changed** — дифф: какие строки добавлены, какие удалены.
- **Checks** — автоматические проверки, например сборка и тесты.

Если всё в порядке, ты нажимаешь кнопку мерджа. <Term id="merge">Мердж</Term> — вливание одной ветки в другую.

### Три способа влить ветку {#merge-methods}

GitHub предлагает три способа мерджа:

- **Create a merge commit** — коммиты ветки попадают в `main` вместе с отдельным коммитом-мерджем.
- **Squash and merge** — все коммиты ветки склеиваются в один коммит в `main`.
- **Rebase and merge** — коммиты ветки встают в `main` по одному, без коммита-мерджа.

Для твоего проекта подойдёт любой. Squash даёт самую короткую историю: одна задача — один коммит в `main`, его легко найти и отменить.

## Конфликт: две правки в одном месте {#conflict}

{null}<Term id="conflict">Конфликт</Term> случается, когда две ветки по-разному поменяли одно и то же место в одном файле. Например, один поток назвал экран задач «Мои задачи», а другой — «Задачи на сегодня». Git не знает, какой вариант тебе нужен, и останавливается.

В файле конфликт выглядит так:

```text title="src/tasks.js во время конфликта"
<<<<<<< HEAD
export const TITLE = 'Задачи на сегодня';
=======
export const TITLE = 'Мои задачи';
>>>>>>> main
```

Сверху — версия текущей ветки, снизу — версия из `main`. Разрешить конфликт — значит оставить нужный вариант или собрать из двух один, а строки-разделители удалить.

Кто это делает:

- **Поток.** Когда у PR потока конфликт, на его карточке в разговоре может появиться кнопка **Resolve conflicts**. Она отправляет потоку это поручение от твоего имени, и он разбирается в своей ветке (проверено: октябрь 2026).
- **Ты на GitHub.** Кнопка **Resolve conflicts** внизу PR открывает редактор прямо на сайте. Он справляется только с простыми случаями, когда обе ветки поменяли одни и те же строки. Сложное отдай потоку.

Сам поток конфликт может не заметить: GitHub не присылает событие, когда `main` уехал вперёд и появился конфликт (проверено: октябрь 2026). Поэтому нажать кнопку или написать «разреши конфликт с `main`» — твоя часть работы.

Лучшая защита от конфликтов — делить задачи так, чтобы потоки трогали разные файлы. Как это делать, разобрано в главе [«Команда агентов»](/guide/07-agent-team).

## Почему main под защитой {#protected-main}

`main` — единственный источник правды. Из него собирается приложение, от него потоки начинают новые ветки. Сломан `main` — сломано всё, что от него зависит.

Поэтому два правила:

1. В `main` попадает только то, что прошло через PR.
2. В `main` никогда не делают force push — принудительную перезапись истории. Почему он опасен, разберём в разделе [про reset](#reset).

GitHub умеет следить за этим сам: для этого есть правило защиты ветки (branch protection rule) и набор правил (ruleset). Правило защиты по умолчанию запрещает force push и удаление ветки, а ещё может требовать одобренный PR и пройденные проверки. Но на бесплатном плане GitHub и то и другое работает только в публичных репозиториях, а для приватных нужен план Pro, Team или Enterprise.

Облачные потоки `main` сами не охраняют. Их связь с GitHub не даёт удалять ветки, но не ограничивает, в какую ветку можно пушить (проверено: октябрь 2026). Поэтому впиши правило в <Term id="project-instructions">инструкции проекта</Term> (Project settings → Memory → Project instructions) — с них начинает каждый поток (проверено: октябрь 2026):

<PhraseCard
	title="Правило для инструкций проекта"
	text="Никогда не пушь в main напрямую и никогда не делай force push. Любое изменение — только через PR в новой ветке. Не мерджи без моего OK."
	when="Один раз, при настройке проекта"
/>

Инструкция — договорённость, а не замок: поток ей следует, но это не жёсткая настройка (проверено: октябрь 2026). Если репозиторий публичный или план платный, включи ещё и защиту ветки на GitHub.

## Как читать историю {#history}

История на GitHub отвечает на три вопроса: что поменялось, кто это сделал и когда. Вот где искать ответы:

- **Список коммитов** ветки: сообщение, автор, дата, короткий хэш. Нажми на коммит — увидишь его дифф.
- **Дифф** показывает, что именно поменялось: добавленные строки отмечены плюсом, удалённые — минусом.
- **История файла** — только коммиты, которые меняли этот файл. Удобно, когда ищешь, в какой момент сломался таймер.
- **Blame** — кнопка над файлом. Рядом с каждой строкой видно, каким коммитом, кем и когда она поменяна последней. Нажми на сообщение — откроется сам коммит.
- **Compare** — сравнение двух веток, тегов или коммитов. Добавь `/compare` к адресу репозитория и выбери, что с чем сравнить.

Пример: в таймере стоит `FOCUS_MINUTES = 50`, а ты такого не просил. Открой файл, нажми **Blame** — рядом со строкой будет коммит `d7bd791 Make focus 50 minutes`. Теперь ты знаешь, что откатывать.

### Релизы и теги — точки сохранения {#releases}

Тег — закладка, которая никогда не двигается. Её ставят на важный коммит и дают имя: `v0.1`, `v0.2`. Ветка уезжает вперёд с каждым коммитом, а тег остаётся на месте.

Релиз на GitHub — это тег плюс описание. GitHub сам прикладывает архив кода в том виде, каким он был в момент тега. Получается точка сохранения: «вот версия, которая точно работала».

Как поставить первый: на главной странице репозитория справа от списка файлов нажми **Releases**, потом **Draft a new release**. В списке **Choose a tag** впиши `v0.1` и нажми **Create new tag**. Проверь, что в **Target** стоит `main`, и нажми **Publish release**.

Через git облачный поток тег на GitHub не отправит: его связь с GitHub пропускает только ветки (проверено: октябрь 2026). Поэтому релиз проще поставить самому на сайте.

## Откат: ничего не теряется {#rollback}

Главная мысль главы: в Git почти ничего не теряется. Любой коммит, попавший в `main`, можно найти и вернуть. Способов откатить несколько, и по риску они очень разные.

<Callout type="important" title="Частая ошибка">

«Откат стирает всё, что было после него» — это неправда про обычный откат. Так работает только `reset` вместе с force push. Обычный откат — revert — ничего не стирает: он добавляет новый коммит, который отменяет старый.

</Callout>

Команды ниже набирать не обязательно: их выполняет поток. Они здесь, чтобы ты понимал его отчёт и мог проверить, что сделано именно то, о чём ты просил.

<CompareTable caption="Четыре способа вернуться назад">

| | Revert | Вернуть один файл | Ветка от старого коммита | Reset + force push |
| --- | --- | --- | --- | --- |
| Что делает | Новый коммит отменяет старый | Берёт файл из старого коммита | Открывает старую версию рядом | Переносит ветку назад |
| История | Целая, отмена видна | Целая, возврат — новый коммит | Не меняется | Поздние коммиты пропадают из ветки |
| В main | Да, это способ по умолчанию | Да, через PR | `main` не трогается | Никогда |
| Когда брать | Отменить коммит или PR целиком | Сломан один файл, остальное нужно | Посмотреть старую версию | Убрать черновики из своей ветки |

</CompareTable>

### Revert — отмена новым коммитом {#revert}

{null}<Term id="revert">Откат коммитом (revert)</Term> создаёт новый коммит, который делает ровно обратное старому. Старый коммит остаётся в истории, рядом появляется его отмена. Если передумаешь, отмену тоже можно отменить.

Пример со схемы: кто-то поставил фокус на 50 минут, а тебе нужно 25.

```bash
git revert --no-edit d7bd791
# [main 0e30a8d] Revert "Make focus 50 minutes"
```

```text title="git log --oneline -3"
0e30a8d Revert "Make focus 50 minutes"
d7bd791 Make focus 50 minutes
2f61c23 Merge pull request #3 from feature/pick-for-me
```

Ошибочный коммит `d7bd791` на месте, но его изменения отменены.

Флаг `--no-edit` берёт стандартное сообщение и не открывает редактор.

### Откат PR кнопкой на GitHub {#revert-pr}

Если плохим оказался целый PR, его можно откатить без терминала. GitHub создаст новый PR, который отменяет мердж старого, а тебе останется его влить.

<Tabs labels={['Телефон', 'Компьютер']} group="device">
<Tab>

С телефона удобнее через поток. Открой проект на телефоне и отправь координатору фразу ниже. Когда поток откроет PR с откатом, нажми на его карточке **Merge it** или влей PR на GitHub (проверено: октябрь 2026).

<PhraseCard
	title="Откатить PR"
	text="Откати PR #3 через revert в новой ветке и открой PR. Ничего не форсь."
	when="Влитый PR что-то сломал"
/>

</Tab>
<Tab>

<Steps>
<Step title="Открой список PR">

Под названием репозитория нажми **Pull requests**.

</Step>
<Step title="Найди влитый PR" check="открыта страница того PR, который нужно отменить">

Найди в списке нужный PR и открой его.

</Step>
<Step title="Нажми Revert" check="появился новый PR, который отменяет старый">

Кнопка **Revert** — внизу страницы PR. Если её нет, у тебя нет прав на запись в репозиторий.

</Step>
<Step title="Влей новый PR" check="изменения старого PR исчезли из main, а оба PR остались в истории">

Загляни во вкладку **Files changed** и нажми кнопку мерджа, как обычно.

</Step>
</Steps>

</Tab>
</Tabs>

Если откат PR даёт конфликт или PR влили не через GitHub, кнопка не поможет. Тогда отменяют отдельные коммиты — это работа для потока.

### Вернуть один файл {#restore-file}

Бывает, что сломан один файл, а всё остальное в новых коммитах нужно. Тогда возвращают только его: берут файл из старого коммита и сохраняют новым коммитом.

```bash
git restore --source=ac97c1d -- src/timer.js
git commit -am "Restore timer from ac97c1d"
# [main 60a714f] Restore timer from ac97c1d
```

Первая команда кладёт в папку версию `src/timer.js` из коммита `ac97c1d`. Вторая сохраняет её новым коммитом. История целая: видно, что файл вернули и откуда.

<PhraseCard
	title="Вернуть один файл"
	text="Верни файл src/timer.js к версии из коммита ac97c1d отдельным коммитом в новой ветке и открой PR."
	when="Сломан один файл, остальные изменения нужны"
/>

### Посмотреть старую версию {#old-version}

Хочешь просто посмотреть, как было неделю назад? Создай ветку от старого коммита. `main` при этом не меняется, поэтому сломать ничего нельзя.

```bash
git switch -c look-back ac97c1d
# Switched to a new branch 'look-back'
```

Теперь в папке проект такой, каким он был в `ac97c1d`. Вернуться к свежей версии — `git switch main`.

Влить такую ветку в `main`, чтобы откатить его, не выйдет. Git увидит, что эти коммиты в `main` уже есть, и ответит `Already up to date.` Чтобы вернуть старое поведение по-настоящему, нужен revert.

<PhraseCard
	title="Посмотреть старую версию"
	text="Создай ветку от коммита ac97c1d, чтобы я мог посмотреть проект таким, как тогда. В main ничего не меняй."
	when="Хочешь увидеть, как было раньше, и ничего не ломать"
/>

### Reset и force push — крайний случай {#reset}

`git reset --hard` переставляет ветку назад, на старый коммит, и делает файлы такими же. Коммиты после него из ветки пропадают, а несохранённые правки в папке стираются. Если ветка уже на GitHub, обычный push откажет, и нужен force push — принудительная перезапись.

```bash
git reset --hard d7bd791
# HEAD is now at d7bd791 Make focus 50 minutes
git push --force-with-lease origin experiment
# + c8f940a...d7bd791 experiment -> experiment (forced update)
```

Здесь `experiment` — твоя собственная ветка с черновиками. `--force-with-lease` — осторожный вид force push: он откажет, если на GitHub ветка изменилась с тех пор, как ты видел её последний раз.

<Callout type="danger" title="Force push переписывает историю">

Force push заменяет ветку на GitHub твоей версией, и коммиты, которых нет в твоей копии, из неё пропадают — даже чужие. Никогда не делай его в `main` и в ветке, где работает кто-то ещё. Сомневаешься — бери revert.

</Callout>

<Deeper title="Можно ли вернуть коммиты после reset">

Иногда да. Git ведёт журнал `git reflog`: куда указывали ветки раньше. По нему можно найти хэш пропавшего коммита и вернуть его.

Но журнал локальный: он есть только в той копии репозитория, где делали reset. Копия облачного потока исчезает вместе с его машиной после простоя (проверено: октябрь 2026). На GitHub страница **Activity** репозитория покажет, что был force push и кто его сделал.

</Deeper>

### Как попросить агента {#ask-agent}

Команды помнить не нужно. Достаточно назвать коммит, способ и рамки. Главная фраза этой главы:

<PhraseCard
	title="Безопасный откат"
	text="Откати изменения после abc1234 через revert в новой ветке, открой PR, ничего не форсь."
	when="Что-то сломалось, и ты знаешь последний хороший коммит"
/>

Каждая часть закрывает свой риск:

- «после `abc1234`» — точная граница: всё, что было раньше, остаётся.
- «через revert» — история целая, откат можно отменить.
- «в новой ветке, открой PR» — ты увидишь дифф до того, как он попадёт в `main`.
- «ничего не форсь» — прямой запрет на force push.

Вместо `abc1234` подставь хэш последнего хорошего коммита. Найди его в списке коммитов на GitHub или через Blame.

## Ключ попал в репозиторий {#leaked-key}

Если в коммит попал пароль или API-ключ, сначала отзови его в сервисе, который его выдал, и выпусти новый. Revert и удаление файла не помогут: ключ останется в старых коммитах и во всех копиях репозитория. Чистка истории — второй шаг, и он непростой; как его делать, разобрано в главе [«Безопасность»](/guide/13-security).

## Код в другом проекте {#reuse}

Иногда хочется взять кусок «второго мозга» в новый проект, например таймер фокуса. Есть четыре пути:

- **Шаблон (template repository).** В настройках репозитория включи **Template repository**. Новый репозиторий из шаблона получит те же файлы, но начнёт историю с одного коммита. Подходит, чтобы начать похожий проект.
- **Форк (fork).** Копия репозитория на GitHub со всей историей, связанная с оригиналом. Нужен, чтобы предложить правку в чужой проект. Форк приватного репозитория тоже приватный.
- **Клон (clone).** Полная копия репозитория со всей историей — на компьютере или в облачном потоке. Так с кодом работают, а не переносят его.
- **Пакет.** Таймер выносят в отдельный модуль со своим файлом `package.json` и подключают в оба проекта. Исправление делаешь один раз, а проекты берут новую версию. Это задача для потока, когда модуль уже устоялся.

Пара слов о лицензии. Без лицензии на код действует обычное авторское право: копировать и распространять код без разрешения автора нельзя. Если берёшь чужой код, найди файл `LICENSE` и проверь, что он разрешает.

## Выводы {#takeaways}

<Takeaways>

- Git хранит историю как цепочку коммитов-снимков, GitHub держит её в облаке.
- Хэш — отпечаток коммита. Тихо подменить старый коммит нельзя: поменяются все хэши после него.
- Ветка — подвижная закладка. Каждый поток работает в своей ветке, в `main` всё приходит через PR.
- `main` — источник правды: только PR и никакого force push. Правило впиши в инструкции проекта.
- Revert — откат по умолчанию: новый коммит отменяет старый, ничего не теряется.
- «Откат стирает всё после» — это про reset с force push, а не про revert.

</Takeaways>

## Что сделать сейчас {#next-steps}

<Checklist
	id="guide-05-next-steps"
	title="Три шага"
	items={[
		'Открой репозиторий на GitHub и найди последний коммит: сообщение, автора и короткий хэш',
		'Добавь правило про main в инструкции проекта',
		'Скопируй фразу «Безопасный откат» в заметки, чтобы она была под рукой'
	]}
/>

## Источники {#sources}

- Pro Git: [What is Git?](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F), [Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell), [Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging), [Revision Selection](https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection), [Git Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects), [Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging).
- Справка Git: [git revert](https://git-scm.com/docs/git-revert), [git restore](https://git-scm.com/docs/git-restore), [git switch](https://git-scm.com/docs/git-switch), [git reset](https://git-scm.com/docs/git-reset), [git push](https://git-scm.com/docs/git-push), [git reflog](https://git-scm.com/docs/git-reflog), [git commit](https://git-scm.com/docs/git-commit).
- GitHub Docs, основы: [About GitHub and Git](https://docs.github.com/en/get-started/start-your-journey/about-github-and-git), [About repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories), [Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository), [About commits](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/about-commits), [Branches](https://docs.github.com/en/pull-requests/reference/branches).
- GitHub Docs, PR и защита: [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests), [About merge methods](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github), [Resolving a merge conflict on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github), [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches), [About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets), [Reverting a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/reverting-a-pull-request).
- GitHub Docs, история: [Viewing and understanding files](https://docs.github.com/en/repositories/working-with-files/using-files/viewing-and-understanding-files), [Comparing commits](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/viewing-and-comparing-commits/comparing-commits), [Differences between commit views](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/viewing-and-comparing-commits/differences-between-commit-views), [Activity view](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/using-the-activity-view-to-see-changes-to-a-repository), [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases), [Managing releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).
- GitHub Docs, ключи и перенос кода: [Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository), [Creating a template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository), [Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template), [About forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks), [Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository), [Licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).
- Claude Code Docs: [Projects](https://code.claude.com/docs/en/claude-projects), [Claude Code in the cloud](https://code.claude.com/docs/en/claude-code-on-the-web), [Cloud environments: GitHub proxy](https://code.claude.com/docs/en/cloud-environments).
- npm Docs: [About packages and modules](https://docs.npmjs.com/about-packages-and-modules).
