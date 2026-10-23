# Review: part 05, chapters 03, 04 and 15 (PR #8)

Reviewed on 2026-10-23 against `docs/spec/00-general.md`, `docs/parts/05-specs-files-prompt.notes.md` and the PR diff.
Two checks: fact-check and frontend skim. One small code fix (below). Main was merged into the branch first (only `docs/PROGRESS.md` conflicted).

## Result

- Facts: the writer's key claim holds. No wrong fact found.
- Frontend: no horizontal page scroll at 360 px or 1440 px, dark and light, on all three chapters. `RepoTree` rows, badges and the expanded detail panel read well on both widths.
- `npm run build` → `Pagefind: indexed 28 pages`; `npm run check` → `COMPLETED 283 FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS`.

## Fact-check

- **Cloud threads don't load repo skills, subagents, `settings.json` or `.mcp.json`: confirmed.** `code.claude.com/docs/en/claude-projects`, section "What threads pick up from your repositories":
  `CLAUDE.md`, `.claude/CLAUDE.md` and `.claude/rules/` at the root load; skills under `.claude/skills/` "Not loaded"; agents and commands "Not loaded";
  `.mcp.json` "Not loaded"; permission rules and hooks in `.claude/settings.json` not applied or run; plugins and `env` from `settings.json` also not applied.
  Skills come from the claude.ai account, MCP from account connectors, and Remote Control threads use what is installed on the computer.
  Chapter 04 matches this, including the callout and the "always loaded" table. Open question 1 in the notes (part file said otherwise) is settled in the chapter's favour.
- **Projects page:** public beta on Pro and Max, 16,000 characters of project instructions, Project settings → Memory → Project instructions, `MEMORY.md` index read by every cloud thread, Opus with high effort for threads and low for the conversation: all match.
- **`/memory` page:** `./CLAUDE.md` or `./.claude/CLAUDE.md`, `CLAUDE.local.md`, target under 200 lines, four-hop imports, `/init`, and `AGENTS.md` read only when no `CLAUDE.md` exists: all match.
- **Support pages:** effort menu (model name next to send → Effort → Low, Medium, High, Extra high, Max) and dictation (microphone icon, Russian listed, non-English in beta): match chapters 03 and 15.
- The remaining rows (best-practices quotes, arXiv 2505.06120, OpenAI and Anthropic engineering posts, GitHub repo creation) were not reopened; their locators in the notes look consistent with the text.

## Fixed

- **Auto-import bug (notes, open question 4).** `autoImport` in `config/markdown.js` looked for an existing `import … Name … from` in the whole file, so prose such as `type="important"` … `<Name` … `from="you"` suppressed the import. It now looks only inside `<script>` blocks. The small fix was safe, so I made it and removed the hand-written import from chapter 03. Chapters 03, 04 and 15 build with the auto-imports. Part 10 needs no follow-up.

## Left for later

- Part 09 (`a3-claude-code-advanced`) should align with the cloud-thread table in chapter 04.
- Open questions 2, 3, 5 and 6 in the notes are wording choices the writer made from missing sources. I agree with them and changed nothing.
