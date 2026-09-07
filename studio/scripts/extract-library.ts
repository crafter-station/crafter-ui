import path from "node:path";
import {
  extractionBundle,
  extractionReport,
  extractProject,
} from "../lib/extraction/extract";
import { writeBundle } from "../lib/write-bundle";

const args = process.argv.slice(2);
if (args.includes("--help")) {
  console.log(`Usage: bun run extract --project <directory> --entry <source-file> [options]

Resolve a component's local imports and package dependencies without modifying its project.
Repeat --entry to include more components. Without --out, only a report is printed.

Options:
  --project <directory>  Project containing package.json and optionally tsconfig.json
  --entry <file>         Entrypoint relative to the project; repeatable
  --name <name>          Library display name
  --slug <slug>          Folder and registry name (lowercase, hyphens)
  --homepage <origin>    Future registry host, defaults to https://example.com
  --out <directory>     Write a portable bundle to an empty directory if the graph resolves
  --help                Show this help

Supports local TS/JS imports, re-exports, tsconfig aliases, JSON, and imported SVG source.
Reports unresolved loaders, stylesheets, binary assets, dynamic imports, and server dependencies.
No project scripts are executed and no source is uploaded.`);
  process.exit(0);
}
try {
  const flags = new Map<string, string>();
  const entries: string[] = [];
  for (let index = 0; index < args.length; index += 2) {
    const flag = args[index];
    const value = args[index + 1];
    if (
      ![
        "--project",
        "--entry",
        "--name",
        "--slug",
        "--homepage",
        "--out",
      ].includes(flag) ||
      !value ||
      value.startsWith("--")
    )
      throw new Error("Invalid arguments. Run bun run extract --help.");
    if (flag === "--entry") entries.push(value);
    else if (flags.has(flag)) throw new Error(`Repeated option: ${flag}`);
    else flags.set(flag, value);
  }
  if (!flags.has("--project"))
    throw new Error("Missing --project. Run bun run extract --help.");
  const project = path.resolve(flags.get("--project") as string);
  const slug =
    flags.get("--slug") ??
    `${path
      .basename(project)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-ui`;
  const result = await extractProject({
    project,
    entries,
    slug,
    name: flags.get("--name") ?? `${path.basename(project)} UI`,
    homepage: flags.get("--homepage") ?? "https://example.com",
  });
  const report = extractionReport(result);
  if (result.issues.length) {
    console.log(JSON.stringify(report, null, 2));
    process.exitCode = 2;
  } else {
    if (flags.has("--out"))
      await writeBundle(flags.get("--out") as string, extractionBundle(result));
    console.log(
      JSON.stringify(
        {
          ...report,
          ...(flags.has("--out")
            ? { output: path.resolve(flags.get("--out") as string) }
            : {}),
        },
        null,
        2,
      ),
    );
  }
} catch (error) {
  console.error(
    JSON.stringify({
      error: error instanceof Error ? error.message : "Extraction failed.",
    }),
  );
  process.exitCode = 1;
}
