# Part 07 notes: quality, deploy, security

Chapters: `src/content/guide/08-testing.md`, `src/content/guide/12-deploy.md`, `src/content/guide/13-security.md`.

## Sources

All links checked on 2026-10-23.

### Chapter 08 — testing

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| PDF [2]: self-correction in modern LLMs is largely ineffective; SCoRe needed RL training (+15.6% MATH, +9.1% HumanEval) | 08-testing#author-blind | https://arxiv.org/abs/2409.12917 | 2026-10-23 | Abstract: "consistently been found to be largely ineffective in modern LLMs" |
| PDF [3]: a fresh session reviews better, not biased toward code it just wrote | 08-testing#author-blind | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "Run multiple Claude sessions": "Claude won't be biased toward code it just wrote" |
| PDF [3]: without a check, "looks done" is the only signal; you become the verification loop | 08-testing#author-blind | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "Give Claude a way to verify its work": "you become the verification loop" |
| PDF [3]: trust-then-verify gap: plausible code that misses edge cases; "If you can't verify it, don't ship it" | 08-testing#levels | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "Avoid common failure patterns": "If you can't verify it, don't ship it" |
| PDF [3]: reviewer prompted for gaps reports some even on sound work; flag only what affects correctness | 08-testing#review | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "Add an adversarial review step": "Chasing every finding leads to over-engineering" |
| PDF [1]: new features frequently broke existing functionality; fix: CI so new commits can't break existing code | 08-testing#tests-guard | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-23 | "Write extremely high-quality tests": "Claude started to frequently break existing functionality" |
| PDF [1]: 16 agents wrote a C compiler | 08-testing#tests-guard | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-23 | Intro: "I tasked 16 agents with writing a Rust-based C compiler" |
| PDF [1]: easy to see tests pass and assume the job is done | 08-testing#tests-guard | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-23 | "Looking forward": "easy to see tests pass and assume the job is done" |
| PDF [1]: tests should print a few lines; details go to a file | 08-testing#tests-guard | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-23 | "Put yourself in Claude's shoes": "At most, it should print a few lines of output" |
| PDF [17]: Claude marked features complete without proper testing | 08-testing#levels | https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents | 2026-10-23 | "Testing": "mark a feature as complete without proper testing" |
| PDF [17]: testing "as a human user would" with browser automation dramatically improved performance | 08-testing#levels | https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents | 2026-10-23 | "Testing": "dramatically improved performance" |
| `Math.random()` seed is chosen by the engine, cannot be set or reset | 08-testing#random | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random | 2026-10-23 | "it cannot be chosen or reset by the user" |
| Vitest fake timers mock `setTimeout`/`setInterval` so tests don't wait real time | 08-testing#timer | https://vitest.dev/guide/mocking/timers | 2026-10-23 | "speed up our tests by using "fake" timers" |
| `vi.setSystemTime` sets the fake clock's date | 08-testing#timer | https://vitest.dev/api/vi.html | 2026-10-23 | section "vi.setSystemTime" |
| Chrome: hidden pages' timers checked once per second; after 5 min hidden + chained timers + silent 30 s — once per minute | 08-testing#timer | https://developer.chrome.com/blog/timer-throttling-in-chrome-88/ | 2026-10-23 | "Intensive throttling": "check timers in this group once per minute" |
| Frozen page: JS timers and fetch callbacks don't run; hidden state is the last reliable time to save data | 08-testing#timer | https://developer.chrome.com/docs/web-platform/page-lifecycle-api | 2026-10-23 | "Frozen": "JavaScript timers and fetch callbacks don't run" |
| Android Doze: unplugged, stationary, screen off; standard alarms deferred to maintenance windows; `setAlarmClock()` fires normally | 08-testing#timer | https://developer.android.com/training/monitoring-device-state/doze-standby | 2026-10-23 | "Defers standard AlarmManager alarms… to the next maintenance window" |
| DST: in spring one hour disappears, in autumn a wall-clock hour repeats; a day is not always 24 hours | 08-testing#reminders | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime | 2026-10-23 | "you can no longer assume … that a day has 24 hours" |
| Europe moves clocks forward on 29 March 2026, 01:00 UTC | 08-testing#reminders | https://www.timeanddate.com/news/time/europe-starts-dst-2026.html | 2026-10-23 | "set their clocks forward one hour at 01:00 UTC on March 29, 2026" |

