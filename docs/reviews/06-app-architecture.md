# Review: part 06, chapters 06, 10 and 11 (PR #7)

Reviewed on 2026-10-23 against `docs/spec/00-general.md`, `docs/parts/06-app-architecture.notes.md` and the PR diff.
Two checks: fact-check and frontend skim.

## Result

- Facts: the claims I opened are supported by their saved links. Two small fixes (below).
- Frontend: no layout bugs at 360 px (dark and light) and 1440 px (dark). No horizontal page scroll on any of the three pages; both inline diagrams (sync, module architecture) render cleanly at both widths.
- `npm run build` → `Pagefind: indexed 28 pages`; `npm run check` → `COMPLETED 282 FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS`.
- Main was already merged into the branch (no conflicts).

## Fact-check

Opened and confirmed: Claude Projects page (uncommitted changes can be lost after a fresh clone, Library tab contents, uploads are copies and **Replace**, first 100 files up to 200 MB); MDN storage quotas page (Safari 7-day eviction, best-effort storage); Chrome Notification Triggers banner ("development … has ended"); Capacitor Local Notifications (Android 12 exact alarms, can be switched off); Svelte MCP tools (`svelte-autofixer`, `list-sections`, `get-documentation`). Bundle sizes in chapter 10 match the measured gzip bytes in the notes (69,557 / 13,736 / 4,429 / 7,671 bytes → ≈ 68 / 13 / 4 / 7.5 KiB).

## Fixed

1. **Safari open question settled.** WebKit's blog says home-screen web apps "have their own counter of days of use", so the 7-day Safari rule is counted separately for them. Chapter 06 (Deeper block «Может ли браузер удалить данные сам») now says this, with a "проверено: октябрь 2026" mark. Source row and the Open questions entry in the notes are updated.
2. **Exact alarm wording (chapter 10).** The source says `SCHEDULE_EXACT_ALARM` is not pre-granted to fresh installs of apps targeting Android 13 or later; the chapter said it for "a new app" in general. Now it names Android 13 and newer.

## Not changed

The "ecosystem" and "help for the agent" cells in the framework table stay as the author's judgment, as the notes already say.
