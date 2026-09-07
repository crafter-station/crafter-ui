export function librarySkill(name: string, slug: string, homepage: string) {
  return `---
name: ${slug}-ui
description: Use and extend ${name} components, tune its semantic tokens, and verify theme changes visually in its catalog.
---

# ${name}

Use existing components before adding new ones. Read library.json, registry.json when present, and component source for current APIs. This library uses shadcn Base UI, React 19 and Tailwind 4. Atoms are focused controls; molecules combine related controls; organisms complete a task. Match responsibility rather than counting DOM nodes.

## Start here

Inspect package.json, components.json, the lockfile and git status first. Preserve unrelated changes. Use Bun.

For a new application: download ${homepage}/starter.zip into a temporary directory, unzip it, then run bun scripts/create-app.ts /absolute/path/to/a-new-app from the extracted crafter-registry folder. The script refuses existing destinations. It installs the source, theme.json and this skill, and creates a working example.

For an existing app: confirm React 19, Tailwind 4 and shadcn Base UI compatibility. Read existing components before installing selected items from ${homepage}/r/<component>.json. Avoid the full starter and automatic overwrite flags in an existing app. Review conflicting files and merge intentionally. Apply ${homepage}/r/theme.json when adopting the Crafter theme. Save this skill in .agents/skills/${slug}-ui/SKILL.md. If the stack differs, explain the exact mismatch before modifying it.

Implement a useful screen, run the project's checks and verify its main interaction, light/dark tokens and mobile layout with agent-browser. End with a local run command. Do not deploy unless explicitly requested.

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

Read ${homepage}/llms.txt for the exported component inventory. Install the hosted starter with bunx --bun shadcn@4.21.0 add ${homepage}/r/starter.json after it is deployed. Individual components retain their source dependency closure. Keep semantic tokens, accessible labels, loading, empty, error and disabled states when extending the library.

Publishing is separate from editing. A public skill file is documentation, not automatic skill installation.
`;
}
