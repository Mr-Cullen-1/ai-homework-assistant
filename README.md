# Junior AI yordamchi — standalone prototype

An interactive frontend demo of the Junior IT Academy homework assistant journey. It uses local HTML, CSS, JavaScript, supplied design imagery, and curated mock exercises. It is not connected to the Junior IT Academy LMS, a backend, an AI service, or a payment system.

## Stack and prerequisites

- Vanilla HTML, CSS, and browser JavaScript modules; no frontend framework or runtime dependencies.
- Node.js 24 and npm for the local server, tests, and static build. The production site itself is static.
- No environment variables or credentials are required. `PORT` is an optional local-server override; the default is `4173`.

## Install and run locally

```powershell
npm ci
npm start
```

Open <http://127.0.0.1:4173/>. On Windows PowerShell, use `npm.cmd` in place of `npm` if PowerShell blocks `npm.ps1`.

## Build and checks

```powershell
npm run build
npm test
npm run preview
```

`npm run build` creates the deployable static site in `dist/`. `npm run preview` serves that output at <http://127.0.0.1:4173/>; stop the development server first if it is using that port. The built-in test command runs three Node logic tests. There are no lint or type-check scripts because this is plain JavaScript without a linter or TypeScript configuration.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html`, `styles.css` | Browser entry point and responsive styles |
| `src/` | UI flow, local state, fixtures, and validation logic |
| `assets/` | Sample worksheets shown in the prototype |
| `design/` | Supplied design references; the CSS uses selected PNGs for branding and mascot artwork |
| `test/` | Node logic tests |
| `scripts/build.mjs` | Copies the static site into `dist/` without external build dependencies |
| `server.mjs` | Local development and production-output preview server |
| `dist/` | Generated deployment output; ignored by Git |

The app uses one URL, `/`, and switches screens with local frontend state. No nested route rewrite is needed. Relative module, stylesheet, sample worksheet, and design-image paths are preserved in `dist/`.

## Demonstrate the journey

1. Open the AI yordamchi banner on the mock course page.
2. Choose the **Qo‘shish va ayirish** demo sample, or select a PNG/JPG/PDF from your computer. Files remain in the browser; no upload occurs.
3. Review the labeled **simulated analysis** and its four grade-1 exercises. The right rail on the upload screen provides demo scenarios for low confidence, unreadable image, no tasks, upload failure, and processing failure.
4. Open the mini lesson, view guided examples, or use **To‘g‘ridan-to‘g‘ri yechish** to start independent practice immediately.
5. Try a wrong answer, hint, and step explanation. Correct fixture answers are **5, 6, 3, 7**. Progress reaches 100% after all four are correct.
6. View the result screen, then start a fresh upload, similar exercises, or another topic. The second topic has three exercises.

## Prototype assumptions and limits

- Grade and topic come from the selected local fixture. Grade 1 mathematics is the default. The course entry is a standalone mock, not an LMS page.
- Any user-selected file gets its real filename, type, size, and browser preview, but the analysis is always a visibly labeled fixture. There is no OCR, PDF parsing, AI call, file transfer, or server storage.
- The 10 MB upload limit is a **demo-only** validation choice. Production file size, PDF page count, accepted formats, confidence threshold, retention, and task-editing policy still need product decisions.
- For this prototype, every distinct correct exercise immediately displays **+10 demo coin and +5 demo XP**. The result page opens when every exercise is correct. These are local display values, not LMS account balances or approved production rewards. Repeated clicks and refreshes do not award the same completed exercise again.
- Hints and step explanations guide the student without filling the answer or marking the exercise complete. Guided examples use different equations from the assessed exercises.
- Correct answers, drafts, statuses, and the current screen are stored in browser local storage for refresh demonstration. Browser file object URLs cannot be restored after a refresh, so a chosen file must be selected again to preview it. The prototype keeps one previous session for returning from topic selection.
- The chat is scripted local help. Header destinations open explanatory mock dialogs because this prototype has no LMS routes.
- The supplied robot and logo appear through CSS crops of the provided screenshots because separate source assets were not included. Original transparent brand assets would improve responsive fidelity.

See [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) for the screen inventory, state checklist, and remaining production decisions.

## GitHub and Vercel

Review the files, run `npm ci`, `npm run build`, and `npm test`, then create the Git commit and push to your own GitHub repository. Import that repository into Vercel with **Root Directory: repository root**, **Install Command: `npm ci`**, and **Node.js: 24.x**. The checked-in `vercel.json` sets **Framework Preset: Other**, **Build Command: `npm run build`**, and **Output Directory: `dist`** so Vercel serves the static build. Do not configure environment variables or a route rewrite for this prototype. Follow [DEPLOYMENT.md](DEPLOYMENT.md) for the full manual handoff and verification steps.
