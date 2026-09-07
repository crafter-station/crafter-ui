import { mkdir, readFile, writeFile } from "node:fs/promises";
import ts from "typescript";
import { catalog } from "../lib/catalog";

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
  const local = imports
    .filter((name) => name.startsWith("@/"))
    .map((name) => `${name.slice(2)}.tsx`);
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
for (const item of catalog)
  for (const root of item.roots) await collect(`components/ui/${root}.tsx`);
await mkdir("lib/generated", { recursive: true });
await writeFile(
  "lib/generated/sources.json",
  `${JSON.stringify(sources, null, 2)}\n`,
);
console.log(
  `Collected ${Object.keys(sources).length} source files from ${catalog.length} catalog entries.`,
);
