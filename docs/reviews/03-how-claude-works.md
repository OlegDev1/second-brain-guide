# Review: part 03, chapters 01 and 09 (PR #6)

Reviewed on 2026-10-23 against `docs/spec/00-general.md`, `docs/parts/03-how-claude-works.notes.md` and the PR diff.
Two checks: fact-check and frontend skim.

## Result

- Facts: prices, cache durations and arithmetic confirmed; no wrong fact found. One wording fix (below).
- Frontend: no layout bugs at 360 px and 1440 px (dark). No horizontal page scroll on either chapter; the loop diagram and the calculator fit at phone width.
- `npm run build` → `Pagefind: indexed 28 pages`; `npm run check` → `COMPLETED 282 FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS` (after merging `main` with part 04).

## Fact-check

Opened the pages that carry the numbers and confirmed them:

- **platform.claude.com/docs/en/about-claude/pricing**: Opus 5.5 $4 in / $20 out, Sonnet 5.5 $2 / $10 (output is 5× input); cache write 5 min ×1.25, 1 h ×2; cache read ×0.05 for Opus 5.5 and Sonnet 5.5, ×0.1 for the others; 1M-token window at standard pricing.
- **code.claude.com/docs/en/prompt-caching**: main conversation gets a one-hour TTL on a Claude subscription within plan usage; subagents and the "everything else" bucket get five minutes; usage credits, API key and cloud providers get five minutes; each model has its own cache; changing effort keeps the cache on Opus 5.5 and Sonnet 5.5; compaction invalidates the conversation layer.
- **support.claude.com Max plan article**: Max 5x $100/month, Max 20x $200/month.
- Arithmetic re-done: 400 × 330k = 132M; 0.95 × 0.1 + 0.05 × 1.25 = 0.1575 → 20.8M (the calculator shows 16%); 800k × 0.1 / × 1.25 / × 2 = 80k / 1M / 1.6M (12.5× to 20×); 3 000 × 100 × 101 / 2 and × 200 × 201 / 2 = 15.15M and 60.3M; 20k vs 300k warm cache = 2k vs 30k (15×).
- Cross-links use slugs from the slug map (`04-project-files`, `07-agent-team`, `08-testing`, `09-tokens-limits`).

## Fixed

- Chapter 09, under the calculator: the calculator uses the generic ×0.1 read price, while the chapter says Opus 5.5 and Sonnet 5.5 are ×0.05 (the models a new project runs on). Added one sentence saying the estimate is therefore conservative. No code change.

## Left as is

- Chapters are about 1,850 words each, under STYLE.md's "about 2,500–3,000" but inside the 1,500–3,500 range of the general spec. Not padded.
