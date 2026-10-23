# Part 02 notes: chapter 05 Git and GitHub

Chapter: `src/content/guide/05-git-github.md`. Component: `src/lib/components/git/CommitGraph.svelte`.

## Sources

All rows checked on 2026-10-23. Anchors point to `/guide/05-git-github`.

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| A commit stores a pointer to the snapshot, author name and email, message and parent pointer(s) | #commit | https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell | 2026-10-23 | "contains a pointer to the snapshot of the content you staged" |
| A branch is a lightweight movable pointer to a commit | #branch | https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell | 2026-10-23 | "simply a lightweight movable pointer to one of these commits" |
| Creating a branch creates a new pointer to the current commit | #branch | https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell | 2026-10-23 | "This creates a new pointer to the same commit you're currently on." |
| Hash is SHA-1, 40 hex characters, computed from content | #hash | https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F | 2026-10-23 | Section "Git Has Integrity": "40-character string composed of hexadecimal characters" |
| Content can't change without Git knowing | #hash | https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F | 2026-10-23 | "impossible to change the contents of any file or directory without Git knowing" |
| Short hash: 4+ characters if unambiguous; `--abbrev-commit` defaults to 7 | #hash | https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection | 2026-10-23 | Section "Short SHA-1": "it defaults to using seven characters" |
| Git is moving towards SHA-256 as default | #hash (Deeper) | https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection | 2026-10-23 | Note "A short note about SHA-1": "Git is moving towards using SHA256" |
| Object hash = SHA-1 of header (type, size, null byte) + content | #commit (Deeper) | https://git-scm.com/book/en/v2/Git-Internals-Git-Objects | 2026-10-23 | "calculates the SHA-1 checksum of that new content" |
| Commit object: tree, parents, author/committer with timestamp, message | #commit (Deeper) | https://git-scm.com/book/en/v2/Git-Internals-Git-Objects | 2026-10-23 | "it specifies the top-level tree for the snapshot" |
| `git revert` records new commits that reverse earlier ones | #revert | https://git-scm.com/docs/git-revert | 2026-10-23 | DESCRIPTION: "record some new commits that record them" |
| Reverting a merge needs `-m`; reverting a merge declares you never want its changes | #ask-agent (notes only) | https://git-scm.com/docs/git-revert | 2026-10-23 | Option `-m`: "Usually you cannot revert a merge" |
| `git reset --hard` makes the working tree match the commit; "Undo commits permanently", don't do it if you gave the commits to others | #reset | https://git-scm.com/docs/git-reset | 2026-10-23 | EXAMPLES "Undo commits permanently": "Do not do this if you have already given these commits" |
| `git restore --source <commit> <file>` takes a file out of another commit | #restore-file | https://git-scm.com/docs/git-restore | 2026-10-23 | Option `--source`; example "take a file out of another commit" |
| Reverting a merged PR on GitHub opens a new PR that reverts the merge; needs write access | #revert-pr | https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/reverting-a-pull-request | 2026-10-23 | "creates a new pull request that reverts the original merge commit" |
| Revert PR steps: Pull requests → the PR → Revert near the bottom → merge the new PR | #revert-pr | same as above | 2026-10-23 | Steps 1–4: "Near the bottom of the pull request, click Revert." |
| Revert of a PR may need individual commits if it conflicts or the PR wasn't merged on GitHub | #revert-pr | same as above | 2026-10-23 | "You may need to revert individual commits" |
| Protected branches: public repos on Free; public and private repos on Pro, Team, Enterprise | #protected-main | https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches | 2026-10-23 | Box "Who can use this feature?" |
| A protection rule disables force pushes and prevents deletion by default | #protected-main | same as above | 2026-10-23 | "each branch protection rule disables force pushes" |
| Rulesets: public repos on Free; public and private on Pro, Team, Enterprise Cloud | #protected-main | https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets | 2026-10-23 | Box "Who can use this feature?" |
| Merge methods: merge commit (`--no-ff`), squash into one commit, rebase without a merge commit | #merge-methods | https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github | 2026-10-23 | "the pull request's commits are squashed into a single commit" |
| Git is a version control system that records a history of changes; GitHub hosts Git repositories in the cloud | #git-vs-github | https://docs.github.com/en/get-started/start-your-journey/about-github-and-git | 2026-10-23 | Section "GitHub and Git": "Git is a version control system that tracks changes to files." |
| A repository holds the files and each file's revision history | #git-vs-github | https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories | 2026-10-23 | "each file's revision history" |
| Private repositories are only accessible to you and people you share with | #git-vs-github | https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories | 2026-10-23 | "Private repositories are only accessible to you" |
| Visibility is chosen when the repository is created (docs don't name a default) | #git-vs-github | https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository | 2026-10-23 | Step "Choose a repository visibility." |
| A commit records changes; Git gives each commit a unique ID called SHA or hash; a commit needs a message | #commit | https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/about-commits | 2026-10-23 | "Git assigns each commit a unique ID, called a SHA or hash" |
| GitHub names the default branch `main` in new repositories | #branch | https://docs.github.com/en/pull-requests/reference/branches | 2026-10-23 | "By default, GitHub names the default branch main" |
| Branches let you work in isolation from other people's changes | #branch | https://docs.github.com/en/pull-requests/reference/branches | 2026-10-23 | "work on this new branch in isolation" |
| A protected branch can block force pushes or deletion, require checks and reviews | #protected-main | https://docs.github.com/en/pull-requests/reference/branches | 2026-10-23 | "A protected branch can block force pushes or deletion" |
| A cloud thread works on its own branch, started from the default branch, and opens a PR | #branch | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Review a thread's pull request": "works on a new branch, started from the repository's default branch" |
| A thread's card can show Resolve conflicts, Fix CI, Address comments, Merge it, Review PR, Create PR | #conflict | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Review a thread's pull request": "send that instruction to the thread as a message from you" |
| Example project instruction: don't merge or force-push without asking | #protected-main | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Write project instructions": "Don't merge, force-push, or change CI configuration without asking me" |
| Instructions are kept by Claude, not enforced settings | #protected-main | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Tune how Claude runs a project": "They're instructions Claude keeps to, not enforced settings" |
| A pull request is a proposal to merge changes; Files changed tab shows the diff; Checks tab shows validations | #pull-request | https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests | 2026-10-23 | "The Files changed tab shows the diff" |
| Conflict: the same part of the same file changed differently in two branches; markers `<<<<<<<`, `=======`, `>>>>>>>` | #conflict | https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging | 2026-10-23 | Section "Basic Merge Conflicts": "changed the same part of the same file differently" |
| GitHub can resolve only simple competing-line conflicts; others need the command line; resolving merges base into head | #conflict | https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github | 2026-10-23 | "You can resolve simple competing line change conflicts on GitHub." |
| Blame shows line-by-line revision history with author, description and date per commit | #history | https://docs.github.com/en/repositories/working-with-files/using-files/viewing-and-understanding-files | 2026-10-23 | Section "Blame view": "line-by-line revision history" |
| Compare view compares branches, tags and commits; base is the start, compare is the end | #history | https://docs.github.com/en/pull-requests/committing-changes-to-your-project/viewing-and-comparing-commits/comparing-commits | 2026-10-23 | "The compare page uses base as the starting point" |
| A file's history shows commits that touched the file; the repository's commits page shows branch history | #history | https://docs.github.com/en/pull-requests/committing-changes-to-your-project/viewing-and-comparing-commits/differences-between-commit-views | 2026-10-23 | "A file's history shows commits that affected that file" |
| `git reset --hard` overwrites uncommitted changes in the working tree | #reset | https://git-scm.com/docs/git-reset | 2026-10-23 | DESCRIPTION: "Overwrite all files and directories with the version from <commit>" |
| Activity view lists pushes, merges, force pushes, branch changes | #reset | https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/using-the-activity-view-to-see-changes-to-a-repository | 2026-10-23 | "such as pushes, merges, force pushes, and branch changes" |
| Releases are based on Git tags; GitHub adds zip and tarball downloads of the tagged state | #releases | https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases | 2026-10-23 | "links to download a zip file and a tarball" |
| Create a release: Releases → Draft a new release → Choose a tag / Create new tag → Publish release | #releases | https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository | 2026-10-23 | "To the right of the list of files, click Releases." |
| Tags mark release points such as `v1.0`; `git tag -a`; `git push` doesn't send tags by default | #releases | https://git-scm.com/book/en/v2/Git-Basics-Tagging | 2026-10-23 | "people use this functionality to mark release points" |
| `git push --force` disables the safety check and can make the remote lose commits | #reset | https://git-scm.com/docs/git-push | 2026-10-23 | Option `--force`: "It can cause the remote repository to lose commits" |
| `git switch -c <new-branch> <start-point>` creates a branch at a commit; `--detach` for inspection | #old-version | https://git-scm.com/docs/git-switch | 2026-10-23 | Option `-c`: "Create a new branch named <new-branch> starting at <start-point>" |
| Reflog records when branch tips were updated in the local repository | #reset (Deeper) | https://git-scm.com/docs/git-reflog | 2026-10-23 | DESCRIPTION: "record when the tips of branches and other references were updated in the local repository" |
| Leaked secret: revoke and/or rotate it first; history rewrite has side effects; forks and cached views may keep it | #leaked-key | https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository | 2026-10-23 | "as a first step you need to revoke and/or rotate that secret" |
| Template repository: new repos with the same structure and files; starts with a single commit; a fork keeps full history | #reuse | https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template | 2026-10-23 | "a repository created from a template starts with a single commit" |
| Make a repository a template: Settings → Template repository | #reuse | https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository | 2026-10-23 | "Select Template repository." |
| A fork starts as a copy of the upstream and stays connected; private repo forks are private | #reuse | https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks | 2026-10-23 | "Public repository forks are public, and private repository forks are private." |
| Cloning copies the full repository with every version of every file | #reuse | https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository | 2026-10-23 | "including all versions of every file and folder" |
| Without a licence, default copyright applies; others may not reproduce or distribute | #reuse | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository | 2026-10-23 | "without a license, the default copyright laws apply" |
| A package is a file or directory described by `package.json` | #reuse | https://docs.npmjs.com/about-packages-and-modules | 2026-10-23 | "A package is a file or directory that is described by a package.json file." |
| Cloud sessions can be started and steered from the Code tab of the Claude mobile app | #revert-pr (Tabs) | https://code.claude.com/docs/en/claude-code-on-the-web | 2026-10-23 | List of surfaces: "Mobile: the Code tab in the Claude app" |
| Threads run in parallel and you can steer them from your phone | #revert-pr (Tabs) | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Intro: "you can check on them and steer them from your phone" |
| GitHub sends no webhook when the base branch moves and causes a conflict; ask the session to rebase | #conflict | https://code.claude.com/docs/en/claude-code-on-the-web | 2026-10-23 | Section "How Claude responds to PR activity": "auto-fix can't react to conflicts on its own" |
| Cloud GitHub proxy rejects branch deletions and pushes of tags; it doesn't limit which branches a push can update; use branch protection or rulesets | #protected-main, #releases | https://code.claude.com/docs/en/cloud-environments | 2026-10-23 | Section "GitHub proxy", bullet "Push restrictions" |
| Each commit takes a picture of all files at that moment (stream of snapshots) | #commit | https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F | 2026-10-23 | Section "Snapshots, Not Differences": "takes a picture of what all your files look like" |
| Commit timestamps are seconds since the UNIX epoch plus a UTC offset | #commit (Deeper) | https://git-scm.com/docs/git-commit | 2026-10-23 | DATE FORMATS, "Git internal format" |
| Project instructions live in Project settings → Memory → Project instructions | #protected-main | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "Write project instructions": "go to Memory > Project instructions" |
| A cloud session's VM is reclaimed after inactivity, so its local repository copy goes away | #reset (Deeper) | https://code.claude.com/docs/en/claude-code-on-the-web | 2026-10-23 | Section "Environment expired": "the session's VM is reclaimed" |
| Merge options on a PR: Merge pull request / Create a merge commit, Squash and merge, Rebase and merge | #merge-methods | https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request | 2026-10-23 | Step 3: "select Create a merge commit" |
| Each cloud thread clones its repositories into its own sandbox | #reuse | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | Section "How projects relate to other Claude Code features": "each clones its repositories into its own cloud sandbox" |

## New terms

For part 10 to add to the glossary. Terms already in `src/lib/glossary.ts` are not repeated.

| EN | RU | One-line definition |
| --- | --- | --- |
| snapshot | снимок | Состояние всех файлов проекта в момент коммита. |
| parent commit | родитель (родительский коммит) | Предыдущий коммит, на который ссылается новый. |
| merge commit | коммит-мердж | Коммит с двумя родителями, который соединяет две ветки. |
| squash and merge | squash | Мердж, при котором все коммиты ветки склеиваются в один. |
| rebase and merge | rebase | Мердж, при котором коммиты ветки встают в main по одному, без коммита-мерджа. |
| diff | дифф | Какие строки добавлены и какие удалены между двумя версиями. |
| force push | force push | Принудительная перезапись ветки на GitHub твоей версией. |
| reset | reset | Перенос ветки назад на старый коммит; поздние коммиты пропадают из ветки. |
| tag | тег | Неподвижная закладка с именем на важном коммите, например v0.1. |
| release | релиз | Тег на GitHub с описанием и архивом кода на тот момент. |
| blame | Blame | Вид файла на GitHub: у каждой строки видно последний коммит, автора и дату. |
| compare | Compare | Сравнение двух веток, тегов или коммитов на GitHub. |
| branch protection rule | правило защиты ветки | Настройка GitHub, которая запрещает force push и удаление ветки и может требовать PR. |
| ruleset | набор правил (ruleset) | Набор правил GitHub для веток репозитория. |
| template repository | шаблон (template repository) | Репозиторий-заготовка: новый репозиторий получает его файлы и начинает историю с одного коммита. |
| fork | форк | Копия репозитория на GitHub со всей историей, связанная с оригиналом. |
| clone | клон | Полная копия репозитория со всей историей на компьютере или в облачном потоке. |
| reflog | reflog | Локальный журнал Git: куда указывали ветки раньше. |
| HEAD | HEAD | Коммит, на котором ты сейчас. |
| package | пакет | Модуль со своим package.json, который подключают в разные проекты. |
| licence | лицензия | Файл LICENSE: что другим можно делать с кодом. |
| private repository | приватный репозиторий | Репозиторий, который видишь только ты и те, кому ты дал доступ. |

## Ready phrases

| Title | Phrase | When | Chapter#anchor |
| --- | --- | --- | --- |
| Правило для инструкций проекта | Никогда не пушь в main напрямую и никогда не делай force push. Любое изменение — только через PR в новой ветке. Не мерджи без моего OK. | Один раз, при настройке проекта | #protected-main |
| Откатить PR | Откати PR #3 через revert в новой ветке и открой PR. Ничего не форсь. | Влитый PR что-то сломал | #revert-pr |
| Посмотреть старую версию | Создай ветку от коммита ac97c1d, чтобы я мог посмотреть проект таким, как тогда. В main ничего не меняй. | Хочешь увидеть, как было раньше, и ничего не ломать | #old-version |
| Вернуть один файл | Верни файл src/timer.js к версии из коммита ac97c1d отдельным коммитом в новой ветке и открой PR. | Сломан один файл, остальные изменения нужны | #restore-file |
| Безопасный откат | Откати изменения после abc1234 через revert в новой ветке, открой PR, ничего не форсь. | Что-то сломалось, и ты знаешь последний хороший коммит | #ask-agent |
| Разрешить конфликт (inline) | Разреши конфликт с main. | У PR потока конфликт | #conflict |

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `git revert A..HEAD` stops with `error: commit … is a merge but no -m option was given` | The range contains a merge commit (a PR merged with "Create a merge commit") | Revert the first-parent commits one by one, merges with `-m 1`, into one commit (verified below). Or just give the thread the «Безопасный откат» phrase. |
| `git push` is rejected with `(non-fast-forward)` after `git reset --hard` | The branch on GitHub still has the commits the reset dropped | On your own feature branch only: `git push --force-with-lease`. On `main`: never; use revert. |
| No **Revert** button on a merged PR | No write access to the repository | Ask the repository owner for write access. |
| Reverting a PR on GitHub conflicts, or the PR wasn't merged on GitHub | The revert can't be built automatically | Revert individual commits; give the task to a thread. |
| Merging a branch made from an old commit says `Already up to date.` | The old commits are already part of `main` | Use revert to go back; the branch is only for looking. |
| **Resolve conflicts** on GitHub is greyed out | Not a simple competing-line conflict | Let the thread resolve it in its branch (card button **Resolve conflicts**). |
| A thread doesn't react to a conflict on its PR | GitHub sends no webhook when the base branch moves and creates a conflict | Press **Resolve conflicts** on the thread's card or ask it to resolve the conflict with `main`. |
| A cloud thread can't push a tag | The cloud GitHub proxy accepts only branch pushes | Create the tag and release on the website: Releases → Draft a new release. |
| Branch protection settings are missing | Private repository on GitHub Free | Use the project-instructions rule; protection for private repositories needs Pro, Team or Enterprise. |
| A key or password was committed | Secret in history | Revoke and rotate the key first; clean history second (`/guide/13-security`). |

## Open questions

Resolved by the owner's delegation on review: the voice is accepted as written; on the paid plan the chapter keeps the project-instructions rule and names no price; the `Deeper`/`Step`/other component paragraph gap and the code-block title cut-off were fixed in the review commits.

1. The part file says "Repository; private by default". GitHub's docs don't say which visibility the create page selects by default, so the chapter tells the reader to choose **Private** instead of claiming it is the default.
2. On GitHub Free, branch protection and rulesets work only in public repositories. If the friend keeps the repository private on Free, `main` is protected only by the project-instructions rule (cloud threads' GitHub proxy doesn't limit which branches they push to). The chapter says so; the owner may want the guide to recommend a paid GitHub plan. No price is given because none was sourced.
3. `Deeper.svelte` (part 01) removes the gap between paragraphs: `.body :global(p) { margin: 0 }` beats `.body :global(> * + *) { margin-top: 0.75rem }`. A `<p>` after another block gets `margin-top: 0` (measured in Chromium). `Step.svelte` has the same pattern. Part 02 doesn't own these files, so the two Deeper blocks in chapter 05 show paragraphs without a gap until part 01's component is fixed.
4. GitHub Mobile's docs don't list reverting or merging pull requests, so the «Телефон» tab sends the reader to the thread (card button **Merge it**) instead of GitHub Mobile.
5. The Projects docs say threads can be steered "from your phone" but don't name the mobile app for projects, so the chapter says «Открой проект на телефоне» without naming an app.
6. A cloud thread can't push tags through git, but it might create a release through the GitHub REST API. Not tested; the chapter recommends creating releases on the website.

## CommitGraph

`src/lib/components/git/CommitGraph.svelte` — static SVG inside `DiagramFrame`, no data props (optional `caption`).
Colours: green — commits and line of `main` and the `main` pointer; violet — the thread's branch; red — the bad commit.
The dashed arrow (`path.arrow.dashed`) goes from the revert commit to the commit it undoes. Hashes match the scratch run below.
Checked in Chromium at 360 px and 1440 px, dark and light: no horizontal scroll, every label inside the viewBox.

## Commands verified

Scratch repository built by a script with fixed author dates (2026-10-01 … 2026-10-06, author "Ты <you@example.com>"),
so the hashes in the chapter are reproducible: `Add Inbox screen`, `Add focus timer`, branch `feature/pick-for-me` with two
commits merged by `--no-ff` as `Merge pull request #3 from feature/pick-for-me`, then `Make focus 50 minutes`, pushed to a
local bare remote. Git 2.43.0. The commands below ran without fixed dates, in chapter order.

```text
## #hash
$ git log --oneline
d7bd791 Make focus 50 minutes
2f61c23 Merge pull request #3 from feature/pick-for-me
61f095e Explain pick-for-me
49abc1b Add pick-for-me button
ac97c1d Add focus timer
5d16eab Add Inbox screen

## #commit (Deeper)
$ git cat-file -p HEAD
tree b8cff7a242e4400bd117c30c9e3f6a8beca36c0a
parent 2f61c23e546248778b30bd41f144ffc0c9b38e3b
author Ты <you@example.com> 1791270000 +0300
committer Ты <you@example.com> 1791270000 +0300

Make focus 50 minutes

## #revert
$ git revert --no-edit d7bd791
[main 0e30a8d] Revert "Make focus 50 minutes"
 Date: Fri Oct 23 07:50:03 2026 +0000
 1 file changed, 1 insertion(+), 1 deletion(-)

$ git log --oneline -3
0e30a8d Revert "Make focus 50 minutes"
d7bd791 Make focus 50 minutes
2f61c23 Merge pull request #3 from feature/pick-for-me

## #restore-file
$ git restore --source=ac97c1d -- src/timer.js

$ git commit -am "Restore timer from ac97c1d"
[main 60a714f] Restore timer from ac97c1d
 1 file changed, 1 insertion(+), 2 deletions(-)

## #old-version
$ git switch -c look-back ac97c1d
Switched to a new branch 'look-back'

$ git switch main
Switched to branch 'main'
Your branch is ahead of 'origin/main' by 4 commits.
  (use "git push" to publish your local commits)

## #reset (on a feature branch, never main)
$ git reset --hard d7bd791
HEAD is now at d7bd791 Make focus 50 minutes

$ git push --force-with-lease origin experiment
To ../remote.git
 + c8f940a...d7bd791 experiment -> experiment (forced update)

## #conflict
$ git merge main
Auto-merging src/tasks.js
CONFLICT (content): Merge conflict in src/tasks.js
Automatic merge failed; fix conflicts and then commit the result.

$ cat src/tasks.js
<<<<<<< HEAD
export const TITLE = 'Задачи на сегодня';
=======
export const TITLE = 'Мои задачи';
>>>>>>> main
```

Editing one old commit changes every later hash (chapter #hash, Deeper). The oldest message was amended to
`Add Inbox screen!` and the rest rebased with `--rebase-merges`:

```text
before:
d7bd791 Make focus 50 minutes
2f61c23 Merge pull request #3 from feature/pick-for-me
61f095e Explain pick-for-me
49abc1b Add pick-for-me button
ac97c1d Add focus timer
5d16eab Add Inbox screen
after changing one old message:
65cfd56 Make focus 50 minutes
fb4c81d Merge pull request #3 from feature/pick-for-me
3ca3186 Explain pick-for-me
15621df Add pick-for-me button
51191e3 Add focus timer
7cca42f Add Inbox screen!
```

A branch made from an old commit can't roll `main` back (chapter #old-version):

```text
$ git branch look-back ac97c1d
$ git merge look-back
Already up to date.
```

Reflog after the reset on the feature branch (chapter #reset, Deeper):

```text
$ git reflog -4
d7bd791 HEAD@{0}: reset: moving to d7bd791
03ebca7 HEAD@{1}: commit: Habits: add meditation
c7c23d7 HEAD@{2}: commit: Add habits draft
d7bd791 HEAD@{3}: checkout: moving from main to experiment
```

The «Безопасный откат» phrase with a merge inside the range (chapter #ask-agent): a plain range revert fails, the
first-parent loop works and leaves the tree equal to the good commit:

```text
$ git revert --no-commit ac97c1d..HEAD
error: commit 2f61c23e546248778b30bd41f144ffc0c9b38e3b is a merge but no -m option was given.
fatal: revert failed

$ git switch -c revert-after-ac97c1d
$ for c in $(git rev-list --first-parent ac97c1d..HEAD); do
    if [ $(git rev-list --parents -n1 $c | wc -w) -gt 2 ]; then git revert --no-commit -m 1 "$c"; else git revert --no-commit "$c"; fi
  done
$ git commit -m "Revert changes after ac97c1d"
$ git diff ac97c1d --stat
(empty: the tree equals ac97c1d)
```

Annotated tag (not shown in the chapter; the chapter uses the website because cloud threads can't push tags):

```text
$ git tag -a v0.1 -m "First working version"
$ git push origin v0.1
 * [new tag]         v0.1 -> v0.1
```
