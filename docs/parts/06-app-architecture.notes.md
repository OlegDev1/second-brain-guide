# Part 06 notes: chapters 06, 10 and 11

Chapters: `src/content/guide/06-sync.md`, `src/content/guide/10-stack-speed.md`,
`src/content/guide/11-architecture.md`. No new components; diagrams are inline SVG in `DiagramFrame`.

## Sources

All rows checked on 2026-10-23. Anchors: `06` = `/guide/06-sync`, `10` = `/guide/10-stack-speed`,
`11` = `/guide/11-architecture`.

### Claude Code (official pages)

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| Cloud session: repository is cloned to an Anthropic-managed VM | 06#thread-copy | https://code.claude.com/docs/en/web-quickstart | 2026-10-23 | "How sessions run": "your repository is cloned to an Anthropic-managed VM" |
| Cloud session pushes its branch to GitHub; each task gets its own branch; Create PR | 06#thread-copy | https://code.claude.com/docs/en/web-quickstart | 2026-10-23 | "How sessions run": "it pushes its branch to GitHub" |
| `claude --teleport` fetches and checks out the cloud session's branch; local copy is separate afterwards | 06#pull | https://code.claude.com/docs/en/claude-code-on-the-web | 2026-10-23 | "Continue a cloud session in your terminal": "fetches and checks out the branch from the cloud session" |
| Cloud sessions stop after inactivity, the VM is reclaimed; history restored, running commands not | 06#commit-often | https://code.claude.com/docs/en/claude-code-on-the-web | 2026-10-23 | "Environment expired": "the session's VM is reclaimed" |
| Project threads: sandbox pauses between turns; may continue from a fresh clone; uncommitted changes can be lost; ask Claude to commit and push | 06#commit-often | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "Limitations": "uncommitted changes can be lost" |
| Library tab: files you added and files threads produced | 06#library-copies | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "See what needs you in Overview": "the files you added and the files threads produced" |
| Uploads are copies; change on the computer doesn't reach the project until re-upload with **Replace** | 06#library-copies | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "Add files and folders": "uploads are copies" |
| A folder adds a copy of its first 100 files up to 200 MB | 06#library-copies | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "Add files and folders": "a copy of its first 100 files up to 200 MB" |

### Git

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| DVCS clients fully mirror the repository with its full history | 06#code-via-github (Deeper) | https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control | 2026-10-23 | "Distributed Version Control Systems": "they fully mirror the repository, including its full history" |
| `git pull` integrates changes from a remote into the current branch | 06#pull | https://git-scm.com/docs/git-pull | 2026-10-23 | DESCRIPTION: "Integrate changes from a remote repository into the current branch." |

### Browser storage and data

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| IndexedDB is per origin (same-origin policy) | 06#data-on-phone | https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API | 2026-10-23 | "Key concepts and usage": "IndexedDB follows a same-origin policy" |
| Browser storage lives on the local disk of the device | 06#data-on-phone | https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria | 2026-10-23 | Intro: "store data in the user's browser (i.e., on the local disk" |
| Default storage is best-effort; `navigator.storage.persist()` requests persistent storage | 06#data-on-phone (Deeper) | https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria | 2026-10-23 | "Does browser-stored data persist?": "Best-effort: this is the way that data is stored by default." |
| Safari: no user interaction in 7 days → script-created data deleted (with tracking prevention on) | 06#data-on-phone (Deeper) | https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria | 2026-10-23 | "Proactive eviction": "no user interaction, such as click or tap, in the last seven days" |
| Safari home-screen web apps count days of use separately from Safari | 06#data-on-phone (Deeper) | https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/ | 2026-10-23 | "have their own counter of days of use" |

