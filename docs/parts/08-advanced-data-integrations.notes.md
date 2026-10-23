# Part 08 notes: Advanced A1, A2, A5

Chapters: `src/content/advanced/a1-local-first.md`, `src/content/advanced/a2-integrations.md`,
`src/content/advanced/a5-performance.md`. No new components.

## Sources

All rows checked on 2026-10-23. Anchors: A1 = `/advanced/a1-local-first`, A2 = `/advanced/a2-integrations`,
A5 = `/advanced/a5-performance`. Locators were captured through a fetch tool that summarises pages, so a quote
may differ slightly from the page wording; the section named in the locator is reliable.

### A1 — Local-first and sync

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| Local-first essay, April 2019, seven ideals (no spinners, network optional, ownership) | A1#local-first | https://www.inkandswitch.com/essay/local-first/ | 2026-10-23 | Headings "No spinners", "The network is optional", "You retain ultimate ownership" |
| Dexie simplifies IndexedDB; Dexie Cloud is a sync add-on | A1#storage, #sync-paths | https://dexie.org/ | 2026-10-23 | "IndexedDB made simple" |
| `liveQuery()` re-runs on relevant writes, also across tabs | A1#storage | https://dexie.org/docs/liveQuery() | 2026-10-23 | "Turns a Promise-returning function that queries Dexie into an Observable" |
| `version(n).upgrade(fn)` migrates data | A1#migrations | https://dexie.org/docs/Version/Version.upgrade() | 2026-10-23 | Syntax `version.upgrade(upgraderFunction)` |
| Dexie Cloud Free: €0, 3 production users, 100 MB | A1#sync-paths | https://dexie.org/cloud/pricing | 2026-10-23 | Plan card "Cloud Free" (page inconsistent on other limits; not quoted) |
| SQLite WASM is an official SQLite deliverable | A1#storage | https://sqlite.org/wasm/doc/trunk/about.md | 2026-10-23 | "first-class members of the family of supported SQLite deliverables" |
| `opfs` VFS needs a Worker and COOP/COEP for SharedArrayBuffer | A1#storage | https://sqlite.org/wasm/doc/trunk/persistence.md | 2026-10-23 | Section "OPFS VFS": "Without these headers, the SharedArrayBuffer will not be available" |
| `opfs-sahpool` needs no COOP/COEP, best OPFS performance, no concurrent connections | A1#storage | https://sqlite.org/wasm/doc/trunk/persistence.md | 2026-10-23 | Section "OPFS SyncAccessHandle Pool VFS": "Easily the highest OPFS performance" |
| No official SQLite-vs-IndexedDB benchmark | A1#storage (callout) | https://sqlite.org/wasm/doc/trunk/index.md ; https://web.dev/articles/origin-private-file-system | 2026-10-23 | No benchmark on either page; web.dev only "highly optimized for performance" |
| GitHub Pages does not support custom HTTP headers | A1#storage | https://github.com/orgs/community/discussions/84963 | 2026-10-23 | "GitHub Pages does not support customizing HTTP headers today." |
| GitHub: COOP/COEP is a scenario for custom headers, no ETA | A1#storage | https://github.com/orgs/community/discussions/13309 | 2026-10-23 | "No ETA at the moment as to when this feature will be available." |
| OPFS Baseline since March 2023; sync access only in workers | A1#storage | https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system | 2026-10-23 | "can be run inside web workers only" |
| PGlite: Postgres in WASM, under 3 MB gzipped | A1#storage | https://pglite.dev/ | 2026-10-23 | "under 3MB Gzipped" |
| PGlite `idb://` all browsers; `opfs-ahp://` Worker only, not Safari | A1#storage | https://pglite.dev/docs/filesystems | 2026-10-23 | "the OPFS VFS is not supported by Safari" |
| PGlite pgvector extension; live queries in main package | A1#storage | https://pglite.dev/extensions/ | 2026-10-23 | "`live` is included in the main PGlite package" |
| Chrome: up to 60% of disk per origin | A1#quotas | https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria | 2026-10-23 | Section "Chrome and Chromium-based browsers" |
| Firefox: best-effort min(10% disk, 10 GiB); persistent up to 50% | A1#quotas | same | 2026-10-23 | Section "Firefox" |
| Safari: about 60% of disk for browser apps | A1#quotas | same | 2026-10-23 | Section "Safari" |
| Best-effort is default; LRU eviction under pressure; persistent deleted only by user | A1#quotas | same | 2026-10-23 | "Data eviction is the process by which a browser deletes an origin's stored data." |
| `persist()` prompts in Firefox; Chrome and Safari decide silently; `estimate()` | A1#quotas | same | 2026-10-23 | Sections "Does browser-stored data persist?", "How to check the available space?" |
| Safari 7-day cap on script-writable storage | A1#quotas | https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/ | 2026-10-23 | Heading "7-Day Cap on All Script-Writeable Storage" |
| Supabase Free: 500 MB DB, paused after 1 week of inactivity | A1#sync-paths | https://supabase.com/pricing | 2026-10-23 | "Free projects are paused after 1 week of inactivity." |
| Supabase points to PowerSync for offline-first | A1#sync-paths | https://supabase.com/partners/integrations/powersync | 2026-10-23 | "drop-in sync layer for making apps built on Supabase work offline-first" |
| PocketBase: one file, Go, SQLite, realtime; no compat guarantee before 1.0; v0.40.5 | A1#sync-paths | https://github.com/pocketbase/pocketbase ; https://pocketbase.io/ | 2026-10-23 | "full backward compatibility is not guaranteed before reaching v1.0.0" |
| PowerSync: Postgres, MongoDB, MySQL (beta) to client SQLite | A1#sync-paths | https://docs.powersync.com/intro/powersync-overview | 2026-10-23 | "supports these source databases" |
| PowerSync Free deactivated after 1 week of inactivity | A1#sync-paths | https://www.powersync.com/pricing | 2026-10-23 | "Free projects are deactivated after 1 week of inactivity." |
| PowerSync self-hosted is source-available (FSL) | A1#sync-paths | https://www.powersync.com/open-source | 2026-10-23 | "source available, self-hosted version" |
| Electric: read-path sync for Postgres, writes through your API | A1#sync-paths | https://electric.ax/docs/intro | 2026-10-23 | "a read-path sync engine for Postgres" |
| Electric 1.0 GA, March 2025 | A1#sync-paths | https://electric.ax/blog/2025/03/17/electricsql-1.0-released | 2026-10-23 | "Electric is now in GA." (date from URL) |
| Zero generally available as of March 2026; 1.0 stable | A1#sync-paths | https://zero.rocicorp.dev/docs/status ; https://zero.rocicorp.dev/docs/release-notes/1.0 | 2026-10-23 | "As of March 2026, Zero is generally available and fully-supported." |
| Triplit team joined Supabase, 8 Oct 2025 | A1#sync-paths | https://supabase.com/blog/triplit-joins-supabase | 2026-10-23 | "Our focus isn't to directly integrate Triplit into our platform" |
| InstantDB team joined OpenAI; services until 31 Aug 2027 | A1#sync-paths | https://www.instantdb.com/essays/instant_team_joins_openai ; https://www.instantdb.com/ | 2026-10-23 | "Services will continue until August 31st, 2027." |
| Jazz 2.0 alpha, "a local-first relational database" | A1#sync-paths | https://jazz.tools/docs | 2026-10-23 | "this is the Jazz 2.0 alpha with an entirely new API" |
| Yjs is a CRDT; providers y-indexeddb, y-websocket | A1#sync-paths, #text-crdt | https://docs.yjs.dev/ ; https://docs.yjs.dev/ecosystem/database-provider/y-indexeddb ; https://docs.yjs.dev/ecosystem/connection-provider/y-websocket | 2026-10-23 | "Yjs is a high-performance CRDT for building collaborative applications" |
| Automerge 3.0 (July 2025) cut memory over 10x | A1#sync-paths | https://automerge.org/blog/automerge-3/ | 2026-10-23 | "cut that down memory usage by over 10x" |
| CRDT data can always be merged into a consistent state | A1#sync-paths | https://crdt.tech/ | 2026-10-23 | "can always be merged into a consistent state" |
| Hybrid logical clocks: Kulkarni, Demirbas et al. | A1#hlc | https://www.cse.buffalo.edu/~demirbas/publications/hlc.pdf | 2026-10-23 | Title "Logical Physical Clocks" |
| OWASP: PBKDF2-HMAC-SHA256 600,000 iterations | A1#e2e | https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html | 2026-10-23 | "PBKDF2-HMAC-SHA256: 600,000 iterations" |
| AES-GCM has built-in authentication | A1#e2e | https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt | 2026-10-23 | "GCM does provide built-in authentication" |
| AES-GCM IV unique per key, 96 bits recommended, can be public | A1#e2e | https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams | 2026-10-23 | "never reuse an IV with the same key" |
| deriveKey with PBKDF2 to AES-GCM | A1#e2e | https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey | 2026-10-23 | PBKDF2 example |
| `showSaveFilePicker`: Chrome 86, Chrome Android 132; not Firefox, Safari | A1#backup | https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker ; https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/Window.json | 2026-10-23 | BCD `showSaveFilePicker`: chrome 86, chrome_android 132 |
| Drive `appDataFolder` is hidden, scope `drive.appdata` | A1#backup, A2#google | https://developers.google.com/workspace/drive/api/guides/appdata | 2026-10-23 | "hidden from the user and from other Google Drive apps" |
| `drive.appdata` and `drive.file` are non-sensitive | A1#backup, A2#oauth | https://developers.google.com/workspace/drive/api/guides/api-specific-auth | 2026-10-23 | Scope table, column "Sensitivity" |

