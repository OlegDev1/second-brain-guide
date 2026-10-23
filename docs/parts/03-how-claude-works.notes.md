# Part 03 notes: chapters 01 and 09, token calculator

Chapters: `src/content/guide/01-how-agents-work.md`, `src/content/guide/09-tokens-limits.md`.
Component: `src/lib/components/tokens/TokenCalculator.svelte`.

## Sources

All rows checked on 2026-10-23. Anchors: `01#…` is `/guide/01-how-agents-work`, `09#…` is `/guide/09-tokens-limits`.

### Agent, loop, context (chapter 01)
| Project memory, project instructions, repositories (with `CLAUDE.md`), files and environment carry context across threads | 01#between-threads | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Give a project standing context": "carry context across threads" |
| When you correct a thread, tell Claude to remember it: it goes to project memory and later threads start with it | 01#between-threads | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Write project instructions": "also tell Claude to remember the correction" |
| A subagent works in its own context window; its tool calls stay out of yours; Claude gets back a summary | 01#subagent | https://code.claude.com/docs/en/how-claude-code-works | 2026-10-23 | Section "Manage context with skills and subagents" |
| Claude Code orders requests: system prompt, then project context (CLAUDE.md, memory), then conversation | 01#cache | https://code.claude.com/docs/en/prompt-caching | 2026-10-23 | Table in "How the cache is organized" |
| Each request that hits the cache resets the timer; after a long gap the next request recomputes the full input | 01#cache | https://code.claude.com/docs/en/prompt-caching | 2026-10-23 | Section "Cache lifetime": "Each request that hits the cache resets the timer" |

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| The loop runs on models that reason and tools that act; Claude Code is the layer around the model, called the agentic harness | 01#layers | https://code.claude.com/docs/en/how-claude-code-works | 2026-10-23 | Section "The agentic loop": "This surrounding layer is what the term agentic harness refers to." |
| Tool categories: file operations, search, execution, web, code intelligence | 01#layers | https://code.claude.com/docs/en/how-claude-code-works | 2026-10-23 | Section "Tools", table of five categories |
| Each tool use returns information that feeds the next decision; Claude chains dozens of actions | 01#loop | https://code.claude.com/docs/en/how-claude-code-works | 2026-10-23 | "chaining dozens of actions together" |
| Each message is a new API request; the model remembers nothing between requests; Claude Code re-sends the full context | 01#loop | https://code.claude.com/docs/en/prompt-caching | 2026-10-23 | Section "How the cache is organized": "The model doesn't remember anything between requests" |
| API ничего не помнит между запросами — история уходит целиком (PDF slide 2, source [4]) | 01#loop | https://platform.claude.com/docs/en/build-with-claude/tool-use/overview | 2026-10-23 | Example: the follow-up request re-sends the full `messages` list with the `tool_result`. The page doesn't say "stateless" in words; the row above is the explicit statement |
| One response can contain several tool calls (parallel tool use) | 01#loop | https://platform.claude.com/docs/en/build-with-claude/tool-use/overview | 2026-10-23 | "responses that call several tools at once" |
| A task takes hundreds of steps; 1 turn = 1 step = 1 API request (PDF slide 2, deck's own illustration) | 01#loop | PDF «Как устроена ИИ-команда», slide 2 | 2026-10-23 | «1 оборот = 1 шаг = 1 запрос к API», «Но шагов — сотни» |
| Context window holds conversation, file contents, command outputs, CLAUDE.md, auto memory, loaded skills, system instructions | 01#context | https://code.claude.com/docs/en/how-claude-code-works | 2026-10-23 | Section "The context window" |
| Everything in the request counts toward the window, including tool results and the turn's thinking | 01#context | https://platform.claude.com/docs/en/build-with-claude/context-windows | 2026-10-23 | "Everything in the request counts toward the context window" |
| Before you type: CLAUDE.md, auto memory, MCP tool names, skill descriptions load | 01#context | https://code.claude.com/docs/en/context-window | 2026-10-23 | Section "What the timeline shows": "Before you type anything" |
| Newer models (Opus 4.5+, Sonnet 4.6+ and others) keep previous thinking blocks in the history by default (PDF [5]) | 01#context | https://platform.claude.com/docs/en/build-with-claude/context-windows | 2026-10-23 | "the API keeps previous thinking blocks by default" |
| Opus 5.5, Sonnet 5.5 and other current models have a 1M-token window; others 200k | 01#context | https://platform.claude.com/docs/en/build-with-claude/context-windows | 2026-10-23 | "have a 1M-token context window" |
| Tool results are usually the heaviest part (PDF slide 2) | 01#context | PDF slide 2; supported by https://code.claude.com/docs/en/best-practices | 2026-10-23 | Best practices: "A single debugging session or codebase exploration might generate and consume tens of thousands of tokens." |
| Characters per token depend on model and language; ~3.5 English characters on older models; tokenizer of Claude 4.7+ gives ~30% more tokens | 01#context (Deeper) | https://platform.claude.com/docs/en/about-claude/glossary | 2026-10-23 | Entry "Tokens" |
| Sessions are independent: each new session starts with a fresh context window | 01#loop | https://code.claude.com/docs/en/how-claude-code-works | 2026-10-23 | "Sessions are independent." |

### Cache

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| The API caches the start of a request (prefix); the match is exact, a change recomputes everything after it | 01#cache, 09#prices (Deeper) | https://code.claude.com/docs/en/prompt-caching | 2026-10-23 | "The match is exact, so a change anywhere in the prefix recomputes everything after it." |
| Switching model invalidates the cache; effort change keeps it on Opus 5.5 / Sonnet 5.5 with a subscription | 09#prices (Deeper) | https://code.claude.com/docs/en/prompt-caching | 2026-10-23 | Section "Switching models": "Each model has its own cache." Section "Changing effort level" |
| API default cache lifetime is 5 minutes, refreshed for free on each use (PDF [6]) | 01#cache | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | 2026-10-23 | "By default, the cache has a 5-minute lifetime." |
| API also offers a 1-hour cache at a higher write price | 01#cache | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | 2026-10-23 | Section "1-hour cache duration" |
| Claude Code requests the 1-hour TTL for the main conversation on a Claude subscription within plan usage; subagents get 5 min; with usage credits or API key, 5 min | 01#cache | https://code.claude.com/docs/en/prompt-caching | 2026-10-23 | Section "Which TTL each request gets", table |
| A thread idle longer than the cache lifetime ("an hour on Pro and Max within your plan's limits") re-reads its whole conversation | 01#cache, 09#practices | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "See and reduce a project's usage" |
| Cache write 5 min ×1.25, write 1 h ×2, read ×0.1 of base input price | 09#prices | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | 2026-10-23 | Section "Pricing": "Cache read tokens are 0.1 times the base input tokens price" |
| Cache reads on Opus 5.5 and Sonnet 5.5 cost ×0.05 (PDF claim confirmed); Fable 5.1 and Mythos 5.1 ×0.025 | 09#prices | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | 2026-10-23 | Pricing table footnote: "priced at 0.05x the base input price" |
| After a break longer than the cache lifetime the next request reprocesses the full context | 09#prices | https://code.claude.com/docs/en/costs | 2026-10-23 | Section "Why usage climbs in a long session", "Cache misses" |
| Claude Code sends the full conversation with every request and re-reads history at the cached token rate, so a one-line question in an all-day session draws usage for the whole conversation | 09#long-chat | https://code.claude.com/docs/en/costs | 2026-10-23 | Section "Why usage climbs in a long session", "Long context" |
| Pause example: 800k context after the cache expired ≈ 800k × 1.25 = 1M plain input tokens (PDF slide 2, arithmetic) | 09#prices | PDF slide 2 + multipliers row above | 2026-10-23 | «800 тыс. × 1.25». Our arithmetic: 800,000 × 1.25 = 1,000,000; warm read 800,000 × 0.1 = 80,000; 1-hour write 800,000 × 2 = 1,600,000 |

### Compaction and research (chapter 01)
| The context window is the most important resource to manage | 01#research | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "The context window is the most important resource to manage." |
| LongMemEval (PDF [12]): commercial chat assistants and long-context LLMs show a 30% accuracy drop on memorizing information across sustained interactions | 01#research | https://arxiv.org/abs/2410.10813 | 2026-10-23 | Abstract: "a 30% accuracy drop on memorizing information" |
| Affiliations in the research list (Adobe Research; Microsoft Research and Salesforce; UCLA and Tencent AI Lab; Google DeepMind) and the NoLiMa venue ICML 2025 | 01#research, 01#conclusion | PDF slide 4 labels [2], [9], [12], [13]; NoLiMa venue on https://arxiv.org/abs/2502.05167 ("Accepted at ICML 2025") | 2026-10-23 | PDF slide 4 card headers |

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| Near the limit Claude Code first clears older tool outputs, then summarizes; early detailed instructions may be lost | 01#compaction | https://code.claude.com/docs/en/how-claude-code-works | 2026-10-23 | Section "When context fills up": "It clears older tool outputs first" |
| The compaction summary replaces the summarized messages (PDF [7]) | 01#compaction | https://platform.claude.com/docs/en/build-with-claude/compaction-on-demand#compact-again | 2026-10-23 | "the summarized messages are removed" |
| Compacting again summarizes the old summary plus everything after it (PDF [7]) | 01#compaction | https://platform.claude.com/docs/en/build-with-claude/compaction-on-demand#compact-again | 2026-10-23 | Section "Compact again": "The new block summarizes the old summary and everything after it." |
| Compaction keeps architectural decisions, unresolved bugs, implementation details; drops redundant tool outputs (PDF [8]) | 01#compaction | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 2026-10-23 | Section "Compaction": "architectural decisions, unresolved bugs, and implementation details" |
| After compaction CLAUDE.md and auto memory are re-injected from disk; up to five recent files are re-read | 01#compaction | https://code.claude.com/docs/en/context-window | 2026-10-23 | Section "What survives compaction", table |
| Custom compaction instructions in CLAUDE.md; `/compact <instructions>` (PDF [3]) | 01#compaction (Deeper) | https://code.claude.com/docs/en/best-practices | 2026-10-23 | Section "Manage context aggressively": "When compacting, always preserve the full list of modified files" |
| Threads compact automatically; put what must never be dropped in project memory | 01#compaction | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Choose models and let Claude manage context": "Threads compact automatically" |
| As token count grows, accuracy and recall degrade (context rot) | 01#research | https://platform.claude.com/docs/en/build-with-claude/context-windows | 2026-10-23 | "a phenomenon known as context rot" |
| Performance degrades as context fills; Claude may forget earlier instructions | 01#research | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "LLM performance degrades as context fills." |
| NoLiMa (PDF [9]): 13 models with 128K+ windows; at 32K, 11 drop below 50% of their short-context baseline; GPT-4o 99.3% → 69.7%; ICML 2025 | 01#research | https://arxiv.org/abs/2502.05167 | 2026-10-23 | Abstract: "At 32K, for instance, 11 models drop below 50%". PDF says 12 models / 10 of 12; the current arXiv abstract wins |
| Context length alone (PDF [11]): 5 models, math, QA, code; drop 13.9–85% even with perfect retrieval; Findings of EMNLP 2025 | 01#research | https://arxiv.org/abs/2510.05381 | 2026-10-23 | Abstract: "performance still degrades substantially (13.9%--85%)" |
| Lost in multi-turn (PDF [13]): 200,000+ simulated conversations; average drop 39% across six tasks; models that take a wrong turn don't recover | 01#research | https://arxiv.org/abs/2505.06120 | 2026-10-23 | Abstract: "an average drop of 39% across six generation tasks" |
| SCoRe (PDF [2]): self-correction largely ineffective in modern LLMs; special RL training gave +15.6% MATH, +9.1% HumanEval | 01#research | https://arxiv.org/abs/2409.12917 | 2026-10-23 | Abstract: "largely ineffective in modern LLMs" |
| A fresh context improves code review: Claude isn't biased toward code it just wrote (writer/reviewer) | 01#conclusion | https://code.claude.com/docs/en/best-practices | 2026-10-23 | Section "Run multiple Claude sessions": "A fresh context improves code review" |
| Put persistent rules in CLAUDE.md rather than relying on history | 01#conclusion | https://code.claude.com/docs/en/how-claude-code-works | 2026-10-23 | "Put persistent rules in CLAUDE.md rather than relying on conversation history." |

### Tokens, limits, practices (chapter 09)
| One-thread example: 60 steps × 75k average = 4.5M read; × 0.1575 ≈ 0.7M plain; same steps at 300k ≥ 18M | 09#one-thread | Our arithmetic; the step count and context sizes are a labelled assumption | 2026-10-23 | 60 × 75,000 = 4,500,000; 4.5M × 0.1575 = 708,750; 60 × 300,000 = 18,000,000 |
| Quadratic growth of a long chat: k = 3,000 tokens per message; 100 messages ≈ 15M, 200 ≈ 60M | 09#long-chat (Deeper) | Our arithmetic; k is a labelled assumption | 2026-10-23 | 3,000 × 100 × 101 / 2 = 15,150,000; 3,000 × 200 × 201 / 2 = 60,300,000 |
| Pause example in the chapter: 1M / 80k = 12.5; 1.6M / 80k = 20 → "в 12–20 раз дороже" | 09#prices | Our arithmetic | 2026-10-23 | — |
| Output price is 5× input for Opus 5.5 ($4 / $20 per MTok) and Sonnet 5.5 ($2 / $10) | 09#not-counted | https://platform.claude.com/docs/en/about-claude/pricing | 2026-10-23 | Model pricing table |
| Thinking tokens are billed as output; default thinking budget can be tens of thousands of tokens per request; thinking can't be turned off on Opus 5.5 / Sonnet 5.5; lower the effort level | 09#not-counted | https://code.claude.com/docs/en/costs | 2026-10-23 | Section "Adjust extended thinking": "Thinking tokens are billed as output tokens" |
| `/usage` shows plan limits and when they reset; `/context` shows what's using space | 09#project-spend | https://code.claude.com/docs/en/errors ; https://code.claude.com/docs/en/costs | 2026-10-23 | errors: "Run /usage to see your plan limits and when they reset"; costs: "Run /context to see what's consuming space." |
| As the context fills, Claude may forget earlier instructions or make more mistakes | 09#fresh-thread | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "Claude may start "forgetting" earlier instructions or making more mistakes" |
| Long conversations in Claude chat consume more of the usage limit; start a new conversation when near the limit | 09#long-chat | https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work | 2026-10-23 | "Longer conversations that trigger automatic context management consume more of your usage limit" |
| Pause banner: Resume on the banner above the project's message box; a paused thread continues when you message it | 09#limit-hit | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Pause, archive, or delete a project" |

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| Total = steps × average context; 400 steps × ~330k ≈ 130M (PDF slide 2, deck's own example) | 09#formula | PDF slide 2 | 2026-10-23 | «400 шагов × ~330 тыс. ≈ 130 млн». Arithmetic: 400 × 330,000 = 132,000,000 |
| Calculator example with 95% cache reads at ×0.1 and 5% writes at ×1.25: factor 0.1575; 132M → ≈ 20.8M; threads of 80k: 400 × 80,000 = 32M → ≈ 5M | 09#formula, 09#long-chat | Our arithmetic from the multipliers row | 2026-10-23 | 0.95 × 0.1 + 0.05 × 1.25 = 0.1575; 132M × 0.1575 = 20.79M; 32M × 0.1575 = 5.04M. The 95% share is an assumption, labelled as such |
| Per-message price at 20k vs 300k context (warm cache): 2k vs 30k plain tokens | 09#long-chat | Our arithmetic from the multipliers row | 2026-10-23 | 20,000 × 0.1 = 2,000; 300,000 × 0.1 = 30,000 |
| Session limit resets every five hours; weekly limits reset once a week; usage across Claude surfaces (claude.ai, Claude Code, Desktop) counts toward the same limit | 09#limits | https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work | 2026-10-23 | "a session limit that resets every five hours" |
| Session and weekly limits are shared across all models; switching model doesn't restore access | 09#limits | https://code.claude.com/docs/en/errors | 2026-10-23 | Section "You've hit your session limit": "shared across all models" |
| Max 5x $100/month, Max 20x $200/month (PDF "Max for $100" is the lower tier) | 09#limits | https://support.claude.com/en/articles/11049741-what-is-the-max-plan | 2026-10-23 | "Max 5x: $100 per month" |
| Pro $20 billed monthly; Max "From $100" | 09#limits | https://claude.com/pricing | 2026-10-23 | "$20 if billed monthly"; "From $100" |
| A project uses limits faster; each running thread is a full session; the conversation uses tokens; threads watching a PR wake up on CI or comments | 09#limits | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Usage and cost": "each is a full session, and several can run at once" |
| Enforced limit: 200 new threads per day across projects | 09#limits | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "The enforced limit is 200 new threads per day across your projects." |
| Project settings → Usage shows token use by thread and by model, and the conversation's share | 09#limits | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "See and reduce a project's usage": "token use by thread and by model" |
| A new project runs threads on Opus at high effort, which draws on the plan fastest; Thread model / Thread effort in Project settings → General | 09#practices | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "A new project runs every thread on Opus at high effort" |
| Clear between unrelated tasks; the kitchen-sink session | 09#practices | https://code.claude.com/docs/en/best-practices | 2026-10-23 | Section "Avoid common failure patterns": "The kitchen sink session." |
| After two failed corrections, start fresh with a better prompt | 09#practices | https://code.claude.com/docs/en/best-practices | 2026-10-23 | "After two failed corrections, /clear and write a better initial prompt" |
| Keep CLAUDE.md under 200 lines; it loads at session start; specialised instructions → skills | 09#practices | https://code.claude.com/docs/en/costs | 2026-10-23 | Section "Move instructions from CLAUDE.md to skills": "Aim to keep CLAUDE.md under 200 lines" |
| Subagents explore in a separate context and return a summary | 09#practices | https://code.claude.com/docs/en/best-practices | 2026-10-23 | Section "Use subagents for investigation" |
| A sub-agent returns a condensed summary, often 1,000–2,000 tokens (PDF [8]) | 09#practices | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 2026-10-23 | Section "Sub-agent architectures": "often 1,000-2,000 tokens" |
| Subagents' own requests still draw on usage | 09#practices | https://code.claude.com/docs/en/costs | 2026-10-23 | Section "Delegate verbose operations to subagents" |
| Agents use ~4× the tokens of chat, multi-agent systems ~15×; multi-agent fits heavily parallel tasks, not tasks that need shared context (PDF [18]) | 09#practices | https://www.anthropic.com/engineering/multi-agent-research-system | 2026-10-23 | "multi-agent systems use about 15× more tokens than chats" |
| A hook can filter test output to failures only, from tens of thousands of tokens to hundreds | 09#practices | https://code.claude.com/docs/en/costs | 2026-10-23 | Section "Offload processing to hooks and skills" |
| Sonnet handles most coding tasks and costs less than Opus; lower effort for simple tasks; thinking billed as output | 09#practices | https://code.claude.com/docs/en/costs | 2026-10-23 | Sections "Choose the right model", "Adjust extended thinking" |
| Add the repositories most tasks need; threads can add others when needed | 09#practices | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Decide which repositories to add" |
| To stop a thread watching a PR, ask it in the thread | 09#practices | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "ask in the thread for it to stop watching the pull request" |
| A thread at the five-hour or weekly limit retries and continues after the reset; shows **Service is busy**; scheduled-task threads don't wait | 09#limit-hit | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "A thread hit the usage limit" |
| **Stop** in the thread, or Pause the project (Project settings → General) holds every thread | 09#limit-hit | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Sections "A thread hit the usage limit", "Pause, archive, or delete a project" |
| Work goes past plan limits only with usage credits; a thread can't turn them on | 09#limit-hit | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Usage and cost": "A thread can't turn them on for you." |
| Usage credits are billed at standard API rates, prepaid, with an optional monthly spend limit | 09#limit-hit | https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans | 2026-10-23 | "Usage credits are billed at standard API rates." |
| An idle project with no running threads, watched PRs or messages doesn't use the plan | 09#limit-hit | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "doesn't use your plan while it sits idle" |

## New terms

| EN | RU | Definition |
| --- | --- | --- |
| model | модель | The neural network that reads the context and writes the next step |
| agent harness | программа-агент (harness) | The program around the model that runs tools and builds each request; Claude Code |
| tool | инструмент | An action the program runs for the model: read a file, run a command, search |
| agent loop | цикл агента | Request → model picks a step → tool runs → result joins the history → next request |
| step | шаг | One model request inside the loop |
| tool result | результат инструмента | Text a tool returns: file contents, command output, logs |
| reasoning / thinking | рассуждения | The model's thinking tokens, kept in the history on newer models |
| context rot | деградация длинного контекста | Accuracy falls as the context grows |
| cache write / cache read | запись в кэш / чтение из кэша | Price of storing and re-reading an unchanged prefix |
| cache lifetime (TTL) | время жизни кэша | How long a cached prefix survives without use |
| session limit | пятичасовой лимит | Plan allowance that resets every five hours |
| weekly limit | недельный лимит | Plan allowance that resets once a week |
| usage credits | платные кредиты (usage credits) | Prepaid usage past the plan limits, at API rates |
| effort | усилие (effort) | How much the model thinks per step; higher costs more |

## Ready phrases

- «Запиши решения в файл» — «Перед тем как закончить, запиши в docs/DECISIONS.md решения из этого потока: что решили и почему, по строке на решение. Коммит и push, код не трогай.» (chapter 01)
- «Разведка субагентом» — «Пусть субагент изучит, как устроен экран привычек, и вернёт сводку: файлы, функции, где хранятся данные. Сам код не меняй.» (chapter 09)
- «Начать заново» — «Стоп. Две попытки не сработали. Опиши в трёх строках, что пробовал и почему не вышло, — я открою с этим новый поток.» (chapter 09)
- «Лимит на исходе» — «Лимит почти кончился. Не запускай новые потоки до сброса. Потокам, что работают, — закоммитить и запушить то, что есть.» (chapter 09)
- «Хватит следить за PR» — «PR влит. Перестань следить за ним и больше ничего не делай в этом потоке.» (chapter 09)

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Agent "forgot" a rule from the start of the chat | Compaction summarised early instructions away | Put the rule in `CLAUDE.md` or project instructions; start a new thread |
| First message after lunch eats a big part of the limit | Cache expired; the whole history is written again at the write price | Start a fresh thread for new work instead of reviving an old one |
| Limit runs out faster every day in one chat | Each message re-reads the whole growing history | One task — one thread; save decisions to files |
| Thread shows **Service is busy** | Plan's five-hour or weekly limit reached; it retries on its own | Wait for the reset, or **Stop** the thread / pause the project |
| Agent keeps getting the same fix wrong | Context full of failed attempts | After two failed corrections, new thread with a better prompt |
| An old idle thread suddenly uses tokens | It watches a PR and woke up on CI or a comment | Ask the thread to stop watching the PR |

## Open questions

- NoLiMa: the PDF says 12 models and "10 of 12"; the current arXiv abstract says 13 models and 11. The chapter uses the abstract numbers.
- LongMemEval: arXiv v1 is from October 2024, v2 from March 2025; the chapter groups it with the 2025 works as the PDF does.
- Lost in multi-turn: the PDF says 15 models; the abstract gives no model count. The chapter omits the count.
- LongMemEval and SCoRe venues (ICLR 2025 in the PDF) are not shown on the arXiv pages; the chapter does not name venues for them. 
- Plan prices and limits change often; the chapter marks them «проверено: октябрь 2026». How plan limits weigh 1-hour cache writes is not published; the chapter does not claim it.
