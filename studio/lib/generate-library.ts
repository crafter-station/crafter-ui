import { exportCatalog as catalog, recipes } from "@/lib/export-catalog";
import createApp from "@/lib/generated/create-app.json";
import sourceData from "@/lib/generated/sources.json";
import { librarySchema, themeVariables } from "@/lib/library-config";
import { librarySkill } from "@/lib/library-skill";

const sources: Record<
  string,
  { content: string; local: string[]; dependencies: string[] }
> = sourceData;

export function generateLibrary(input: unknown) {
  const config = librarySchema.parse(input);
  const selected = catalog.filter((item) =>
    config.components.includes(item.name),
  );
  const homepage = config.homepage.replace(/\/$/, "");
  function itemFiles(roots: readonly string[]) {
    const seen = new Set<string>();
    function visit(path: string) {
      if (seen.has(path)) return;
      if (!sources[path]) throw new Error(`Missing registry source: ${path}`);
      seen.add(path);
      for (const dependency of sources[path].local) visit(dependency);
    }
    for (const root of roots) visit(root);
    return [...seen].sort().map((path) => ({
      path,
      type: path.startsWith("hooks/")
        ? ("registry:hook" as const)
        : path.startsWith("lib/")
          ? ("registry:lib" as const)
          : path.startsWith("components/examples/")
            ? ("registry:component" as const)
            : ("registry:ui" as const),
      content: sources[path].content,
    }));
  }
  function buildItem(
    name: string,
    title: string,
    description: string,
    roots: readonly string[],
  ) {
    const files = itemFiles(roots);
    const dependencies = [
      ...new Set(files.flatMap((file) => sources[file.path].dependencies)),
    ].sort();
    return {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name,
      type:
        name === "starter"
          ? ("registry:style" as const)
          : name === "theme"
            ? ("registry:theme" as const)
            : ("registry:block" as const),
      title,
      description,
      dependencies,
      files,
      cssVars: {
        light: themeVariables(config),
        dark: themeVariables(config, true),
      },
    };
  }
  const items = selected.map((entry) =>
    buildItem(entry.name, entry.title, entry.description, entry.roots),
  );
  const starter = buildItem(
    "starter",
    `${config.name} starter`,
    `All selected ${config.name} components and defaults.`,
    selected.flatMap((entry) => [...entry.roots]),
  );
  const themeItem = buildItem(
    "theme",
    `${config.name} theme`,
    "Apply your library colors, corners, and typography.",
    [],
  );
  const builtItems = [...items, themeItem, starter];
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: config.slug,
    homepage,
    items: builtItems.map(({ files, ...item }) => ({
      ...item,
      files: files.map(({ content: _content, ...file }) => file),
    })),
  };
  const files: Record<string, string> = {};
  const json = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`;
  files["library.json"] = json(config);
  files["scripts/create-app.ts"] = createApp;
  files["theme.json"] = json({
    version: 1,
    light: themeVariables(config),
    dark: themeVariables(config, true),
  });
  files[`.agents/skills/${config.slug}-ui/SKILL.md`] = librarySkill(
    config.name,
    config.slug,
    homepage,
  );
  files["public/skill.md"] = files[`.agents/skills/${config.slug}-ui/SKILL.md`];
  files["docs/agents.md"] =
    `# Working with an agent\n\nInstall the skill from .agents/skills/${config.slug}-ui/SKILL.md. The public copy is at /skill.md. theme.json is your theme source; run bun run build after editing it. Browser editing requires a catalog with WebMCP support; this portable registry does not include a running catalog application.\n`;
  files["scripts/sync-theme.ts"] =
    `const theme = await Bun.file("theme.json").json();
if (theme.version !== 1 || !theme.light || !theme.dark) throw new Error("Invalid theme.json");
for (const mode of ["light", "dark"]) for (const [key, value] of Object.entries(theme[mode])) {
  if (!/^[a-z][a-z0-9-]*$/.test(key) || typeof value !== "string" || /[;{}<>\\n\\r]/.test(value)) throw new Error("Invalid theme token");
}
const registry = await Bun.file("registry.json").json();
for (const item of registry.items) item.cssVars = { light: theme.light, dark: theme.dark };
await Bun.write("registry.json", JSON.stringify(registry, null, 2) + "\\n");
const css = (mode: string) => Object.entries(theme[mode]).map(([key, value]) => "  --" + key + ": " + value + ";").join("\\n");
await Bun.write("theme.css", ":root {\\n" + css("light") + "\\n}\\n.dark {\\n" + css("dark") + "\\n}\\n");
`;
  files["registry.json"] = json(registry);
  files["public/r/registry.json"] = json(registry);
  for (const item of builtItems) {
    files[`public/r/${item.name}.json`] = json(item);
    for (const file of item.files) files[file.path] = file.content;
  }
  files["package.json"] = json({
    name: `${config.slug}-registry`,
    version: "0.1.0",
    private: true,
    scripts: {
      build:
        "bun scripts/sync-theme.ts && bunx --bun shadcn@4.21.0 build registry.json --output public/r",
      dev: "bunx --bun serve public",
    },
  });
  files["vercel.json"] = json({
    buildCommand: "bun run build",
    outputDirectory: "public",
    framework: null,
  });
  const theme = (dark: boolean) =>
    Object.entries(themeVariables(config, dark))
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");
  files["theme.css"] =
    `:root {\n${theme(false)}\n}\n.dark {\n${theme(true)}\n}\n`;
  const fence = (language: string, code: string) =>
    ["```" + language, code, "```"].join("\n");
  files["README.md"] =
    [
      `# ${config.name}`,
      "Your components and defaults, built on shadcn and Base UI.",
      "## Start in one command",
      "From this folder, run:",
      fence("sh", "bun scripts/create-app.ts /absolute/path/to/my-app"),
      "Creates a fresh Next.js app, installs your components, theme.json and agent skill, and configures Bun and Biome. Existing directories are rejected. Then run bun run dev in the created app.",
      "## Use in an existing app",
      "Requires React 19, Tailwind CSS 4 and shadcn with the Base UI base. Review conflicts before replacing existing components, especially Radix implementations.",
      fence(
        "sh",
        `bunx --bun shadcn@4.21.0 add /absolute/path/to/${config.slug}-registry/public/r/starter.json`,
      ),
      "The starter applies your theme and installs the source dependency closure. Individual component installs preserve the existing theme; install r/theme.json separately to apply library defaults.",
      "## Customize",
      "Edit theme.json, then run bun run build to synchronize registry tokens. Edit component source and rebuild after changes. The generated app also reads theme.json through its dev/build scripts.",
      "## Host your registry",
      "Serve public/ with a static server, or deploy it separately when ready. The JSON is already built. Update library.json and registry.json when changing the hosting URL.",
      fence("sh", `bunx --bun shadcn@4.21.0 add ${homepage}/r/starter.json`),
      ...selected.map((item) => `- ${homepage}/r/${item.name}.json`),
      "## Usage",
      ...selected.map(
        (item) =>
          `### ${item.title}\n\nImport from @/components/${recipes.has(item.name) ? "examples/" : "ui/"}${item.name}.\n\n${fence("tsx", item.usage || "Read the installed source for the component API.")}`,
      ),
      "See NOTICE.md for upstream attribution.",
    ].join("\n\n") + "\n";
  files["public/llms.txt"] = [
    `# ${config.name}`,
    "React 19 / Tailwind 4 / shadcn Base UI. Use semantic tokens and preserve accessible states.",
    `Install: bunx --bun shadcn@4.21.0 add ${homepage}/r/starter.json`,
    ...selected.map(
      (item) =>
        `## ${item.title}\n${item.description}\nImport: @/components/${recipes.has(item.name) ? "examples/" : "ui/"}${item.name}\n${item.usage}`,
    ),
    `Agent skill: ${homepage}/skill.md\nTheme source: theme.json`,
  ].join("\n\n");
  files["public/index.html"] =
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${config.name}</title><body><h1>${config.name}</h1><p>Your component registry is ready.</p><p><a href="r/starter.json">Starter</a> · <a href="r/registry.json">Catalog</a> · <a href="llms.txt">Agent instructions</a></p><ul>${selected.map((item) => `<li><a href="r/${item.name}.json">${item.title}</a>: ${item.description}</li>`).join("")}</ul></body></html>`;
  files["NOTICE.md"] =
    "# Attribution\n\nBase UI primitives are distributed through @base-ui/react under MIT. Components adapted from shadcn/ui retain its MIT license (Copyright (c) 2023 shadcn). Dependencies retain their own licenses.\n\nMIT License\n\nCopyright (c) 2023 shadcn\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n";
  return { config, registry, builtItems, files };
}
