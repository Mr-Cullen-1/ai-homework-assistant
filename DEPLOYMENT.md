# Manual GitHub and Vercel deployment

This is a static frontend prototype. It has no LMS connection, backend, external AI call, or required environment variables. The working application lives at `/`; its screens use browser state rather than URL routes.

## 1. Review the project

This folder did not contain a `.git` directory when deployment preparation began. Review `package.json`, `package-lock.json`, `.gitignore`, `scripts/build.mjs`, this guide, and `README.md` before making the first commit. Keep the supplied `design/` references and specification in the repository. `dist/` is generated and ignored.

If the folder is already a Git repository when you use this guide, inspect its changes first:

```powershell
git status --short
git diff --check
git diff --stat
```

Do not discard existing work with `reset`, `clean`, or `stash` just to prepare a deployment.

## 2. Run local checks

Use Node.js 24 and npm. On Windows PowerShell, replace `npm` with `npm.cmd` if `npm.ps1` is blocked.

```powershell
npm ci
npm run build
npm test
npm run preview
```

Open <http://127.0.0.1:4173/> while the preview server runs. Stop another local server on port `4173` first, or set a different local `PORT`. The build must produce `dist/index.html`, `dist/styles.css`, `dist/src/`, `dist/assets/`, and `dist/design/`. No lint or type-check command is configured.

In the preview, open the course page, upload page, sample analysis, mini lesson, worked examples, practice, completion, and topic picker. Try the demo error scenarios, wrong and correct answers, and the completion actions. Check the browser console and network requests for asset errors. Test at widths of 320, 375, 768, 1024, 1366, 1440, and 1920 pixels; at high zoom, natural vertical scrolling is expected. A real local PNG/JPG/PDF can be selected in an ordinary browser. The file remains in the browser and analysis is simulated.

## 3. Create or connect a GitHub repository

Create an empty GitHub repository in your account. Do not ask GitHub to generate an initial README or `.gitignore`, because both already exist here. If this folder still has no `.git` directory, initialize it locally:

```powershell
git init
git branch -M main
```

If it is already a Git repository, keep its existing branch and history. Review and stage only the intended files, then create the commit yourself:

```powershell
git status --short
git add .
git diff --cached --stat
git diff --cached --check
git status --short
git commit -m "Prepare static AI Homework Assistant deployment"
```

Review the staged file list before committing. `dist/`, `.vercel/`, `node_modules/`, and local `.env` files should not appear. If `origin` is not configured, connect the empty GitHub repository and push your branch:

```powershell
git remote -v
git remote add origin https://github.com/<owner>/<repository>.git
git push -u origin main
```

Replace the URL and branch with yours. If `origin` already exists, use it rather than adding a duplicate remote. Do not paste credentials into repository files.

## 4. Import into Vercel

In Vercel, choose **Add New → Project**, import your GitHub repository, and set:

| Setting | Value |
| --- | --- |
| Root Directory | Repository root (`./`) |
| Framework Preset | Other |
| Node.js Version | 24.x |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | None |

The production output is static. The checked-in `vercel.json` sets the framework to Other, runs the build, and serves `dist/`. Do not configure a serverless function, API route, database, LMS secret, or route rewrite. Confirm the root directory and Node.js version before clicking **Deploy** yourself.

Vercel's [build configuration](https://vercel.com/docs/builds/configure-a-build) explains the `Other` preset, build command, and output directory; its [Git integration guide](https://vercel.com/docs/git) covers importing a repository.

## 5. Verify the deployment

Open the deployment URL at `/` and repeat the local journey checks. Refresh `/`; the app should load, and browser local storage may restore the last screen. Check that CSS, JavaScript modules, sample SVGs, and mascot PNGs load without 404s. Confirm that upload is only local and that no real credentials or LMS endpoints are requested. Test a phone width and a desktop width, then check the browser console for critical errors.

## 6. Troubleshooting

| Problem | Check |
| --- | --- |
| Blank page or `dist/index.html` missing | Verify Root Directory is the repository root and Build Command is `npm run build`; run the build locally. |
| CSS, JavaScript, or images return 404 | Verify Output Directory is `dist`; inspect the exact case and Unicode spelling of files under `dist/`; rebuild after asset changes. |
| Install or test fails | Use Node.js 24 and the committed `package-lock.json`; run `npm ci` locally. The tests use Node's no-isolation mode. |
| A made-up nested URL returns 404 | This prototype only serves `/`. Its screens are local-state views, so a catch-all rewrite is not appropriate. |
| File preview disappears after refresh | Browser object URLs do not survive refresh. Re-select the local file; the app does not upload or store it. |
| A new push does not appear | Check the GitHub remote/branch, Vercel's selected production branch, and the deployment build log. |

## 7. Subsequent updates

Run `npm ci`, `npm run build`, and `npm test`, review the changes, then commit and push them manually. Vercel's Git integration creates a new deployment from the pushed commit. Verify its URL and build log before sharing it.
