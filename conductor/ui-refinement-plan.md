# UI Refinement: Focus, Overview Mode, Help Modal

## Objective
Fix issues with the overview mode, focus handling, and help modal toggle in the Niri interface.

## Scope & Impact
- `site/layout/page.html`: Update Moxi handlers for `on-keydown` and `on-click`.
- `site/layout/all-posts.html`, `site/layout/all-members.html`: Update Moxi handlers to match `page.html`.
- `site/static/styles/main.css`: Fix overview mode centering and block interaction.

## Proposed Solution
1. **Help Modal**: Update the `/` shortcut to use `document.getElementById('help-modal')` instead of the Moxi proxy `q('#help-modal')[0]`, which was failing.
2. **Focus**: Add `tabindex="-1"` to `.niri-window` elements if not present. Update `Shift+F` to target `document.activeElement.closest('.niri-window')`.
3. **Overview Mode**:
   - Update CSS `body.overview-mode` to use flexbox to center the content instead of just scaling from the corner.
   - Use `pointer-events: none` on `.niri-window > *` inside `overview-mode` to block interaction with inner elements, but keep the window itself clickable.
   - Add a click handler to `.niri-window` that removes `overview-mode`, focuses the clicked window, and scrolls it into view.
4. **Update Handlers**: Sync `on-keydown` and `on-click` on `<body>` across `page.html`, `all-posts.html`, and `all-members.html`.

## Implementation Steps
1. Modify `site/static/styles/main.css` to update `body.overview-mode` to display as flex and center items, and add `body.overview-mode .niri-window > * { pointer-events: none; }` and `body.overview-mode .niri-window { cursor: pointer; }`.
2. Modify `site/layout/page.html` to update the `body` `on-keydown` and `on-click` attributes.
3. Apply the same body attribute changes to `site/layout/all-posts.html` and `site/layout/all-members.html`.
4. Ensure `.niri-window` has `tabindex="-1"` so it can receive focus in all layout files.

## Verification
- Press `/` to see if the help modal opens.
- Click a window to focus it, then press `Shift+F` and ensure only that window toggles `100vw`.
- Press `D` to enter overview mode. It should be centered. Inner elements should not be clickable. Clicking a window should exit overview mode and focus the window.
