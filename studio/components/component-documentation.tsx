"use client";

import { ArrowLeft, ArrowRight, Moon, RotateCcw, Sun } from "lucide-react";
import Link from "next/link";
import { type CSSProperties, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { ComponentPreview } from "@/components/component-preview";
import { FoundationPreview } from "@/components/foundation-preview";
import { useTheme } from "@/components/theme-workbench";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ComponentName } from "@/lib/catalog";
import {
  componentHref,
  type DocumentationEntry,
  documentation,
} from "@/lib/documentation";
import { setThemeMode } from "@/lib/theme-store";

export function ComponentDocumentation({
  entry,
  source,
  exampleSource,
}: {
  entry: DocumentationEntry;
  source: string;
  exampleSource?: string;
}) {
  const [view, setView] = useState("preview");

  const [revision, setRevision] = useState(0);
  const sharedTheme = useTheme();
  const dark = sharedTheme.mode === "dark";
  const tokens = sharedTheme.theme[dark ? "dark" : "light"];
  const style = Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [`--${key}`, value]),
  ) as CSSProperties;
  const command = `bunx --bun shadcn@4.21.0 add http://localhost:4324/r/${entry.name}.json`;
  const index = documentation.findIndex((item) => item.name === entry.name);
  const symbol = entry.title
    .replace(/(?:^|\s)\S/g, (letter) => letter.toUpperCase())
    .replaceAll(" ", "");
  const symbols =
    entry.name === "card"
      ? "Card, CardHeader, CardTitle, CardContent"
      : entry.name === "dialog"
        ? "Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription"
        : entry.name === "command-palette"
          ? "CommandPalette, CommandPaletteTrigger, CommandPaletteItemContent"
          : symbol;
  const buttonImport = ["dialog", "empty-state"].includes(entry.name)
    ? 'import { Button } from "@/components/ui/button";\n'
    : "";
  const usage =
    exampleSource ||
    `${buttonImport}import { ${symbols} } from "@/components/ui/${entry.name}";\n\n${entry.usage}`;
  return (
    <article
      className="component-doc"
      data-markdown={`# ${entry.title}\n\n${entry.description}\n\n## Installation\n\n\`\`\`bash\n${command}\n\`\`\`\n\n## Usage\n\n\`\`\`tsx\n${usage}\n\`\`\`\n\n## Source\n\n\`\`\`tsx\n${source}\n\`\`\``}
    >
      <style>{`body:has(.doc-preview.dark) [data-base-ui-portal] { ${Object.entries(
        sharedTheme.theme.dark,
      )
        .map(([key, value]) => `--${key}: ${value};`)
        .join(" ")} color-scheme: dark; }`}</style>
      <div className="doc-breadcrumb">
        <Link href="/components">Components</Link>
        <span>/</span>
        <span>
          {entry.family === "shadcn" ? "shadcn" : `Crafter · ${entry.level}`}
        </span>
        <span>/</span>
        <span>{entry.title}</span>
      </div>
      <div className="doc-heading">
        <div>
          <h1>{entry.title}</h1>
          <p>{entry.description}</p>
        </div>
        <Badge variant="outline">
          {entry.family === "shadcn"
            ? "shadcn / Base UI"
            : `Crafter ${entry.level.slice(0, -1)}`}
        </Badge>
      </div>
      <div className="doc-preview-toolbar">
        <ToggleGroup
          aria-label="Component example view"
          value={[view]}
          onValueChange={(values) => values[0] && setView(values[0])}
        >
          <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
          <ToggleGroupItem value="usage">Usage</ToggleGroupItem>
          <ToggleGroupItem value="source">Source</ToggleGroupItem>
        </ToggleGroup>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Reset example"
            onClick={() => setRevision(revision + 1)}
          >
            <RotateCcw />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label={dark ? "Light preview" : "Dark preview"}
            onClick={() => setThemeMode(dark ? "light" : "dark")}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
      <div
        className={`doc-preview ${dark ? "dark" : ""} ${view !== "preview" ? "code-view" : ""}`}
        style={style}
      >
        {view === "preview" ? (
          <div key={`${entry.name}-${revision}`}>
            {entry.family === "shadcn" ? (
              <FoundationPreview
                name={entry.name}
                themeStyle={style}
                dark={dark}
              />
            ) : (
              <ComponentPreview name={entry.name as ComponentName} />
            )}
          </div>
        ) : (
          <div className="doc-code">
            <CodeBlock
              code={view === "source" ? source : usage}
              language="tsx"
            />
          </div>
        )}
      </div>
      <div className="doc-preview-footer">
        <span>CRAFTER STYLE</span>
        <Link className="doc-text-link" href="/create">
          Open style generator ↗
        </Link>
        <span className="preview-live-label">Interactive · React 19</span>
      </div>
      <div className="doc-sections">
        <section id="installation">
          <h2>Installation</h2>
          <p>
            {entry.family === "shadcn"
              ? "Add the shadcn primitive and the shared Crafter theme to a Base UI project. The theme updates your project-wide tokens."
              : "Add the Crafter composition to your shadcn Base UI project. You own the source."}
          </p>
          <CodeBlock code={command} />
          <Link className="doc-text-link" href="/docs">
            First time here? Read the setup guide ↗
          </Link>
        </section>
        <section id="composition">
          <h2>Composition</h2>
          <p>
            {entry.family === "shadcn"
              ? "A foundation for your own components. The source stays close to the upstream API."
              : "A named, reusable unit built from smaller pieces. Keep it independent until your product needs a larger composition."}
          </p>
          <div className="composition-chain">
            {entry.parts.map((part, i) => {
              const related = documentation.find(
                (item) => item.title.toLowerCase() === part.toLowerCase(),
              );
              return (
                <span key={part}>
                  {i > 0 && <span className="composition-plus">+</span>}
                  {related ? (
                    <Link href={componentHref(related)}>{part}</Link>
                  ) : (
                    <span className="composition-piece">{part}</span>
                  )}
                </span>
              );
            })}
          </div>
        </section>
        <section id="ownership">
          <h2>
            {entry.family === "shadcn"
              ? "From the foundation"
              : "Make it yours"}
          </h2>
          <p>
            {entry.family === "shadcn"
              ? "These primitives use shadcn Base UI with the same Crafter colors, typography and corners as this entire site. Customize that shared identity in the style generator."
              : "Install a single component, or choose your theme and a collection to export together. Crafter defaults are monochrome with sharp corners."}
          </p>
          <Link
            className="doc-text-link"
            href={
              entry.family === "shadcn"
                ? `https://ui.shadcn.com/docs/components/base/${entry.name}`
                : "/create"
            }
          >
            {entry.family === "shadcn"
              ? "Upstream documentation ↗"
              : "Create your library ↗"}
          </Link>
        </section>
      </div>
      <nav className="doc-pagination" aria-label="Adjacent components">
        {documentation[index - 1] ? (
          <Link href={componentHref(documentation[index - 1])}>
            <ArrowLeft size={15} />
            {documentation[index - 1].title}
          </Link>
        ) : (
          <span />
        )}
        {documentation[index + 1] && (
          <Link href={componentHref(documentation[index + 1])}>
            {documentation[index + 1].title}
            <ArrowRight size={15} />
          </Link>
        )}
      </nav>
    </article>
  );
}
