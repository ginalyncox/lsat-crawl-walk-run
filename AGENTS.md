# AGENTS.md — LSAT Crawl • Walk • Run

This repository is an LSAT study system designed specifically around ADHD-PI and aphantasia-friendly learning. Treat it as a learning tool, not just a generic web app.

## Product intent

The core learning progression is:

**CRAWL → WALK → RUN**

- **CRAWL** = understand the reasoning job, work untimed or loosely timed, externalize the logic, explain why choices are right/wrong.
- **WALK** = make the reasoning repeatable in small timed sets, identify recurring trap patterns, separate reasoning mistakes from timing/attention mistakes.
- **RUN** = perform under realistic LSAT timing and fatigue, flag/return, blind-review uncertainty, and analyze misses after the section.

The core LR framework is:

**JOB → GIVEN → TARGET → GAP**

- **JOB** — What am I being asked to do?
- **GIVEN** — What did the stimulus actually establish?
- **TARGET** — What must the correct answer accomplish?
- **GAP** — Where is the reasoning vulnerable or incomplete?

Two recurring reset prompts should remain prominent throughout the product:

- **What is my job RIGHT NOW?**
- **Where does it say that?**

A third product principle is:

**Interesting ≠ Relevant.**

This is especially important in LR. The tool should help a user notice interesting implications without letting those implications replace the actual question job.

## Learner profile and design constraints

This project was conceived for a learner with ADHD-PI and aphantasia. Design accordingly.

### ADHD-PI

- Reduce startup friction.
- Prefer small, concrete tasks over vague tasks like “study LSAT.”
- One question can count as a study session.
- Avoid interfaces that require holding many intermediate steps in working memory.
- Keep the next action visually obvious.
- Support interruption and resumption.
- Preserve drafts locally where practical.
- Avoid punitive streaks or guilt-oriented progress mechanics.

### Aphantasia

- Do not rely on mental visualization as a teaching method.
- Externalize relationships using words, labels, arrows, roles, and short structured notes.
- RC should focus on paragraph function, viewpoint, relationships, transitions, and purpose rather than “picture the passage.”
- Conditional reasoning should prioritize plain-language meaning before symbolic shorthand.

## Pedagogical rules

1. **Accuracy before speed.** Speed is layered on only after reasoning becomes repeatable.
2. **Externalize the reasoning.** Put it on the page instead of asking the learner to hold it mentally.
3. **One cognitive job at a time.** Avoid overly dense screens or multi-step ambiguity.
4. **Proof over preference.** The learner is not choosing the answer they like; they are choosing the answer they can prove.
5. **Mistakes become rules.** Error review should produce a reusable next-time rule, not a judgment about ability.
6. **Do not turn every LSAT concept into abstract notation.** Meaning comes first.
7. **Do not silently introduce unsupported LSAT doctrine.** If adding substantive LSAT guidance, prefer LSAC primary sources and clearly distinguish product heuristics from official test rules.
8. **Do not copy copyrighted prep-book text.** Concepts can be taught in original language. Do not reproduce proprietary passages, drills, or explanations from commercial LSAT books.

## Current MVP architecture

The first version is intentionally dependency-free:

- `index.html` — UI structure
- `styles.css` — responsive, accessible, low-clutter styling + print styles
- `app.js` — interactive logic, localStorage drafts, phase switching, trap trainer, question-job decoder, RC mapper, writing planner, error log
- `README.md` — product overview and roadmap

Do not introduce a framework merely for fashion. Move to React/Vue/etc. only if a concrete feature need justifies it.

## Current MVP features

- Crawl / Walk / Run phase selector
- Minimum viable one-question session
- LR Argument Autopsy worksheet using JOB → GIVEN → TARGET → GAP
- LR question-type / job decoder
- Wrong-answer trap trainer
- “Interesting ≠ Relevant” reset
- Aphantasia-friendly RC verbal passage mapping
- Argumentative Writing preflight using ISSUE → CLAIM → SUPPORT → OBJECTION → REPLY
- Mistake Detective / error log
- Browser-local autosave for working notes
- Responsive and keyboard-friendly layout
- Print stylesheet

## Planned study aids

These are high-value next candidates. Prefer building them in small, reviewable slices.

### 1. LR Question-Type Decision Mat
A one-page decision aid that maps question stems to the correct JOB and checkpoint question.

### 2. Wrong-Answer Trap Deck
Cards for patterns such as:
- true but irrelevant
- too strong
- outside scope
- wrong target
- reversal
- premise restatement
- correlation/causation errors
- necessary/sufficient confusion
- unsupported comparison
- answer-choice language that outruns the stimulus