### Chapter 12 — deploy

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| GitHub Pages is a static site hosting service (HTML, CSS, JS) | 12-deploy#hosting | https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages | 2026-10-23 | "a static site hosting service that takes HTML, CSS, and JavaScript files" |
| Pages site is public even if the repo is private; private-repo Pages needs Pro/Team/Enterprise; Free = public repos only | 12-deploy#hosting, 13-security#personal-data | https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site | 2026-10-23 | "publicly available on the internet, even if the repository for the site is private" |
| Steps: Settings → Pages → Build and deployment → Source → GitHub Actions | 12-deploy#first-deploy | https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site | 2026-10-23 | "Publishing with a custom GitHub Actions workflow" |
| Deploy job needs `pages: write` and `id-token: write`; default environment `github-pages`; artifact via `upload-pages-artifact` | 12-deploy#first-deploy | https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages | 2026-10-23 | "The job must have a minimum of `pages: write` and `id-token: write`" |
| Custom domain: Settings → Pages → Custom domain; CNAME to `<user>.github.io`; Enforce HTTPS can take up to 24 h | 12-deploy#domain | https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site | 2026-10-23 | "It can take up to 24 hours before this option is available" |
| SvelteKit on Pages: set `paths.base` to the repo name; `404.html` fallback; `.nojekyll` when not deploying with Actions; example workflow passes `BASE_PATH` and uploads `build/` | 12-deploy#pages-sveltekit | https://svelte.dev/docs/kit/adapter-static | 2026-10-23 | section "GitHub Pages" |
| Prerendering needs `ssr` not set to false, else an empty shell is saved | 12-deploy#pages-sveltekit | https://svelte.dev/docs/kit/adapter-static | 2026-10-23 | "You must ensure SvelteKit's ssr option isn't set to false" |
| This site: `paths.base = '/second-brain-guide'`, `BASE_PATH` override, `static/.nojekyll`, `fallback: '404.html'`, output `build/` | 12-deploy#pages-sveltekit | repo: `config/site.js`, `svelte.config.js`, `docs/DECISIONS.md` | 2026-10-23 | "Routing and GitHub Pages" table |
| Cloudflare Pages: unique preview URL for every new PR and non-production branch | 12-deploy#hosting | https://developers.cloudflare.com/pages/configuration/preview-deployments/ | 2026-10-23 | "Cloudflare Pages will create a unique preview URL" |
| Netlify: Deploy Preview per PR at `deploy-preview-<n>--site.netlify.app` | 12-deploy#hosting | https://docs.netlify.com/deploy/deploy-types/deploy-previews/ | 2026-10-23 | "Netlify automatically builds a Deploy Preview for you" |
| Vercel: preview deployment for non-production branch pushes and PRs; production from `main` | 12-deploy#hosting | https://vercel.com/docs/deployments/environments | 2026-10-23 | "Preview Environment (Pre-production)" |
| Cloudflare Pages Functions: server-side code without a dedicated server | 12-deploy#hosting, 13-security#proxy | https://developers.cloudflare.com/pages/functions/ | 2026-10-23 | "deploy server-side code … without running a dedicated server" |
| Vercel Functions: run server-side code | 12-deploy#hosting, 13-security#proxy | https://vercel.com/docs/functions | 2026-10-23 | "Run server-side code with Vercel Functions" |
| Netlify Functions: server-side code without managing servers | 12-deploy#hosting, 13-security#proxy | https://docs.netlify.com/build/functions/overview/ | 2026-10-23 | "without having to manage servers" |
| Chrome install criteria: HTTPS; manifest with name/short_name, 192 and 512 px icons, start_url, display; prefer_related_applications absent/false | 12-deploy#pwa | https://web.dev/articles/install-criteria | 2026-10-23 | "icons - must include a 192px and a 512px icon" |
| WebAPK: Android package minted and signed by a trusted provider, installed silently; shows in launcher and Settings > Apps | 12-deploy#pwa | https://web.dev/learn/pwa/installation | 2026-10-23 | "A WebAPK is an Android package (APK) created by a trusted provider" |
| New service worker waits so it doesn't take over old clients; tell the user an update is waiting and let them choose when | 12-deploy#pwa-update | https://web.dev/learn/pwa/update | 2026-10-23 | "give them the chance to update the page when it is best for them" |
| Capacitor: `npm install @capacitor/android`, `npx cap add android`, `npx cap open android`; API 24+ (Android 7+) | 12-deploy#apk | https://capacitorjs.com/docs/android | 2026-10-23 | "API 24+ (Android 7 or later) is supported" |
| `npx cap build android` options `--keystorepath`, `--keystorealias`, `--androidreleasetype AAB|APK` | 12-deploy#apk | https://capacitorjs.com/docs/cli/commands/build | 2026-10-23 | "Can be either `AAB` or `APK`" |
| All APKs must be signed; updates only with the same key; lost key = no updates; keep keystore secure, out of source control | 12-deploy#signing | https://developer.android.com/studio/publish/app-signing | 2026-10-23 | "users can only update your app if the update is signed with the same signing key" |
| Android Studio: Build → Generate Signed Bundle/APK → Create new keystore; key valid 25+ years | 12-deploy#signing | https://developer.android.com/studio/publish/app-signing | 2026-10-23 | "Generate an upload key and keystore" |
| Install unknown apps: Android 8+ needs the "Install unknown apps" setting per source | 12-deploy#apk | https://developer.android.com/distribute/marketing-tools/alternative-distribution | 2026-10-23 | "users must navigate to the *Install unknown apps* system settings screen" |
| Developer verification: deadline 30 Sep 2026 for participating stores in select regions; sideloaded apps not yet affected; global rollout 2027; ADB installs need no verification; limited distribution: free, no ID, up to 20 devices; advanced flow with 24-hour wait | 12-deploy#apk | https://developer.android.com/developer-verification/guides/faq | 2026-10-23 | "Apps installed using ADB won't require verification" |
| Google Play: one-time US$25 registration fee | 12-deploy#play | https://support.google.com/googleplay/android-developer/answer/6112435?hl=en | 2026-10-23 | "There is a US$25 one-time registration fee" |
| Personal accounts created after 13 Nov 2023: closed test with 12+ testers opted in for 14 days before production | 12-deploy#play | https://support.google.com/googleplay/android-developer/answer/14151465?hl=en | 2026-10-23 | "a minimum of 12 testers who have been opted in continuously for at least 14 days" |
| Play service fees apply to transactions; new structure rolled out from 30 Jun 2026 (EEA, UK, US) and 30 Sep 2026 (Australia, Japan) | 12-deploy#play | https://support.google.com/googleplay/android-developer/answer/112622?hl=en | 2026-10-23 | "Service fees" table, "regional rollout date" |
| `VITE_*` variables are bundled into client code at build time; never put API keys there | 12-deploy#env, 13-security#keys | https://vite.dev/guide/env-and-mode | 2026-10-23 | "Protecting secrets": "should *not* contain sensitive information such as API keys" |
| Cloud sessions: Android SDK is not preinstalled; toolchains outside the list need a setup script | 12-deploy#apk | https://code.claude.com/docs/en/cloud-environments | 2026-10-23 | "Installed tools": "aren't pre-installed … Install them with a setup script" |

