import { catalog } from "@/lib/catalog";
import { documentation } from "@/lib/documentation";

export const recipes = new Set(["date-picker", "data-table", "typography"]);
export const exportCatalog = documentation.map((entry) => ({
  ...entry,
  roots:
    entry.family === "crafter"
      ? (catalog
          .find((item) => item.name === entry.name)
          ?.roots.map((root) => `components/ui/${root}.tsx`) ?? [])
      : [
          `components/${recipes.has(entry.name) ? "examples" : "ui"}/${entry.name}.tsx`,
        ],
}));
