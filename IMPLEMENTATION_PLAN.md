# AI Homework Assistant prototype — implementation plan

## Scope and source of truth

This is a standalone, frontend-only UX/UI prototype. File analysis, tutoring, chat, answers, progress, and rewards use local fixtures and local state. It will not call an AI service, LMS, backend, database, authentication system, or payment system. The functional specification in [`junior_ai_yordamchi_full_user_story_logic.md`](junior_ai_yordamchi_full_user_story_logic.md) takes precedence over ambiguous details in the screenshots. This plan identifies decisions that the specification itself leaves open; it does not assign production business rules.

## Existing project architecture

- The repository root contains one 1,075-line functional specification and `design/` with seven UI screenshots plus one SVG flowchart and its PNG preview. The specification is at the root, not under `design/` as the task wording suggests.
- There is **no application code or scaffold**: no `package.json`, lockfile, framework configuration, HTML entry point, source directory, test setup, or Git repository in this workspace. The current framework, dependencies, and runtime entry point are therefore **none**.
- Recommended new standalone stack: Vite + React + TypeScript with CSS variables and component styles. Use a small route/flow controller and typed fixtures; add a routing library only if URL-based deep links become necessary. No dependency versions are fixed in this planning pass.
- Keep all supplied references. They are full-page raster screenshots, not a component library or separately supplied logo/mascot/worksheet assets. The SVG embeds the screenshots and is useful as a flow reference. Reuse existing artwork where a clean crop is appropriate, while building text, controls, feedback, and responsive layouts as real UI. Check crop quality and rights/availability of original artwork before relying on screenshot crops.

## Design reference inventory

| Reference in `design/` | Journey screen | Main design cues and actions |
| --- | --- | --- |
| `Дашборд Junior IT Academy с AI-помощником.png` | 0 — course entry | Junior navbar, course/progress cards, orange lesson CTA, AI assistant banner with Beta badge and chevron. Banner opens assistant. |
| `AI yordamchi_ Uyga vazifada yordam.png` | 1 — upload | Hero and robot, four explanatory cards, file picker/drop zone, image-quality tip, sample tasks, recent tasks, “Qanday yordam beradi?” sidebar. |
| `Интерфейс Junior Academy с ИИ-помощником.png` | 2 — analysis | Upload success, file preview/zoom/replace, grade/topic/confidence, “Mavzuni ko'rish”, detected task rows and “Boshlash”, progress and contextual question form. |
| `Интерактивный мини-урок по сложению.png` | 3 — mini lesson | Four lesson tabs, addition/subtraction illustrations, reminder cards, previous/next controls and section progress. |
| `AI bilan misollarni yechish darsi.png` | 4 — guided examples | Three tabs, example paging, three explained steps, visual answer, “Boshqa usulda”, “Keyingi misol”, task list. |
| `Uzbek matematikasi_ interaktiv yechim darsi.png` | 5 — independent practice | Numbered task navigation, input and on-screen keypad, save for later, hint, steps, check/submit, task status list. |
| `Успешное решение_ награды и прогресс.png` | 6 — success/result | Congratulations, result explanation and apples, example reward cards, daily results, upload/similar/topic next actions. |
| `junior_ai_yordamchi_user_flow.svg` and `_preview.png` | Overall flow | Seven ordered screens, success path and return choices; the SVG and PNG depict the same flow. The SVG is not a separate app screen. |

Across assistant screens, preserve the top navbar and the upper-left **“Ortga”** link. Use no extra left sidebar. The stepper reads **1. Yuklash → 2. Tahlil → 3. Mini dars → 4. Yechish**; guided and independent practice share the fourth top-level phase. On narrow screens, stack the main content and right rail in reading order without hiding controls.

## Screen and transition inventory

| From → to | Trigger | State/feedback that must be represented |
| --- | --- | --- |
| 0 → 1 | AI banner click | Assistant starts; navbar remains and back returns to course mock. |
| 1 → 2 | Choose/drop supported file or select a sample task | Selected → simulated upload/loading → uploaded → simulated analysis/loading. Invalid type, oversize, unreadable/corrupt file, and simulated upload failure stay recoverable on screen 1. |
| 2 → 1/2 | Replace/add image, retry analysis | Show the actual selected image or PDF metadata/preview; reset or clarify analysis as appropriate. Low-confidence, no-task, unreadable, and simulated processing-failure variants must be explicit. |
| 2 → 3 | “Mavzuni ko'rish” after a usable result/confirmation | Open the lesson matching the chosen fixture's grade/topic. Preserve file and task list. |
| 2 → 4 or 5 | “Boshlash” on a task | Select that task. The exact lesson-skip policy is unresolved; prototype navigation must expose the lesson path clearly. |
| 3 ↔ 3 | Tabs, “Oldingi”, “Keyingi” | Track lesson subsection, show accurate subsection progress, preserve place on return. |
| 3 → 4 | “Misollar bilan ko'rish” / lesson next | Open guided examples for the current topic. |
| 4 ↔ 4 | Example arrows, “Keyingi misol”, “Boshqa usulda”, tabs | Change the example or explanation variant, update displayed index/status; no answer credit is earned by viewing. |
| 4 → 5 | “Mustaqil yechish” | Open a practice task with its own draft and attempts. |
| 5 ↔ 5 | Task numbers, save for later, hint, steps, keypad, chat | Preserve draft and per-task status; hint shows guidance before the full explanation. Empty/invalid answers show actionable errors. |
| 5 → 5 | Submit an incorrect answer | Kind feedback and explanation/hint, then retry or move to another task. Avoid double submits. |
| 5 → 6 | Submit a correct answer | Show that answer's explanation, updated task status and **simulated** progress/reward presentation. Define result-screen timing before implementation. |
| 6 → 1/4/3 or topic picker | Upload new task / similar exercises / another topic | New upload gets a new local session; similar exercises use the current topic fixture; topic picker retains the current session for return. |
| Any assistant screen → previous context | “Ortga” | Return to the previous in-flow screen with input intact, or from entry screen to course mock. Preserve a simple navigation history. |

