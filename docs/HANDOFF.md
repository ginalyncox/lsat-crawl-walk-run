# Cursor Handoff — LSAT Crawl • Walk • Run

## Why this project exists

This project turns an LSAT study method into a usable study environment for a learner who benefits from explicit external structure, low working-memory load, and non-visual reasoning aids.

The product should feel like a calm reasoning workbench, not a noisy gamified test-prep dashboard.

Primary design target:

- ADHD-PI friendly
- aphantasia friendly
- low cognitive load
- printable where useful
- mobile usable
- easy to resume after interruption
- centered on reasoning quality before speed

## Product thesis

The LSAT becomes more manageable when the user is trained to repeatedly answer:

1. **What is my job?**
2. **What did they actually give me?**
3. **What must the answer do?**
4. **Where is the gap?**

That becomes:

**JOB → GIVEN → TARGET → GAP**

The app should reinforce that framework until it becomes automatic.

A second recurring correction is:

**Interesting ≠ Relevant.**

The learner can notice sophisticated implications and still miss the LSAT’s narrower task. The app should help redirect attention without suppressing curiosity.

## Current branch / PR context

Current implementation work is on:

`feat/initial-study-app`

The first PR introduces the dependency-free MVP. Continue using feature branches and PRs. Do not make unrelated direct changes to `main`.

## Current file map

### `index.html`
Contains the semantic structure and major study panels:

- phase selector
- minimum viable study session
- LR Argument Autopsy
- LR question-job decoder
- wrong-answer trap trainer
- RC verbal passage mapper
- writing preflight
- Mistake Detective
- error log

### `styles.css`
Contains:

- low-clutter visual system
- responsive mobile layout
- accessible focus indicators
- high-contrast controls
- print styles

### `app.js`
Contains:

- Crawl / Walk / Run state
- question-type teaching content
- trap teaching content
- localStorage autosave
- RC paragraph controls
- writing planner generation
- error-log persistence
- simple toast feedback

### `AGENTS.md`
Contains the product’s durable agent rules, pedagogical constraints, roadmap, and UX philosophy.

### `README.md`
Public-facing overview and current feature summary.

## What NOT to do

- Do not convert this into a generic flashcard app.
- Do not make speed the primary measure of progress.
- Do not require mental visualization.
- Do not bury the user under dense analytics.
- Do not add celebratory streaks that punish missed days.
- Do not add telemetry or analytics by default.
- Do not copy commercial LSAT prep-book content.
- Do not invent official LSAT rules when product heuristics will do.
- Do not use proprietary LSAT questions unless licensing clearly permits it.
- Do not replace plain-language logic explanations with symbol-heavy notation unless the symbols add real clarity.

## Current teaching system

### Logical Reasoning

Core scaffold:

**JOB → GIVEN → TARGET → GAP**

Interpretation:

- JOB = identify the question task
- GIVEN = separate text from assumptions
- TARGET = predict the function of the correct answer
- GAP = locate the reasoning vulnerability or missing bridge

Reset phrases:

- What is my job RIGHT NOW?
- Where does it say that?
- STOP at the period.
- Patterns help you NOTICE. The argument tells you what to ANSWER.
- I am not choosing the answer I like. I am choosing the answer I can prove.

### Reading Comprehension

Do not ask the user to “picture” the passage.

Use verbal/function mapping:

- BACKGROUND
- OLD VIEW
- PROBLEM
- NEW VIEW
- EVIDENCE
- OBJECTION
- RESPONSE

Core prompts:

- What is this paragraph doing?
- Whose view is this?
- Why is it here?
- What changed at this transition?
- What is the author mainly doing and why?

### Argumentative Writing

Use:

**ISSUE → CLAIM → SUPPORT → OBJECTION → REPLY**

A useful pattern:

“Perspective B is right that X. However, X does not establish Y because …”

The product should help the user plan rather than write for them unless a separate explicit mode is intentionally added.

## ADHD-PI design rules

### Starting
A task should be concrete and small enough to begin immediately.

Good:
- Do one LR question.
- Review one miss.
- Map one RC passage.

Bad:
- Study LSAT.
- Improve logical reasoning.

### Working memory
Any process with more than a few steps should be visible on screen.

Do not require the learner to remember what they were doing after scrolling or switching panels.

### Resuming
Store drafts locally where safe and useful.

Future idea: add explicit “Resume last session” state.

### Attention drift
Future interface opportunity:

Allow the user to mark exactly where they stopped and return there later.

