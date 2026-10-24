<!--
  Fixes wave brief from the owner (John), 2026-10-24, saved verbatim.
  The agent workflow diagram attached to the brief is saved next to this file as agents-scheme.png.
  Rules G1–G7 and the workflow from this brief are also in docs/spec/00-general.md.
-->

# Next wave: fixes to the docs site

## Context
This is the next wave of fixes to the site you already built. Edit the existing files, don't rebuild from scratch.
I reviewed the site on desktop and mobile. Mobile is fine: every UI change below is desktop-only unless stated. Site content stays in Russian; only this brief is in English.
Target reader: a non-technical person building the "second brain" with Claude Projects. The guide is centred on our project, but someone building something else must also be able to follow it.
The agent workflow diagram (screenshot) is attached to this message.

## Before you start
Save this brief and its rules into your internal files (spec / progress / index.md), so that you and every agent can rely on them later and nothing gets forgotten.

## How to run this

### Agents and speed
- Same scheme as previous waves: Opus builds, Sonnet checks.
- Start right away. In your first reply, just list the split (agent → task IDs). Don't wait for my OK.
- You decide how many agents run in parallel. Speed is the priority. The work is light (text, restructuring, layout), so it must not drag.
- Time budget: waves 3 and 4 together is the absolute maximum. Faster is better, but never at the cost of quality.
- You only orchestrate: split the work, hand out tasks, track progress, report. Don't edit files yourself.
- Each agent gets only the context for its own tasks: its task IDs, the global rules G1–G7 and the exact file paths. Not this whole brief, not the whole repo.
- Give agents non-overlapping files. Shared files (sidebar, global styles, home page) belong to one agent only, to avoid merge conflicts.

### Roles
**Opus 5.5 (High) does all the work:**
- Writes and rewrites text.
- Restructures chapters: blocks, order, organisation.
- Changes the visual layout so the site looks clean and clear.
- Builds new elements (diagrams, buttons, dropdowns).
- No tests: Opus writes none, runs none, and doesn't check buttons. That's Sonnet's job. If the build passes, that's enough.

**Sonnet (High) only checks, and quickly:**
1. **Text:** logic and consistency only. Does it make sense, match the rest of the site and the repo, contain no contradictions, and was nothing needed deleted? Don't follow external links or web-check facts; the sources are already in the project.
2. **New interactive elements only:** a quick check that each one works (e.g. a button toggles there and back, a link opens the right chapter). 1–2 checks per element, no more.
3. **Layout:** a quick look that the chapter looks OK on mobile and desktop.
- No test suites, no writing tests, no repeated builds, no screenshot loops.

### Flow per task
1. Opus works in its own branch, commits, and reports done. Its thread is then closed.
2. Sonnet reviews that branch.
3. If there are issues, they go back to Opus. If not, Sonnet opens a PR, and Opus isn't messaged again.
4. I merge the PRs myself. Agents never merge, and nobody waits for my merge: the other agents keep working in parallel.

Do not touch the "Advanced" chapter.

## Global rules (every chapter)
- **G1 Context first.** Every chapter opens with a short plain-language intro: what this part is, how it works, how it fits into the Project and what problem it solves. Optionally add a small diagram, then the detailed blocks. This is an explanation, not a summary. Example for Sync: context stored on GitHub survives deleting the Project and can be used any time, from any device, by any agent. Check every chapter for this.
- **G2 Tie everything to Projects.** For each feature, say what it does, how it connects to the Project, and how to use it there.
- **G3 Trim off-topic content.**
  - Directly related to Projects or our workflow: normal depth.
  - Indirectly related (generic git, plain Claude Code commands, "laptop pulls the code"): 1–2 lines.
  - Unrelated: remove.
  - Be careful NOT to remove anything that is actually needed.
- **G4 Plain language.** Replace tables and code snippets that need a technical background with plain text or a simple diagram. Technical internals (e.g. SvelteKit) are the agents' job, not the reader's.
- **G5 General plus our project.** Our project is the main worked example, but phrase things so they apply to other projects too.
- **G6 Sources block (all chapters).** Keep the heading and make the text smaller. Use a dimmer colour only if it's trivial.
- **G7 No personal data.** Nowhere on the site should an example suggest putting personal data into the Project, the spec or an agent's context. If any chapter does (check Agent team), remove it and point to Security.

