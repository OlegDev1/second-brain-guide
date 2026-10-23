# Part 09 — Advanced tooling: notes

Short version on the owner's request (waves 6 and 7 combined, fewer words). Checked on 2026-10-24 unless noted.

## Sources

| Claim | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| Cloud threads load `CLAUDE.md`, `.claude/CLAUDE.md`, `.claude/rules/` at repo root; skills, agents, commands, `.mcp.json`, plugins, permission rules, hooks and `env` from `.claude/settings.json` are not loaded / applied | A3#where, A3#permissions | https://code.claude.com/docs/en/claude-projects | 2026-10-24 | Table "What threads pick up from your repositories" |
| `CLAUDE.md` is loaded from every repository when the thread starts | A3#permissions | https://code.claude.com/docs/en/claude-projects | 2026-10-24 | Same table, first row: "Loaded from every repository" |
| Subagent frontmatter: only `name` and `description` required; `tools`; `model` = sonnet/opus/haiku/fable/full id/inherit | A3#subagents | https://code.claude.com/docs/en/sub-agents | 2026-10-24 | "Frontmatter reference" table |
| Skill descriptions always in context, full skill loads when invoked; put key use case first; description + when_to_use truncated at 1,536 chars | A3#skills | https://code.claude.com/docs/en/skills | 2026-10-24 | "full skill content only loads when invoked"; "Put the key use case first." |
| Hooks are deterministic; `PostToolUse` with `Edit|Write` matcher runs Prettier | A3#hooks | https://code.claude.com/docs/en/hooks-guide | 2026-10-24 | "Auto-format code after edits" |
| `PreToolUse` hook exit 2 blocks the action, stderr becomes Claude's feedback | A3#hooks | https://code.claude.com/docs/en/hooks-guide | 2026-10-24 | "Hook output": "exit 2 = block the action" |
| Permission rules evaluated deny → ask → allow | A3#permissions | https://code.claude.com/docs/en/permissions | 2026-10-24 | "Rules are evaluated in order: deny, then ask, then allow" (also in part 07 notes) |
| Cloud threads get MCP tools from claude.ai connectors (claude.ai/customize/connectors), no per-project setup | A3#mcp | https://code.claude.com/docs/en/claude-projects | 2026-10-24 | "Get skills, plugins, connectors, and tools into threads" |
| GitHub access in projects via the Claude GitHub App | A3#mcp | https://code.claude.com/docs/en/claude-projects | 2026-10-24 | "Set up GitHub access" |
| Svelte MCP gives docs and `svelte-autofixer` | A3#mcp | https://svelte.dev/docs/mcp/overview | 2026-10-24 | Overview page |
| A task that repeats on a schedule with no conversation: create a cloud scheduled task; projects can set them up | A3#routines | https://code.claude.com/docs/en/claude-projects | 2026-10-24 | "One task that repeats on a schedule with no conversation around it"; "Scheduled tasks" |
| Thread on your own computer via Remote Control for local DB, device emulator, VPN API; runs only while awake; needs Claude Code v2.1.280+; uses what's installed there | A3#remote-control | https://code.claude.com/docs/en/claude-projects | 2026-10-24 | "Run a thread on your own computer" |
| Thread watching its PR pushes fixes when CI fails; idle thread wakes and uses plan on CI failure | A4#cost | https://code.claude.com/docs/en/claude-projects | 2026-10-24 | "watches the pull request with auto-fix"; "Threads watching a pull request" |
| Required status checks before merging | A4#protect | https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches | 2026-10-24 | "Require status checks before merging" |
| Squash merge combines commits into one | A4#protect | https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github | 2026-10-24 | "Squashing your merge commits" |
| `setup-node` `cache: npm` | A4#pipeline | https://github.com/actions/setup-node | 2026-10-24 | README "Caching global packages data" |
| Lighthouse CI budgets / assertions | A4#pipeline | https://github.com/GoogleChrome/lighthouse-ci | 2026-10-24 | README |
| Artifacts from workflow runs | A4#pipeline | https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts | 2026-10-24 | Page intro |
| release-please builds changelog and versions from Conventional Commits | A4#protect | https://github.com/googleapis/release-please | 2026-10-24 | README intro |
| Playwright `toHaveScreenshot` with `maxDiffPixelRatio` | A4#extras | https://playwright.dev/docs/test-snapshots | 2026-10-24 | "Visual comparisons" |
| Opus 5.5 $4/$20, cache hit $0.20; Sonnet 5.5 $2/$10, $0.10; Haiku 5.5 $0.10/$0.50, $0.01 up to 100K, $0.50/$2.50 over | A6#prices, A6#voice-note | https://platform.claude.com/docs/en/about-claude/pricing | 2026-10-24 | "Model pricing" table |
| Cache read 0.05x on Opus 5.5 and Sonnet 5.5, 0.1x otherwise | A6#savings, A6#thread-cost | https://platform.claude.com/docs/en/about-claude/pricing | 2026-10-24 | "Cache read (hit): 0.1x base input price (… 0.05x on Claude Opus 5.5 and Claude Sonnet 5.5)" |
| Batch API 50% off input and output; most batches within an hour | A6#savings | https://platform.claude.com/docs/en/about-claude/pricing ; https://platform.claude.com/docs/en/build-with-claude/batch-processing | 2026-10-24 | "with a 50 percent discount"; "most batches completing within 1 hour" |
| Usage credits billed at API rates | A6#plan-vs-api | https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans | 2026-10-23 (part 03) | "Usage credits are billed at standard API rates." |
| PDF [1]: 16 agents, ~2,000 sessions, ~$20,000 | A7#compiler | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-24 | "Over nearly 2,000 Claude Code sessions and $20,000 in API costs" |
| PDF [1]: task lock by writing a file to `current_tasks/`; git sync forces a different task | A7#compiler | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-24 | "writing a text file to current_tasks/" |
| PDF [1]: verifier must be nearly perfect; few lines of output; frequent merge conflicts | A7#compiler | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-24 | "the task verifier is nearly perfect"; "Merge conflicts are frequent" |
| PDF [1]: agents on one big task got stuck on the same thing | A7#take | https://www.anthropic.com/engineering/building-c-compiler | 2026-10-24 | "each was stuck solving the same task" |
| PDF [14]: short AGENTS.md (~100 lines) as a map; docs/ is the system of record; agent-to-agent review; background cleanup like garbage collection; Fridays spent on cleanup before | A7#openai | https://openai.com/index/harness-engineering/ | 2026-10-23 (parts 04, 05) | "A short AGENTS.md (roughly 100 lines)"; "This functions like garbage collection." |
| PDF [15]: 16 developers, 246 tasks, 19% longer with AI; believed 20% faster afterwards | A7#metr | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ | 2026-10-24 | "AI makes them slower." |
| PDF [16]: late-2025 tools point to speedup; data very weak; developers declined to work without AI | A7#metr | https://metr.org/blog/2026-02-24-uplift-update/ | 2026-10-24 | "our data is only very weak evidence" |