### A2 — Integrations

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| Workers Free: 100,000 requests/day, 10 ms CPU, 5 Cron Triggers per account | A2#how-to-read | https://developers.cloudflare.com/workers/platform/limits/ | 2026-10-23 | Row "Number of Cron Triggers per account"; requests and CPU rows |
| Secrets via `wrangler secret put` | A2#how-to-read | https://developers.cloudflare.com/workers/configuration/secrets/ | 2026-10-23 | "npx wrangler secret put <KEY>" |
| SDK refuses browser unless `dangerouslyAllowBrowser`; exposes credentials | A2#how-to-read | https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/typescript | 2026-10-23 | "Web browsers: disabled by default to avoid exposing your secret API credentials" |
| Keep API keys out of code | A2#how-to-read | https://support.claude.com/en/articles/9767949-api-key-best-practices-keeping-your-keys-safe-and-secure | 2026-10-23 | Never put keys in code; use secrets or environment variables |
| Chrome Web Speech sends audio to a server, no offline | A2#capture | https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition | 2026-10-23 | "Your audio is sent to a web service for recognition processing" |
| On-device Web Speech in Chrome 139 | A2#capture | https://developer.chrome.com/blog/new-in-chrome-139 | 2026-10-23 | Heading "On-device Web Speech API" |
| `processLocally` not on Chrome Android; Safari prefixed; Firefox preview | A2#capture | https://github.com/mdn/browser-compat-data/blob/main/api/SpeechRecognition.json | 2026-10-23 | keys `processLocally`, `available_static` (chrome_android false) |
| OpenAI: `gpt-transcribe` recommended; old models deprecated, shutdown 2027-02-26; 25 MB | A2#capture | https://developers.openai.com/api/docs/guides/speech-to-text | 2026-10-23 | "Start with gpt-transcribe"; "Files can be up to 25 MB." |
| OpenAI `gpt-transcribe` $0.0045/min | A2#capture, #voice-inbox | https://developers.openai.com/api/docs/pricing | 2026-10-23 | Transcription rows, "Estimated cost" |
| Deepgram Nova-3 $0.0043/min; $200 credit | A2#capture | https://deepgram.com/pricing | 2026-10-23 | Pre-recorded pay-as-you-go table; "free $200 credit" |
| Deepgram Nova-3 supports Russian | A2#capture | https://developers.deepgram.com/docs/models-languages-overview | 2026-10-23 | Nova-3 language list (`ru`) |
| AssemblyAI Universal-3.5 Pro $0.21/h; up to 185 h free, no card | A2#capture | https://www.assemblyai.com/pricing | 2026-10-23 | Pay-as-you-go table; free credit section |
| ElevenLabs Scribe v2: 90+ languages incl. Russian | A2#capture | https://elevenlabs.io/docs/capabilities/speech-to-text | 2026-10-23 | Supported languages, Russian (rus) |
| ElevenLabs Scribe v2 $0.22/h | A2#capture | https://elevenlabs.io/pricing/api | 2026-10-23 | Speech to text price table |
| transformers.js runs Whisper (ASR), WASM by default, WebGPU via `device` | A2#capture | https://huggingface.co/docs/transformers.js/index ; https://huggingface.co/docs/transformers.js/guides/webgpu | 2026-10-23 | "the model will be run on your CPU (via WASM)" |
| whisper.cpp has a WASM example | A2#capture | https://github.com/ggml-org/whisper.cpp | 2026-10-23 | "Some of the examples are even ported to run in the browser" |
| Web Share Target only for installed PWAs | A2#capture | https://developer.mozilla.org/en-US/docs/Web/Manifest/share_target | 2026-10-23 | "Your PWA can only act as a web share target if it has been installed." |
| Share Target: Chrome 76+ on Android | A2#capture | https://developer.chrome.com/docs/capabilities/web-apis/web-share-target | 2026-10-23 | "Chrome 76 or later for Android" |
| `@capgo/capacitor-share-target` v8.0.63, 2026-10-19 | A2#capture | https://github.com/Cap-go/capacitor-share-target | 2026-10-23 | npm registry `dist-tags.latest` 8.0.63 |
| `send-intent` last published 2025-02-27 | A2#capture | https://github.com/carsten-klaffke/send-intent | 2026-10-23 | npm registry `time` 7.0.0 |
| Claude vision: JPEG, PNG, GIF, WebP; 10 MB; 8000x8000; 100 images | A2#capture | https://platform.claude.com/docs/en/build-with-claude/vision | 2026-10-23 | "Claude supports JPEG, PNG, GIF, and WebP images" |
| Web NFC: Chrome Android 89, HTTPS, user gesture | A2#capture | https://developer.chrome.com/docs/capabilities/nfc | 2026-10-23 | "while handling a user gesture" |
| Calendar API free; 10,000/min per project, 600/min per user | A2#google | https://developers.google.com/workspace/calendar/api/guides/quota | 2026-10-23 | "available at no additional cost"; quota table |
| `freeBusy.query` endpoint and scopes | A2#google | https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query | 2026-10-23 | Authorization scopes |
| Tasks `due` keeps only the date | A2#google | https://developers.google.com/workspace/tasks/reference/rest/v1/tasks | 2026-10-23 | "time portion of the timestamp is discarded when setting this field" |
| Docs `documents.create` uses only title; body via `batchUpdate` | A2#google | https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/create | 2026-10-23 | "Creates a blank document using the title given" |
| Sheets: 300/min per project, 60/min per user | A2#google | https://developers.google.com/workspace/sheets/api/limits | 2026-10-23 | Quota section |
| Gmail `messages.list` takes `q` in Gmail search syntax | A2#google | https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list | 2026-10-23 | Query parameter `q` |
| Gmail scopes: readonly etc. restricted; send sensitive; labels non-sensitive | A2#google, #oauth | https://developers.google.com/workspace/gmail/api/auth/scopes | 2026-10-23 | Scope table by sensitivity |
| Restricted scopes need annual CASA; personal use is an exemption | A2#google | https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification | 2026-10-23 | Exceptions list; "security assessment" |
| Reading Calendar events is a sensitive-scope example | A2#oauth | https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification | 2026-10-23 | "reading events stored in Google Calendar" |
| Maps: $200 credit replaced by per-SKU free thresholds, March 2025 | A2#google | https://developers.google.com/maps/billing-and-pricing/march-2025 | 2026-10-23 | "replaced the USD $200 monthly recurring credit" |
| Maps: Routes Essentials and Autocomplete Essentials 10,000 free/month | A2#google | https://developers.google.com/maps/billing-and-pricing/pricing | 2026-10-23 | SKU tables, "Free cap" |
| `@capgo/background-geolocation` free, has geofencing | A2#google | https://github.com/Cap-go/capacitor-background-geolocation | 2026-10-23 | README "Geofencing" |
| Transistor Software: release licence from $399 | A2#google | https://docs.transistorsoft.com/purchase/?platform=capacitor | 2026-10-23 | Plan "Starter" |
| Testing status: 100 test users; authorization expires after 7 days | A2#oauth | https://support.google.com/cloud/answer/15549945 | 2026-10-23 | "Authorizations by a test user will expire seven days" |
| Refresh token in Testing expires in 7 days | A2#oauth | https://developers.google.com/identity/protocols/oauth2 | 2026-10-23 | "is issued a refresh token expiring in 7 days" |
| User access tokens expire after one hour | A2#oauth | https://docs.cloud.google.com/docs/authentication/token-types | 2026-10-23 | "User access tokens automatically expire after one hour" |
| GIS token model: access token from a user gesture, no refresh tokens | A2#oauth | https://developers.google.com/identity/oauth2/web/guides/use-token-model | 2026-10-23 | "there is no need to store per-user refresh tokens" |
| Haiku 5.5 $0.10/$0.50 per MTok up to 100K; Sonnet 5.5 $2/$10 | A2#claude-api | https://platform.claude.com/docs/en/about-claude/pricing ; https://platform.claude.com/docs/en/about-claude/models/overview | 2026-10-23 | Model pricing table; "Claude Haiku 5.5 (for prompts over 100,000 tokens)" |
| Structured outputs GA: `output_config.format`, `strict: true`, no beta header; `additionalProperties: false` | A2#claude-api, #voice-inbox | https://platform.claude.com/docs/en/build-with-claude/structured-outputs | 2026-10-23 | "beta headers are no longer required"; section "Migrating from the beta" |
| Forced `tool_choice` returns 400 on Opus 5.5 and Sonnet 5.5; Haiku 5.5 accepts it | A2#claude-api | https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools | 2026-10-23 | Section "Forcing tool use", restriction table |
| Batches: 50% price, most within 1 hour, expire after 24 hours | A2#claude-api | https://platform.claude.com/docs/en/build-with-claude/batch-processing | 2026-10-23 | "most batches completing within 1 hour" |
| No Anthropic embedding model; docs recommend Voyage AI | A2#claude-api | https://platform.claude.com/docs/en/build-with-claude/embeddings | 2026-10-23 | "Anthropic does not offer its own embedding model" |
| Voyage `voyage-4-lite` $0.02/M; first 200M tokens free | A2#claude-api | https://docs.voyageai.com/docs/pricing | 2026-10-23 | Table "Price per million tokens / Free tokens" |
| Cache read 0.1x; Sonnet 5.5 and Opus 5.5 0.05x; min 512 tokens on 5.5 models | A2#claude-api | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | 2026-10-23 | Footnote 2 under model table; table "Minimum cacheable prompt length" |
| Cloudflare remote MCP: Streamable HTTP, `createMcpHandler`, `McpAgent` deprecated, workers-oauth-provider | A2#own-mcp | https://developers.cloudflare.com/agents/guides/remote-mcp-server/ ; https://developers.cloudflare.com/agents/api-reference/mcp-handler-api/ | 2026-10-23 | `McpAgent` deprecation callout |
| MCP transports: stdio and Streamable HTTP | A2#own-mcp | https://modelcontextprotocol.io/specification/latest/basic/transports | 2026-10-23 | "Streamable HTTP: each message is an HTTP POST to a single MCP endpoint" |
| Custom connectors: Free (1), Pro, Max, Team, Enterprise; Customize → Connectors; public URL | A2#own-mcp | https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp | 2026-10-23 | "Free users are limited to one custom connector." |
| D1 Free: 5 GB per account | A2#own-mcp | https://developers.cloudflare.com/d1/platform/limits/ | 2026-10-23 | "500 MB (Free)" per database, 5 GB per account |
| Telegram: setWebhook vs getUpdates; `X-Telegram-Bot-Api-Secret-Token` | A2#notifications | https://core.telegram.org/bots/api | 2026-10-23 | "This method will not work if an outgoing webhook is set up."; `secret_token` |
| Telegram: about 1 message/sec per chat | A2#notifications | https://core.telegram.org/bots/faq | 2026-10-23 | "avoid sending more than one message per second" |
| Cron Triggers run in UTC | A2#notifications | https://developers.cloudflare.com/workers/configuration/cron-triggers/ | 2026-10-23 | "Cron Triggers execute on UTC time" |
| KV Free: 100,000 reads, 1,000 writes per day | A2#notifications | https://developers.cloudflare.com/kv/platform/limits/ | 2026-10-23 | Limits table |
| Push API + VAPID | A2#notifications | https://developer.mozilla.org/en-US/docs/Web/API/Push_API ; https://datatracker.ietf.org/doc/html/rfc8292 | 2026-10-23 | RFC 8292 title "VAPID for Web Push" |
| iOS 16.4+ Web Push only for Home Screen web apps | A2#notifications | https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ | 2026-10-23 | "we are adding support for Web Push to Home Screen web apps" |
| `web-push` library is for Node.js | A2#notifications | https://github.com/web-push-libs/web-push | 2026-10-23 | README "Web Push library for Node.js" |
| Resend Free 3,000/month, 100/day | A2#notifications | https://resend.com/pricing | 2026-10-23 | "3,000 emails / mo", "100 emails a day" |
| Postmark free 100/month | A2#notifications | https://postmarkapp.com/pricing | 2026-10-23 | "100 emails/month" |
| Health Connect in Android 14; Play app on Android 9–13 | A2#context-import | https://developer.android.com/health-and-fitness/health-connect/get-started | 2026-10-23 | "Starting Android 14 (API Level 34), Health Connect is part of the Android Framework." |
| `capacitor-health` (mley) v8.4.0 | A2#context-import | https://github.com/mley/capacitor-health | 2026-10-23 | README "Capacitor plugin to read data from Apple Health and Google Health Connect."; npm 8.4.0 |
| `@capgo/capacitor-health` reads sleep, heart rate; last 30 days without history permission | A2#context-import | https://github.com/Cap-go/capacitor-health | 2026-10-23 | README, permission `READ_HEALTH_DATA_HISTORY`; identifiers `sleep`, `heartRate` |
| Open-Meteo: free non-commercial, no key, under 10,000 calls/day | A2#context-import | https://open-meteo.com/en/terms | 2026-10-23 | "Less than 10'000 API calls per day, 5'000 per hour and 600 per minute" |
| Spotify dev mode: owner needs Premium, up to 5 users (2026) | A2#context-import | https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security ; https://developer.spotify.com/documentation/web-api/concepts/quota-modes | 2026-10-23 | "Each Client ID will be limited to up to five authorized users" |
| Spotify: recommendations removed for new apps, 27 Nov 2024 | A2#context-import | https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api | 2026-10-23 | "New apps registered on or after November 27, 2024" |
| Notion: 180 requests/min; data sources since 2025-09-03 | A2#context-import | https://developers.notion.com/reference/request-limits ; https://developers.notion.com/guides/get-started/upgrade-guide-2025-09-03 | 2026-10-23 | "180 requests per minute (an average of 3 per second)" |
| Todoist API v1, `/api/v1/sync`; token in Settings → Integrations → Developer | A2#context-import | https://developer.todoist.com/api/v1/ ; https://www.todoist.com/help/articles/find-your-api-token-Jpzx9IIlB | 2026-10-23 | "A unified, (mostly) RESTful API"; Todoist help steps 3 to 6 |
| Obsidian: Markdown files, properties in YAML | A2#context-import | https://obsidian.md/help/properties | 2026-10-23 | "Properties are stored in YAML format at the top of the file" |
| iCalendar is RFC 5545 | A2#context-import | https://www.rfc-editor.org/rfc/rfc5545.html | 2026-10-23 | Table of contents 3.6.1 "Event Component", 3.6.2 "To-Do Component" |
| n8n Sustainable Use License allows personal use | A2#context-import | https://github.com/n8n-io/n8n/blob/master/LICENSE.md | 2026-10-23 | "only for your own internal business purposes or for non-commercial or personal use" |
| Webhooks by Zapier is a Premium app, paid plans only | A2#context-import | https://zapier.com/pricing ; https://zapier.com/apps/webhook/integrations | 2026-10-23 | "Premium apps are select apps exclusively available to users on paid Zapier plans." |

