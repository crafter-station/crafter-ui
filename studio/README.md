# Crafter UI Studio

A component library and a working personal-library builder. Built with Next.js 16, React 19, Tailwind 4, and shadcn Base UI.

## Run

```sh
bun install
bun run dev --port 4317
```

## Generate a library

Use the website to choose your name, theme, and components, then download a ZIP. The export includes editable source, dependency-complete shadcn payloads, a source registry, theme, setup guide, and agent instructions.

The same pipeline is available from the terminal:

```sh
bun run export --out /tmp/my-ui-registry
bun run export --out /tmp/my-personal-registry --config /path/to/library.json
```

Output directories must be empty. A downloaded library.json can be used again as CLI input.

The starter is a shadcn registry style, so installing it applies your theme. Individual components preserve the consumer's existing theme. The exported theme.json lets you apply only your defaults.

## Maintain

- `lib/catalog.ts`: names, descriptions, usage, and component entrypoints.
- `components/ui/`: real source used by both the website and exports.
- `scripts/collect-sources.ts`: follows local imports and records package dependencies.
- `lib/generate-library.ts`: shared generator for HTTP and CLI exports.
- `components/studio.tsx`: interactive examples and library builder.

Add a component source and a catalog entry, then supply its interactive example in ComponentPreview. Run `bun run sources`. Do not hand-edit generated JSON.

## Verify

```sh
bun test
bun run typecheck
bun run check
bun run build
```

See `PRODUCT.md` for provenance, scope, productization opportunities, and remaining delivery gates. See `evidence/verification.md` for verified outcomes and limitations.

## Deploy

Deploy this directory as the Next.js project root. The repository root contains the legacy application and is intentionally preserved. Production domain target: ui.crafter.run. A local build is not proof of deployment.