### Frameworks and stack

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| CommonJS is Node.js's original module format (the "Common.js" correction) | 10#framework | https://nodejs.org/api/modules.html | 2026-10-23 | Top: "CommonJS modules are the original way to package JavaScript code for Node.js." |
| React: state update queues a render; DOM changes only where renders differ | 10#candidates | https://react.dev/learn/render-and-commit | 2026-10-23 | "Step 3": "React only changes the DOM nodes if there's a difference" |
| React Compiler handles memoization automatically | 10#candidates | https://react.dev/learn/react-compiler | 2026-10-23 | Intro: "automatically optimizes" … "by handling memoization for you" |
| Svelte compiles components to JavaScript | 10#candidates | https://svelte.dev/docs/svelte/overview | 2026-10-23 | "It uses a compiler to turn declarative components" |
| Runes (`$state`, `$derived`) control the Svelte compiler; `$state` declares reactive state | 10#candidates, 10#why-svelte | https://svelte.dev/docs/svelte/what-are-runes | 2026-10-23 | "symbols that you use in .svelte … files to control the Svelte compiler" |
| SolidJS: fine-grained reactivity; a component runs once | 10#candidates | https://docs.solidjs.com/concepts/components/basics | 2026-10-23 | "a Solid component is only run once"; overview: "fine-grained reactivity" |
| Lit builds web components; re-renders when a reactive property changes | 10#candidates | https://lit.dev/docs/ | 2026-10-23 | "Lit is a simple library for building fast, lightweight web components." |
| Starter bundle sizes (gzip): React ≈ 68 KB, Svelte ≈ 13 KB, Lit ≈ 7.5 KB, SolidJS ≈ 4.3 KB | 10#candidates (table, Deeper) | measured, see "Bundle size measurement" below | 2026-10-23 | Own measurement, method below |
| SvelteKit code-splits so only the current page's code loads | 10#why-svelte, 10#lazy-modules | https://svelte.dev/docs/kit/performance | 2026-10-23 | "Code-splitting, so that only the code you need for the current page is loaded" |
| Svelte has an official MCP server with `svelte-autofixer`, `list-sections`, `get-documentation` | 10#why-svelte | https://svelte.dev/docs/ai/tools | 2026-10-23 | "svelte-autofixer": "Uses static analysis to provide suggestions for code" |
| Svelte publishes docs for LLMs (`llms.txt`) | 10#why-svelte | https://svelte.dev/docs/llms | 2026-10-23 | "We support the llms.txt convention" |
| "Largest ecosystem", "agent may write Svelte 4 syntax" | 10#candidates, 10#why-svelte | — | — | Author's judgment, not a sourced fact; no number attached |

### Speed techniques

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| Dexie is an IndexedDB wrapper; schema versions via `version(n)` and `.upgrade()`; failed upgrade rolls back | 10#local-db, 11#versions | https://dexie.org/docs/Tutorial/Design | 2026-10-23 | "Database Versioning": "Create/drop/alter indexes or tables by adding a new version(x)" |
| SQLite has an official WASM build; OPFS persistence only in a Worker | 10#local-db | https://sqlite.org/wasm/doc/trunk/persistence.md | 2026-10-23 | "OPFS is only available in Worker-thread contexts" |
| Virtualisation renders only what is visible | 10#virtual-lists | https://web.dev/articles/virtualize-long-lists-react-window | 2026-10-23 | Intro: "only rendering what is visible to the user" |
| Dynamic `import()` loads a module on demand | 10#lazy-modules | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import | 2026-10-23 | "Description": "load a module conditionally or on demand" |
| Web Workers keep the main (UI) thread unblocked | 10#workers, 11#analytics | https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API | 2026-10-23 | Intro: "allowing the main (usually the UI) thread to run without being blocked" |

