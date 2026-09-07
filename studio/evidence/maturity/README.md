# Crafter UI local release readiness

Verified on 2026-09-07. All work is local; nothing was pushed or deployed.

## Acceptance results

| Requirement | Evidence |
| --- | --- |
| Copy Markdown at the top right of every docs page | `docs-routes.json`: 79 HTTP 200 routes with the shared action. Component Markdown includes installation, usage and full source regardless of the visible preview tab. Browser clipboard writes reported success on agent docs and Dialog. |
| Close catalog/export gap | All 76 documented entries are selectable and exportable: 64 shadcn plus 12 Crafter. `maturity.test.ts` checks every entry and source root, including hooks and recipes. |
| Verify every live preview | `preview-runtime.json`: 152 checks, 76 entries at 1280px and 390px. No uncaught browser errors, missing previews or page overflow. This is a render/overflow smoke test; it does not exhaust every interaction variant. |
| Persist and resume a library | Browser draft survives reload. `roundtrip.json`: name, all 76 selections and custom theme tokens restored identically in a separate browser session through the actual file import control. |
| Validate imported state | Invalid color injection rejected without changing the previous library. Unknown versions/components also covered by tests. |
| Agent-first export | `export_library` returns a 12,491-byte manifest response in the measured run, replacing a 2,065,602-byte source response. Its exportRequest produced a ZIP containing 171 files. `includeFiles: true` retains the full-source option. |
| One-command start | `setup.log`: the exact generated create-app script scaffolded a fresh app, installed the complete registry, theme.json and project skill, and configured Bun/Biome. `consumer-build.log` and `consumer-biome.log` passed. |
| Selected dependency closure | A second generated app with settings-card, date-picker and data-table built successfully; see `subset-build.log`. |
| Registry remains editable | `registry-build.log`: all registry entries rebuilt using the exported script. |
| Existing projects protected | create-app refused an existing destination before initialization. Installing an individual button into the isolated consumer preserved app/globals.css byte for byte. |
| Failure paths | `failure-cases.json`: malformed JSON 400, invalid config 400, oversized request 413, stale revision rejected. |
| Project quality | 47 tests, 737 assertions; TypeScript, Biome and production build passed. Logs included. Biome reports informational template-string suggestions, not failures. |

## Interaction dogfood

The isolated consumer rendered an actual screen importing SettingsCard, Dialog, DatePicker and DataTable from the exported registry. Verified dialog open/dismiss and focus return, table filtering to one matching row, and date selection. The date-picker recipe now closes after selecting a date. The generated starter screen accepts text, reports its demo action and switches between light and dark. Mobile screenshot: `isolated-app-dark.png`.

## Reproduce

From studio:

```sh
bun run sources
bun run check
bun run typecheck
bun test lib
bun run build
bun scripts/verify-docs.ts
bun scripts/verify-previews.ts
```

The last two commands expect the local catalog at localhost:4324 and use a dedicated agent-browser session for runtime checks.

From an exported registry:

```sh
bun scripts/create-app.ts /absolute/path/to/a-new-app
```

Then, in the new app:

```sh
bun run lint
bun run build
bun run dev
```

The setup requires network access to install its declared packages. It only accepts a new destination. If an external dependency fails, it leaves the partial directory available for inspection rather than deleting user files.

## Local artifacts

Temporary isolated workspaces: `/tmp/crafter-maturity-UD4UCB/`. These are disposable test fixtures, not the product source. The generated demo is currently served at http://localhost:4336; the component interaction consumer is at http://localhost:4335. Their processes last only for this local session.

The source of truth remains the Crafter UI studio worktree. Detailed logs and screenshots live alongside this report so verification does not depend on keeping the temporary apps.
