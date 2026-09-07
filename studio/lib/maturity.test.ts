import { describe, expect, test } from "bun:test";
import { documentation } from "./documentation";
import { exportCatalog } from "./export-catalog";
import { generateLibrary } from "./generate-library";
import { defaultConfig } from "./library-config";
import { parseLibraryDocument } from "./library-document";

describe("portable library", () => {
  test("exports every documented component with its complete source graph", () => {
    const result = generateLibrary(defaultConfig);
    expect(exportCatalog.map((item) => item.name).sort()).toEqual(
      documentation.map((item) => item.name).sort(),
    );
    for (const entry of exportCatalog) {
      expect(entry.roots.length).toBeGreaterThan(0);
      const item = result.builtItems.find((item) => item.name === entry.name);
      expect(item?.files.length).toBeGreaterThan(0);
      for (const root of entry.roots)
        expect(item?.files.some((file) => file.path === root)).toBe(true);
    }
    expect(
      result.builtItems
        .find((item) => item.name === "sidebar")
        ?.files.some((file) => file.type === "registry:hook"),
    ).toBe(true);
  });
  test("round trips complete library identity, selection and both themes", () => {
    const exported = generateLibrary({
      ...defaultConfig,
      name: "Orbit UI",
      slug: "orbit",
      components: ["dialog", "data-table", "settings-card"],
    });
    const document = {
      version: 1 as const,
      config: {
        ...exported.config,
        theme: JSON.parse(exported.files["theme.json"]),
      },
      mode: "dark" as const,
    };
    expect(parseLibraryDocument(JSON.parse(JSON.stringify(document)))).toEqual(
      document,
    );
    expect(() => parseLibraryDocument({ ...document, version: 2 })).toThrow();
    expect(() =>
      parseLibraryDocument({
        ...document,
        config: { ...document.config, components: ["missing"] },
      }),
    ).toThrow();
    expect(() =>
      parseLibraryDocument({
        ...document,
        config: {
          ...document.config,
          theme: {
            ...document.config.theme,
            light: { primary: "red; color: blue" },
          },
        },
      }),
    ).toThrow();
  });
});
