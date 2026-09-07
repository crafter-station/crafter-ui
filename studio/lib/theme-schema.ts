import { z } from "zod";

export const tokenNames = [
  "syntax-text",
  "syntax-keyword",
  "syntax-string",
  "syntax-function",
  "syntax-number",
  "syntax-comment",
  "syntax-punctuation",
  "syntax-type",
  "syntax-background",
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "border",
  "input",
  "ring",
  "destructive",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "radius",
  "font-sans",
  "control-height",
] as const;
export const tokenMapSchema = z
  .partialRecord(z.enum(tokenNames), z.string().min(1).max(160))
  .superRefine((tokens, ctx) => {
    for (const [key, value] of Object.entries(tokens)) {
      if (!value) continue;
      const valid =
        key === "font-sans"
          ? /^[a-zA-Z0-9 ,"'-]+$/.test(value)
          : key === "radius" || key === "control-height"
            ? /^(?:0|\d+(?:\.\d+)?(?:px|rem))$/.test(value) &&
              Number.parseFloat(value) <= (value.endsWith("rem") ? 4 : 64)
            : /^(?:#[\da-fA-F]{3,8}|(?:oklch|oklab|rgb|rgba|hsl|hsla)\([\d\s.,%+\-/]+\))$/.test(
                value,
              );
      if (!valid)
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: `Invalid ${key} value. Use a color, a bounded px/rem length, or a font stack.`,
        });
    }
  });
export const themeDocumentSchema = z
  .object({
    version: z.literal(1),
    light: tokenMapSchema,
    dark: tokenMapSchema,
  })
  .strict();
export type ThemeDocument = z.infer<typeof themeDocumentSchema>;
export const patchThemeSchema = z
  .object({
    expectedRevision: z.number().int().min(0),
    mode: z.enum(["light", "dark"]),
    tokens: tokenMapSchema,
  })
  .strict();
