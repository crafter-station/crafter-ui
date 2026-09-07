# Release audit: 2026-09-07

Current implementation commits: 6c4fbdf and 7cb8203. Working tree was clean at audit start.

| Requirement | Evidence | State |
| --- | --- | --- |
| Gallery and personal library builder | studio/components/studio.tsx; browser evidence in verification.md | Implemented and verified |
| Shared catalog, source collection, export pipeline | lib/catalog.ts, scripts/collect-sources.ts, lib/generate-library.ts | Implemented and verified |
| Downloadable personalized registry | Independent Luna UI installation through shadcn CLI and consumer build | Verified |
| Repeated work abstracted for others | Standalone extractor downloaded from deployed preview; four shipped sources match checkout; real slider extraction resolves six files | Verified within documented support |
| Tests and build | 34 tests, 134 assertions; TypeScript, Biome, local build passed | Verified on current implementation |
| Preview delivery | dpl_3DLyrVriz982T1cuLvTfrM6SYRNJ inspected again: Ready, target preview | Verified |
| Canonical ui.crafter.run publication | No production publication or canonical-domain verification performed | Pending explicit production authorization |
| Existing production app adoption | Two real components extracted into a separate consumer; no existing production app migrated | Pending |

Preview: https://crafter-p68e7wkbu-crafter-station.vercel.app

## Next release action

Production approval remains unanswered. The local deploy skill requires explicit production authorization and explicit approval before a Git push. Automatic goal continuations do not provide that approval.

After authorization, reconcile the Vercel project's repository root with studio/ before enabling Git deployment. The parent .vercel/repo.json currently maps the legacy root app, so deploying from studio/ alone can select the wrong source. The verified preview used an isolated studio source snapshot. Publish the verified application, assign and verify ui.crafter.run, and verify downloads plus registry installation against the public canonical origin.

Production app adoption remains a separate unproven gate; the independent consumer is portability evidence only. Additional unrelated features do not substitute for either release gate. The goal is not complete.

## Production update

User explicitly authorized publication and requested crafter.run's visual identity. On 2026-09-07, deployment dpl_3HWffb7dhhhaJCB5tgEwvp5wPUbp reached Ready with target production and ui.crafter.run assigned. Vercel project root is now studio/. Spaceship CNAME ui points to 72f5c6f8292aff15.vercel-dns-016.com. Cloudflare and Google public DNS resolve it; Vercel reports misconfigured=false.

Local DNS retained the earlier negative answer. Browser verification used the publicly resolved IP through a session-only resolver rule, preserving the canonical hostname and HTTPS certificate checks. Both library and extractor ZIPs were downloaded from ui.crafter.run. The downloaded theme contains #ffffff background, #141414 ink and 0rem radius; installing it with shadcn into the independent consumer and rebuilding passed. Direct CLI URL installation was initially blocked by local DNS caching, not counted as passed.

The earlier production-authorization blocker above is resolved. Existing production app adoption remains outstanding.

## Adoption and final delivery

Crafter UI PR #1 is merged into main at 50e9c77. Git-triggered production dpl_D97mEDvxgmguM7NHBKvZgiMBKVYV was inspected Ready with ui.crafter.run assigned, proving the studio/ root setup works from GitHub.

Petdex PR #772 is merged at 5d1844be151bb4e613b62b2e50a70bc8e1540d65. SubmissionCard now uses the exported ActionButton and Spinner while retaining the local Button and existing product styling. Only Spinner's cn import was adapted. Two focused tests (8 assertions), project-wide TypeScript, app CI, lockfile checks and the preview build passed. Vercel Agent Review was skipped, not counted as an independent review. No production withdrawal was performed.

The starter endpoint at the canonical domain returned HTTP 200, registry:style, 14 source files, and the expected Crafter white/ink/sharp tokens. Both production ZIP downloads succeeded. Source collection now sorts its manifest keys; two consecutive generations produce the same SHA-256. The scaffold favicon was replaced with the Crafter layer mark.

## Final acceptance

- Crafter UI: gallery, live previews, customization, exports and local extractor implemented and verified. Canonical domain and Git-based production deployment are live.
- Crafter visual reference: persisted screenshot, analysis and tokens; implemented in site and exported defaults; desktop/mobile and automated accessibility checks completed.
- Portable registries: personalized starter installed in an independent app; production ZIP theme installed and rebuilt; actual components extracted from two repositories.
- Existing production adoption: Petdex PR #772 merged, production dpl_CF4xJgCtF8bLrYMZuETqeXELopJL inspected Ready at petdex.dev, build logs confirm main commit 5d1844b.
- Shared implementation: typed catalog, source closure, validated settings, atomic output, generated docs, and standalone extraction eliminate the repeated manual packaging work.
- Quality: 34 Studio tests, 134 assertions; Petdex focused tests and full app CI/typecheck; local and hosted builds; no mobile overflow; zero automated axe violations. The decorative contrast incomplete result remains explicitly documented. No destructive production action was performed for verification.

All delivery gates are satisfied within the supported React/shadcn product. Hosted per-user registry accounts and unsupported source-framework migration remain future capabilities, not advertised as implemented. The references to pending authorization and adoption earlier in this file describe historical stages and are superseded by this section.