### Android, PWA and notifications

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| A PWA can be installed on the device and work offline | 10#android | https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps | 2026-10-23 | Intro: "it can be installed on the device, can operate while offline" |
| Capacitor is a cross-platform native runtime for web apps | 10#android | https://capacitorjs.com/docs | 2026-10-23 | "Capacitor is a cross-platform native runtime" |
| Notification Triggers API (scheduled notifications) development has ended in Chrome | 10#android (Callout) | https://developer.chrome.com/docs/web-platform/notification-triggers | 2026-10-23 | Warning banner: "The development of Notification Triggers API … has ended." |
| Periodic Background Sync: browser decides timing; only for installed web apps | 10#android (Callout) | https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API | 2026-10-23 | "Concepts and usage": "the user agent might also take into account other factors" |
| Push: messages pushed from a server, whether or not the app is in the foreground | 10#android | https://developer.mozilla.org/en-US/docs/Web/API/Push_API | 2026-10-23 | Intro: "receive messages pushed to them from a server" |
| Capacitor Local Notifications schedules notifications locally | 10#android | https://capacitorjs.com/docs/apis/local-notifications | 2026-10-23 | Intro: "schedule device notifications locally" |
| Android 12+: scheduled notifications not exact without the exact alarm permission; user can switch it off | 10#android | https://capacitorjs.com/docs/apis/local-notifications | 2026-10-23 | "Android": "Starting on Android 12, scheduled notifications won't be exact" |
| `SCHEDULE_EXACT_ALARM` not pre-granted to fresh installs targeting Android 13+; "Alarms & reminders" | 10#android | https://developer.android.com/develop/background-work/services/alarms/schedule | 2026-10-23 | "not pre-granted to fresh installs of apps targeting Android 13" |
| Capacitor runs the web app in a native shell; plugins bridge to native APIs | 10#android (Deeper) | https://capacitorjs.com/docs | 2026-10-23 | "run natively on iOS, Android, and more" |

### Targets and measuring

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| RAIL: process input within 50 ms for a visible response within 100 ms | 10#targets | https://web.dev/articles/rail | 2026-10-23 | "To ensure a visible response within 100 ms, process user input events within 50 ms." |
| INP ≤ 200 ms is good responsiveness | 10#targets | https://web.dev/articles/inp | 2026-10-23 | "An INP below or at 200 milliseconds means" good responsiveness |
| Cold start < 1 s, 5,000-task list | 10#targets | docs/spec/parts/06-app-architecture.md | 2026-10-23 | Targets set by the spec, presented as the guide's goals |
| Lighthouse audits performance, accessibility, SEO | 10#measure | https://developer.chrome.com/docs/lighthouse/overview | 2026-10-23 | "has audits for performance, accessibility, SEO, and more" |
| Performance panel records runtime performance | 10#measure | https://developer.chrome.com/docs/devtools/performance | 2026-10-23 | "Take a recording in the Performance panel" |
| Remote debugging steps: Developer Options, USB debugging, `chrome://inspect#devices`, Discover USB devices, Inspect | 10#measure | https://developer.chrome.com/docs/devtools/remote-debugging | 2026-10-23 | Step 1 "Discover your Android device"; "Enable USB Debugging" |

### Architecture

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| `EventTarget` + `CustomEvent` as an event bus | 11#events | https://developer.mozilla.org/en-US/docs/Web/API/EventTarget | 2026-10-23 | Code tested in Node 22 (see run below) |
| `CustomEvent` carries data in `detail` | 11#events | https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | 2026-10-23 | Property `detail` |
| `tel:` link: phones dial the number; behaviour varies by device | 11#clients | https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a | 2026-10-23 | "Linking to telephone numbers": "Cellular devices autodial the number." |

## Runs

### Laptop pull (chapter 06#pull)

Scratch repo: bare `origin.git`, clones `thread` and `laptop`. The thread pushed "Add Inbox screen",
then merged branch `add-pick-for-me` into `main` and pushed. In `laptop`:

```text
$ git switch main
Already on 'main'
Your branch is up to date with 'origin/main'.
$ git pull
Updating a655daa..e96e491
Fast-forward
 pick.txt | 1 +
$ git log --oneline -3
e96e491 Merge pick-for-me
a655daa Add Inbox screen
22faee3 Add pick-for-me button
```

### Bundle size measurement (chapter 10#candidates)

