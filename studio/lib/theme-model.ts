import { defaultConfig, themeVariables } from "@/lib/library-config";
import {
  patchThemeSchema,
  type ThemeDocument,
  themeDocumentSchema,
} from "@/lib/theme-schema";

export function completeTheme(input: unknown): ThemeDocument {
  const parsed = themeDocumentSchema.parse(input);
  return {
    version: 1,
    light: { ...themeVariables(defaultConfig), ...parsed.light },
    dark: { ...themeVariables(defaultConfig, true), ...parsed.dark },
  };
}
export function applyThemePatch(
  theme: ThemeDocument,
  revision: number,
  input: unknown,
) {
  const patch = patchThemeSchema.parse(input);
  if (patch.expectedRevision !== revision)
    throw new Error(
      `Revision conflict. Expected ${revision}; call get_theme again.`,
    );
  const diff = Object.entries(patch.tokens)
    .filter(
      ([key, value]) =>
        theme[patch.mode][key as keyof typeof patch.tokens] !== value,
    )
    .map(([token, after]) => ({
      token,
      before: theme[patch.mode][token as keyof typeof patch.tokens],
      after,
    }));
  return {
    theme: completeTheme({
      ...theme,
      [patch.mode]: { ...theme[patch.mode], ...patch.tokens },
    }),
    diff,
  };
}
export function themeFiles(theme: ThemeDocument) {
  const css = (mode: "light" | "dark") =>
    Object.entries(theme[mode])
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");
  return {
    "theme.json": `${JSON.stringify(theme, null, 2)}\n`,
    "theme.css": `:root {\n${css("light")}\n}\n.dark {\n${css("dark")}\n}\n`,
  };
}
