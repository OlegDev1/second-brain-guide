# Review: part 02, chapter 05 Git and GitHub (PR #3)

Reviewed on 2026-10-23 against `docs/spec/00-general.md`, `docs/STYLE.md`, `docs/parts/02-git-github.notes.md`
and the PR diff. Three checks: fact-check, code check, style check. Items are numbered; **Status** is
`fixed` (done in this branch), `open` (needs the part 02 author or the owner) or `info`.

## Result

- Facts: every Anthropic-docs row and every GitHub-docs row I opened is supported by its saved link. No wrong
  fact found. Two wording issues (F1, F2) and one omission (F3).
- Code: the paragraph-gap bug is real and is **fixed** in `Deeper.svelte` and `Step.svelte` (C1). The same
  bug exists in eight more part 01 components (C2, open). No other bugs found in `CommitGraph.svelte`.
- Style: the chapter follows the 15 reference decisions with six small deviations (S1–S6). Length, sentence
  and paragraph limits, heading lengths and TL;DR length are within the limits.
- `npm run build` → `Pagefind: indexed 28 pages`; `npm run check` → `COMPLETED 280 FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS`.

## Fact-check

### What was verified

Opened the saved URL and confirmed the locator:

- **code.claude.com** (`claude-projects`, `claude-code-on-the-web`, `cloud-environments`): thread branch starts from
  the default branch; card buttons **Resolve conflicts / Fix CI / Address comments / Merge it** send the instruction as
  a message from the user, **Review PR** opens GitHub, **Create PR** exists; instructions are "instructions Claude keeps
  to, not enforced settings"; path **Project settings > Memory > Project instructions**; example rule about merge and
  force-push; mobile **Code** tab; GitHub sends no webhook on a base-branch conflict ("ask Claude to rebase");
  VM reclaimed after inactivity; GitHub proxy "rejects branch deletions and pushes of anything other than a branch,
  such as a tag. It doesn't limit which branches a push can update".
- **docs.github.com**: protected branches and rulesets are free only for public repositories (Pro, Team, Enterprise
  for private); a protection rule disables force pushes and deletion by default; Revert steps, button location, write
  access, conflict and not-merged-on-GitHub caveats; release steps (**Releases**, **Draft a new release**, **Choose a
  tag**, **Create new tag**, **Target**, **Publish release**); **Resolve conflicts** handles only simple competing-line
  conflicts; **Blame** above the file content; `/compare` appended to the repository path; **Template repository**
  in Settings; template starts with one commit, fork keeps history; **Activity** lists force pushes; merge options
  **Create a merge commit / Squash and merge / Rebase and merge**; no default named for repository visibility;
  leaked secret "revoke and/or rotate" first, forks and cached views may keep the data; licence default copyright.
- **git-scm.com**: short hash 4+ characters, 7 by default with `--abbrev-commit`; SHA-256 note; `reset --hard` and the
  "do not do this if you have already given these commits to somebody else" warning; `--force` can lose commits;
  `--force-with-lease` refuses if the remote ref is not the expected value.
- Hash lengths in the chapter are 40 characters. In a scratch repo I re-ran `git revert --no-edit`, `git restore
  --source`, `git switch -c`, the `Already up to date.` merge and the `is a merge but no -m option` error: all behave as the
  chapter and notes say.

### Items

| # | Severity | Where | Finding | Status |
| --- | --- | --- | --- | --- |
| F1 | low | `#reuse`, last paragraph | «Без лицензии … никто не вправе его копировать и распространять» is broader than the source ("no one may reproduce, distribute, or create derivative works"), and sits next to the earlier claim that anyone can fork a public repository. Suggest: «Без лицензии автор оставляет все права себе: копировать и распространять код без его разрешения нельзя». The fork carve-out needs its own source (GitHub Terms of Service) if you want to mention it. | open |
| F2 | low | `#reset`, intro | `git reset --hard` also overwrites uncommitted changes in the working folder (git-reset, DESCRIPTION). The chapter says only that later commits disappear from the branch. For a reader who may let a thread run it, one clause («и стирает несохранённые правки») closes the gap. Add the source row. | open |
| F3 | low | `#thread-branch` vs notes row 39 | The notes row quotes the docs as "works on a new branch, started from the repository's default branch"; the chapter says «от `main`». True for this project, but say «от основной ветки (`main`)» if you want the sentence to match the source word for word. | info |

## Code

