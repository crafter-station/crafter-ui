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
  radius: "soft",
  font: "sans",
  components: [...componentNames],
};
export const accents = {
  ink: ["#242522", "#e8e9e2"],
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
        background: "#171916",
        foreground: "#f3f4ee",
        card: "#1e221c",
        "card-foreground": "#f3f4ee",
        popover: "#1e221c",
        "popover-foreground": "#f3f4ee",
        secondary: "#272b23",
        "secondary-foreground": "#f3f4ee",
        muted: "#272b23",
        "muted-foreground": "#a6ac9b",
        accent: "#303629",
        "accent-foreground": "#f3f4ee",
        border: "#414738",
        input: "#414738",
        destructive: "#ff9d9d",
      }
    : {
        background: "#fafaf7",
        foreground: "#242522",
        card: "#ffffff",
        "card-foreground": "#242522",
        popover: "#ffffff",
        "popover-foreground": "#242522",
        secondary: "#efefea",
        "secondary-foreground": "#242522",
        muted: "#efefea",
        "muted-foreground": "#686a62",
        accent: "#e9ebe2",
        "accent-foreground": "#242522",
        border: "#e0e1da",
        input: "#d7d9d0",
        destructive: "#b91c1c",
      };
  return {
    ...base,
    primary: accents[config.accent][dark ? 1 : 0],
    "primary-foreground": dark ? "#171916" : "#ffffff",
    ring: accents[config.accent][dark ? 1 : 0],
    radius: radii[config.radius],
    "font-sans": fonts[config.font],
  };
}