The references do not depict dedicated error, low-confidence confirmation, incorrect-answer, empty-history, or topic-picker screens. These should be designed as coherent card/inline/modal states using the same visual language, then reviewed against the spec.

## Component breakdown

- **App shell:** Junior navbar, mock course entry, assistant page frame, “Ortga”, four-stage stepper, responsive content/right rail grid.
- **Common UI:** buttons, cards, status badges, progress ring/bar, alert/empty/loading states, modal, toast or inline feedback, robot illustration placement, contextual help card.
- **Upload:** drop zone plus hidden file input, sample-task cards, optional recent-session list, file validation and preview (image or PDF), replace/add action.
- **Analysis:** upload summary, file viewer/zoom, analysis result/confidence/confirmation, detected task list and task actions.
- **Learning:** mini-lesson tabs, illustrated math examples, reminder cards, guided example step list, alternate method, example pager.
- **Practice:** task navigator, math input and optional on-screen keypad, draft/save, hint and step reveal, submit validation, correct/incorrect feedback.
- **Result:** answer explanation, simulated reward and progress cards, summary, three next-action cards.
- **Mock help:** contextual question form with scripted responses, loading/error/retry states. It never changes task correctness by itself.

## Frontend state model

Use one typed `HomeworkSession` per local attempt: `id`, `source` (`sample` or `user-file`), selected `File` metadata/object URL, `fileStatus` (`selected`, `uploading`, `uploaded`, `upload_failed`, `processing`, `processed`, `needs_clarification`, `processing_failed`), `analysis` (subject, grade, topic, confidence label/value, task IDs, uncertainty reason), `phase` (upload, analysis, mini lesson, guided, independent, result), lesson subsection, guided example index/method, selected task ID, and navigation history.

Each `Task` has fixture expression/prompt, accepted answers/check rule, explanation/visual data, `status` (`not_started`, `ready`, `in_progress`, `answered`, `correct`, `incorrect`, `skipped`, `needs_help`, `completed`), draft, attempts, hint/steps disclosure, and result timestamp. Derive displayed progress from the chosen completion rule rather than keeping a separately mutable percentage. Track simulated reward events by unique session/task/result key to prevent duplicate display on repeat clicks or back navigation. Distinguish *viewing a guided solution* from *solving independently*.

Use local component/reducer state for the live flow. Session storage or local storage can restore serializable progress for refresh demonstrations; browser `File` objects/object URLs require a separate reselect path after refresh. Recent uploads and daily statistics should be clearly labeled demo data if shown. No real persistence or account balance is implied.

## Mock data and interaction requirements

- Prepare at least one internally consistent grade-1 arithmetic fixture with four independent tasks, lesson content, at least two guided examples, accepted numeric answers, hints, alternative methods, step explanations, and visual item counts that match each equation. The pictured worksheet is a reference; only claim its tasks were detected when the corresponding sample is selected.
- Provide scenario fixtures for successful analysis, low confidence, no detected tasks, unreadable file, and processing/upload failure. Expose these through a small demo control or sample cards so every state can be reviewed without a backend.
- For an arbitrary user-chosen file, show its real filename/type/size and real image/PDF preview where supported. Mark the analysis as **simulated demo content**; do not imply the file was actually parsed. Decide whether to attach a generic fixture or require a demo-scenario selection before implementation.
- Script context-aware help responses for the selected lesson/task plus an out-of-scope fallback; include loading, empty-message validation and retry behavior. Avoid representing the chat as a real AI conversation.
- Keep header balances, coin/XP cards, timings, recent activity and daily totals as clearly simulated values. Do not model production rewards or payment. Any mock reward increment must follow one documented demo rule and remain idempotent within a session.
- Every visible control must have a defined local action, including sample downloads/opening, recent-task cards, header controls, side-list links, stepper tabs, zoom, “Boshqa usulda”, keypad, and next actions. If a real LMS destination cannot be reproduced, use a labeled mock view or explanatory modal instead of an inert button.

## Missing decisions, contradictions, and risks