| # | Severity | Where | Finding | Status |
| --- | --- | --- | --- | --- |
| C1 | medium | `Deeper.svelte`, `Step.svelte` | Confirmed the developer's report. `.body :global(p) { margin: 0 }` has specificity (0,2,1) and beats `.body :global(> * + *)` (0,2,0), so a `<p>` that follows another block gets `margin-top: 0`. Measured in Chromium on `/guide/05-git-github/`: in the first «Глубже» block the paragraph after the code block and after the list had `margin-top: 0px`; the second block's two paragraphs touched. Fix: the reset is now `:global(:where(p))` (specificity 0) and sits before the sibling rule. After the fix the same paragraphs measure 12px (0.75rem). `Step` got the identical change (its gap is 0.6rem); the four steps in chapter 05 have one paragraph each, so nothing changes there visibly. No horizontal scroll at 360 or 1440 px, no console errors. | fixed |
| C2 | medium | `Card`, `TLDR`, `Tab`, `Before`, `After`, `Accordion`, `Msg`, `Callout` (part 01) | The same `:global(p) { margin: 0 }` plus `:global(> * + *)` pattern is in eight more components, so two paragraphs in one callout, tab, accordion or card also touch. I did not change them: the brief covers Deeper and Step only, and part 01 owns the files. The fix is the same one line per file (`:global(:where(p))`, placed before the sibling rule). Chapter 05 has single-paragraph callouts and tabs, so it is not visibly affected, but later chapters will be. Needs a part 01 follow-up or an OK to apply here. | open |
| C3 | low | `CodeBlock` (part 01) | At 360 px the title of a code block is cut by the **Копировать** button: `git cat-file -p H…`, «После правки одно…». The block titles are commands the reader may want to read. Part 01 follow-up: let the title wrap or shrink the copy button to an icon at narrow widths. | open |
| C4 | info | `CommitGraph.svelte` | Hashes match the chapter and notes (`5d16eab`, `ac97c1d`, `49abc1b`, `61f095e`, `2f61c23`, `d7bd791`, `0e30a8d`); colours come from tokens only; the marker id uses `$props.id()` so two graphs on a page don't clash; runes only. No bug found. | info |

## Style (`docs/STYLE.md`)

Within limits: TL;DR 40 words, no links, no components; about 2,660 words of prose (`time: 20` is right);
no sentence over 25 words (longest 23), no paragraph over 3 sentences; every `##`/`###` has a Latin `{#id}` and is
35 characters or fewer; «Выводы» has 6 full-sentence bullets and repeats the corrected misconception; the
checklist `id` is `guide-05-next-steps`; Tabs use `group="device"` with Телефон first; one «Глубже» per `##`.

| # | Severity | Decision | Finding | Status |
| --- | --- | --- | --- | --- |
| S1 | medium | 13 Anthropic facts | Four Anthropic-docs facts have no «(проверено: октябрь 2026)» in their sentence: (a) `#conflict`: «Сам поток конфликт может не заметить: GitHub не присылает событие…» (from claude-code-on-the-web); (b) `#protected-main`: «инструкции проекта — с них начинает каждый поток»; (c) `#protected-main`: «Инструкция — договорённость, а не замок» (from claude-projects, "not enforced settings"); (d) `#reset` Deeper: «Копия облачного потока исчезает вместе с его машиной после простоя». The path in the PhraseCard `when` is also an Anthropic UI fact. Each has a row in the notes, so only the marker is missing. | open |
| S2 | low | 6 «Глубже» | The «Что внутри коммита» block holds two code blocks (`git cat-file` and the five-line list of changed hashes). The rule allows one. Move the second block into the sentence or drop it; the claim "all hashes change" is already in the main text of `#hash`. | open |
| S3 | low | 10 Callouts | Section `## Откат` has two callouts: `important` at the top and `danger` inside `### Reset`. Both earn their place, so the decision may need wording («one per `##` or `###` section») rather than a chapter change. Owner's call. | open |
| S4 | low | 9 PhraseCard | The `when` of «Правило для инструкций проекта» is a path («Project settings → Memory → Project instructions»), not a situation. Suggest «Один раз, при настройке проекта» and move the path into the text above the card. Also `#old-version` (look at an old version without breaking anything) is delegable but has no card. | open |
| S5 | low | 2 Definitions | First use of a glossary word is not always wrapped in `<Term>`: «поток», «PR» and «мердж» appear in `#git-vs-github` before their definitions in `#branch` and `#pull-request`. The first `<Term>` for «поток» is in `#thread-branch`. Either wrap the first body use or move the definition earlier. | open |
| S6 | info | 15 Closing blocks | «Источники» groups by publisher with link text in English page titles, as the decision says. Link text for Pro Git and Git docs is the page's own title; fine. | info |

## Not checked

- Voice approval belongs to the owner (part file, "Done when").
- Visual quick look (screens in `docs/reviews/screens/02/`) is the Haiku thread's job; I only checked overflow,
  console errors and the paragraph gap.
- The `Date:` and hashes of the scratch run are not reproducible (no fixed dates for the revert commit); the chapter
  presents them as an example, which is fine.