The voice-note cost (A6#voice-note) uses assumed sizes (1,800 input, 200 output tokens, 20 notes a day), labelled as assumptions on the page; arithmetic: Sonnet 1.08 M × $2 + 0.12 M × $10 = $3.36; Haiku 1.08 M × $0.10 + 0.12 M × $0.50 = $0.168.

The hook script in A3#hooks was run in a scratch folder: `git push --force origin main`, `git push -f`, `rm -rf build` → exit 2; `git push origin feature`, `npm run build`, `git push --force-with-lease` → exit 0.

## New terms

| EN | RU | Definition |
| --- | --- | --- |
| hook | хук | Команда, которую Claude Code запускает сам в нужный момент |
| routine / scheduled task | рутина (задача по расписанию) | Облачная задача, которая запускается по расписанию без разговора |
| Remote Control | Remote Control | Запуск потока проекта на своём компьютере |
| CI (continuous integration) | CI | Автоматические проверки на каждый PR |
| required status check | обязательная проверка | Проверка, без которой GitHub не даёт влить PR |
| Conventional Commits | Conventional Commits | Шаблон сообщений коммитов: `feat:`, `fix:` |
| Batch API | пакетная обработка | Асинхронные запросы к API за полцены |

## Ready phrases

| Title | Chapter#anchor |
| --- | --- |
| Недельная уборка | A3#routines |
| Конвейер CI | A4#cost |

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Subagent from `.claude/agents/` is never used in a project thread | Cloud threads don't load repo agents | Run the thread on your computer via Remote Control (A3#remote-control) |
| Hook doesn't fire in a project thread | Cloud threads don't run hooks | Project-instructions rule + branch protection; hooks only locally (A3#hooks) |
| Usage grows with flaky CI | Each failed check wakes the watching thread | Fix or remove the flaky test; fewer required checks (A4#cost) |

## Open questions

- None. A3 keeps the cloud-vs-local table aligned with chapter 04: cloud project threads load `CLAUDE.md` but not repo skills, agents, commands, `.claude/settings.json` or `.mcp.json`.