1. **Upload limits:** accepted MIME/extensions are PDF/PNG/JPG, but maximum bytes, PDF page count, and corrupt-file definition are unspecified. Display any chosen prototype limit as a demo assumption, not an approved product rule.
2. **Analysis confidence:** no threshold or confirmation UX is approved; task-text editing, multiple images versus replacement, and topic-correction behavior are also open.
3. **Subject/grade scope:** the course screenshot shows grade 4, while the analysis, lesson and exercises show grade 1. Establish a single consistent demo context or visibly explain the mismatch.
4. **Exercise counts/progress:** analysis groups three worksheet tasks; later screens show four examples and a ten-number navigator, with `25% / 1/4` already displayed. Clarify what is counted as an exercise versus a worksheet group and when progress begins.
5. **Learning policy:** the guided example shows `2 + 3 = 5`, and independent practice asks `2 + 3 = ?`; this conflicts with the goal of trying independently. Use different guided and assessed problems unless explicitly approved. The practice mock also labels “Qadam-baqadam yechim” as hiding the answer, while the spec permits fuller explanation.
6. **Completion/reward timing:** the success screenshot appears after one correct answer, while the flow also says a final result follows completed work. The analysis/lesson/practice sidebars show `+33 coin` before a visible correct result; the final screen separately shows `+10 coin` and `+5 XP`. These are sample values, not production rules. Decide whether screen 6 is a per-question success or whole-session completion view and how later tasks continue.
7. **Status semantics:** `correct` and `completed`, `answered` and `incorrect`, and `ready` versus `not_started` need precise transitions; hint/steps use must not imply completion. Retry limits, multiple accepted forms, and whether assistance changes rewards remain unspecified.
8. **Navigation:** screen 2 has a direct task “Boshlash” while the journey puts mini lesson first. Define whether the lesson can be skipped. “Ortga” is described both as return to the LMS entry page and as an in-flow previous step; use navigation history in the prototype pending product confirmation. Some screenshots say “Orqaga”; the written spec explicitly says “Ortga”.
9. **Content sourcing:** topic lessons and similar exercises may be generated or curated in production; only reviewed local fixtures are safe for this prototype. “Boshqa mavzu” needs a topic-selection design that is absent from the references.
10. **Refresh/history:** the spec asks for progress preservation where possible, but gives no retention rule. Local browser storage cannot restore arbitrary uploaded file bytes without additional handling; show a reselect prompt after refresh.
11. **Visual assets:** screenshots contain branding and mascot artwork, but separate source assets are missing. Cropping can be brittle on responsive layouts; request original logo/mascot/worksheet artwork if available. Several screenshot details look illustrative (including the virtual keypad's duplicate `9`) and need working UI rather than pixel copying.
12. **Standalone navbar:** schedule, coin history, notifications, and profile refer to existing LMS behavior, which is outside scope. Define their prototype destinations as local mocks so they remain meaningful without claiming integration.

## Recommended implementation sequence

1. Confirm the open UX/business choices that affect route and data semantics: demo grade/topic, exercise count, lesson skip, upload/demo-analysis behavior, result timing, and mock reward presentation. Write the chosen *prototype assumptions* next to fixtures.
2. Scaffold the standalone React/TypeScript app and set design tokens, responsive shell, navbar, “Ortga”, stepper, and screen 0 course entry. Keep the design references untouched.
3. Build typed fixtures/state controller and the upload/analysis screens, including actual file preview, validation, loading, low-confidence and recovery states.
4. Implement the mini lesson and guided examples with mathematically checked content and distinct assessed exercises.
5. Implement independent practice, per-task draft/status, validation, hint/steps, correct/incorrect feedback, and refresh recovery.
6. Implement result and next actions, scripted help, all remaining visible controls, and coherent error/empty states.
7. Verify the complete journey and each branch at desktop and small widths, keyboard and pointer input, then review visual fidelity against each screenshot.

## Acceptance checklist for the eventual prototype

- [ ] All seven reference screens are represented and connected in the expected journey; no sidebar is added.
- [ ] Navbar, “Ortga”, four-stage stepper and Uzbek Latin copy stay consistent on every assistant screen.
- [ ] File picker and drag/drop accept PDF/PNG/JPG; show true selected-file metadata/preview, progress, errors, and retry/replace paths.
- [ ] Simulated analysis is labeled honestly, and low-confidence, failed, unreadable and no-task paths can be inspected.
- [ ] Grade, topic, detected task list, lesson, examples, practice items and illustrations agree within each fixture.
- [ ] Lesson tabs/previous/next, example arrows/alternate method, and task navigation preserve state.
- [ ] Hints and explained steps are available; viewing them never marks an answer correct.
- [ ] Empty/invalid/wrong/correct answer paths work, with kind feedback and correct mathematical checking.
- [ ] Drafts, statuses and progress remain consistent across task changes and refresh where technically possible; duplicate clicks do not duplicate mock rewards.
- [ ] Result explanation and next actions work; new upload creates a fresh local context and another topic does not erase the current one.
- [ ] Every visible button, card, tab, link, keypad key, and help input has a meaningful local behavior.
- [ ] Desktop and smaller screens remain usable with readable order, visible controls, focus states, and keyboard operation.
- [ ] No LMS, backend, database, AI API, production authentication, or payment integration is present.
