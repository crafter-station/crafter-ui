"use client";

import { ArrowRight, Check, Download, RotateCcw } from "lucide-react";
import { type CSSProperties, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { ActionButton } from "@/components/ui/action-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { TextField } from "@/components/ui/text-field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { catalog } from "@/lib/catalog";
import {
  accents,
  defaultConfig,
  type LibraryConfig,
  librarySchema,
  themeVariables,
} from "@/lib/library-config";

export function Studio() {
  const [config, setConfig] = useState<LibraryConfig>(defaultConfig);
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const validation = librarySchema.safeParse(config);
  const previewStyle = Object.fromEntries(
    Object.entries(themeVariables(config)).map(([key, value]) => [
      `--${key}`,
      value,
    ]),
  ) as CSSProperties;
  function update<K extends keyof LibraryConfig>(
    key: K,
    value: LibraryConfig[K],
  ) {
    setConfig((current) => ({ ...current, [key]: value }));
    setDownloaded(false);
    setMessage("");
  }
  async function download() {
    setExporting(true);
    setMessage("");
    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Export failed.");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${config.slug}-registry.zip`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setDownloaded(true);
      setMessage(
        "Library downloaded. Unzip it and follow the included README.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not export. Please try again.",
      );
    } finally {
      setExporting(false);
    }
  }
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main">
        <section id="make-it-yours" className="builder-section">
          <div className="builder-heading">
            <div className="eyebrow">A LIBRARY WITH YOUR NAME ON IT</div>
            <h1>Make the defaults yours.</h1>
            <p>A few choices here. Fewer decisions on every project after.</p>
          </div>
          <div className="builder-grid">
            <div className="builder-controls">
              <div className="step-label">
                <span>01</span> Give it an identity
              </div>
              <FieldGroup>
                <TextField
                  label="Library name"
                  value={config.name}
                  onChange={(event) => update("name", event.target.value)}
                />
                <div className="two-fields">
                  <TextField
                    label="Registry name"
                    value={config.slug}
                    onChange={(event) => update("slug", event.target.value)}
                  />
                  <TextField
                    label="Hosting URL"
                    value={config.homepage}
                    onChange={(event) => update("homepage", event.target.value)}
                  />
                </div>
                <Field>
                  <FieldLabel>Accent</FieldLabel>
                  <ToggleGroup
                    value={[config.accent]}
                    onValueChange={(values) => {
                      if (values[0])
                        update("accent", values[0] as LibraryConfig["accent"]);
                    }}
                    aria-label="Accent color"
                  >
                    {Object.entries(accents).map(([name, colors]) => (
                      <ToggleGroupItem
                        key={name}
                        value={name}
                        aria-label={`${name} accent`}
                      >
                        <span
                          className="color-swatch"
                          style={{ backgroundColor: colors[0] }}
                        />
                        {name}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </Field>
                <div className="two-fields">
                  <Field>
                    <FieldLabel>Corners</FieldLabel>
                    <ToggleGroup
                      value={[config.radius]}
                      onValueChange={(values) => {
                        if (values[0])
                          update(
                            "radius",
                            values[0] as LibraryConfig["radius"],
                          );
                      }}
                      aria-label="Corner style"
                    >
                      {["sharp", "soft", "round"].map((value) => (
                        <ToggleGroupItem key={value} value={value}>
                          {value}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </Field>
                  <Field>
                    <FieldLabel>Type</FieldLabel>
                    <ToggleGroup
                      value={[config.font]}
                      onValueChange={(values) => {
                        if (values[0])
                          update("font", values[0] as LibraryConfig["font"]);
                      }}
                      aria-label="Font style"
                    >
                      <ToggleGroupItem value="sans">Sans</ToggleGroupItem>
                      <ToggleGroupItem value="mono">Mono</ToggleGroupItem>
                    </ToggleGroup>
                  </Field>
                </div>
              </FieldGroup>
              <div className="step-label selection-label">
                <span>02</span> Pack your essentials
              </div>
              <fieldset className="component-selection">
                <legend className="sr-only">Components to include</legend>
                {catalog.map((item) => (
                  <label key={item.name}>
                    <input
                      type="checkbox"
                      checked={config.components.includes(item.name)}
                      onChange={(event) =>
                        update(
                          "components",
                          event.target.checked
                            ? [...config.components, item.name]
                            : config.components.filter(
                                (name) => name !== item.name,
                              ),
                        )
                      }
                    />
                    <span>{item.title}</span>
                  </label>
                ))}
              </fieldset>
            </div>
            <div className="export-panel">
              <div
                className="export-preview bg-background text-foreground"
                style={previewStyle}
              >
                <div className="export-preview-top">
                  <span className="library-monogram">
                    {config.name.slice(0, 1).toUpperCase()}
                  </span>
                  <Badge variant="outline">Your library</Badge>
                </div>
                <h3>{config.name || "Your library"}</h3>
                <p>
                  {config.components.length} components. One familiar starting
                  point.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button>
                    Make something <ArrowRight data-icon="inline-end" />
                  </Button>
                  <Button variant="outline">Your way</Button>
                </div>
              </div>
              <div className="export-details">
                <div className="step-label">
                  <span>03</span> Take it with you
                </div>
                <ul>
                  <li>
                    <Check size={15} /> Editable React components
                  </li>
                  <li>
                    <Check size={15} /> Your light and dark theme
                  </li>
                  <li>
                    <Check size={15} /> Ready-to-host shadcn registry
                  </li>
                  <li>
                    <Check size={15} /> Setup guide and agent instructions
                  </li>
                </ul>
                {!validation.success && (
                  <p className="validation-message" role="alert">
                    {validation.error.issues[0].message}
                  </p>
                )}
                <ActionButton
                  className="w-full"
                  size="lg"
                  pending={exporting}
                  pendingLabel="Packing your library…"
                  disabled={!validation.success}
                  onClick={download}
                >
                  <Download data-icon="inline-start" />
                  {downloaded ? "Download again" : "Download your library"}
                </ActionButton>
                <p className="export-footnote">
                  A ZIP you own. No account. No lock-in.
                </p>
                <p role="status" className="export-message">
                  {message}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setConfig(defaultConfig);
                    setDownloaded(false);
                    setMessage("");
                  }}
                >
                  <RotateCcw data-icon="inline-start" />
                  Reset defaults
                </Button>
              </div>
            </div>
          </div>
        </section>
        <footer className="site-footer">
          <a href="https://crafter.run">Made at Crafter Station ↗</a>
          <span>Keep the source. Make it yours.</span>
          <a href="https://ui.shadcn.com/docs/registry">Built on shadcn/ui ↗</a>
        </footer>
      </main>
    </div>
  );
}
