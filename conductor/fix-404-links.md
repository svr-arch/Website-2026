# Fix 404 Links & Verify Niri Interface

## Objective
Fix the 404 navigation errors on the homepage and verify the Niri-inspired horizontal tiling interface works as expected using the Anna development server and Chrome DevTools.

## Scope & Impact
- **Files Modified:** `site/content/index.md`
- **Impact:** Corrects broken navigation links on the homepage, allowing Fixi to properly fetch and inject content.

## Proposed Solution
1.  **Fix Paths:** Update the `href` attributes in `site/content/index.md` from `/content/manifesto.html` to `/manifesto.html` (and similarly for `members` and `contact`).
2.  **Start Server:** Run the Anna development server (`./anna -s`) in the background.
3.  **Verify Interface:** Use Chrome DevTools MCP to navigate to the local server, click the updated links, and verify that the content is fetched and appended to the `#niri-track` container, creating the horizontal scrolling effect.

## Implementation Steps
1.  Modify `site/content/index.md` to correct the `href` paths.
2.  Execute `./anna -s` as a background process.
3.  Use Chrome DevTools to test the site.

## Verification
-   Clicking "Manifesto", "Members", or "Contact" on the homepage should not result in a 404 error.
-   Content should be loaded seamlessly into a new `.niri-window` within the `#niri-track` via Fixi, without a full page reload.
