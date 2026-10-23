# Part 10 — Reference pages and wrap-up

**Model:** Opus, High. **Depends on:** wave 6 closed (02–09 merged, all reviews fixed). **Wave:** 7, last.

## Goal

Everything that is compiled from the other parts: the five reference pages, the home hub with the roadmap, chapter `00-roadmap` and chapter `14-how-this-site-was-made`. This part writes little new content; it collects, unifies and links.

## Includes

**Inputs:** every `docs/parts/*.notes.md`, `docs/PROGRESS.md`, git history, the HTML page from the Library (for the original phrases and the three rules).

**Reference pages**
- `/ref/phrases` (#35): PhraseCards with Copy, grouped: project kickoff, coordinator brief, new feature, feature spec, review, bug report, rollback, «обнови PROGRESS.md», token saving, before a break. Sources: «Ready phrases» from every notes file + the HTML phrases rewritten for projects (instead of «удали старого кодера» — «закрой поток и начни новый»). Each card: when to use it, text with `[плейсхолдерами]`.
- `/ref/glossary` (#25): merge the seed terms with «New terms» from every notes file into `src/lib/glossary.ts`; A–Я page with letter jump; each entry 1–2 sentences + a link to its chapter.

**Terminology pass over all chapters — explicit permission**

This part is allowed to edit every chapter in `src/content/guide/` and `src/content/advanced/`, including files owned by parts 02–09. Allowed edits, and only these:

1. Replace a non-standard word for a glossary concept with the glossary term (e.g. «агент-исполнитель» → «поток», «ветвь» → «ветка», «слияние» → «мердж»). Fix grammar around the replaced word.
2. Wrap the first occurrence of each glossary term in each chapter with the Term component.
3. Fix broken internal links and anchors.

Not allowed: rewording sentences for style, changing facts, numbers or structure, moving sections. If a chapter needs more than this, list it under Open questions for the owner.

Record every replacement in `docs/parts/10-reference-wrapup.notes.md` as a table: chapter | old wording | new term — so the owner can review the pass in one place.
- `/ref/checklists` (#38): spec completeness; first project run; 5-minute feature review; end of the working day (`PROGRESS.md` updated, all pushed, no threads watching merged PRs); before release (backup, export, domain, speed, notifications on a real phone).
- `/ref/troubleshooting` (#33): symptom → cause → fix, merged from every notes file, seeded with: limit runs out after a few messages; a thread seems stuck; threads guess instead of asking; «Claude ran out of context»; agent says done but it doesn't work; merge conflict; blank page after deploy; work disappeared; push rejected. Each row links to the chapter that explains it.
- `/ref/sources`: all Sources tables merged and grouped by chapter, plus PDF sources [1]–[19] with a one-line note each and their "checked on" dates.

**Home and chapter 00**
- Home `/` (#04): one card per tab and per main topic; a static roadmap (#09) of the path idea → spec → project → skeleton → features in cycles → speed → phone, each node linking to its chapter.
- Chapter `00-roadmap`: the roadmap, the three rules from the HTML explained more deeply (a detailed spec; memory lives only in files; the author never checks his own work), how to read the guide (main text, «Глубже», Advanced).

**Chapter 14 — How this site was made**
- The method on a live example: this spec in short, the waves, how many threads and PRs (from git history and `PROGRESS.md`), what the fact-checks caught (from `docs/reviews/`), how much of the limit it took — ask the owner for the Usage numbers; don't estimate them.
- A timeline (#39) of the build; links to the repo, chapter 05 and two PRs with review notes.

## Reading

This part reads more than others because it compiles: `00-general.md`, `docs/STYLE.md`, this file, every `docs/parts/*.notes.md`, every `docs/reviews/*.md`, `docs/PROGRESS.md`, all chapters, and the HTML page from the Library. It still doesn't open other part spec files. Use subagents to scan chapters for terms and links, so the main thread stays small.

## Excludes

- Rewriting or restructuring other parts' chapters beyond the three allowed edits above.
- New shared components; reuse what exists.

## Output

`src/content/ref/*.md`, `src/content/guide/00-roadmap.md`, `src/content/guide/14-how-this-site-was-made.md`, home page content, updated `src/lib/glossary.ts`, `docs/parts/10-reference-wrapup.notes.md`. PR title: `Part 10: reference pages and wrap-up`.

## Sources

The researcher saves a source for every key fact into the notes Sources table as it is found, so the fact-checker checks the saved link instead of searching again. Here most sources are inherited: keep every URL from the merged notes intact on `/ref/sources`. New facts — build statistics for chapter 14 — cite git history, `PROGRESS.md` or the owner's Usage numbers.

## Done when

- Build and check pass.
- Search finds a term, a ready phrase and an error text.
- Every term in `glossary.ts` has a chapter link; no broken internal links.
- Every chapter uses the glossary terms; the replacements table in the notes file is complete.
- Chapter 14 uses only real numbers.
