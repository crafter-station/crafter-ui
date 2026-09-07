import { z } from "zod";
import { componentNames } from "@/lib/catalog";

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
    primary: accents[config.accent][dark ? 1 : 0],
    "primary-foreground": dark ? "#141414" : "#ffffff",
    ring: accents[config.accent][dark ? 1 : 0],
    radius: radii[config.radius],
    "font-sans": fonts[config.font],
  };
}