`npm create vite@6 <name> -- --template react|svelte|solid|lit` (Vite 6.4.5 starter: a counter page),
`npm install`, `npm run build`, then `gzip -9 -c dist/assets/*.js | wc -c`. Versions: react and
react-dom 19.3.1, svelte 5.57.2, solid-js 1.9.17, lit 3.3.3. Measured 2026-10-23.

| Framework | raw bytes | gzip bytes |
| --- | --- | --- |
| React | 224649 | 69557 |
| Svelte | 35423 | 13736 |
| Lit | 20206 | 7671 |
| SolidJS | 10986 | 4429 |

### Code samples (chapter 11)

- `db.ts` migration: run with dexie 4.4.7 + fake-indexeddb in Node 22. Version 1 record without
  `updatedAt` got `updatedAt` = `createdAt` after opening version 2; `where('tags').equals(...)` works.
- `pickForMe`: 10,000 runs with tasks of weight 6 and 1 gave 8566 / 1434 (expected 6/7 ≈ 85.7 %).
  A 5-minute window returned `undefined`.
- `events.ts`: `on` received the payload; after `off()` the second `emit` was not delivered.
- `tsc --strict --noEmit` passed for `events.ts` and the picker.

## New terms

| EN | RU | Definition |
| --- | --- | --- |
| sandbox | песочница | Temporary cloud machine where a thread works; can be reclaimed |
| Library | Library | Project tab with uploaded files and files threads produced; uploads are copies |
| IndexedDB | IndexedDB | Browser database on the device, bound to the site's origin |
| export / import | экспорт / импорт | Save all app data to one JSON file and load it back |
| backup | бэкап | Export file stored outside the phone |
| framework | фреймворк | Ready-made frame for building screens; handles reactivity |
| reactivity | реактивность | Data changes → the screen updates by itself |
| rune | руна | Svelte 5 symbol such as `$state`, `$derived` that controls the compiler |
| bundle | бандл | The JavaScript files the browser downloads to run the app |
| virtual list | виртуальный список | List that renders only the visible rows |
| lazy loading | ленивая загрузка | Downloading a module's code only when it is needed |
| web worker | воркер | Background browser thread for heavy work |
| Capacitor | Capacitor | Native shell that turns a web app into an Android/iOS app |
| item | запись | One unit of data in the app with a type (task, note, habit…) |
| module | модуль | One feature in its own folder `src/modules/<name>/` |
| manifest | паспорт (manifest) | Module file with name, icon, routes, Today widget, settings |
| registry | реестр | Single list of all module manifests |
| event | событие | Message "something happened" sent to any listener |
| core | ядро | Shared part: item model, db, events, registry, export, migrations |
| schema version | версия схемы | Numbered shape of the data |
| migration | миграция | Code that moves stored records to a new schema version |
| streak | серия | Days in a row a habit was checked |

## Ready phrases

