import { existsSync } from "node:fs";
import { copyFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const destination = Bun.argv[2];
if (!destination)
  throw new Error("Usage: bun scripts/create-app.ts /absolute/path/to/my-app");
const target = path.resolve(destination);
if (existsSync(target))
  throw new Error(
    "Destination already exists. Choose a new directory; existing apps are never overwritten.",
  );
const name = path.basename(target);
if (!/^[a-z][a-z0-9-]*$/.test(name))
  throw new Error(
    "Use a lowercase folder name with letters, numbers and hyphens.",
  );
const registry = path.resolve(import.meta.dir, "..");
await mkdir(path.dirname(target), { recursive: true });
async function run(args: string[], cwd: string) {
  const process = Bun.spawn(args, {
    cwd,
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
  });
  if ((await process.exited) !== 0)
    throw new Error(
      `Command failed: ${args.join(" ")}. Your partial app remains at ${target} for inspection.`,
    );
}
await run(
  [
    "bunx",
    "--bun",
    "shadcn@4.21.0",
    "init",
    "--template",
    "next",
    "--base",
    "base",
    "--preset",
    "nova",
    "--name",
    name,
    "--no-monorepo",
    "--yes",
  ],
  path.dirname(target),
);
await run(
  [
    "bunx",
    "--bun",
    "shadcn@4.21.0",
    "add",
    path.join(registry, "public/r/starter.json"),
    "--yes",
    "--overwrite",
  ],
  target,
);
const config = await Bun.file(path.join(registry, "library.json")).json();
const skill = `.agents/skills/${config.slug}-ui/SKILL.md`;
await mkdir(path.join(target, path.dirname(skill)), { recursive: true });
for (const file of ["theme.json", "library.json", skill])
  await copyFile(path.join(registry, file), path.join(target, file));
await mkdir(path.join(target, "scripts"), { recursive: true });
await Bun.write(
  path.join(target, "scripts/sync-theme.ts"),
  `export {};
const theme = await Bun.file("theme.json").json();
if (theme.version !== 1 || !theme.light || !theme.dark) throw new Error("Invalid theme.json");
for (const tokens of [theme.light, theme.dark]) for (const [key, value] of Object.entries(tokens)) {
  if (!/^[a-z][a-z0-9-]*$/.test(key) || typeof value !== "string" || /[;{}<>\\n\\r]/.test(value)) throw new Error("Invalid theme token");
}
const css = (mode: string) => Object.entries(theme[mode]).map(([key, value]) => "  --" + key + ": " + value + ";").join("\\n");
await Bun.write("app/crafter-theme.css", ":root {\\n" + css("light") + "\\n}\\n.dark {\\n" + css("dark") + "\\n}\\n");
`,
);
const globals = path.join(target, "app/globals.css");
await Bun.write(
  globals,
  '@import "./crafter-theme.css";\n' + (await Bun.file(globals).text()),
);
const pkgPath = path.join(target, "package.json");
const pkg = await Bun.file(pkgPath).json();
for (const dependency of [
  "eslint",
  "eslint-config-next",
  "prettier",
  "prettier-plugin-tailwindcss",
])
  delete pkg.devDependencies[dependency];
pkg.scripts = {
  ...pkg.scripts,
  dev: "bun scripts/sync-theme.ts && next dev",
  build: "bun scripts/sync-theme.ts && next build",
  lint: "biome check app scripts",
  format: "biome format --write app scripts",
};
await Bun.write(pkgPath, JSON.stringify(pkg, null, 2));
for (const file of [
  "eslint.config.mjs",
  ".prettierrc",
  ".prettierrc.json",
  "prettier.config.mjs",
])
  await rm(path.join(target, file), { force: true });
await Bun.write(
  path.join(target, "biome.json"),
  JSON.stringify(
    {
      files: {
        includes: ["**", "!.next", "!node_modules", "!app/crafter-theme.css"],
      },
      css: { parser: { tailwindDirectives: true } },
    },
    null,
    2,
  ),
);
await run(["bun", "add", "-d", "@types/bun", "@biomejs/biome"], target);
const buttonImport = existsSync(path.join(target, "components/ui/button.tsx"))
  ? 'import { Button } from "@/components/ui/button";'
  : 'const Button = "button";';
const inputImport = existsSync(path.join(target, "components/ui/input.tsx"))
  ? 'import { Input } from "@/components/ui/input";'
  : 'const Input = "input";';
await Bun.write(
  path.join(target, "app/page.tsx"),
  `"use client";
import { useState } from "react";
${buttonImport}
${inputImport}
export default function Page() {
  const [saved, setSaved] = useState(false);
  return <main className="min-h-screen bg-background text-foreground p-6 sm:p-12"><div className="max-w-xl mx-auto space-y-6"><p className="text-sm text-muted-foreground">${config.name}</p><h1 className="text-4xl font-semibold tracking-tight">Your next project starts here.</h1><p className="text-muted-foreground">Your components, light and dark tokens, and agent skill are installed.</p><section className="border border-border rounded-[var(--radius)] p-6 space-y-4"><label htmlFor="project" className="text-sm">Project name</label><Input id="project" placeholder="Something worth making" className="w-full" /><Button onClick={() => setSaved(true)}>Create project</Button><p role="status" className="text-sm text-muted-foreground">{saved ? "Example saved. Build your real workflow here." : "Try your components."}</p></section><Button onClick={() => document.documentElement.classList.toggle("dark")}>Toggle theme</Button></div></main>;
}
`,
);
await run(["bun", "scripts/sync-theme.ts"], target);
await run(
  ["bunx", "--bun", "biome", "check", "--write", "app", "scripts"],
  target,
);
console.log(
  `\nReady at ${target}\nRun: cd ${target} && bun run dev\nYour agent skill is installed at ${skill}.`,
);
