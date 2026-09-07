export function librarySkill(name: string, slug: string, homepage: string) {
  return `---
name: ${slug}-ui
description: Use and extend ${name} components, tune its semantic tokens, and verify theme changes visually in its catalog.
---

# ${name}

Use existing components before adding new ones. Read library.json, registry.json when present, and component source for current APIs. This library uses shadcn Base UI, React 19 and Tailwind 4. Atoms are focused controls; molecules combine related controls; organisms complete a task. Match responsibility rather than counting DOM nodes.

## Use this design system

This skill provides design-system context for the current project. Reading or installing it does not request a new app, screen, redesign or deployment.

Follow the project's existing package manager, tooling and conventions. Discover components at ${homepage}/llms.txt and inspect their source and examples before using them. Reuse ${name} components and semantic tokens consistently, including light/dark, focus, disabled, loading, empty and error states.

When UI work needs a missing component, install only that component from ${homepage}/r/<component>.json using the project's tooling. Check React 19, Tailwind 4 and shadcn Base UI compatibility and review existing component conflicts before editing. Apply ${homepage}/r/theme.json when adopting the shared theme. Preserve unrelated changes. Explain compatibility issues rather than replacing the project's stack.

Keep product-specific compositions in the consuming project. Propose reusable improvements to the shared design-system repository so the team can review and adopt them together. Validate changes using the project's checks and the relevant rendered interactions.

## Create your own design system

This is a separate, opt-in flow at ${homepage}/create. Choose your library identity, components and tokens, then export your own registry and named skill. Do not start this flow merely to use ${name} in an existing project.

The optional ${homepage}/starter.zip download and its bun scripts/create-app.ts helper scaffold a new demo app from a registry. They are not required to adopt the design system. Use the helper only when a new application is requested; it requires a new destination and uses Bun.

## Theme source

The repository's theme.json contains version 1 plus light and dark semantic tokens. Edit those tokens, not scattered component colors. radius controls corners, font-sans controls typography, and control-height controls supported form and button density. Preserve readable foreground/background pairs and visible keyboard focus.

## Browser editing

When the catalog exposes WebMCP, use a compatible agent-browser and Chrome:

\`\`\`sh
agent-browser --session ${slug}-theme open <catalog-url>
agent-browser --session ${slug}-theme webmcp list
agent-browser --session ${slug}-theme webmcp invoke get_theme --params '{}'
\`\`\`

Read the discovered schema. patch_theme accepts expectedRevision, mode and a tokens object. Batch related edits. Re-read after a revision conflict. The visual editor and WebMCP share the same state; changes persist as a browser-local draft. reset_theme restores the repository baseline or a saved targetRevision, creating a new revision. export_theme returns theme.json and theme.css contents and performs no filesystem writes.

After changing tokens, inspect actual rendered components, keyboard focus, light/dark modes and mobile layouts with agent-browser. Tool success does not prove good design. Use reset_theme when the result is worse.

To keep an approved result, write export_theme's returned theme.json into the authorized repository. In a full Crafter catalog checkout it is loaded by the app. In an exported registry run bun run build to sync tokens and rebuild its registry. Verify with a fresh browser session so local storage cannot mask a missing file change. When WebMCP is unsupported, use the visual editor or edit theme.json directly; do not claim a DOM-only change was saved to source.

## Create, save and resume

At /create, discover get_library, configure_library, save_library, import_library and export_library. Use expectedRevision when updating or importing. save_library returns a portable document with identity, selection and both themes. export_library returns a manifest and exportRequest. POST its body as JSON to its URL to download the ZIP; extract it into an authorized folder. Use includeFiles: true only if source contents are needed in context. Then run bun scripts/create-app.ts /absolute/path/to/a-new-app. This creates a fresh app with its theme and this skill installed. Existing directories are rejected. The browser also supports Save library and Import library.

## Components and discovery

Read ${homepage}/llms.txt for the exported component inventory. The hosted /r/starter.json bundles the full library; prefer individual components for existing apps. Individual components retain their source dependency closure. Keep semantic tokens, accessible labels, loading, empty, error and disabled states when extending the library.

Publishing is separate from editing. A public skill file is documentation, not automatic skill installation.
`;
}
