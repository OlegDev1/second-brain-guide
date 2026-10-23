# Review: part 04, chapters 02 and 07 (PR #5)

Reviewed on 2026-10-23 against `docs/spec/00-general.md`, `docs/parts/04-method.notes.md` and the PR diff.
Two checks: fact-check and frontend skim. No code changes were needed.

## Result

- Facts: every claim I opened is supported by its saved link. No wrong fact found.
- Frontend: no layout bugs found at 360 px (dark and light) and 1440 px (dark). No horizontal page scroll.
- `npm run build` → `Pagefind: indexed 28 pages`; `npm run check` → `COMPLETED 281 FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS`.

## Fact-check

Opened each saved URL and confirmed the locator or a matching phrase:

- **code.claude.com/docs/en/claude-projects**: public beta on Pro and Max, not Team or Enterprise; claude.ai/code, desktop and mobile apps;
  Overview groups (Ready for review, Waiting on you, Working, Landing, Idle, Resolved) and tabs Library, Pull requests, Scheduled tasks;
  Resolved rules (you, Claude after the last step, a week idle); 16,000-character instructions limit; gear icon → Project settings → Memory →
  Project instructions; Thread model and Thread effort in General; new project runs threads on Opus at high effort and the conversation
  at low effort; 200 new threads per day; card buttons (Resolve conflicts, Fix CI, Address comments, Merge it, Review PR, Create PR);
  permission prompt waits inside the thread; Pause, Archive and Delete semantics (Delete can't be undone, branches and PRs stay);
  cache lifetime an hour on Pro and Max; auto-fix watching of the PR; thread at the plan limit waits and continues, Stop or Pause prevents it;
  uncommitted changes can be lost; the four first-batch steps and the five-question brief.
- **sub-agents**: own context window, returns only the summary, counts toward the same usage limits, "self-contained and can return a summary".
- **agent-teams**: experimental, disabled by default, teammates message each other, significantly more tokens, sequential or same-file work fits a single session or subagents better.
- **model-config**: alias descriptions (opus complex reasoning, sonnet daily coding, haiku simple tasks) and the effort sentence.
- **best-practices**: fresh context improves review (Writer/Reviewer), flag only gaps that affect correctness or requirements, start fresh after two failed corrections.
- **Anthropic engineering posts**: 4× and 15× tokens and the poor fit for shared-context work; 16 agents, nearly 2,000 sessions, about $20,000, 100,000-line compiler, frequent merge conflicts, all agents stuck on the same task; subagent tens of thousands of tokens returning a 1,000–2,000-token summary.
- **OpenAI harness engineering**: every Friday (20% of the week) on "AI slop", Codex replicates existing patterns, background tasks open refactoring PRs.
- **METR / arXiv**: almost 100% success under 4 minutes, under 10% over about 4 hours, Claude 3.7 Sonnet horizon around 50 minutes (arXiv abstract), doubling about every seven months since 2019.

### Notes (no change needed)

- The METR blog rounds the Claude 3.7 Sonnet horizon to "about one hour"; the chapter uses the arXiv abstract's "around 50 minutes" and cites arXiv, so it is consistent with its source.
- The compiler post says "just under $20,000"; the chapter's "около $20 000" is fine.
- The "all 16 agents stuck on the same task" episode in the post happened while compiling the Linux kernel; the chapter's wording is short but not wrong.
- The notes' open question about "models of 2025" vs METR's "current models": settled as is. The chapter says «модели начала 2025 года», which matches the March 2025 post.
- The reference to terminal-only use not supporting projects is an inference from the Limitations and Create sections (projects are created in the web, desktop and mobile apps); fine for a beginner guide.

## Frontend skim

- 360 px dark and light, 1440 px dark: `scrollWidth` equals `clientWidth` on both pages.
- `ProjectDiagram`: single column, nodes at least 44 px tall, the pair row (Проект ⇄ GitHub) fits at 360 px, dashed return arrows read well, tone colours match the spec meaning (blue you and coordinator, violet threads, amber checks, green main).
- `ChatTranscript`, `PhraseCard`, accordions and `CompareTable` render correctly at 360 px. The wide tables sit inside the design system's horizontally scrollable wrapper (`table-scroll`), as intended.
- Not checked: light theme at 1440 px (same tokens as the checked cases).

## Fixed

Nothing: no defects found.
