import { afterAll, describe, expect, test } from "bun:test";
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { writeBundle } from "../write-bundle";
import { extractionBundle, extractProject } from "./extract";

const temporary: string[] = [];
afterAll(async () => {
  await Promise.all(
    temporary.map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});
async function fixture(files: Record<string, string>) {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "crafter-extract-test-"),
  );
  temporary.push(directory);
  const defaults = {
    "package.json": JSON.stringify({
      dependencies: { react: "19.2.8", clsx: "2.1.1" },
    }),
    "tsconfig.json": JSON.stringify({
      compilerOptions: {
        baseUrl: ".",
        paths: { "~/*": ["src/*"] },
        jsx: "react-jsx",
        moduleResolution: "bundler",
        module: "esnext",
      },
    }),
  };
  for (const [name, source] of Object.entries({ ...defaults, ...files })) {
    await mkdir(path.dirname(path.join(directory, name)), { recursive: true });
    await writeFile(path.join(directory, name), source);
  }
  return directory;
}
const options = (project: string) => ({
  project,
  entries: ["src/component.tsx"],
  name: "Example UI",
  slug: "example-ui",
  homepage: "https://example.com",
});

describe("source extraction", () => {
  test("resolves aliases, re-exports, cycles, type imports, index modules and JSON without changing source", async () => {
    const project = await fixture({
      "src/component.tsx":
        'import { label } from "~/helpers"; import type { Label } from "./types"; import config from "./config.json"; export const Component = () => <div>{label + config.suffix}</div>;',
      "src/helpers/index.ts": 'export { label } from "./label.js";',
      "src/helpers/label.ts":
        'import type { Label } from "../types"; export const label: Label = "Hello";',
      "src/types.ts":
        'import type { label } from "./helpers/label"; export type Label = string;',
      "src/config.json": '{"suffix":"!"}',
    });
    const before = await readFile(
      path.join(project, "src/component.tsx"),
      "utf8",
    );
    const result = await extractProject(options(project));
    expect(result.issues).toEqual([]);
    expect(result.sources).toHaveLength(5);
    expect(
      result.sources.find((file) => file.path === "src/component.tsx")?.content,
    ).toContain('from "./helpers/index"');
    expect(
      result.sources.find((file) => file.path === "src/helpers/index.ts")
        ?.content,
    ).toContain('from "./label"');
    expect(
      await readFile(path.join(project, "src/component.tsx"), "utf8"),
    ).toBe(before);
    const bundle = extractionBundle(result);
    const payload = JSON.parse(bundle["public/r/example-ui.json"]);
    expect(
      payload.files.find((file: { path: string }) =>
        file.path.endsWith("src/config.json"),
      ).target,
    ).toBe("@components/example-ui/src/config.json");
    expect(
      payload.files.every(
        (file: { content: string }) => !file.content.includes('"~/'),
      ),
    ).toBe(true);
  });
  test("resolves imported SVG through tsconfig aliases", async () => {
    const project = await fixture({
      "src/component.tsx":
        'import icon from "~/icon.svg"; export const Component = () => <img src={icon} alt="Icon" />;',
      "src/icon.svg": '<svg xmlns="http://www.w3.org/2000/svg" />',
    });
    const result = await extractProject(options(project));
    expect(result.issues).toEqual([]);
    expect(result.sources.map((file) => file.path)).toContain("src/icon.svg");
    expect(
      result.sources.find((file) => file.path === "src/component.tsx")?.content,
    ).toContain('from "./icon.svg"');
  });
  test("keeps declared package subpaths and avoids reinstalling React", async () => {
    const project = await fixture({
      "src/component.tsx":
        'import { useState } from "react"; import clsx from "clsx"; export const Component = () => <div className={clsx("flex")} />;',
    });
    const result = await extractProject(options(project));
    expect(result.dependencies).toEqual(["clsx@2.1.1"]);
    expect(result.requirements).toContain("react 19.2.8");
    expect(result.issues).toEqual([]);
  });
  test("collects literal dynamic imports", async () => {
    const project = await fixture({
      "src/component.tsx": 'export const load = () => import("~/helper");',
      "src/helper.ts": 'export const value = "ready";',
    });
    const result = await extractProject(options(project));
    expect(result.sources).toHaveLength(2);
    expect(
      result.sources.find((file) => file.path === "src/component.tsx")?.content,
    ).toContain('import("./helper")');
  });
  test.each([
    [
      'import "./missing"; export const Component = () => null;',
      "unresolved-import",
    ],
    [
      'import "~/missing"; export const Component = () => null;',
      "unresolved-import",
    ],
    ['import missing from "undeclared-package";', "undeclared-package"],
    ["export const load = (name: string) => import(name);", "dynamic-import"],
    ['import fs from "node:fs";', "server-dependency"],
    ['"use server"; export async function action() {}', "server-directive"],
    ["export const key = process.env.API_KEY;", "environment"],
    [
      'export const Component = () => <img src="/logo.png" alt="Logo" />;',
      "public-asset",
    ],
    ['import icon from "./icon.svg?react";', "loader-import"],
  ])("blocks unsupported dependency %s", async (source, code) => {
    const result = await extractProject(
      options(await fixture({ "src/component.tsx": source })),
    );
    expect(result.issues.some((issue) => issue.code === code)).toBe(true);
    expect(() => extractionBundle(result)).toThrow();
  });
  test("blocks stylesheets instead of silently dropping them", async () => {
    const project = await fixture({
      "src/component.tsx":
        'import "./style.css"; export const Component = () => null;',
      "src/style.css": ".custom { color: red; }",
    });
    const result = await extractProject(options(project));
    expect(
      result.issues.some((issue) => issue.code === "unsupported-file"),
    ).toBe(true);
  });
  test("blocks symlinks outside the selected project", async () => {
    const project = await fixture({
      "src/component.tsx": 'import "./external";',
    });
    const outside = await fixture({
      "secret.ts": 'export const secret = "never bundled";',
    });
    await symlink(
      path.join(outside, "secret.ts"),
      path.join(project, "src/external.ts"),
    );
    const result = await extractProject(options(project));
    expect(result.issues.some((issue) => issue.code === "outside-source")).toBe(
      true,
    );
    expect(
      result.sources.some((file) => file.content.includes("never bundled")),
    ).toBe(false);
  });
  test("extracts used utility functions without unrelated registry data or environment code", async () => {
    const project = await fixture({
      "src/component.tsx":
        'import { cn } from "./utils"; export const Component = () => <div className={cn("flex")} />;',
      "src/utils.ts":
        'import clsx from "clsx"; import data from "./large.json"; export function cn(value: string) { return clsx(value); } export function server() { return process.env.SECRET; } export function registry() { return data; }',
      "src/large.json": '{"unrelated":true}',
    });
    const result = await extractProject(options(project));
    expect(result.issues).toEqual([]);
    expect(result.sources.map((file) => file.path)).not.toContain(
      "src/large.json",
    );
    const utility = result.sources.find((file) => file.path === "src/utils.ts");
    expect(utility?.removedExports).toEqual(["server", "registry"]);
    expect(utility?.content).not.toContain("process.env");
  });
  test("preserves runtime imports and top-level effects while selecting declarations", async () => {
    const project = await fixture({
      "src/component.tsx":
        'import { cn } from "./utils"; export const Component = () => <div>{cn()}</div>;',
      "src/utils.ts":
        'import { initialize } from "./effects"; initialize(); export function cn() { return "ready"; } export function unused() { return 0; }',
      "src/effects.ts":
        'export function initialize() { globalThis.console.log("initialized"); }',
    });
    const result = await extractProject(options(project));
    expect(result.issues).toEqual([]);
    expect(result.sources.some((file) => file.path === "src/effects.ts")).toBe(
      true,
    );
    expect(
      result.sources.find((file) => file.path === "src/utils.ts")?.content,
    ).toContain("initialize();");
  });
  test("merges requested exports when multiple entries share a utility", async () => {
    const project = await fixture({
      "src/component.tsx":
        'import { first } from "./utils"; export const Component = () => first();',
      "src/other.tsx":
        'import { second } from "./utils"; export const Other = () => second();',
      "src/utils.ts":
        'export function first() { return "first"; } export function second() { return "second"; } export function unused() { return "unused"; }',
    });
    const result = await extractProject({
      ...options(project),
      entries: ["src/component.tsx", "src/other.tsx"],
    });
    const utility = result.sources.find((file) => file.path === "src/utils.ts");
    expect(utility?.exports).toEqual(["first", "second"]);
    expect(utility?.removedExports).toEqual(["unused"]);
    expect(result.issues).toEqual([]);
  });
  test("blocks unpublished workspace packages", async () => {
    const project = await fixture({
      "package.json": '{"dependencies":{"@local/ui":"workspace:*"}}',
      "src/component.tsx": 'import { Button } from "@local/ui";',
    });
    const result = await extractProject(options(project));
    expect(result.issues.some((issue) => issue.code === "local-package")).toBe(
      true,
    );
  });
});

describe("bundle output", () => {
  test("does not overwrite existing content", async () => {
    const directory = await fixture({ "keep.txt": "keep" });
    await expect(writeBundle(directory, { "new.txt": "new" })).rejects.toThrow(
      "empty",
    );
    expect(await readFile(path.join(directory, "keep.txt"), "utf8")).toBe(
      "keep",
    );
  });
  test("cleans up a failed write without partial output", async () => {
    const directory = await fixture({});
    const output = path.join(directory, "output");
    await expect(
      writeBundle(output, { "ok.txt": "okay", "../escape.txt": "bad" }),
    ).rejects.toThrow("Invalid bundle path");
    expect(
      (await readdir(directory)).some((file) =>
        file.startsWith(".crafter-ui-export"),
      ),
    ).toBe(false);
    expect(await readdir(directory)).not.toContain("output");
  });
  test("writes a complete bundle into an empty destination", async () => {
    const directory = await fixture({});
    const output = path.join(directory, "output");
    await mkdir(output);
    await writeBundle(output, {
      "nested/file.txt": "value",
      "registry.json": "{}",
    });
    expect(await readFile(path.join(output, "nested/file.txt"), "utf8")).toBe(
      "value",
    );
  });
});