### A5 — Performance

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| `$state` deep proxy; `$state.raw` only reassigned | A5#runes | https://svelte.dev/docs/svelte/$state | 2026-10-23 | "cannot be mutated; it can only be reassigned" |
| `$derived(expr)` equals `$derived.by(() => expr)`; recalculated when next read | A5#runes | https://svelte.dev/docs/svelte/$derived | 2026-10-23 | "recalculated when it is next read" |
| Deriveds can be overridden since 5.25 | A5#effect-vs-derived | https://svelte.dev/docs/svelte/$derived | 2026-10-23 | "Prior to Svelte 5.25, deriveds were read-only" |
| `$effect` runs after DOM updates, browser only, escape hatch, don't update state | A5#effect-vs-derived | https://svelte.dev/docs/svelte/$effect | 2026-10-23 | "When not to use $effect": "you should not update state inside effects" |
| `$effect.pre`, `untrack` | A5#effect-vs-derived | https://svelte.dev/docs/svelte/$effect | 2026-10-23 | Section "$effect.pre" |
| SvelteKit code-splits per page; `import()` for heavy components; recommends rollup-plugin-visualizer | A5#bundle, #lazy-import | https://svelte.dev/docs/kit/performance | 2026-10-23 | "only the code you need for the current page is loaded" |
| Preload options `eager`/`viewport`/`hover`/`tap` | A5#lazy-import | https://svelte.dev/docs/kit/link-options | 2026-10-23 | `viewport`: "preloaded once they enter the viewport" |
| Vite 8 uses Rolldown; most plugins work | A5#bundle | https://vite.dev/blog/announcing-vite8 | 2026-10-23 | "ships with Rolldown as its single, unified, Rust-based bundler" |
| rollup-plugin-visualizer needs Node 22+ | A5#bundle | https://github.com/btd/rollup-plugin-visualizer | 2026-10-23 | "requires Node.js >= 22" |
| Rolldown `bundleAnalyzerPlugin` experimental | A5#bundle | https://rolldown.rs/builtin-plugins/bundle-analyzer | 2026-10-23 | "This plugin is currently experimental" |
| Dexie schema `&`, `*`, `[a+b]` | A5#indexeddb | https://dexie.org/docs/Version/Version.stores() | 2026-10-23 | `*`: "each array value will be regarded as a key" |
| `bulkPut` faster than `put` in a loop; `bulkAdd` "a little faster" | A5#indexeddb | https://dexie.org/docs/Table/Table.bulkPut() ; https://dexie.org/docs/Table/Table.bulkAdd() | 2026-10-23 | "bulkPut() is faster than doing put() in a loop" |
| Transaction commits when unused for a tick | A5#indexeddb | https://dexie.org/docs/Dexie/Dexie.transaction() | 2026-10-23 | "commit a transaction as soon as it isn't used within a tick" |
| `offset()` not suited to paging; use index + limit | A5#indexeddb | https://dexie.org/docs/Collection/Collection.offset() | 2026-10-23 | "offset() is not well-suited to paging in general" |
| `liveQuery` usable as a Svelte store | A5#indexeddb | https://dexie.org/docs/liveQuery() | 2026-10-23 | "Svelte and Angular supports Observables natively" |
| `FileSystemSyncAccessHandle` only in dedicated workers | A5#sqlite-worker | https://developer.mozilla.org/en-US/docs/Web/API/FileSystemSyncAccessHandle | 2026-10-23 | "only available in Dedicated Web Workers" |
| Long task = 50 ms or more | A5#search-worker | https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming | 2026-10-23 | "busy for 50ms or longer" |
| MiniSearch: prefix, fuzzy, auto-suggest, boosting, zero deps | A5#search-worker | https://lucaong.github.io/minisearch/ | 2026-10-23 | "Auto-suggestion engine" |
| FlexSearch: workers, IndexedDB persistence | A5#search-worker | https://github.com/nextapps-de/flexsearch | 2026-10-23 | "Bigger workloads are scalable through workers" |
| Comlink 1.1 kB | A5#search-worker | https://github.com/GoogleChromeLabs/comlink | 2026-10-23 | "tiny library (1.1kB)" |
| `scheduler.yield()`: Chrome 129, Firefox 142, not Safari; not Baseline | A5#search-worker | https://web.dev/articles/optimize-long-tasks ; https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/yield | 2026-10-23 | "not Baseline because it does not work in some of the most widely-used browsers" |
| virtua requires Svelte 5 | A5#long-lists | https://github.com/inokawa/virtua | 2026-10-23 | "`svelte >= 5.0` is required." |
| TanStack Virtual Svelte adapter (store API) | A5#long-lists | https://tanstack.com/virtual/latest/docs/framework/svelte/svelte-virtual | 2026-10-23 | `createVirtualizer` |
| `content-visibility`: 232 ms → 30 ms; Chrome 85, Firefox 125, Safari 18 | A5#long-lists | https://web.dev/articles/content-visibility | 2026-10-23 | "from 232ms to 30ms on initial page load" |
| Only `transform` and `opacity` are compositor-only | A5#animations | https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count | 2026-10-23 | "only two properties ... transforms and opacity" |
| `will-change` is a last resort | A5#animations | https://developer.mozilla.org/en-US/docs/Web/CSS/will-change | 2026-10-23 | "Use the will-change property as a last resort" |
| View transitions: Chrome 111, Safari 18, Firefox 144; Baseline Oct 2025 | A5#view-transitions | https://developer.chrome.com/blog/view-transitions-in-2025 ; https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available | 2026-10-23 | "Earlier this week Firefox 144 was released." |
| `onNavigate` + `startViewTransition` pattern | A5#view-transitions | https://svelte.dev/blog/view-transitions | 2026-10-23 | `onNavigate((navigation) => {` |
| CPU throttling relative to your machine; calibrated presets | A5#measure | https://developer.chrome.com/docs/devtools/performance/reference | 2026-10-23 | "calibrate custom CPU throttling presets on your device" |
| CWV: LCP 2.5 s, INP 200 ms, CLS 0.1 at 75th percentile | A5#measure | https://web.dev/articles/vitals | 2026-10-23 | "a good threshold to measure is the 75th percentile" |
| INP replaced FID on 12 March 2024 | A5#measure | https://web.dev/blog/inp-cwv-march-12 | 2026-10-23 | "replace FID on March 12" |
| web-vitals ~3K brotli; attribution build | A5#measure | https://github.com/GoogleChrome/web-vitals | 2026-10-23 | "tiny (~3K, brotli'd), modular library" |
| Remote debugging via `chrome://inspect#devices` | A5#measure (link to guide) | https://developer.chrome.com/docs/devtools/remote-debugging | 2026-10-23 | Step 1 "Set up discovery" |

