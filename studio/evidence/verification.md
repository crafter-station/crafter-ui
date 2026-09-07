# Verification: 2026-09-07

## Implemented

- Six compound components: action-button, copy-button, text-field, empty-state, section-heading, settings-card.
- Live gallery, usage snippets, keyboard-accessible installation dialog, component filtering, light/dark preview, and personalized library builder.
- One typed catalog and import dependency collector drive source bundles, source registry, built registry payloads, theme, README, and llms.txt.
- HTTP ZIP export and `bun run export --out <empty-directory> --config <library.json>` share the same generator.
- Exports contain 32 files for the full starter, including 14 dependency-complete component source files.

## Checks

- `bun test`: 34 passing tests, 134 assertions. Dependency closure, excluded components, identity separation, unsafe/invalid config, source/built manifests, and style/theme item types.
- `bun run typecheck`: passed.
- `bun run check`: passed with no diagnostics. Upstream shadcn files excluded; the six custom component files are included. Reduced-motion overrides intentionally use !important to override utility animations.
- Studio production build: passed locally and on Vercel.
- `git diff --check`: passed.
- HTTP invalid export returned 400; nonexistent registry item returned 404.

## External consumer

Created `/tmp/crafter-ui-consumer-20260907` through create-next-app, initialized shadcn 4.21.0 with Base UI, then installed the generated Luna UI starter with the real shadcn CLI. All six exported components are imported and rendered by its page. Type checking and production build passed.

An unrelated broken `/tmp/node_modules/@types/bun` directory contaminated TypeScript's ambient discovery. Restricted the fixture's typeRoots to its own node_modules/@types. No exported component needed a fix for this environment issue.

The first installation exposed a real bug: registry:block preserved existing CSS variables. The starter now uses registry:style; a separate registry:theme supports theme-only installation. Individual components preserve consumer theme intentionally.

Browser-computed consumer values after the fix:

- primary: #2457c5
- button background: rgb(36, 87, 197)
- radius: 0rem; button border radius: 0px
- font: ui-monospace, SFMono-Regular, monospace

The final complete neutral theme was also installed through theme.json and the consumer rebuilt successfully.

## Browser

Used agent-browser sessions crafter-ui-studio and crafter-ui-consumer.

- Pending action disables the button and displays its pending label.
- Settings field rejects whitespace; aria-invalid and aria-describedby connect its error and description.
- Clipboard success is shown only after writeText resolves. Injected rejection produces an error message.
- Installation dialog opens, Escape closes it, and focus returns to its trigger after the transition.
- Invalid registry slug disables export.
- At 390px width, document scrollWidth is 390px.
- Downloaded the ZIP through the real button on both localhost and the deployed preview. Inspected ZIP entries and parsed its starter payload.
- axe 4.12.1 on deployed preview: zero violations on desktop and mobile, 40 passing rules, one incomplete rule covering decorative text/background contrast. This is an automated check, not a full accessibility certification.

## Deployed preview

- URL: https://crafter-p68e7wkbu-crafter-station.vercel.app
- Deployment: dpl_3DLyrVriz982T1cuLvTfrM6SYRNJ
- Vercel project: crafter-ui, team: crafter-station
- Verified target preview, status Ready.
- Deployed a source snapshot of studio/ so the legacy app at repository root remains untouched.
- Preview uses Vercel Authentication. Browser checks used short-lived same-project OIDC access without changing protection.
- Canonical production domain ui.crafter.run has not been assigned or verified.

## Remaining

- Approve production publication, configure the studio root for future Git deployments, and verify ui.crafter.run.
- Reuse components in an existing production application. The clean consumer proves portability, not production adoption.
- Productization follow-up: hosted publishing/updating, global-style and provider migration, and broader source compatibility. The local extractor reports unsupported requirements and does not claim arbitrary repository support.

## Local extraction

- `/extract` provides a standalone ZIP containing the extractor source, package manifest, and instructions. Its only package dependency is TypeScript 5.9.3; it runs with Bun.
- CLI defaults to a plan containing file hashes, imports, exports, dependencies, requirements, and blockers. `--out` writes atomically to an empty directory only when no blockers remain.
- Follows TS/JS imports, aliases, re-exports, literal dynamic imports, JSON, and SVG. Conservative declaration selection removes unrelated functions/types and unused JSON imports while retaining runtime imports and top-level effects.
- Tests cover import cycles, shared exports, missing packages/files, workspace dependencies, external symlinks, loaders, styles, environment access, server directives, and output failures.
- Extracted the real crafter.run button with its utility, installed with shadcn 4.21.0 into the clean consumer, and verified its click counter.
- Extracted registry/src/components/design/slider-with-input.tsx with five dependencies. Selection excluded unrelated registry data and environment functions from utils.ts. Rebuilt its registry using the official CLI from the output directory, installed into the consumer, and verified changing the numeric input updates the slider to 42.
- Consumer production build passed with both extracted components and the six curated components together. Extraction preserves the original code's behavior and accessibility limitations; it does not infer global styles or providers.
- Downloaded the extractor through its browser link, unzipped it, installed TypeScript, and successfully extracted a real component independently of Studio.
- `/extract` axe checks: zero violations on desktop and mobile, 35 passing rules, zero incomplete rules. Evidence and source-hash reports are alongside this document.

Final deployed extractor check: downloaded `/api/extractor` through the protected preview, compared all four source files byte-for-byte with generated/extractor.json, and ran it in a fresh temporary folder against the real slider. Six source files, zero issues. Mobile document width equals viewport width (390px).
