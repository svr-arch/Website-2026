# Content Expansion & Mobile UX Implementation Plan

## Objective
Implement the requested Markdown content structures (About, Members, Blogs) and enhance the Niri-inspired interface with touch-centric Mobile UX features (sticky close buttons, FAB for overview).

## Scope & Impact
- **Content:** Create `about.md`, refactor `members.md` into a menu, and create `members/core.md` and `members/general.md`.
- **Layouts:** Update `all-posts.html` to ensure blog links use Fixi attributes. Add the FAB to `footer.html`.
- **Styling (`main.css`):** Update breakpoints to 768px. Add styles for `.mobile-close-btn` and `.fab-overview`.
- **Scripting (`niri-engine.js`):** Add click event delegation for mobile elements. Dynamically inject the close button into newly spawned `.niri-window` elements via the `fx:after` hook.

## Proposed Solution

### 1. Content Migration
- **`site/content/about.md`**: Will contain the detailed chapter information, "WHAT WE DO", and "FLAGSHIP EVENTS" (migrated from the old landing page).
- **`site/content/members.md`**: Transformed into a minimalist menu with Fixi links to "Core Committee" and "General Members".
- **`site/content/members/core.md` & `site/content/members/general.md`**: New pages serving the specific member grids to match the requested `/members/core.html` and `/members/general.html` routes.

### 2. Layout & Hypermedia Updates
- **`site/layout/all-posts.html`**: Add `fx-action`, `fx-target`, and `fx-swap` to the blog post anchors so they open seamlessly in the horizontal track.
- **`site/layout/partials/footer.html`**: Add the Floating Action Button (FAB) for triggering Overview Mode on mobile.

### 3. Mobile UX (CSS & JS)
- **CSS**: Adjust the mobile breakpoint to `768px`. Add sticky positioning for the close button (`.mobile-close-btn`) and fixed positioning for the FAB (`.fab-overview`). Both will be hidden on desktop (`display: none`) and shown on mobile.
- **JS**: Update `niri-engine.js` to include a global click listener for the close button and FAB. In the existing `fx:after` hook, dynamically create and prepend the `<button class="mobile-close-btn">×</button>` to every newly fetched window.

## Implementation Steps
1. Write the new Markdown files (`about.md`, `members/core.md`, `members/general.md`).
2. Update `members.md` and `index.md` (to point to the new `about.html`).
3. Update `all-posts.html` for Fixi integration.
4. Update `main.css` for 768px breakpoints, close buttons, and FAB.
5. Update `footer.html` to include the FAB.
6. Update `niri-engine.js` to handle the new mobile interactions and inject the close button.

## Verification
- Run the Anna development server.
- Verify links on the home page open new windows.
- Verify the Members menu correctly routes to Core and General lists.
- Verify Blog links open articles horizontally.
- Emulate a mobile device in Chrome DevTools to ensure windows are 100vw, the FAB triggers overview mode, and sticky close buttons successfully remove windows.