## Aphantasia design rules

- Prefer words, arrows, labels, and relationships.
- Use paragraph roles and viewpoint labels.
- Explain logic relationships verbally first.
- Avoid diagrams whose meaning depends on imagining motion or space.
- If visual elements are used, they must function as external notation rather than requests for internal imagery.

## High-value roadmap

### Phase A — strengthen current MVP

1. Add dedicated Conclusion field to Argument Autopsy.
2. Add A–E elimination notes.
3. Add “credited answer / why it works” field.
4. Add miss classification:
   - reasoning
   - reading
   - attention
   - timing
   - question-job identification
5. Add export/import for error log and study data.
6. Make RC paragraph-role inputs persist.
7. Persist paragraph count.
8. Add explicit save-state indicator.

### Phase B — study aids

1. LR Question-Type Decision Mat.
2. Wrong-Answer Trap Deck.
3. LR Translation Dictionary.
4. RC Viewpoint Tracker.
5. Conditional Logic Tiles.
6. Writing Preflight printable sheet.
7. Crawl / Walk / Run Progress Board.
8. Print-friendly study-card generator.

### Phase C — practice workflow

1. One-question session mode. ✅
2. Five-question mini-set mode. ✅
3. Untimed → timed comparison. ✅
4. Blind-review workflow. ✅
5. “Flag and return” queue. ✅
6. Miss review queue. ✅
7. Session summary based on reasoning patterns, not just score. ✅ (basic miss-pattern summary; richer analytics still optional)

### Phase C+ — miss-pattern analytics

1. Miss Pattern Board aggregating error log + practice queues. ✅
2. Primary focus recommendation with a concrete next drill. ✅
3. Source filter (all / error log / practice). ✅
4. Printable pattern board. ✅

### Phase D — optional richer architecture

Only consider a framework or backend when concrete needs appear, such as:

- many study-aid modules
- test-set state management
- sync across devices
- user accounts
- large structured content library
- richer analytics

Until then, the static app is a feature, not a limitation.

## Suggested data model direction

If the app grows, centralize study content instead of scattering strings in DOM code.

Possible structure:

```js
const questionTypes = [
  {
    id: 'weaken',
    name: 'Weaken',
    job: 'Make the conclusion less likely.',
    checkpoint: 'What weakens the evidence → conclusion link?',
    commonTraps: ['wrong-target', 'irrelevant'],
  },
]
```

Likewise for:

- traps
- translation terms
- RC roles
- writing prompts
- progress skills

This will make printable cards and interactive modules share the same source data.

## Printable-first opportunities

The user wants physical study aids they can print and cut. Treat printable output as a first-class product surface.

Potential outputs:

- 6-up large study cards
- cut-apart trap cards
- Argument Autopsy sheets
- LR decision mat
- RC role tracker
- conditional logic tiles
- Writing Preflight sheet
- one-page test-day reset card

Avoid tiny text. Favor large cards and generous spacing.

## Accessibility

Maintain or improve:

- semantic HTML
- keyboard access
- visible focus rings
- large tap targets
- readable type size
- strong contrast
- mobile layout
- print usability

Do not use color as the sole carrier of meaning.

## Content integrity

This app should use original explanations and user-created frameworks.

If introducing current LSAT format facts or official rules, verify them against LSAC primary sources before encoding them as factual product content.

Do not add copyrighted commercial prep content from books or courses.

## Product voice

Keep copy:

- direct
- compact
- calm
- non-patronizing
- encouraging without hype

Avoid “You failed,” “bad score,” or shame-based copy.

Preferred framing:

- “What fooled me?”
- “What did I overlook?”
- “What rule will prevent this next time?”

## Development priorities when taking over

If there is no newer task from Gina, work in this order:

1. Read current open PR and diff.
2. Preserve the current conceptual framework.
3. Fix correctness/accessibility bugs before adding polish.
4. Build the Argument Autopsy into a fuller reusable worksheet.
5. Build the printable Wrong-Answer Trap Deck.
6. Build the LR Question-Type Decision Mat.
7. Add export/import of local study data.
8. Add a simple progress board based on skill stage, not streaks.

## Definition of success

The product is successful if the user can open it during LSAT practice and immediately know:

- what task to do next
- what the question is asking
- what evidence is actually present
- what kind of answer is needed
- what reasoning mistake happened after a miss
- what to do differently next time

The app should reduce executive-function overhead so that more cognitive energy is spent on reasoning itself.