## New content
- **N1 Intro chapter "Введение"** (replaces Roadmap, which is too basic).
  - A large interactive diagram of the whole workflow. Each node links to its chapter; no popups needed.
  - It explains the big picture in plain words:
    - master spec → narrow per-agent specs, and why (narrow context, fewer tokens, fewer mistakes);
    - where files live (Library vs GitHub, e.g. progress files) and why;
    - developer → spec → cloud agent → GitHub → deploy or download.
  - You may reuse fragments of this diagram in individual chapters, expanded (your call).
  - The existing diagram in ch. 2/3 is also unclear: make it consistent with this one or merge it.
- **N2 Library "Overview" card.**
  - One item that combines all parts into a single picture, so anyone opening the Library understands the whole system.
  - Highlight it green ("start here").
  - It can be the same page as N1.
- **N3 Template pack download.** A zip with ready templates: spec structure, index.md, coordinator spec and starter prompt. Strip our project-specific content.
- **N4 Our real example** (used in the chapter "ТЗ и промпты"): our conditions, the attached agent workflow diagram, an example prompt, and how our spec is structured.

## Per chapter

### "ТЗ и промпты" (Spec & prompts)
- Open with the structure: one master spec plus narrow per-agent specs, and why. Add a flowchart showing where the specs go and which are stored on GitHub vs Library, and why.
- Add N4.
- **The "Структура ТЗ" section is confusing.** The reader doesn't need to build a spec structure: they just dictate the functionality. The spec-writing chat builds the structure itself, and we give it ours as an example. Rewrite this section:
  - Say: you just dictate, and the chat structures it.
  - Say: any structure works. Here's ours; it's efficient and saves tokens.
  - Include: the attached diagram, a description of our structure, and the downloadable spec file/zip (N3).
  - Clean the file of project content. Keep the notes explaining where context goes, etc.
  - Keep the agent-workflow rules: 2 agents. Opus builds and its thread is closed. Sonnet tests. Opus is reopened only if there are issues, which saves a lot of tokens.

### Ch. 4: File structure
- The beginning is confusing: folders like src/ appear from our project with no explanation of where they come from.
- Add a plain intro that gives the general picture first and is less bound to our project.
- Keep the folder-by-folder breakdown as is. It's great.

### Ch. 5: Git
- The diagram is nice, but the explanation and the branch description are unclear for a beginner. Rewrite them.
- **Pull request:** explain what it is and when it's used:
  - An agent signals that its branch is ready to be merged.
  - Usually this means the agent is telling the coordinator its assigned feature is done and it wants to merge into main.
- **"Reading history":** add a tiny SVG mock of a GitHub commit row: commit title, short hash on the right, author name below.
- **Split the content:**
  - Basics: commit, branch, PR, regular merge.
  - Collapsible "Advanced" block: squash, reset, rebase, etc.

