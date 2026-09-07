# Crafter UI

Build Crafter's reusable UI on shadcn, then make creating a personal component library easy for anyone. Crafter is the first consumer of the same generation path exposed to other users.

## Delivery requirements

- A working component gallery and personal-library builder intended for ui.crafter.run.
- Real interactive examples with consistent light/dark tokens and mobile layouts.
- One source of truth for component metadata, source files, registry dependencies, usage, and provenance.
- Downloadable personalized registry with source code, theme, instructions, and generated installable payloads. No account required for local generation.
- Successful installation into a clean Next.js consumer through the actual shadcn CLI, followed by type checking and a production build.
- Capture manual work and convert repeated steps into shared generation functions and commands.
- Verify desktop/mobile behavior, invalid inputs, generated artifacts, and independent consumer installation before release.

## Existing evidence

- crafter-station/crafter-ui at 8460d42 has separate config/components.ts and registry.json definitions. README asks maintainers to update both. components/component-actions.tsx hardcodes the deploy URL and reports clipboard success before awaiting it.
- crafter-station/registry has 364+ numbered examples and a theme builder. This is prior art, not evidence that components are used by products.
- crafter.run/components/ui/button.tsx uses Radix, neutral colors, and semantic variants.
- petdex/src/components/ui/button.tsx uses Base UI and product-specific variants. petdex/src/components/profile/my-pets-view.tsx repeats pending/disabled/label composition. profile-share-button.tsx has clipboard state and swallows failures.

Initial patterns: action button, copy button, labeled text field, empty state, section heading, and settings block. These are informed by existing code; adoption in existing production apps is not yet proven.

## Product boundary

Start with a local, downloadable library builder for React 19, Tailwind 4, and shadcn Base UI. Do not claim automatic extraction of arbitrary repositories, cross-framework compatibility, or hosted personal registries. Those need separate implementation and evidence.

Keep the legacy application intact while studio/ is built and tested as a standalone Next.js app. Deploy the studio directory for the new surface. The existing crafter-station/ui repository is a shadcn fork and is unrelated to this implementation.

## Repetition ledger

| Observed work | Abstraction | Proof needed |
| --- | --- | --- |
| Register component in multiple catalogs | Typed catalog drives previews and registry generation | Every catalog entry has source and installable output |
| Change branding across CSS and registry metadata | Validated library configuration produces both | Two differently named libraries install independently |
| Manually collect source and dependencies | Dependency closure assembled into portable bundle | Clean consumer compiles without studio imports |
| Write setup and agent instructions per library | Generated README and llms.txt | Instructions use the exported name and URL |
| Follow aliases and copy utility dependencies from an existing app | Local TypeScript import graph with conservative declaration selection | Real button and slider install and work in a separate app |
| Repeat extraction setup for each user | Downloadable standalone Bun extractor | Unzip, install parser, extract without the Studio checkout |
| Configure and build registry JSON | One export pipeline with ready-to-serve r/ files | Actual CLI can install exported payload |

## Remaining release gates

Implementation, browser verification, clean-consumer installation/build, and a protected Vercel preview are verified in evidence/verification.md. Canonical domain publication and reuse in an existing production app remain pending. The builder personalizes the curated catalog. A standalone local extractor now resolves selected React components into portable registries, with explicit blockers for unsupported requirements. Verified against crafter.run and crafter-station/registry; universal repository extraction is not claimed. Do not mark the overall objective complete from the preview alone.
