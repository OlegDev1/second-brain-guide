---
title: CI/CD и контроль качества
short: CI/CD
part: "09"
order: 3
slug: a4-ci-cd
time: 5
level: advanced
prereqs: [guide/08-testing, guide/12-deploy]
updated: 2026-10-24
description: Когда приложению нужен конвейер GitHub Actions, обязательные проверки, автоматические версии и обновления зависимостей — и сколько лимита это стоит.
---

<LessonHeader
	learn={[
		'Из чего собрать конвейер GitHub Actions для второго мозга',
		'Как защитить main обязательными проверками',
		'Как получить changelog и версии из сообщений коммитов',
		'Почему каждая красная проверка тратит лимит'
	]}
/>

<TLDR>

Когда модулей становится много, проверки в каждом PR запускает GitHub Actions: установка с кэшем, линт, `svelte-check`, тесты, Lighthouse и APK. Обязательные проверки не пускают красный PR в `main`. Цена: каждая упавшая проверка будит поток проекта, и он тратит лимит на починку.

</TLDR>

<Callout type="note" title="Для кого эта глава">

Для автора, когда приложение выросло. Ручные проверки и тесты — в [«Тестирование»](/guide/08-testing), публикация — в [«Деплой»](/guide/12-deploy).

</Callout>

## Конвейер на GitHub Actions {#pipeline}

Workflow — файл в `.github/workflows/`, который GitHub запускает на каждый PR. Для второго мозга хватит одной задачи (job) с шагами по порядку: дешёвые проверки первыми.

```yaml title=".github/workflows/ci.yml"
name: CI
on: pull_request
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run check
      - run: npm test
      - run: npx playwright install --with-deps chromium && npm run test:e2e
      - run: npx @lhci/cli autorun
```

- `cache: npm` в `setup-node` кэширует загрузки npm между запусками.
- Lighthouse CI сравнивает метрики с бюджетом и роняет проверку, если страница стала тяжелее.
- APK собирают отдельной задачей и выкладывают как artifact запуска, чтобы скачать его с телефона.

## Защита main и версии {#protect}

Правило защиты ветки может требовать, чтобы перед мерджем прошли выбранные проверки (required status checks). Squash merge склеивает PR в один коммит, и история `main` читается по строке на фичу.

Если сообщения коммитов пишут по Conventional Commits (`feat:`, `fix:`), инструмент вроде release-please сам собирает changelog и поднимает версию. Попроси это правило в инструкциях проекта: потоки пишут коммиты по шаблону.

## Зависимости, превью, скриншоты {#extras}

- **Dependabot** или **Renovate** раз в неделю открывают PR с обновлениями; конвейер проверяет каждый.
- **Превью-деплой** собирает сайт из PR по отдельной ссылке — открыть с телефона до мерджа.
- **Визуальная регрессия**: Playwright сравнивает скриншоты экрана с эталоном и падает, если разница больше порога (`maxDiffPixelRatio`).

## Цена: проверки будят потоки {#cost}

Поток, который следит за своим PR, просыпается на каждую упавшую проверку и чинит её (проверено: октябрь 2026). Каждая такая починка — новые шаги и новые токены из твоего лимита.

<Callout type="important" title="«Больше проверок — всегда лучше»">

Нет: нестабильный e2e-тест, который падает через раз, будит поток снова и снова. Для этого сайта-гайда конвейер не нужен, хватает `npm run build` и `npm run check` перед PR. Для приложения с десятком модулей он окупается.

</Callout>

<PhraseCard
	title="Конвейер CI"
	when="Модулей больше пяти, и ручные проверки занимают вечер"
	text="Добавь GitHub Actions на каждый PR: npm ci с кэшем, lint, svelte-check, юнит-тесты, e2e на Chromium. Скажи, какие проверки мне сделать обязательными в правиле защиты main. Открой PR, ничего не мерджи."
/>

## Выводы {#takeaways}

<Takeaways>

- Конвейер GitHub Actions запускает те же проверки, что ты делал руками, на каждый PR и в одном порядке.
- Обязательные проверки в правиле защиты ветки не пускают красный PR в `main`.
- Conventional Commits дают changelog и версии без ручной работы.
- Больше проверок — не всегда лучше: каждая упавшая проверка будит поток и тратит лимит.
- Для маленького сайта хватает сборки и `check` перед PR, для большого приложения конвейер окупается.

</Takeaways>

## Что сделать сейчас {#next-steps}

<Checklist
	id="advanced-a4-next-steps"
	title="Два шага"
	items={[
		'Посчитай, сколько минут уходит на ручную проверку одного PR',
		'Если больше 15 минут — отправь потоку фразу «Конвейер CI»'
	]}
/>

## Источники {#sources}

- GitHub Docs: [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches), [About merge methods on GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github), [Dependabot version updates](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates), [Storing workflow data as artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts).
- GitHub: [actions/setup-node](https://github.com/actions/setup-node), [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci), [release-please](https://github.com/googleapis/release-please).
- [Conventional Commits](https://www.conventionalcommits.org/), [Renovate](https://docs.renovatebot.com/), [Playwright: Visual comparisons](https://playwright.dev/docs/test-snapshots).
- Claude Code Docs: [Let Claude coordinate ongoing work with Projects](https://code.claude.com/docs/en/claude-projects).
