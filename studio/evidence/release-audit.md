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
