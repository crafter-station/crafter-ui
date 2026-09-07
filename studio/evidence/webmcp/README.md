# Native WebMCP theme editing

Local verification, September 7, 2026.

- Updated Homebrew agent-browser from 0.35.0 to 0.36.0, repaired its stale Homebrew symlink, and installed agent-browser-managed Chrome 152.0.7977.82.
- The actual browser exposes get_theme, patch_theme, reset_theme and export_theme. Discovery and invocation use agent-browser webmcp, not an eval shim or a fake modelContext.
- Native patch changed light primary/ring to #256344, radius to 0.375rem and control-height to 2.25rem. After navigation, the Input preview measured 6px radius and 36px height.
- Editing the panel radius to 0.5rem was visible to get_theme as revision 2. Native reset_theme restored revision 1 into revision 3. A stale expectedRevision was rejected without mutation.
- export_theme returned files. Its actual theme.json content was written into the repository. A newly launched browser session read revision 0 with an empty history and the edited theme; its Input preview measured 6px and 36px. This proves repository persistence independently of the original local-storage draft.
- Restored the original monochrome, square Crafter baseline after this experiment. The edited export and fresh-session observations are retained here.
- The desktop panel stays alongside the catalog without a blurred backdrop. Mobile panel width and document scroll width both measured 390px. Dark mode switched the body to rgb(20,20,20), with edited dark primary #95d6ad. Axe: zero violations, 40 passing rules, 2 incomplete checks requiring visual judgment.
- The portable registry includes theme.json, named SKILL.md, a public skill copy and docs/agents.md. A test writes a changed theme into an exported folder, executes its sync script and verifies the registry/CSS tokens.
- 39 tests pass. TypeScript, Biome and the production build pass. The skill passes quick_validate.py. /skill.md and /r/theme.json respond successfully.

The browser tools edit a validated local draft. Export returns content; writing source files is a separate action performed by the agent. No GitHub push or deployment was performed.
