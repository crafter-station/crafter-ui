import { mkdir, readFile, writeFile } from "node:fs/promises";
import ts from "typescript";
import { exportCatalog as catalog } from "../lib/export-catalog";

const sources: Record<
  string,
  { content: string; local: string[]; dependencies: string[] }
> = {};
const pkg = JSON.parse(await readFile("package.json", "utf8"));
async function collect(path: string): Promise<void> {
  if (sources[path]) return;
  const content = await readFile(path, "utf8");
  const ast = ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const imports = ast.statements.flatMap((statement) =>
    ts.isImportDeclaration(statement) &&
    ts.isStringLiteral(statement.moduleSpecifier)
      ? [statement.moduleSpecifier.text]
      : [],
  );
  const local = await Promise.all(
    imports
      .filter((name) => name.startsWith("@/"))
      .map(async (name) => {
        for (const extension of [".tsx", ".ts"]) {
          const candidate = `${name.slice(2)}${extension}`;
          if (await Bun.file(candidate).exists()) return candidate;
        }
        throw new Error(`Cannot resolve ${name} from ${path}`);
      }),
  );
  const dependencies = imports
    .filter((name) => !name.startsWith("@/") && name !== "react")
    .map((name) =>
      name.startsWith("@")
        ? name.split("/").slice(0, 2).join("/")
        : name.split("/")[0],
    );
  for (const dependency of dependencies)
    if (!pkg.dependencies[dependency])
      throw new Error(`Missing dependency ${dependency} in ${path}`);
  sources[path] = {
    content,
    local,
    dependencies: dependencies.map(
      (name) => `${name}@${pkg.dependencies[name]}`,
    ),
  };
  await Promise.all(local.map(collect));
}
for (const item of catalog) for (const root of item.roots) await collect(root);
await mkdir("lib/generated", { recursive: true });
await writeFile(
  "lib/generated/sources.json",
  `${JSON.stringify(Object.fromEntries(Object.entries(sources).sort(([a], [b]) => a.localeCompare(b))), null, 2)}\n`,
);
console.log(
  `Collected ${Object.keys(sources).length} source files from ${catalog.length} catalog entries.`,
);
const extractorPaths = [
  "lib/extraction/extract.ts",
  "lib/extraction/select-declarations.ts",
  "lib/write-bundle.ts",
  "scripts/extract-library.ts",
];
const extractor = Object.fromEntries(
  await Promise.all(
    extractorPaths.map(async (file) => [file, await readFile(file, "utf8")]),
  ),
);
await writeFile(
  "lib/generated/extractor.json",
  `${JSON.stringify(extractor, null, 2)}\n`,
);

await writeFile(
  "lib/generated/create-app.json",
  JSON.stringify(await readFile("scripts/templates/create-app.ts", "utf8")),
);