### Ch. 6: Sync
- The laptop/phone part is completely unclear. Rewrite it or cut it to 1–2 lines (G3).
- Rewrite the diagram explanation in simple terms:
  - I (the developer) write the spec.
  - It goes to an agent running in the cloud.
  - The agent pushes to GitHub, where the code is stored.
  - From there I can deploy it to a server, or download it to my device (if it's frontend code).
- State that files live not only in the Library but also on GitHub (progress files, etc.), and why that matters (G1 example).

### Ch. 7: Agent team
- Remove the confusing split between "agent team", "threads" and "subagents". They are the same idea.
- Simple model: there's a coordinator and agents (each one is a thread with its own context), and they can communicate with each other.
- Remove extra detail (G3) and anything that conflicts with G7.

### Roles
- Replace the weak examples.
- Good example: when creating the spec, ask the spec-writing chat to split it by agents right away (as we do), with the split recorded in the spec itself (index.md, etc.).
- Explain what index.md is.
- Align with our actual file structure: check the repo.

### Models
- Remove Haiku everywhere.
- Add reasoning effort:
  - Coordinator: Opus, Max or Extra High.
  - Coders: Opus, High or Extra High.
  - Fact checking, minor tasks, frontend: Sonnet, High.
  - Bug testing: Opus, High.

### Tests
- Randomness test, focus timers and the daylight-saving clock change: explain each in a couple of plain sentences for non-technical readers. No code.
- Add a short example prompt for each. Mark the prompts as optional, since the spec normally covers this.

### Review feature
- Add an example text/prompt, in the same style as Tests.

### Data model / Architecture: full rework
- It's currently incomprehensible. A non-technical reader doesn't know what a "model" or "module" is, and the code snippets aren't clear even to a developer at first glance.
- Start with a plain explanation or diagram of what these terms mean.
- Describe our current architecture: which folder is where and what it's for, where the specs live, where the skills are, etc.
- Optionally add other architecture examples, each with a prompt.
- Put the details of the app's own architecture in a dropdown, or in a small sub-section plus a dropdown. Your call.

### Deploy
- Make it much simpler and shorter.
- Remove: SvelteKit details, PWA, Capacitor, Google Play, signing, everything about Android. No mobile app is planned.
- Remove the comparison table.
- Explain the options in plain words:
  - Static site only → GitHub Pages.
  - Need a database → GitHub Pages isn't enough because it's frontend only. Use e.g. Cloudflare Workers.
  - Or a local frontend on your device that talks to a backend on Cloudflare.

### Security
Keep the chapter. Add a red callout:
- Run Claude under a separate non-admin user account (macOS / Windows / Linux).
- Unwanted packages could end up in the project. The risk is low (Claude is restricted from installing untrusted modules), but prompt injection exists. Links could be swapped too; the risk is very low.
- **Most important:** personal data must never be stored in the project.
  - Why: if an agent ever runs a malicious script (e.g. after a prompt injection), anything inside the project can leak.
  - Sample data for building is fine, but the project and backend stay separate from your data.
  - A fresh download is empty, and you load your own data yourself.
- Even so, review the backend code:
  - Use several agents in separate chats, each reviewing a different part.
  - Check the backend thoroughly and the frontend too: no unneeded modules, no unexplained requests, no leaks.

### "Твой промпт"
- Rename it "Промпт для старта".
- Highlight it green in the sidebar and add an icon, so readers know it's the final, must-read chapter.

### "От репозитория до фичи"
- Rename it "Как начать" (no highlight).
- **Content:**
  - The spec arrives already split. The agent that wrote the spec splits it into folders and hands over a zip, because a separate splitter thread wouldn't have the full context.
  - Unzip it and add it as a FOLDER. Never upload the zip itself.
  - When creating the Project, add the folder to its context. If the upload fails, add the folder via the Library.
  - Result: the coordinator starts with everything already split, all files present and the structure described in the spec, so it can start right away.

## UI (desktop only; mobile stays unchanged)
- **Left sidebar:** remove chapter expand/collapse. Just a flat list of chapters.
- **Right TOC:** make headings and subheadings visually distinct (indent, size/weight).
- **Top bar:** keep the bar but remove the chapter selector from it.

## Home page
- **Two buttons at the top:**
  - Primary: "start building your second brain" (→ step 1).
  - Secondary: the general knowledge library (Projects, tools, everything else). Pick a clear label.
  - These two buttons replace the "choose your path / beginner" idea.
- **Blocks:**
  1. The second-brain build guide (as now).
  2. The knowledge library guide.
  - The final chapter ("Промпт для старта") is highlighted green.

## Materials
- Agent workflow diagram: attached to this message. It's only an illustration for the site (N4). If it differs from your files, your files win.
- Spec structure, index.md, coordinator spec: take them from your own files (the ones you work from), cleaned of project content.
- If something is still unclear, ask me. Don't invent it.

## Done when
- Every task has a PR that Sonnet has reviewed and that is waiting for my merge.
- Your internal files are updated with this wave's rules.
- You send a short final report: what changed per chapter, and anything skipped or needing my decision. No long changelog.
