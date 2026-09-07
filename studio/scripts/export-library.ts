import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { generateLibrary } from "../lib/generate-library";
import { defaultConfig } from "../lib/library-config";
import { writeBundle } from "../lib/write-bundle";

const args = process.argv.slice(2);
if (args.includes("--help")) {
  console.log(
    "Usage: bun run export --out <empty-directory> [--config <library.json>]\nGenerate a portable library using the same pipeline as the website.",
  );
  process.exit(0);
}
const flags = new Map<string, string>();
for (let index = 0; index < args.length; index += 2) {
  if (
    !["--out", "--config"].includes(args[index]) ||
    !args[index + 1] ||
    args[index + 1].startsWith("--")
  )
    throw new Error(
      "Use --out <directory> and optional --config <file>. See --help.",
    );
  flags.set(args[index], args[index + 1]);
}
if (!flags.has("--out"))
  throw new Error("Missing --out <empty-directory>. See --help.");
const output = resolve(flags.get("--out") as string);
const input = flags.has("--config")
  ? JSON.parse(await readFile(resolve(flags.get("--config") as string), "utf8"))
  : defaultConfig;
const result = generateLibrary(input);
await writeBundle(output, result.files);
console.log(
  `Exported ${result.config.name}: ${Object.keys(result.files).length} files to ${output}`,
);
