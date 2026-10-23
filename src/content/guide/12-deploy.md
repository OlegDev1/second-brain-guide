---
title: Деплой и запуск на телефоне
short: Деплой
part: "07"
order: 12
slug: 12-deploy
time: 15
level: basic
prereqs: [guide/05-git-github, guide/10-stack-speed]
updated: 2026-10-23
description: "Как превратить репозиторий в ссылку и иконку на телефоне: хостинг, GitHub Pages, PWA, APK через Capacitor и что в сайте публично."
---

<LessonHeader
	learn={[
		'Где разместить приложение и чем хостинги отличаются',
		'Как сделать первый деплой на GitHub Pages',
		'Как поставить PWA на Android и как приходят обновления',
		'Как собрать и подписать APK и что знать про Google Play',
		'Что в статическом сайте видно всем'
	]}
/>

<TLDR>

Хостинг берёт `main`, собирает сайт и отдаёт его по ссылке; каждый мердж — новая версия. С этой ссылки приложение ставится на Android как PWA, а APK через Capacitor нужен, когда PWA не хватает. Всё, что попало в код сайта, видит любой посетитель, поэтому ключам там не место.

</TLDR>

## Деплой — из main в ссылку {#what-is-deploy}

<Term id="deploy">Деплой</Term> — публикация приложения: собранные файлы уходят на сервер и открываются по ссылке. Для второго мозга это обычный статический сайт: HTML, CSS, JavaScript и картинки. Сервер ничего не вычисляет, он только отдаёт файлы.

Хостинг — сервис, который хранит эти файлы и отдаёт их в интернет. Его подключают к <Term id="repository">репозиторию</Term> один раз. Дальше каждый <Term id="merge">мердж</Term> в `main` запускает сборку, и через пару минут на ссылке новая версия.