### Command runs

`rollup-plugin-visualizer` with this repo's Vite, in a scratch copy of the repository (2026-10-23):

```text
$ node -v
v22.22.0
$ npm i -D rollup-plugin-visualizer
(installed rollup-plugin-visualizer 7.1.1; vite 8.3.5 already present)
$ npx vite build   # with visualizer({ filename: 'stats.html', template: 'treemap', gzipSize: true, brotliSize: true })
✓ built in ...
$ ls -la stats.html
-rw-r--r-- 1 root root 318813 Oct 23 23:06 stats.html
```

No git commands are shown in these chapters. Code sketches (HLC, merge, crypto, Worker, voice capture,
Dexie queries) are illustrations and were not run; the build only checks that they render.

## New terms

| EN | RU | Definition |
| --- | --- | --- |
| local-first | local-first | Main copy of the data lives on the device; the server only helps copies meet |
| sync engine | движок синхронизации | Ready layer that keeps a client copy of the database and moves changes |
| CRDT | CRDT | Data structure that any two copies merge without a server and without conflicts |
| last-write-wins (LWW) | last-write-wins | Merge rule: the later timestamp wins, here per field |
| hybrid logical clock (HLC) | гибридные логические часы | Timestamp of physical time plus a counter, safe against clock skew |
| tombstone | отметка удаления (`deletedAt`) | Deleted record is marked, not erased, so sync does not bring it back |
| end-to-end encryption | сквозное шифрование | Data is encrypted on the device; the server sees only ciphertext |
| OPFS | OPFS | Origin private file system, the site's private files in the browser |
| eviction | вытеснение | Browser deletes a site's stored data when disk space runs out |
| structured outputs | структурный ответ (structured outputs) | Claude returns JSON that matches a given schema |
| embedding | эмбеддинг | Vector of numbers that encodes the meaning of a text, for semantic search |
| OAuth consent screen | OAuth consent screen | Google Cloud settings that users see when they grant access |
| restricted scope | ограниченная область | Google scope that needs a CASA security assessment for public apps |
| long task | длинная задача | Main-thread work of 50 ms or more; the screen does not respond |
| compositor-only property | — | `transform` and `opacity`, changed without layout or paint |
| Web Vitals (LCP, INP, CLS) | Web Vitals | Google's metrics for loading, responsiveness and layout stability |

