import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { componentHref, documentation } from "./documentation";

const officialComponents =
  "accordion alert alert-dialog aspect-ratio attachment avatar badge breadcrumb bubble button button-group calendar card carousel chart checkbox collapsible combobox command context-menu data-table date-picker dialog direction drawer dropdown-menu empty field hover-card input input-group input-otp item kbd label marker menubar message message-scroller native-select navigation-menu pagination popover progress questionnaire radio-group resizable scroll-area select separator sheet sidebar skeleton slider spinner switch table tabs textarea toast toggle toggle-group tooltip typography".split(
    " ",
  );

describe("component documentation coverage", () => {
  test("every official component has one route, a live example and source", () => {
    const foundations = documentation.filter(
      (entry) => entry.family === "shadcn",
    );
    expect(foundations.map((entry) => entry.name).sort()).toEqual(
      [...officialComponents].sort(),
    );
    expect(new Set(documentation.map(componentHref)).size).toBe(
      documentation.length,
    );
    for (const entry of foundations) {
      expect(existsSync(`components/examples/${entry.name}.tsx`)).toBe(true);
      const recipe = ["data-table", "date-picker", "typography"].includes(
        entry.name,
      );
      expect(
        existsSync(
          `components/${recipe ? "examples" : "ui"}/${entry.name}.tsx`,
        ),
      ).toBe(true);
    }
  });
  test("Crafter includes reusable source at each atomic level", () => {
    for (const level of ["Atoms", "Molecules", "Organisms"]) {
      const entries = documentation.filter(
        (entry) => entry.family === "crafter" && entry.level === level,
      );
      expect(entries.length).toBeGreaterThanOrEqual(3);
      for (const entry of entries)
        expect(existsSync(`components/ui/${entry.name}.tsx`)).toBe(true);
    }
  });
});
