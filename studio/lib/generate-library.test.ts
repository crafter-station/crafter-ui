import { describe, expect, test } from "bun:test";
import { generateLibrary } from "./generate-library";
import { defaultConfig } from "./library-config";

describe("portable library generation", () => {
  test("settings-only export brings its complete dependency closure", () => {
    const result = generateLibrary({
      ...defaultConfig,
      components: ["settings-card"],
    });
    const starter = result.builtItems.find((item) => item.name === "starter");
    expect(starter?.files.map((file) => file.path)).toContain(
      "components/ui/text-field.tsx",
    );
    expect(starter?.files.map((file) => file.path)).toContain(
      "components/ui/action-button.tsx",
    );
    expect(starter?.files.map((file) => file.path)).toContain(
      "components/ui/spinner.tsx",
    );
    expect(starter?.files.map((file) => file.path)).not.toContain(
      "components/ui/copy-button.tsx",
    );
    expect(
      starter?.dependencies.some((dependency) =>
        dependency.startsWith("@base-ui/react@"),
      ),
    ).toBe(true);
    for (const item of result.builtItems) {
      const paths = new Set(item.files.map((file) => file.path));
      for (const file of item.files) {
        for (const match of file.content.matchAll(/from ["']@\/([^"']+)["']/g))
          expect(paths.has(`${match[1]}.tsx`)).toBe(true);
      }
    }
  });
  test("two identities generate independent tokens, docs, and registries", () => {
    const first = generateLibrary(defaultConfig);
    const second = generateLibrary({
      ...defaultConfig,
      name: "Luna UI",
      slug: "luna",
      homepage: "https://luna.example",
      accent: "blue",
      radius: "sharp",
      font: "mono",
    });
    expect(second.registry.name).toBe("luna");
    expect(second.builtItems[0].cssVars.light.radius).toBe("0rem");
    expect(second.builtItems[0].cssVars.light.primary).not.toBe(
      first.builtItems[0].cssVars.light.primary,
    );
    expect(second.files["README.md"]).toContain(
      "https://luna.example/r/starter.json",
    );
    expect(second.files["README.md"]).not.toContain("https://ui.crafter.run");
    expect(second.files["public/llms.txt"]).toContain("# Luna UI");
  });
  test.each([
    { slug: "../escape" },
    { slug: "bad name" },
    { name: "<script>" },
    { homepage: "javascript:alert(1)" },
    { homepage: "https://host.test/path" },
    { homepage: "https://host.test/?x=1" },
    { components: [] },
    { components: ["unknown"] },
    { components: ["copy-button", "copy-button"] },
  ])("rejects invalid configuration %j", (change) => {
    expect(() => generateLibrary({ ...defaultConfig, ...change })).toThrow();
  });
  test("built payloads contain source; source manifest remains rebuildable", () => {
    const result = generateLibrary(defaultConfig);
    for (const item of result.registry.items)
      for (const file of item.files)
        expect(result.files[file.path]).toBeTruthy();
    const payload = JSON.parse(result.files["public/r/starter.json"]);
    expect(payload.type).toBe("registry:style");
    expect(JSON.parse(result.files["public/r/theme.json"]).type).toBe(
      "registry:theme",
    );
    expect(
      payload.files.every(
        (file: { content: string }) => file.content.length > 0,
      ),
    ).toBe(true);
    expect(
      new Set(payload.files.map((file: { path: string }) => file.path)).size,
    ).toBe(payload.files.length);
  });
});
