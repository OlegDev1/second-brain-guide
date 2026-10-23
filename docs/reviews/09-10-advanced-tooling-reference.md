# Review — parts 09 and 10 (PR #11)

Light review, as the owner asked. Checked on 2026-10-24.

## Fact spot-check

- Model prices on A6 (Opus 5.5 $4/$20, cache hit $0.20; Sonnet 5.5 $2/$10, $0.10; Haiku 5.5 $0.10/$0.50, cache $0.01, five times more over 100K prompt tokens) match the official pricing page.
- Cache read at 0.05x on Opus 5.5 and Sonnet 5.5, and the Batch API 50% discount, match the same page. The voice-note arithmetic ($3.36 vs $0.17, about 20x) is correct, and `readPrice={0.05}` fits.
- The A3 cloud-vs-local table matches the Projects page: cloud threads load `CLAUDE.md`, not skills, agents, commands, `.mcp.json`, plugins, permission rules or `env` from `.claude/settings.json`. Remote Control needs Claude Code v2.1.280+ and a computer that stays awake; a thread watching its PR pushes fixes when CI fails.
- Other rows in the notes were not re-opened (light review).

## Frontend skim

Built site served locally; 12 new or changed pages (home, A3, A4, A6, A7, chapters 00 and 14, all five reference pages) opened at 360 px and 1440 px. All return 200 and none has horizontal page overflow. Screenshots of the glossary letter row, home roadmap row, A6, troubleshooting and chapter 14 show no layout problems. Wide tables scroll inside their container on phones.

## Open items settled

- Chapter 14 limit-usage section: left out. It needs the owner's real Usage numbers, none were provided, and nothing is estimated.
- Term wrapping pass in all chapters: not done, stays optional. Existing `<Term>` usage works.

## Fixed

Nothing needed fixing.

## Checks

```
npm run build → ✔ done; Pagefind: indexed 28 pages
npm run check → COMPLETED 283 FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS
```
