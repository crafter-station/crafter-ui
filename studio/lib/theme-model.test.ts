import { describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { generateLibrary } from "./generate-library";
import { defaultConfig } from "./library-config";
import { applyThemePatch, completeTheme, themeFiles } from "./theme-model";

const baseline = completeTheme({ version: 1, light: {}, dark: {} });
describe("shared theme editing", () => {
  test("batch edits preserve other tokens and the opposite mode", () => {
    const { theme, diff } = applyThemePatch(baseline, 4, {
      expectedRevision: 4,
      mode: "light",
      tokens: { primary: "#256344", radius: "0.375rem" },
    });
    expect(theme.light.primary).toBe("#256344");
    expect(theme.dark).toEqual(baseline.dark);
    expect(baseline.light.primary).toBe("#141414");
    expect(diff).toHaveLength(2);
    expect(JSON.parse(themeFiles(theme)["theme.json"])).toEqual(theme);
  });
  test("stale, unknown and unsafe patches cannot partially mutate a theme", () => {
    expect(() =>
      applyThemePatch(baseline, 2, {
        expectedRevision: 1,
        mode: "light",
        tokens: { primary: "#123456" },
      }),
    ).toThrow("Revision conflict");
    for (const tokens of [
      { unknown: "#123456" },
      { primary: "red; background:url(https://example.com)" },
      { radius: "999rem" },
      { "font-sans": "url(foo)" },
    ])
      expect(() =>
        applyThemePatch(baseline, 0, {
          expectedRevision: 0,
          mode: "light",
          tokens,
        }),
      ).toThrow();
    expect(baseline.light.primary).toBe("#141414");
  });
  test("portable registry rebuild consumes the edited theme file", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "crafter-theme-"));
    try {
      const bundle = generateLibrary(defaultConfig);
      for (const [name, content] of Object.entries(bundle.files)) {
        await mkdir(path.dirname(path.join(dir, name)), { recursive: true });
        await writeFile(path.join(dir, name), content);
      }
      const changed = applyThemePatch(baseline, 0, {
        expectedRevision: 0,
        mode: "dark",
        tokens: { primary: "#95d6ad" },
      }).theme;
      await writeFile(path.join(dir, "theme.json"), JSON.stringify(changed));
      const proc = Bun.spawn([process.execPath, "scripts/sync-theme.ts"], {
        cwd: dir,
        stdout: "pipe",
        stderr: "pipe",
      });
      const error = await new Response(proc.stderr).text();
      expect(await proc.exited, error).toBe(0);
      const registry = JSON.parse(
        await readFile(path.join(dir, "registry.json"), "utf8"),
      );
      expect(
        registry.items.find((i: { name: string }) => i.name === "theme").cssVars
          .dark.primary,
      ).toBe("#95d6ad");
      expect(await readFile(path.join(dir, "theme.css"), "utf8")).toContain(
        "--primary: #95d6ad;",
      );
      expect(bundle.files[".agents/skills/crafter-ui/SKILL.md"]).toContain(
        "patch_theme",
      );
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
