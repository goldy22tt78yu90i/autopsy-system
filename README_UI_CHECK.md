UI Check - Playwright

This repository includes a Playwright test `scripts/ui-check.spec.ts` that:

- Opens key pages: `/`, `/signup`, `/signin`, `/dashboard`.
- Runs each page on mobile, tablet, and desktop viewports.
- Saves full-page screenshots to `./screenshots/`.
- Detects DOM elements that overflow the viewport and fails the test if any are found.

Setup (locally)

1. Install Playwright and dependencies:

```bash
npm install --save-dev @playwright/test
npx playwright install
```

2. Run the UI check:

```bash
npx playwright test scripts/ui-check.spec.ts --project=chromium
```

3. Screenshots will appear in `./screenshots/`.

Notes

- The script expects the dev server running at `http://localhost:5174`.
- It performs a basic overflow detection and screenshot capture for visual QA.
- If you want me to run these checks here, I can attempt to install and run Playwright, but installing browser binaries can take time and may require network access.
