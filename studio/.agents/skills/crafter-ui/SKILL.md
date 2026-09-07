---
name: crafter-ui
description: Create, customize and maintain a design system based on Crafter UI; manage its tokens, registry, exports and design guide.
---

# Crafter UI

Use existing components before adding new ones. Read library.json, registry.json when present, and component source for current APIs. This library uses shadcn Base UI, React 19 and Tailwind 4. Atoms are focused controls; molecules combine related controls; organisms complete a task. Match responsibility rather than counting DOM nodes.

## Purpose

Use this skill when asked to create, customize or maintain a design system. For building product interfaces with the existing library, read https://ui.crafter.run/design.md instead. It contains composition, typography, spacing, component and interaction guidance.

## Create your own design system

Start at https://ui.crafter.run/create. Choose your library identity, components and tokens, then export your own registry, DESIGN.md and named skill. Preserve the host project's tooling and unrelated changes. Read the existing theme and component APIs before modifying them.

The optional https://ui.crafter.run/starter.zip download and its bun scripts/create-app.ts helper scaffold a new demo app from a registry. Use the helper only when a new application is requested; it requires a new destination and uses Bun. Consuming a library in an existing app does not require this helper.

## Theme source

The repository's theme.json contains version 1 plus light and dark semantic tokens. Edit those tokens, not scattered component colors. radius controls corners, font-sans controls typography, and control-height controls supported form and button density. Preserve readable foreground/background pairs and visible keyboard focus.

## Browser editing

When the catalog exposes WebMCP, use a compatible agent-browser and Chrome:

```sh
agent-browser --session crafter-theme open <catalog-url>
agent-browser --session crafter-theme webmcp list
agent-browser --session crafter-theme webmcp invoke get_theme --params '{}'
```

Read the discovered schema. patch_theme accepts expectedRevision, mode and a tokens object. Batch related edits. Re-read after a revision conflict. The visual editor and WebMCP share the same state; changes persist as a browser-local draft. reset_theme restores the repository baseline or a saved targetRevision, creating a new revision. export_theme returns theme.json and theme.css contents and performs no filesystem writes.

After changing tokens, inspect actual rendered components, keyboard focus, light/dark modes and mobile layouts with agent-browser. Tool success does not prove good design. Use reset_theme when the result is worse.

To keep an approved result, write export_theme's returned theme.json into the authorized repository. In a full Crafter catalog checkout it is loaded by the app. In an exported registry run bun run build to sync tokens and rebuild its registry. Verify with a fresh browser session so local storage cannot mask a missing file change. When WebMCP is unsupported, use the visual editor or edit theme.json directly; do not claim a DOM-only change was saved to source.

## Create, save and resume

At /create, discover get_library, configure_library, save_library, import_library and export_library. Use expectedRevision when updating or importing. save_library returns a portable document with identity, selection and both themes. export_library returns a manifest and exportRequest. POST its body as JSON to its URL to download the ZIP; extract it into an authorized folder. Use includeFiles: true only if source contents are needed in context. Then run bun scripts/create-app.ts /absolute/path/to/a-new-app. This creates a fresh app with its theme and this skill installed. Existing directories are rejected. The browser also supports Save library and Import library.

## Components and discovery

Read https://ui.crafter.run/llms.txt for the exported component inventory. The hosted /r/starter.json bundles the full library; prefer individual components for existing apps. Individual components retain their source dependency closure. Keep semantic tokens, accessible labels, loading, empty, error and disabled states when extending the library.

Publishing is separate from editing. A public skill file is documentation, not automatic skill installation.
