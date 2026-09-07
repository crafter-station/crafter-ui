import { z } from "zod";
import { exportCatalog } from "@/lib/export-catalog";

const componentNames = exportCatalog.map((entry) => entry.name);

import { themeDocumentSchema } from "@/lib/theme-schema";

export const librarySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(48)
    .regex(
      /^[\p{L}\p{N} ._-]+$/u,
      "Use letters, numbers, spaces, dots, hyphens, or underscores.",
    ),
  slug: z
    .string()
    .min(2)
    .max(40)
    .regex(
      /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
      "Use lowercase words separated by hyphens.",
    ),
  homepage: z
    .url()
    .max(200)
    .refine((value) => {
      const url = new URL(value);
      return (
        ["https:", "http:"].includes(url.protocol) &&
        !url.username &&
        !url.password &&
        !url.search &&
        !url.hash &&
        url.pathname === "/"
      );
    }, "Enter an http(s) origin without a path, credentials, or query."),
  accent: z.enum(["ink", "forest", "blue", "orange"]),
  radius: z.enum(["sharp", "soft", "round"]),
  font: z.enum(["sans", "mono"]),
  theme: themeDocumentSchema.optional(),
  components: z
    .array(
      z.enum(
        componentNames as [
          (typeof componentNames)[number],
          ...(typeof componentNames)[number][],
        ],
      ),
    )
    .min(1)
    .max(componentNames.length)
    .refine(
      (values) => new Set(values).size === values.length,
      "Select each component once.",
    ),
});

export type LibraryConfig = z.infer<typeof librarySchema>;
export const defaultConfig: LibraryConfig = {
  name: "Crafter UI",
  slug: "crafter",
  homepage: "https://ui.crafter.run",
  accent: "ink",
  radius: "sharp",
  font: "sans",
  components: [...componentNames],
};
export const accents = {
  ink: ["#141414", "#fafafa"],
  forest: ["#256344", "#95d6ad"],
  blue: ["#2457c5", "#adc6ff"],
  orange: ["#a83d16", "#ffb398"],
} as const;
export const radii = {
  sharp: "0rem",
  soft: "0.625rem",
  round: "1rem",
} as const;
export const fonts = {
  sans: "ui-sans-serif, system-ui, sans-serif",
  mono: "ui-monospace, SFMono-Regular, monospace",
} as const;

export function themeVariables(
  config: LibraryConfig,
  dark = false,
): Record<string, string> {
  const base = dark
    ? {
        background: "#141414",
        foreground: "#fafafa",
        card: "#1c1c1c",
        "card-foreground": "#fafafa",
        popover: "#1c1c1c",
        "popover-foreground": "#fafafa",
        secondary: "#262626",
        "secondary-foreground": "#fafafa",
        muted: "#262626",
        "muted-foreground": "#a3a3a3",
        accent: "#303030",
        "accent-foreground": "#fafafa",
        border: "#404040",
        input: "#404040",
        destructive: "#ff9d9d",
      }
    : {
        background: "#ffffff",
        foreground: "#141414",
        card: "#ffffff",
        "card-foreground": "#141414",
        popover: "#ffffff",
        "popover-foreground": "#141414",
        secondary: "#f5f5f5",
        "secondary-foreground": "#141414",
        muted: "#f5f5f5",
        "muted-foreground": "#6b6b6b",
        accent: "#f0f0f0",
        "accent-foreground": "#141414",
        border: "#e6e6e6",
        input: "#cccccc",
        destructive: "#b91c1c",
      };
  return {
    ...base,
    "syntax-text": dark ? "#ededed" : "#242424",
    "syntax-keyword": dark ? "#c6a3df" : "#754399",
    "syntax-string": dark ? "#98c4a4" : "#326348",
    "syntax-function": dark ? "#9cbedf" : "#315d89",
    "syntax-number": dark ? "#d7b27d" : "#86551f",
    "syntax-comment": dark ? "#a3a3a3" : "#6b6b6b",
    "syntax-punctuation": dark ? "#b0b0b0" : "#616161",
    "syntax-type": dark ? "#dda2aa" : "#7c464c",
    "syntax-background": dark ? "#1b1b1b" : "#f8f8f8",

    sidebar: base.muted,
    "sidebar-foreground": base.foreground,
    "sidebar-primary": accents[config.accent][dark ? 1 : 0],
    "sidebar-primary-foreground": dark ? "#141414" : "#ffffff",
    "sidebar-accent": base.accent,
    "sidebar-accent-foreground": base.foreground,
    "sidebar-border": base.border,
    "sidebar-ring": accents[config.accent][dark ? 1 : 0],
    "chart-1": accents[config.accent][dark ? 1 : 0],
    "chart-2": dark ? "#d4d4d4" : "#525252",
    "chart-3": dark ? "#a3a3a3" : "#737373",
    "chart-4": dark ? "#737373" : "#a3a3a3",
    "chart-5": dark ? "#525252" : "#d4d4d4",
    primary: accents[config.accent][dark ? 1 : 0],
    "primary-foreground": dark ? "#141414" : "#ffffff",
    ring: accents[config.accent][dark ? 1 : 0],
    radius: radii[config.radius],
    "font-sans": fonts[config.font],
    "control-height": "2rem",
    ...config.theme?.[dark ? "dark" : "light"],
  };
}
