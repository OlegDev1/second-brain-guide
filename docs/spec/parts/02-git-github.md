# Part 02 — Reference chapter: Git and GitHub

**Model:** Opus, High. **Depends on:** 01. **Wave:** 2, alone.

## Goal

Chapter `05-git-github` in full. It is the reference for voice, depth and component use: every later part copies it. The friend should understand history, branches and rollback well enough that losing work stops being scary.

## Includes

**Chapter 05 content**
- Git vs GitHub: the history tool and the cloud for it. Repository; private by default.
- Commit: snapshot + message + author + link to the previous commit. Hash (SHA): 40 characters, usually the first 7 are enough. Why history can't be silently forged: the hash depends on the content and the parent.
- Branch: a movable pointer to a commit; `main`. Why every thread gets its own branch: agents don't step on each other.
- Pull request: a request to bring a branch into `main`, the place for review. Merge, squash, rebase — one line each.
- Conflict: two threads changed the same place. Who resolves it: the thread via the Resolve conflicts button on its card, or the owner on GitHub.
- Why `main` is protected: one source of truth, no force push.
- Reading history: Commits, diff, Blame, Compare; Releases and tags as save points (`v0.1`).
- **Rollback — the key section:**
    - `git revert` — a new commit that undoes an old one; history is kept; the default.
    - Revert a merged PR with the Revert button on GitHub, no terminal.
    - Restore one file to its version from a commit.
    - Look at an old version without breaking anything: a branch from an old commit.
    - `git reset --hard` + force push — rewrites the branch, later commits vanish from it. Only deliberately, never on `main`.
    - How to ask an agent: «откати изменения после `abc1234` через revert в новой ветке, открой PR, ничего не форсь».
- A key or password got into the repo: revoke the key first, clean history second (one paragraph + link to `13-security`).
- Reusing code in another project: template repository, fork, clone, extracting a module into a package; a word on licences.

**Must correct** (error in the source materials): "rolling back deletes everything after it" describes `reset` + force push, not revert. Say so explicitly.

**Components and blocks**
- Specialised component owned here: `src/lib/components/git/CommitGraph.svelte` (#39) — static SVG of commits on `main` and a feature branch, a merge, and one revert commit; labels in Russian; works at 360 px.
- Uses generic components: CompareTable for revert / reset / checkout (#28), Steps for "revert a PR on the website" (#23), Tabs Телефон / Компьютер (#22), Callout danger on force push, Deeper for "what's inside a commit".

**Style lock-in** — extend `docs/STYLE.md` with a section "Reference decisions":
- 10–15 bullet decisions you made about voice, headings, length of TL;DR, use of «Глубже», examples, component use.
- Three short excerpts from the chapter: a good TL;DR, a good «Глубже» block, a good «Что сделать сейчас».
- Later parts read STYLE.md instead of the whole chapter, so it must stand on its own.

## Excludes

- How code and data sync between cloud, laptop and hosting → part 06 (`06-sync`); link only.
- How projects use branches and PRs in practice → part 04 (`02-project`, `07-agent-team`); one paragraph here + link.
- Leaked keys in detail → part 07 (`13-security`).
- Deploying to GitHub Pages → part 07 (`12-deploy`).
- Git sandbox (#08) — not in this release.

## Output

`src/content/guide/05-git-github.md`; `src/lib/components/git/CommitGraph.svelte`; updated `docs/STYLE.md`; `docs/parts/02-git-github.notes.md`. PR title: `Part 02: chapter 05 Git and GitHub`.

## Sources

The researcher saves a source for every key fact into the notes Sources table as it is found, so the fact-checker checks the saved link instead of searching again. Key facts here: what each git command does (git-scm.com docs), GitHub UI actions — Revert button, branch protection, Releases, Blame, Compare (docs.github.com), hash length and how it is computed. Run every command shown in the chapter in a scratch repo and paste the command and its output into the notes file.

## Done when

- Build and check pass; every command in the chapter is verified in the notes.
- CommitGraph reads clearly at 360 px and in dark theme.
- STYLE.md has the "Reference decisions" section with excerpts.
- The owner approved the voice of the chapter.
