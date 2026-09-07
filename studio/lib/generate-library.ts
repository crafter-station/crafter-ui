import { catalog } from "@/lib/catalog";
import sourceData from "@/lib/generated/sources.json";
import { librarySchema, themeVariables } from "@/lib/library-config";

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
    for (const root of roots) visit(`components/ui/${root}.tsx`);
    return [...seen].sort().map((path) => ({
      path,
      type: "registry:ui" as const,
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
      build: "bunx --bun shadcn@4.21.0 build registry.json --output public/r",
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
  files["README.md"] =
    `# ${config.name}\n\nYour components and defaults, built on shadcn and Base UI.\n\n## Use in an app\n\nRequires React 19, Tailwind CSS 4, and shadcn configured with the Base UI base. Start a clean app with:\n\n\`\`\`sh\nbunx --bun shadcn@4.21.0 init --template next --base base --preset nova --name my-app\n\`\`\`\n\nFrom that app, install the downloaded starter by its absolute local path:\n\n\`\`\`sh\nbunx --bun shadcn@4.21.0 add /absolute/path/to/${config.slug}-registry/public/r/starter.json\n\`\`\`\n\nThe starter applies your library theme and includes component source and its dependency closure. Installing an individual component preserves the existing app theme; install r/theme.json separately to apply your library defaults. Review existing-file conflicts before accepting replacements. This bundle supplies Base UI primitives; do not install it over an existing Radix component set without reviewing migration.\n\n## Host your registry\n\nDeploy this folder to Vercel (Other framework, output directory public) or serve public/ with any static host. The JSON is already built. Update library.json and registry.json if your public URL changes. Once available at ${homepage}:\n\n\`\`\`sh\nbunx --bun shadcn@4.21.0 add ${homepage}/r/starter.json\n\`\`\`\n\nYou can also install individual items:\n\n${selected.map((item) => `- ${homepage}/r/${item.name}.json`).join("\n")}\n\n## Customize\n\nEdit the source in components/ui/, then run \`bun run build\`. Add new entries to registry.json. The builder generated this initial catalog and all payloads from one definition. Your exported copy is yours to maintain.\n\n## Usage\n\n${selected.map((item) => `### ${item.title}\n\nImport from \`@/components/ui/${item.name}\`.\n\n\`\`\`tsx\n${item.usage}\n\`\`\``).join("\n\n")}\n\nSee NOTICE.md for upstream attribution.\n`;
  files["public/llms.txt"] =
    `# ${config.name}\n\nReact 19 / Tailwind 4 / shadcn Base UI.\nInstall: bunx --bun shadcn@4.21.0 add ${homepage}/r/starter.json\nUse the installed source and semantic tokens. Keep accessible labels, keyboard behavior, and async error states. Check before overwriting existing components.\n\n${selected.map((item) => `## ${item.title}\n${item.description}\nImport: @/components/ui/${item.name}\n${item.usage}`).join("\n\n")}\n`;
  files["public/index.html"] =
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${config.name}</title><body><h1>${config.name}</h1><p>Your component registry is ready.</p><p><a href="r/starter.json">Starter</a> · <a href="r/registry.json">Catalog</a> · <a href="llms.txt">Agent instructions</a></p><ul>${selected.map((item) => `<li><a href="r/${item.name}.json">${item.title}</a>: ${item.description}</li>`).join("")}</ul></body></html>`;
  files["NOTICE.md"] =
    "# Attribution\n\nBase UI primitives are distributed through @base-ui/react under MIT. Components adapted from shadcn/ui retain its MIT license (Copyright (c) 2023 shadcn). Dependencies retain their own licenses.\n\nMIT License\n\nCopyright (c) 2023 shadcn\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n";
  return { config, registry, builtItems, files };
}