| Title | When | Chapter#anchor |
| --- | --- | --- |
| Коммить незаконченное | Long task or project instructions rule | 06#commit-often |
| Всё ли запушено | Before a pause or end of session | 06#check-saved |
| Экспорт и импорт | First app version | 06#backup |
| Правило про Svelte | Project instructions, before the first code thread | 10#why-svelte |
| Точные напоминания | Before the Clients module | 10#android |
| Замер скорости | After each new module | 10#measure |
| Проверка архитектуры | After each wave of modules | 11#core |
| Новый модуль | Start of any module after the skeleton | 11#build-order |

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Thread says "done", nothing on GitHub | Work not committed and pushed; sandbox reclaimed | Ask to commit and push WIP after every step (06#commit-often) |
| Thread follows an old spec | Library holds a copy; local file changed later | Re-upload with **Replace**, or keep the spec in `docs/` (06#library-copies) |
| App on the laptop is empty | Data lives in the phone's browser, not on GitHub | Export on the phone, import on the laptop (06#data-on-phone) |
| Data gone after clearing site data | IndexedDB is wiped with site data | Restore from the JSON backup (06#backup) |
| Laptop copy shows old code | Local copy doesn't update itself | `git switch main` then `git pull` (06#pull) |
| Call reminder arrives late or not at all | Pure PWA has no exact scheduled notifications; Android exact alarm permission off | Capacitor Local Notifications + check exact alarm setting (10#android) |
| Thread writes `export let` / `$:` | Old Svelte 4 syntax from model memory | Runes rule in project instructions, Svelte MCP + autofixer (10#why-svelte) |
| Long list stutters | All rows rendered at once | Virtual list (10#virtual-lists) |
| Screen freezes during search or analytics | Heavy work on the main thread | Move it to a web worker (10#workers) |
| Two threads' PRs keep conflicting | Modules import each other or edit shared files | One thread per module folder, events only (11#one-thread-one-folder) |
| Data broken after an update | Faulty migration | Restore the export made before the update; fix the migration (11#versions) |

## Open questions

- Safari's 7-day eviction (settled in review): WebKit says home-screen web apps "have their own counter of days of use", so
  the Safari rule is counted separately for them (https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/).
  Chapter 06 now says this. The friend uses Android, so it stays a side note.
- Framework "ecosystem" and "help for the agent" cells are judgments; only the MCP/llms.txt part is sourced.

## Fixes wave (2026-10-24), chapter 06

Chapter 06 was rewritten around one path: you write the spec → a cloud thread → push to GitHub → deploy to a server or download to your device (new diagram in `#code-path`). Added a G1 intro (`#what-is-sync`) and the Library-vs-GitHub split in `#library-copies` (specs, progress files and notes live on GitHub and survive deleting the project). The laptop part (`#thread-copy`, `#pull`, `#both-sides`, `claude --teleport`) is cut to two lines in `#devices`; `#hosting` folded into `#code-path`; the Safari/eviction Deeper and `#backup-place` cut to one paragraph. Kept anchors with inbound links: `#commit-often`, `#library-copies`, `#data-on-phone`, `#backup`. The "Laptop pull" run above no longer backs any text on the page.

## Fixes wave (2026-10-24), chapters 10 and 11

- Chapter 11 reworked for a non-technical reader: plain intro and four terms (module, core, data
  model, event), the two halves of a repository, our own repository folder by folder, the second
  brain's architecture as short plain subsections plus one Accordion with the agent-level details,
  and three other architecture patterns with a ready phrase each. Code samples removed from the main
  text; the agent details keep the module folder tree only. Incoming anchors kept: `item`, `module`,
  `events`, `one-thread-one-folder`, `versions`, `export`.
- Source for "our repository" (11#our-repo): the repository tree on `main` at 2026-10-24
  (`CLAUDE.md`, `docs/spec/{00-general.md,INDEX.md,parts/}`, `docs/PROGRESS.md`, `docs/DECISIONS.md`,
  `docs/STYLE.md`, `docs/COMPONENTS.md`, `docs/parts/`, `docs/reviews/`, `src/content/`,
  `src/lib/components/`, `src/routes/`, `static/`, `config/`, `.github/workflows/deploy.yml` runs on
  push to `main`). No `.claude/skills/` in the repository.
- Chapter 10: new plain intro on what a stack is and where the choice is recorded; framework
  CompareTable, Svelte code sample, bundle-size code block and notification CompareTable replaced by
  plain text; DevTools steps cut to one line and a link; "Common.js" callout shortened to one line.
  Removed sources no longer cited: React Render and Commit, React Compiler, SQLite WASM, MDN import(),
  Chrome Performance panel.

### New terms

| EN | RU | Definition |
| --- | --- | --- |
| architecture | архитектура | Plan of the app: what lives where and who talks to whom |
| data model | модель данных | Shape of the data: which fields a record has; not the neural network |
| core | ядро | Shared part every module relies on: storage, menu, shared controls |
| event | событие | "Something happened" message a module broadcasts to the others |
| stack | стек | Set of tools the app is built from |