Each trap should include:
- what it looks like
- why it is tempting
- one diagnostic question
- a short original example

### 3. Argument Autopsy Worksheet
Reusable structure:
- JOB
- GIVEN
- CONCLUSION
- GAP
- TARGET
- A–E elimination notes
- why the credited answer works
- next-time rule

### 4. LR Translation Dictionary
Plain-language translations for recurring logic language, including:
- unless
- only if
- if
- except
- some
- most
- all
- not all
- required
- sufficient
- necessary
- presupposes

Prefer natural-language meaning first; symbols second.

### 5. RC Passage Map
Use function labels such as:
- BACKGROUND
- OLD VIEW
- PROBLEM
- NEW VIEW
- EVIDENCE
- OBJECTION
- AUTHOR RESPONSE

Core RC prompts:
- What is this paragraph doing?
- Whose view is this?
- Why did the author include it?
- What changed at the transition?
- The author is mainly doing ___ because ___.

### 6. RC Viewpoint Tracker
Track:
- AUTHOR
- THEORY / SCHOLAR A
- THEORY / SCHOLAR B
- AGREES
- DISAGREES
- WHY

### 7. Conditional Logic Tiles
Printable or interactive tiles for:
- IF
- THEN
- NOT
- ONLY IF
- UNLESS
- SOME
- MOST
- ALL

The goal is physical/external manipulation of relationships, not memorization of symbols.

### 8. Writing Preflight Sheet
15-minute planning structure:
- ISSUE
- MY POSITION
- REASON 1
- REASON 2
- STRONGEST OPPOSITION
- WHAT THEY GET RIGHT
- WHY I STILL WIN
- ESSAY ORDER

Useful argumentative move:

“Perspective B is right that X. However, X does not establish Y because …”

### 9. Mistake Detective Log
Fields should include:
- What fooled me?
- Why was it attractive?
- What did I overlook?
- Was this reasoning, timing, reading, attention, or question-job identification?
- What will I do next time?

### 10. Crawl / Walk / Run Progress Board
Track skills by stage rather than only raw score:
- Learning
- Can do untimed
- Can do timed
- Automatic

Avoid gamification that punishes breaks.

## LSAT teaching scaffolds already established

### Logical Reasoning
Primary scaffold:

**JOB → GIVEN → TARGET → GAP**

Useful reminders:

- “Patterns help you NOTICE. The argument tells you what to ANSWER.”
- “STOP at the period.”
- “Where does it say that?”
- “Correct is not mastered until you can explain why.”

For blind review:

1. Record timed answer.
2. Re-do flagged/uncertain questions untimed before checking the key.
3. Record changes.
4. Check the credited answer.
5. Classify the miss.
6. Write one correction / next-time rule.

### Reading Comprehension
Aphantasia-friendly verbal map:

**BACKGROUND → OLD VIEW → PROBLEM → NEW VIEW → EVIDENCE**

Use paragraph-role labels rather than asking the user to form mental scenes.

### Argumentative Writing
Primary scaffold:

**ISSUE → CLAIM → SUPPORT → OBJECTION → REPLY**

Recommended essay skeleton:
- intro + thesis
- reason 1
- reason 2
- counterargument
- reply
- conclusion

No outside research is expected during the LSAT writing task; work from the supplied perspectives and the writer’s reasoning.

## UX requirements

- Low visual clutter.
- Strong headings and obvious hierarchy.
- Generous tap targets on mobile.
- Keyboard accessible.
- High contrast.
- Avoid tiny text.
- Prefer one primary action per panel.
- Avoid modal-heavy workflows.
- Autosave where losing work would be frustrating.
- Print-friendly layouts are valuable because this study system is also meant to support physical study cards, worksheets, and cut-apart aids.

## Data / privacy philosophy

Current MVP uses browser `localStorage` only. Do not add cloud accounts, tracking, analytics, or third-party telemetry without explicit product approval.

Do not add Google Analytics by default.

If future sync/export is added, make data ownership obvious and support simple export formats.

## Development workflow

- Work on a feature branch.
- Open a PR into `main`.
- Keep changes reviewable and scoped.
- Inspect diffs before merging.
- Preserve the pedagogical intent when refactoring.
- If a refactor makes the UI technically cleaner but cognitively harder to use, reject the refactor.

## Cursor handoff priority

When Cursor picks up this repository, first read:

1. `AGENTS.md`
2. `docs/HANDOFF.md`
3. `README.md`
4. `index.html`
5. `app.js`
6. `styles.css`

The product goal is not “build a prettier flashcard app.” The goal is to build a study environment that reduces working-memory burden and trains the learner to identify the exact reasoning job, stay inside the evidence, and convert mistakes into reusable rules.