### Chapter 13 — security

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| Removing a secret from code, pushing a new commit or recreating the repo doesn't stop it being exploited; revoking with the provider is the key step | 13-security#leak | https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret | 2026-10-23 | "The most important remediation step is revoking the secret" |
| Cleaning history is destructive and may need force push | 13-security#leak | https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret | 2026-10-23 | Step 7: "can be a destructive and disruptive process" |
| Cloud environment variables: anyone using the environment can read them; use a network secret for API keys | 13-security#keys | https://code.claude.com/docs/en/cloud-environments | 2026-10-23 | "Set environment variables": "Anyone who uses the environment can read the values" |
| Network secrets: agent proxy adds the key to requests for listed hosts; the key stays outside the VM; Pro, Max, Team, Enterprise | 13-security#keys | https://code.claude.com/docs/en/cloud-environments | 2026-10-23 | "Add network secrets": "the key itself stays outside the VM" |
| Network secret can't be viewed again after saving | 13-security#keys | https://code.claude.com/docs/en/cloud-environments | 2026-10-23 | "You can't view the value again after saving" |
| Project settings → Environment picks the threads' cloud environment | 13-security#keys | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "Choose an environment for threads" |
| Browser storage is best-effort by default and may be evicted under storage pressure; `navigator.storage.persist()` opts out; user can still clear it | 13-security#personal-data | https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria | 2026-10-23 | "Best-effort: this is the way that data is stored by default" |
| Permission rules: allow, ask, deny; evaluated deny → ask → allow; allow can't override deny | 13-security#permissions | https://code.claude.com/docs/en/permissions | 2026-10-23 | "Rules are evaluated in order: deny, then ask, then allow" |
| Example `"deny": ["Bash(git push *)"]`; a Bash rule matches the command as written, not a security boundary (`git -C . push` isn't matched) | 13-security#permissions | https://code.claude.com/docs/en/permissions | 2026-10-23 | "What a Bash rule doesn't match" |
| `.claude/settings.json` is the shared project file, committed for the team | 13-security#permissions | https://code.claude.com/docs/en/settings | 2026-10-23 | "Settings files and who they affect" table |
| Cloud threads in a project don't apply `.claude/settings.json` permission rules, hooks or env; approvals happen inside the thread; threads run in auto mode | 13-security#permissions | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "What threads pick up from your repositories": "Permission rules in `.claude/settings.json` — Not applied" |
| GitHub proxy rejects branch deletions and non-branch pushes (tags); doesn't limit which branches; use branch protection | 13-security#permissions | https://code.claude.com/docs/en/cloud-environments | 2026-10-23 | "GitHub proxy": "the proxy rejects branch deletions" |
| Example project-instructions line: "Don't merge, force-push, or change CI configuration without asking me" | 13-security#permissions | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "Write project instructions" example |
| Prompt injection: attacker inserts text to override the assistant's instructions | 13-security#injection | https://code.claude.com/docs/en/security | 2026-10-23 | "Protect against prompt injection" |
| WebFetch: Claude gets a separate model's answer about the page, not the raw page | 13-security#injection | https://code.claude.com/docs/en/security | 2026-10-23 | "Additional safeguards": "Web page summaries" |
| Avoid piping untrusted content directly to Claude; no system is immune | 13-security#injection | https://code.claude.com/docs/en/security | 2026-10-23 | "Best practices for working with untrusted content" |
| Auto mode classifier blocks scope escalation, unknown infrastructure, hostile-content-driven actions | 13-security#injection | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "Run autonomously with auto mode" |
| `Read(./.env)` deny rule blocks Claude's file tools from reading the file | 13-security#permissions | https://code.claude.com/docs/en/permissions | 2026-10-23 | "Read and Edit": "add a `Read` deny rule for its path" |
| `Math.random()` is not cryptographically secure | 13-security (not used on page) | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random | 2026-10-23 | "*does not* provide cryptographically secure random numbers" |

## Scratch runs

Every command and test shown in the chapters was run in a scratch folder on 2026-10-23 (Node 22.22.0).

### Chapter 08 tests (Vitest 3.2.7)

Files as in the chapter: `src/pick.js`, `src/random.js` (mulberry32), `src/timer.js`, `src/reminder.js` and three test files.

```text
$ npx vitest run
 ✓ src/reminder.test.js (1 test) 2ms
 ✓ src/pick.test.js (2 tests) 6ms
 ✓ src/timer.test.js (1 test) 11ms

 Test Files  3 passed (3)
      Tests  4 passed (4)
```

Counts for seed 42, 10,000 runs: Купить корм 3347, Разобрать Inbox 3303, Позвонить Ане 3350.

Naive "+24 hours" from Sat 2026-03-28 10:00 in `TZ=Europe/Berlin` gives `Sun Mar 29 2026 11:00:00 GMT+0200`; calendar `setDate(+1)` + `setHours(10)` gives 10:00 and a 23-hour gap. Under `TZ=UTC` the gap is 24 hours.

### Chapter 12 commands (Capacitor 8.5.3)

```text
$ npm install @capacitor/core @capacitor/cli @capacitor/android
$ npx cap init "Brain" com.example.brain --web-dir build
$ npx cap add android
✔ update android in 12.39ms
[success] android platform added!
$ npx cap sync android
[info] Sync finished in 0.04s
$ keytool -genkeypair -v -keystore brain-release.jks -alias brain -keyalg RSA -keysize 2048 -validity 10000
[Storing brain-release.jks]
```

`npx cap build android --androidreleasetype APK …` started Gradle and failed: `dl.google.com` (Android SDK) is not reachable from this cloud environment and the SDK isn't preinstalled. That's why the chapter sends the APK build to Android Studio on a computer.

## New terms

| EN | RU | Definition |
| --- | --- | --- |
| unit test | юнит-тест | short test of one function, without the interface |
| end-to-end test (e2e) | end-to-end тест | test that clicks through the app in a browser like a user |
| acceptance criteria | критерии приёмки | checkable conditions that say a feature is done (already used by part 05) |
| seed | сид (seed) | starting number that makes a "random" sequence repeat |
| fake timers | поддельные часы | test tool that moves time forward without waiting |
| daylight saving time (DST) | летнее время | seasonal clock shift by one hour |
| hosting | хостинг | service that serves the built site on the internet |
| preview deployment | превью-ссылка | temporary copy of the site built from a PR |
| base path | базовый путь | URL prefix such as `/second-brain-guide/` when the site isn't at the domain root |
| service worker | service worker | script that caches the PWA and installs updates |
| WebAPK | WebAPK | Android package Chrome creates when a PWA is installed |
| APK | APK | Android app file that installs outside the store |
| keystore | keystore (хранилище ключей) | file with the key that signs every APK version |
| environment variable | переменная окружения | named value read at build or run time instead of hard-coding it |
| API key | API-ключ | secret string that identifies you to a paid service |
| network secret | network secret | key stored in the cloud environment; the proxy adds it to requests, the thread never sees it |
| server-side proxy | прокси на сервере | small function that holds the key and forwards the app's request |
| prompt injection | инъекция промпта (prompt injection) | text in a page or file that tries to give the agent commands |
| revoke | отозвать ключ | make a key invalid at the provider |

## Ready phrases

- **Тест на случайность** (08): «Напиши юнит-тест для «Выбери за меня»: 10 000 запусков с фиксированным сидом, каждая задача выпадает хотя бы раз, частоты в пределах 10% от ожидаемых, плюс случаи 0 и 1 задача. Только тесты и сама функция, открой PR.»
- **Тест таймера** (08): «Сделай, чтобы фокус-таймер считал оставшееся время от момента старта, а не от тиков. Добавь тест с поддельными часами: экран выключен 30 минут, тиков не было — таймер закончен. Открой PR.»
- **Тест напоминаний** (08): «Добавь тест: напоминание о звонке клиенту в Берлине на 10:00 приходит в 10:00 и 29 марта 2026, после перевода часов. Следующее напоминание считай по календарю, а не +24 часа. Открой PR.»
- **Записать баг** (08): «Запиши в BUGS.md баг: шаги, что ждал, что получил, устройство, статус open. Не чини, только запись.»
- **Первый деплой** (12): «Настрой деплой на GitHub Pages через GitHub Actions по примеру из документации SvelteKit: base path по имени репозитория, сборка из main. Скажи, что мне включить в Settings → Pages. Открой PR.»
- **PWA и обновления** (12): «Сделай приложение устанавливаемым PWA: манифест с name, иконками 192 и 512, start_url, display standalone. При новой версии покажи плашку «Доступна новая версия» с кнопкой «Обновить». Открой PR.»
- **Подготовить APK** (12): «Добавь Capacitor для Android: установи пакеты, npx cap add android, npx cap sync. Keystore и пароли в репозиторий не клади, добавь их в .gitignore. Открой PR и напиши, что мне сделать в Android Studio.»
- **Проверка на ключи** (13): «Проверь репозиторий и историю коммитов на ключи, токены и пароли. Ничего не удаляй и не переписывай историю — пришли список: файл, коммит, что за ключ.»
- **Прокси для ключа** (13): «Ключ к <сервис> не должен попасть в код приложения. Сделай маленькую серверную функцию на хостинге, которая хранит ключ в секретах хостинга и пересылает запрос. В браузерном коде ключа быть не должно. Открой PR.»
- **Утёк ключ** (13): «Ключ к <сервис> попал в коммит <хэш>. Я уже отозвал его. Убери ключ из кода, перенеси чтение в переменную окружения, добавь файл в .gitignore. Историю не переписывай, ничего не форсь, открой PR.»

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Site on GitHub Pages opens without styles, links lead to 404 | `paths.base` doesn't match the repo name | Set base to `/<repo-name>`, rebuild |
| Pages shows README instead of the site | Source is "Deploy from a branch", not GitHub Actions | Settings → Pages → Source → GitHub Actions |
| Folder `_app/` missing on Pages | Jekyll ran on pushed files | Add `static/.nojekyll` or deploy through Actions |
| Focus timer shows wrong time after the screen was off | Timer counts ticks; hidden tabs throttle or freeze timers | Store `endsAt`, compute remaining from the clock |
| Reminder an hour late or early after DST | Next time computed as "+24 h" | Compute by calendar date in the user's/client's time zone |
| PWA doesn't update after deploy | New service worker waits for old tabs | Show "Доступна новая версия" and reload on tap |
| APK update won't install over the old one | Signed with a different key | Sign every version with the same keystore; back it up |
| Thread can't build APK in the cloud | Android SDK not installed / `dl.google.com` not allowed | Build in Android Studio on a computer |
| `.claude/settings.json` deny rule ignored in a project thread | Cloud project threads don't apply repo permission rules | Branch protection on GitHub + project instructions |

## Open questions

- The repository has no deploy workflow yet: the owner adds it when they deploy. The stepper follows the SvelteKit adapter-static GitHub Pages example and Settings → Pages → Source → GitHub Actions, and matches this repo's config (`paths.base`, `BASE_PATH`, `.nojekyll`, `404.html`, `build/`). If the owner deploys differently, update «Первый деплой на GitHub Pages».
- Google Play service fees changed in 2026 by region; the chapter gives only the registration fee and testing requirement and says fees apply to sales. Re-check before quoting percentages.
- Android developer verification: the limited distribution account and advanced flow were announced for August 2026; the FAQ still uses future tense in places. Re-check before the next update.
- GitHub Pages having no per-PR previews: stated as "no built-in preview links" from the absence of the feature in Pages docs; the hosts that do have them are cited.
