# Crafter default style

Requested reference: https://crafter.run/en, inspected live on 2026-09-07 with agent-browser.

The reference was saved with screenshot, analysis, and design-tokens.json in the vault at 06_Content/v0-templates/2026-09-07/hunt-crafter-run/.

Studio now uses white backgrounds, #141414 ink, #6b6b6b secondary text, #e6e6e6 hairlines, system sans-serif display/body typography, JetBrains Mono labels, uppercase heavy headlines, and square corners. The exported default is ink/sans/sharp with matching light and dark neutral tokens. User-selected accent colors and radii remain available.

Desktop 1440px and mobile 390px screenshots are crafter-desktop.png and crafter-mobile.png. No mobile horizontal overflow. Automated axe checks found zero violations on both sizes; one decorative contrast check requires manual interpretation. Motion respects reduced-motion preferences.

The section-heading example now uses the real shared CopyButton for its workspace link. Studio builds and all 34 tests pass after the changes.
