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
  radius: "soft",
  font: "sans",
  components: [...componentNames],
};
export const accents = {
  ink: ["#20221d", "#f8e9a4"],
  forest: ["#256344", "#95d6ad"],
  blue: ["#2457c5", "#adc6ff"],
  orange: ["#a83d16", "#ffb398"],
} as const;
export const radii = {
  sharp: "0rem",
  soft: "0.375rem",
  round: "1rem",
} as const;
export const fonts = {
  sans: '"Crafter Sans Text", ui-sans-serif, system-ui, sans-serif',
  mono: "ui-monospace, SFMono-Regular, monospace",
} as const;

export function themeVariables(
  config: LibraryConfig,
  dark = false,
): Record<string, string> {
  const base = dark
    ? {
        background: "#191b17",
        foreground: "#f3f3e9",
        card: "#22251f",
        "card-foreground": "#f3f3e9",
        popover: "#282b24",
        "popover-foreground": "#f3f3e9",
        secondary: "#2b2e26",
        "secondary-foreground": "#f3f3e9",
        muted: "#2b2e26",
        "muted-foreground": "#b3b7a8",
        accent: "#33362d",
        "accent-foreground": "#f3f3e9",
        border: "#41443a",
        input: "#5f6454",
        destructive: "#f08080",
      }
    : {
        background: "#f7f7f2",
        foreground: "#20221d",
        card: "#efefe8",
        "card-foreground": "#20221d",
        popover: "#ffffff",
        "popover-foreground": "#20221d",
        secondary: "#e5e6dc",
        "secondary-foreground": "#20221d",
        muted: "#eeefe7",
        "muted-foreground": "#60635a",
        accent: "#e6e7de",
        "accent-foreground": "#20221d",
        border: "#cfd1c8",
        input: "#c6c9ba",
        destructive: "#a02828",
      };
  return {
    ...base,
    "syntax-text": dark ? "#f3f3e9" : "#20221d",
    "syntax-keyword": dark ? "#c6a3df" : "#754399",
    "syntax-string": dark ? "#a0c18b" : "#3c5f2c",
    "syntax-function": dark ? "#9cbedf" : "#2f5884",
    "syntax-number": dark ? "#f4d56d" : "#705400",
    "syntax-comment": dark ? "#b3b7a8" : "#60635a",
    "syntax-punctuation": dark ? "#b9bcae" : "#5a5d54",
    "syntax-type": dark ? "#dda2aa" : "#7c464c",
    "syntax-background": dark ? "#22251f" : "#efefe8",

    sidebar: base.muted,
    "sidebar-foreground": base.foreground,
    "sidebar-primary": accents[config.accent][dark ? 1 : 0],
    "sidebar-primary-foreground": dark ? "#20221d" : "#f7f7f2",
    "sidebar-accent": base.accent,
    "sidebar-accent-foreground": base.foreground,
    "sidebar-border": base.border,
    "sidebar-ring": accents[config.accent][dark ? 1 : 0],
    "chart-1": accents[config.accent][dark ? 1 : 0],
    "chart-2": dark ? "#a0c18b" : "#53743e",
    "chart-3": dark ? "#598bc0" : "#598bc0",
    "chart-4": dark ? "#9177c5" : "#9177c5",
    "chart-5": dark ? "#d18147" : "#d18147",
    primary: accents[config.accent][dark ? 1 : 0],
    "primary-foreground": dark ? "#20221d" : "#f7f7f2",
    ring: accents[config.accent][dark ? 1 : 0],
    radius: radii[config.radius],
    "font-sans": fonts[config.font],
    "control-height": "2.75rem",
    ...config.theme?.[dark ? "dark" : "light"],
  };
}

const usesCrafterSans = (config: LibraryConfig) =>
  themeVariables(config)["font-sans"].startsWith('"Crafter Sans Text"');

// 16px interface default with a 14px floor for compact labels.
export function typeScale(config: LibraryConfig): Record<string, string> {
  return {
    "text-xs": "0.875rem",
    "text-sm": "1rem",
    "font-heading": usesCrafterSans(config)
      ? '"Crafter Sans", var(--font-sans)'
      : "var(--font-sans)",
  };
}

export function baseCss(config: LibraryConfig) {
  // shadcn cannot merge @font-face blocks, so the faces ship as a local
  // stylesheet that Tailwind inlines in place.
  const fonts = usesCrafterSans(config)
    ? { '@import "./crafter-sans.css"': {} }
    : {};
  return {
    ...fonts,
    "@layer base": {
      "h1, h2, h3": {
        "font-family": "var(--font-heading)",
        "font-weight": "500",
        "letter-spacing": "-0.035em",
      },
    },
    "@utility eyebrow": {
      display: "flex",
      "align-items": "center",
      gap: "12px",
      "font-size": "14px",
      "line-height": "1.6",
      "letter-spacing": "0.04em",
      "text-transform": "uppercase",
      "&::before": {
        content: '""',
        width: "7px",
        height: "7px",
        "flex-shrink": "0",
        background: "var(--ring)",
      },
    },
  };
}

const crafterFaces = [
  ["Crafter Sans", "CrafterSansPreview-Medium", 500],
  ["Crafter Sans Text", "CrafterSansTextPreview-Regular", 400],
  ["Crafter Sans Text", "CrafterSansTextPreview-Medium", 500],
  ["Crafter Sans Text", "CrafterSansTextPreview-SemiBold", 600],
  ["Crafter Sans Text", "CrafterSansTextPreview-Bold", 700],
] as const;

export function fontFiles(config: LibraryConfig) {
  if (!usesCrafterSans(config)) return [];
  const notice =
    '/* Crafter Sans: SIL Open Font License 1.1, Reserved Font Name "Crafter Sans". https://ui.crafter.run/fonts/OFL.txt */\n';
  const content =
    notice +
    crafterFaces
      .map(
        ([family, file, weight]) =>
          `@font-face {\n  font-family: "${family}";\n  src: url("https://ui.crafter.run/fonts/${file}.woff2") format("woff2");\n  font-weight: ${weight};\n  font-display: swap;\n}\n`,
      )
      .join("");
  return [
    {
      path: "app/crafter-sans.css",
      type: "registry:file" as const,
      target: "app/crafter-sans.css",
      content,
    },
  ];
}
