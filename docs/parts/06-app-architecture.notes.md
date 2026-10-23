# Part 06 notes: chapters 06, 10 and 11

Chapters: `src/content/guide/06-sync.md`, `src/content/guide/10-stack-speed.md`,
`src/content/guide/11-architecture.md`. No new components; diagrams are inline SVG in `DiagramFrame`.

## Sources

All rows checked on 2026-10-23. Anchors: `06` = `/guide/06-sync`, `10` = `/guide/10-stack-speed`,
`11` = `/guide/11-architecture`.

### Claude Code (official pages)

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| Cloud session: repository is cloned to an Anthropic-managed VM | 06#thread-copy | https://code.claude.com/docs/en/web-quickstart | 2026-10-23 | "How sessions run": "your repository is cloned to an Anthropic-managed VM" |
| Cloud session pushes its branch to GitHub; each task gets its own branch; Create PR | 06#thread-copy | https://code.claude.com/docs/en/web-quickstart | 2026-10-23 | "How sessions run": "it pushes its branch to GitHub" |
| `claude --teleport` fetches and checks out the cloud session's branch; local copy is separate afterwards | 06#pull | https://code.claude.com/docs/en/claude-code-on-the-web | 2026-10-23 | "Continue a cloud session in your terminal": "fetches and checks out the branch from the cloud session" |
| Cloud sessions stop after inactivity, the VM is reclaimed; history restored, running commands not | 06#commit-often | https://code.claude.com/docs/en/claude-code-on-the-web | 2026-10-23 | "Environment expired": "the session's VM is reclaimed" |
| Project threads: sandbox pauses between turns; may continue from a fresh clone; uncommitted changes can be lost; ask Claude to commit and push | 06#commit-often | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "Limitations": "uncommitted changes can be lost" |
| Library tab: files you added and files threads produced | 06#library-copies | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "See what needs you in Overview": "the files you added and the files threads produced" |
| Uploads are copies; change on the computer doesn't reach the project until re-upload with **Replace** | 06#library-copies | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "Add files and folders": "uploads are copies" |
| A folder adds a copy of its first 100 files up to 200 MB | 06#library-copies | https://code.claude.com/docs/en/claude-projects | 2026-10-23 | "Add files and folders": "a copy of its first 100 files up to 200 MB" |

### Git

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| DVCS clients fully mirror the repository with its full history | 06#code-via-github (Deeper) | https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control | 2026-10-23 | "Distributed Version Control Systems": "they fully mirror the repository, including its full history" |
| `git pull` integrates changes from a remote into the current branch | 06#pull | https://git-scm.com/docs/git-pull | 2026-10-23 | DESCRIPTION: "Integrate changes from a remote repository into the current branch." |

### Browser storage and data

| Claim (short) | Chapter#anchor | URL | Checked on | Locator |
| --- | --- | --- | --- | --- |
| IndexedDB is per origin (same-origin policy) | 06#data-on-phone | https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API | 2026-10-23 | "Key concepts and usage": "IndexedDB follows a same-origin policy" |
| Browser storage lives on the local disk of the device | 06#data-on-phone | https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria | 2026-10-23 | Intro: "store data in the user's browser (i.e., on the local disk" |
| Default storage is best-effort; `navigator.storage.persist()` requests persistent storage | 06#data-on-phone (Deeper) | https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria | 2026-10-23 | "Does browser-stored data persist?": "Best-effort: this is the way that data is stored by default." |
| Safari: no user interaction in 7 days → script-created data deleted (with tracking prevention on) | 06#data-on-phone (Deeper) | https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria | 2026-10-23 | "Proactive eviction": "no user interaction, such as click or tap, in the last seven days" |