Как код попадает в `main` и почему хостинг смотрит именно туда, объясняет [«Синхронизация»](/guide/06-sync#hosting). Здесь — что настроить, чтобы ссылка появилась.

## Где хостить {#hosting}

Для статического сайта подходят четыре популярных хостинга. Все умеют собирать сайт из GitHub. Отличаются они превью-ссылками и тем, можно ли запустить рядом маленький кусок серверного кода.

<CompareTable caption="Хостинги для второго мозга">

| | GitHub Pages | Cloudflare Pages | Vercel | Netlify |
| --- | --- | --- | --- | --- |
| Что это | Статический хостинг | Хостинг + функции | Хостинг + функции | Хостинг + функции |
| Превью для PR | Нет встроенного | Ссылка на каждый PR | Ссылка на каждый PR | Ссылка на каждый PR |
| Серверный код | Нет | Pages Functions | Vercel Functions | Netlify Functions |
| Чем хорош | Там же, где код | Превью и функции | Превью и функции | Превью и функции |

</CompareTable>

Превью-ссылка — временная копия сайта, собранная из ветки <Term id="pull-request">PR</Term>. Её открываешь на телефоне до мерджа: проверил по чек-листу из [«Тестирование и качество»](/guide/08-testing#review) — и только потом в `main`. Netlify, например, кладёт превью PR №42 по адресу `deploy-preview-42--…netlify.app`.

Серверная функция понадобится, если приложению нужен чужой сервис с ключом: ключ живёт в функции, а не в коде сайта. Подробно — в [«Безопасность и личные данные»](/guide/13-security#proxy).

<Callout type="important" title="«Репозиторий приватный — значит, и сайт закрыт»">

Нет. Сайт на GitHub Pages открыт всему интернету, даже если репозиторий приватный (проверено: октябрь 2026). А на бесплатном плане GitHub Pages работает только с публичными репозиториями; для приватного нужен GitHub Pro или Team. Личные данные второго мозга живут на телефоне, а не в репозитории, поэтому сайт их не раскрывает.

</Callout>

## Первый деплой на GitHub Pages {#first-deploy}

GitHub Pages — хостинг, на котором стоит этот сайт. Деплой идёт через GitHub Actions: при каждом пуше в `main` GitHub запускает сборку и публикует папку с готовыми файлами. Файл с этими шагами (workflow) пишет поток по примеру из документации SvelteKit.

<Steps>
	<Step title="Поток готовит деплой" check="в PR есть файл .github/workflows/deploy.yml">

Попроси поток фразой ниже. Он добавит workflow, проверит base path и откроет PR. У задания деплоя должны быть права `pages: write` и `id-token: write` — без них GitHub не даст публиковать (проверено: октябрь 2026).

	</Step>
	<Step title="Включи Pages из Actions" check="в Source выбрано GitHub Actions">

На GitHub открой репозиторий → **Settings** → **Pages**. В блоке **Build and deployment** выбери в **Source** вариант **GitHub Actions**.

	</Step>
	<Step title="Смерджи PR" check="PR в статусе Merged">

Мердж в `main` и есть команда «опубликуй». Workflow запустится сам.

	</Step>
	<Step title="Дождись зелёной сборки" check="на вкладке Actions зелёная галочка у последнего запуска">

Открой вкладку **Actions**. Красный крестик — открой запуск, скопируй ошибку и отдай потоку.

	</Step>
	<Step title="Открой ссылку на телефоне" check="сайт открывается по адресу https://твой-логин.github.io/имя-репозитория/">

Ссылка видна там же, в **Settings** → **Pages**. Пройдись по главным экранам: стили на месте, переходы не ведут на 404.

	</Step>
</Steps>

<PhraseCard
	title="Первый деплой"
	when="Приложение собирается, а ссылки ещё нет"
	text="Настрой деплой на GitHub Pages через GitHub Actions по примеру из документации SvelteKit: base path по имени репозитория, сборка из main. Скажи, что мне включить в Settings → Pages. Открой PR."
/>

## GitHub Pages и SvelteKit {#pages-sveltekit}

Если репозиторий называется не `твой-логин.github.io`, сайт живёт не в корне домена, а в папке: `https://твой-логин.github.io/имя-репозитория/`. Эту папку называют базовым путём (base path). SvelteKit должен знать её при сборке, иначе стили и ссылки будут искать файлы в корне и получат 404.

В этом сайте базовый путь задан одной строкой, и его можно переопределить при сборке:

```js title="config/site.js"
// Base path for GitHub Pages: https://<user>.github.io/<repo-name>/
// Override with BASE_PATH='' when the site is served from a domain root.
export const base = process.env.BASE_PATH ?? '/second-brain-guide';
```

Ещё три детали из документации SvelteKit, все уже есть в этом сайте:

- **`404.html`.** Адаптер собирает свою страницу «не найдено» вместо стандартной страницы GitHub.
- **`.nojekyll`.** Пустой файл в папке `static/`. Он нужен, если готовые файлы пушат в ветку, а не публикуют через Actions: иначе обработчик Jekyll спрячет папку `_app/`.
- **Пререндер.** Каждая страница собирается в готовый HTML. Для этого серверный рендер (`ssr`) не должен быть выключен, иначе сохранится пустая оболочка без содержимого.

<Deeper title="Зачем сайту знать свою папку">

Браузер понимает ссылку `/guide` как «от корня домена». На `твой-логин.github.io` корень — это не твой сайт, а вообще все сайты аккаунта. Поэтому сборка дописывает базовый путь ко всем ссылкам и файлам.

В примере workflow из документации SvelteKit базовый путь берётся из настроек Pages и передаётся сборке переменной `BASE_PATH`. Свой домен открывает сайт из корня, и тогда базовый путь пустой.

</Deeper>

### Свой домен {#domain}

Свой домен, например `brain.example.ru`, подключают в **Settings** → **Pages** → **Custom domain**. У регистратора домена добавляют запись CNAME, которая указывает на `твой-логин.github.io` — без имени репозитория. Галочка **Enforce HTTPS** может появиться не сразу, а в течение суток (проверено: октябрь 2026).

С доменом сайт открывается из корня, поэтому сборку переключают на пустой базовый путь, как `BASE_PATH=''` в этом сайте. Если поток забудет, ты увидишь страницу без стилей.

## PWA на Android {#pwa}

<Term id="pwa" /> — веб-приложение, которое ставится на телефон как обычное: своя иконка, отдельное окно без адресной строки. Почему для второго мозга начинают с PWA, разобрано в [«Стек и скорость»](/guide/10-stack-speed#android). Здесь — как его поставить.

Chrome на Android предлагает установку, когда сайт выполняет требования (проверено: октябрь 2026):

- открыт по HTTPS — у GitHub Pages и других хостингов это есть;
- есть манифест с `name` или `short_name`, `start_url` и иконками 192 и 512 пикселей;
- в `display` стоит `standalone`, `fullscreen` или `minimal-ui`.

<Tabs labels={['Сайт', 'Телефон']}>
	<Tab>

Манифест и иконки делает поток. Проверить можно на компьютере: в Chrome открой сайт, затем DevTools → **Application** → **Manifest**. Там видно, каких полей не хватает.

	</Tab>
	<Tab>

Открой ссылку в Chrome, нажми меню **⋮** и выбери пункт установки. Его название зависит от версии и устройства: «Установить приложение» или «Добавить на главный экран». Chrome создаст WebAPK — настоящий пакет Android, который подписывают сервисы Google: иконка появится в списке приложений и в настройках.

	</Tab>
</Tabs>

### «Доступна новая версия» {#pwa-update}

PWA работает офлайн благодаря service worker — скрипту, который хранит копию приложения на телефоне. После деплоя браузер скачивает новую копию, но новый service worker ждёт. Он не перехватывает открытые экраны, которые загрузились со старой версией, чтобы ничего не сломать посреди работы.

Поэтому правильная схема такая: приложение замечает новую версию и показывает плашку «Доступна новая версия» с кнопкой **Обновить**. Пользователь нажимает, когда ему удобно, и экран перезагружается. Твои задачи и привычки при этом не трогаются: данные лежат отдельно от кода, см. [«Синхронизация»](/guide/06-sync#updates-keep-data).

<PhraseCard
	title="PWA и обновления"
	when="Хочешь иконку на телефоне и понятные обновления"
	text="Сделай приложение устанавливаемым PWA: манифест с name, иконками 192 и 512, start_url, display standalone. При новой версии покажи плашку «Доступна новая версия» с кнопкой «Обновить». Открой PR."
/>

## APK через Capacitor {#apk}

APK — файл приложения Android, который ставится без магазина. Capacitor заворачивает тот же веб-код в настоящее Android-приложение. Это нужно, если PWA не хватает, например для системного будильника в конце фокус-сессии (см. [«Тестирование и качество»](/guide/08-testing#timer)).

Подготовку делает поток. Capacitor поддерживает Android 7 и новее (проверено: октябрь 2026). Команды поток запускает сам:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
# added 98 packages
npx cap init "Brain" com.example.brain --web-dir build
# creates capacitor.config.ts
npx cap add android
# [success] android platform added!
npx cap sync android
# [info] Sync finished
```

`npx cap sync android` копирует свежую сборку сайта в Android-проект; поток повторяет её после каждого изменения кода. А вот собрать сам APK в облачном потоке обычно не выйдет. Для сборки нужен Android SDK, а в облачной среде его нет: инструменты вне стандартного набора ставят отдельным скриптом (проверено: октябрь 2026).

Поэтому APK собирают на компьютере в Android Studio. Поток открывает PR с Android-проектом, ты [забираешь свежий `main` на ноутбук](/guide/06-sync#pull) и выбираешь **Build** → **Generate Signed Bundle/APK** → **APK**. Готовый файл перекидываешь на телефон.

На телефоне Android спросит разрешение: в Android 8 и новее нужно разрешить установку из конкретного источника в настройке **Install unknown apps** (проверено: октябрь 2026). Обычно это браузер или файловый менеджер, через который ты открыл APK.

<Deeper title="Что меняет проверка разработчиков Android">

Google вводит проверку личности разработчиков для всех приложений Android, в том числе вне Google Play. С 30 сентября 2026 года она действует только для участвующих магазинов в отдельных странах; APK, скачанные с сайта, пока не затронуты. Глобальный запуск Google обещает в 2027 году (проверено: октябрь 2026).

Для своего телефона есть два спокойных пути. Установка через ADB — кабель и Android Studio — проверки не требует. А бесплатный аккаунт ограниченного распространения позволяет ставить приложение на 20 устройств без документов.

</Deeper>

<PhraseCard
	title="Подготовить APK"
	when="Решили делать Android-версию через Capacitor"
	text="Добавь Capacitor для Android: установи пакеты, npx cap add android, npx cap sync. Keystore и пароли в репозиторий не клади, добавь их в .gitignore. Открой PR и напиши, что мне сделать в Android Studio."
/>

### Подпись и keystore {#signing}

Android ставит только подписанные APK. Подпись делают ключом из файла keystore. Главное правило: каждую новую версию подписывают тем же ключом, иначе телефон не поставит её поверх старой.

Keystore создают один раз: в Android Studio кнопкой **Create new** в окне подписи или командой `keytool`. Срок ключа Google советует ставить от 25 лет. Команду ниже запускают на компьютере, пароли keytool спросит сам:

```bash
keytool -genkeypair -v -keystore brain-release.jks -alias brain -keyalg RSA -keysize 2048 -validity 10000
# [Storing brain-release.jks]
```

<Callout type="danger" title="Потерял keystore — потерял обновления">

Без того же ключа новую версию не поставить поверх старой. Придётся удалить старое приложение, а с ним и данные на телефоне, если нет бэкапа. Google такой ключ не восстановит (проверено: октябрь 2026). Храни `brain-release.jks` и пароли в менеджере паролей и в облачном бэкапе, но никогда не в репозитории.

</Callout>

## Google Play: условия на дату {#play}

Для себя Google Play не нужен: PWA или APK хватает. Если захочешь выложить приложение для других, проверь условия в день публикации — они меняются. На октябрь 2026 года (проверено: октябрь 2026):

- регистрация аккаунта разработчика — разовый взнос 25 долларов США;
- личным аккаунтам, созданным после 13 ноября 2023 года, перед публикацией нужен закрытый тест: минимум 12 тестировщиков подряд 14 дней;
- комиссия Google берётся с продаж и подписок; бесплатное приложение без покупок её не платит. Ставки в 2026 году меняются по регионам, смотри страницу **Service fees** в справке Play Console.

## Что в сайте видно всем {#env}

Переменная окружения — именованное значение, которое подставляют при сборке, а не пишут прямо в код. Например, адрес сервиса или флаг «показывать отладку». В статическом сайте переменная, которую читает браузерный код, вшивается в JavaScript при сборке.

А JavaScript сайта скачивает каждый посетитель. Значит, всё, что попало в браузерный код, публично: адреса, флаги, тексты. Документация Vite прямо пишет: переменные с префиксом `VITE_` нельзя использовать для API-ключей, потому что они попадают в код при сборке.

Что можно: адрес публичного API, название приложения, номер версии. Что никогда: ключи платных сервисов, токены, пароли. Где им место, разобрано в [«Безопасность и личные данные»](/guide/13-security#keys).

## Выводы {#takeaways}

<Takeaways>

- Хостинг берёт `main`, собирает сайт и публикует его; каждый мердж — новая версия по той же ссылке.
- GitHub Pages проще всего начать, а Cloudflare Pages, Vercel и Netlify добавляют превью-ссылки для PR и серверные функции.
- Сайт на GitHub Pages открыт всем, даже из приватного репозитория, а на бесплатном плане репозиторий должен быть публичным.
- Для SvelteKit на GitHub Pages важны базовый путь по имени репозитория, `404.html` и деплой через Actions.
- PWA ставится из Chrome за минуту, а обновление показывается плашкой «Доступна новая версия», не трогая данные.
- APK через Capacitor собирают в Android Studio и подписывают всегда одним keystore, который хранят вне репозитория.

</Takeaways>

## Что сделать сейчас {#next-steps}

<Checklist
	id="guide-12-next-steps"
	title="Три шага"
	items={[
		'Открой Settings → Pages в своём репозитории и посмотри, какой там Source',
		'Скопируй фразу «Первый деплой» в заметки',
		'Заведи в менеджере паролей запись для будущего keystore'
	]}
/>

## Источники {#sources}

**GitHub Docs**

- [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

**Svelte и Vite**

- [Static site generation (adapter-static)](https://svelte.dev/docs/kit/adapter-static)
- [Env Variables and Modes](https://vite.dev/guide/env-and-mode)

**Хостинги**

- [Preview deployments · Cloudflare Pages docs](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Functions · Cloudflare Pages docs](https://developers.cloudflare.com/pages/functions/)
- [Environments · Vercel](https://vercel.com/docs/deployments/environments)
- [Vercel Functions](https://vercel.com/docs/functions)
- [Deploy Previews · Netlify](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)
- [Functions overview · Netlify](https://docs.netlify.com/build/functions/overview/)

**web.dev**

- [What does it take to be installable?](https://web.dev/articles/install-criteria)
- [Installation](https://web.dev/learn/pwa/installation)
- [Update](https://web.dev/learn/pwa/update)

**Capacitor и Android Developers**

- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [CLI Command - cap build](https://capacitorjs.com/docs/cli/commands/build)
- [Sign your app](https://developer.android.com/studio/publish/app-signing)
- [Alternative distribution options](https://developer.android.com/distribute/marketing-tools/alternative-distribution)
- [Android developer verification: Frequently asked questions](https://developer.android.com/developer-verification/guides/faq)

**Play Console Help**

- [Get started with Play Console](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)
- [App testing requirements for new personal developer accounts](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
- [Service fees](https://support.google.com/googleplay/android-developer/answer/112622?hl=en)

**Anthropic**

- [Configure cloud environments](https://code.claude.com/docs/en/cloud-environments)
