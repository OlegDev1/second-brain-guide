# Part 03 — How Claude works and what it costs

**Model:** Opus, High. **Depends on:** 02. **Wave:** 3, in parallel with 04.

## Goal

Chapters `01-how-agents-work` and `09-tokens-limits`: why an agent "doesn't remember", where the cost comes from and how to spend less. These two chapters give the reasons behind every rule in the rest of the guide.

## Includes

**Chapter 01 — How an agent works: model, loop, memory**
- Three layers: the model (thinks), the agent program around it (Claude Code: opens files, runs commands), tools. "Harness" is that surrounding program, not a file.
- The agent loop: one step = one model request with the whole history plus the newest result; a task takes hundreds of steps (PDF slide 2).
- The context window and what fills it: instructions, `CLAUDE.md`, conversation, tool results (usually the heaviest), the model's reasoning.
- Cache: re-reading an unchanged start of history is cheaper. After a long pause the first step is expensive.
- Compaction: near the limit the model summarises the chat, later it summarises the summary; what survives and what gets lost (slide 3).
- 2025 research: long context and long dialogues degrade answers even in strong models (slide 4; pick 3–4 papers with their numbers).
- The conclusion the guide rests on: important things go into files, tasks go into short threads, review is done by a fresh agent.

**Chapter 09 — Tokens and limits**
- Formula: steps × average context. PDF example: 400 steps × ~330k ≈ 130M, mostly cheap cache reads.
- Prices relative to plain input: cache write and cache read multipliers.
- Plan limits: the five-hour window and the weekly limit. A project spends faster because each thread is a full session. The Usage tab shows spend per thread and model.
- The friend's case: one huge chat in Sonnet — each message re-reads the whole history, so the limit runs out faster and faster.
- Practices in a project: one task — one thread; short `CLAUDE.md`; exploration through subagents; don't correct in circles; parallelise only independent work; quiet logs; model and effort per task; don't revive old threads; don't keep threads watching merged PRs; add only the repositories you need.
- When the limit runs out: a thread waits for the reset on its own; pausing the project; extra usage credits cost money.

**Must correct** (errors in the source materials)
- "The cache lives 5 minutes" (PDF) is the API default. Claude Code docs give about an hour on Pro and Max. Describe both, with sources.
- "Max plan for $100" and "cache reads ×0.05 for Opus and Sonnet 5.5" (PDF): verify on the plans and pricing pages; plans and limits change.

**Components and blocks**
- Specialised component owned here: `src/lib/components/tokens/TokenCalculator.svelte` (#36). Inputs: number of steps, average context size, share of cache reads; optional preset "один длинный чат" vs "потоки по 80 тыс.". Output: total tokens and the effective cost relative to plain input. Labelled «оценка, а не счёт». Props documented in a header comment; part 09 reuses it.
- Chapter 01: an agent-loop diagram (inline SVG in DiagramFrame); Deeper blocks for tokenisation and compaction.
- Chapter 09: CompareTable "что дорого / что дёшево", Callout tip with the top three savings.

## Excludes

- Running a project in practice, roles, briefs to the coordinator → part 04.
- What to write in `CLAUDE.md` and skills → part 05 (`04-project-files`); link only.
- API costs of features inside the app, model choice for the app → part 09 (`a6-economics`).
- How large teams work → part 09 (`a7-large-teams`).

## Output

`src/content/guide/01-how-agents-work.md`, `src/content/guide/09-tokens-limits.md`, `src/lib/components/tokens/TokenCalculator.svelte`, `docs/parts/03-how-claude-works.notes.md`. PR title: `Part 03: chapters 01 and 09`.

## Sources

The researcher saves a source for every key fact into the notes Sources table as it is found, so the fact-checker checks the saved link instead of searching again. Key facts here: every research number (PDF sources [2], [4]–[13], [18] with original URLs), cache lifetime in the API and in Claude Code, cache price multipliers, five-hour and weekly limits, Usage tab, threads as full sessions (code.claude.com Projects docs), the 130M example and its arithmetic.

## Done when

- Build and check pass; every number in both chapters has a row in the Sources table.
- The calculator works on a phone and shows the "estimate" label.
- The cache correction is stated with both sources.