## Ready phrases

- **Синхронизация по полям** (A1#backup): «Добавь синхронизацию записей между устройствами: отметки гибридных часов на каждое поле, слияние last-write-wins по полям, удаление через deletedAt. Текст заметок не трогай, его сделаем через Yjs отдельно. Схему Dexie меняй только добавлением полей. Работай в новой ветке и открой PR, ничего не форсь.»
- **Голосовой Inbox** (A2#voice-inbox): «Сделай голосовой Inbox: кнопка записи на экране Inbox, Cloudflare Worker с маршрутом, который распознаёт звук через OpenAI gpt-transcribe и разбирает фразу Claude Haiku 5.5 со structured outputs, и запись в Dexie со статусом inbox. Ключи только в секретах Worker через wrangler secret put, в коде приложения ключей нет. Работай в новой ветке и открой PR, ничего не форсь.»
- **Разбор производительности** (A5#measure): «Найди главную причину медленного экрана Today: собери stats.html через rollup-plugin-visualizer, проверь запросы к Dexie на индексы и найди длинные задачи больше 50 мс. Пришли три находки с цифрами. Исправь одну, самую крупную, в новой ветке и открой PR.»

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| SQLite WASM `opfs` VFS fails on GitHub Pages | No SharedArrayBuffer: Pages cannot send COOP/COEP | Use the `opfs-sahpool` VFS |
| Data disappears after a while | Best-effort storage evicted under disk pressure | Call `navigator.storage.persist()`, keep a backup |
| `TransactionInactiveError` in Dexie | Awaited `fetch` or a timer inside a transaction | Fetch first, then open the transaction |
| Deleted record comes back after sync | Record was erased instead of marked | Use `deletedAt` (tombstone) |
| Edit from one device always loses | Wall clocks differ between devices | Use hybrid logical clocks |
| Screen shows the old value for a frame, or loops | State computed in `$effect` | Move it to `$derived` |
| Google sign-in needed again every week | App in Testing status: refresh tokens expire after 7 days | Re-consent weekly or publish and verify |
| Error 400 with `tool_choice: any` | Forced tool use not accepted on Opus 5.5 / Sonnet 5.5 | Use `auto` with `strict: true`, or `output_config.format` |
| Timed reminder from Google Tasks has no time | Tasks API discards the time of `due` | Use Calendar events or own notifications |
| Web Push never arrives on iPhone | PWA not added to Home Screen, or iOS older than 16.4 | Add to Home Screen; or use Telegram |

## Open questions

Settled by the reviewer on 2026-10-23 (see `docs/reviews/08-advanced-data-integrations.md`):

- `web-push` in a Worker: left as is. The chapter tells the reader to check, which is the honest state.
- Todoist API v1 and Open-Meteo CORS: left as is. A2 marks Todoist "Проверь CORS"; no claim is made.
- GitHub Pages "no custom headers": two GitHub community answers agree; kept, `opfs-sahpool` is the advice either way.
- Zero 1.0 date: A1 now says only "общедоступен с марта 2026 года", as the official status page does.
- Spotify Premium: the source says "Development Mode use will require a Spotify Premium account" without naming the owner, so A2 no longer says "владельцу".
- Spotify Web Playback SDK and Health Connect plugins: checked from pages only, not run. Accepted.
- Code sketches not run against live APIs (no keys here). Accepted; stated in the PR.
