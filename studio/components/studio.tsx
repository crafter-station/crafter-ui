"use client";

import {
  ArrowDown,
  ArrowRight,
  Box,
  Check,
  Code2,
  Download,
  ExternalLink,
  Layers3,
  Moon,
  Plus,
  RotateCcw,
  Sun,
} from "lucide-react";
import { type CSSProperties, useState } from "react";
import { ActionButton } from "@/components/ui/action-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { SectionHeading } from "@/components/ui/section-heading";
import { SettingsCard } from "@/components/ui/settings-card";
import { TextField } from "@/components/ui/text-field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type ComponentName, catalog } from "@/lib/catalog";
import {
  accents,
  defaultConfig,
  type LibraryConfig,
  librarySchema,
  themeVariables,
} from "@/lib/library-config";

function ComponentPreview({ name }: { name: ComponentName }) {
  const [pending, setPending] = useState(false);
  const [created, setCreated] = useState(false);
  if (name === "action-button")
    return (
      <div className="flex flex-wrap items-center gap-3">
        <ActionButton
          pending={pending}
          pendingLabel="Creating…"
          onClick={async () => {
            setPending(true);
            await new Promise((resolve) => setTimeout(resolve, 900));
            setPending(false);
            setCreated(true);
          }}
        >
          {created ? (
            <Check data-icon="inline-start" />
          ) : (
            <Plus data-icon="inline-start" />
          )}
          {created ? "Project created" : "Create project"}
        </ActionButton>
        <Button variant="outline" onClick={() => setCreated(false)}>
          Reset
        </Button>
        <span role="status" className="sr-only">
          {created ? "Project created" : ""}
        </span>
      </div>
    );
  if (name === "copy-button")
    return (
      <div className="copy-demo">
        <code>bun run dev</code>
        <CopyButton value="bun run dev" />
      </div>
    );
  if (name === "text-field")
    return (
      <div className="w-full max-w-sm">
        <TextField
          label="Project name"
          placeholder="Something worth making"
          description="A small idea is a good place to start."
        />
      </div>
    );
  if (name === "empty-state")
    return (
      <EmptyState
        icon={<Box />}
        title={
          created ? "Your first project is ready" : "Room for your next idea"
        }
        description={
          created
            ? "Keep making things."
            : "Every good project starts with a blank canvas."
        }
        action={
          <Button variant="outline" onClick={() => setCreated(!created)}>
            {created ? "Start again" : "Create a project"}
            <ArrowRight data-icon="inline-end" />
          </Button>
        }
      />
    );
  if (name === "section-heading")
    return (
      <div className="w-full">
        <SectionHeading
          title="Your workspace"
          description="A little less setup. A lot more making."
          action={
            <Button variant="outline" onClick={() => setCreated(!created)}>
              {created ? "Invite copied" : "Invite team"}
            </Button>
          }
        />
      </div>
    );
  return (
    <div className="w-full">
      <SettingsCard
        name="Weekend project"
        onSave={async () => {
          await new Promise((resolve) => setTimeout(resolve, 800));
        }}
      />
    </div>
  );
}

export function Studio() {
  const [config, setConfig] = useState<LibraryConfig>(defaultConfig);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState<ComponentName>("action-button");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [filter, setFilter] = useState("");
  const entry = catalog.find((item) => item.name === active) ?? catalog[0];
  const validation = librarySchema.safeParse(config);
  const previewStyle = Object.fromEntries(
    Object.entries(themeVariables(config, dark)).map(([key, value]) => [
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
  const filtered = catalog.filter((item) =>
    `${item.title} ${item.category}`
      .toLowerCase()
      .includes(filter.toLowerCase()),
  );
  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="/" className="brand">
          <span className="brand-mark">
            <Layers3 size={19} />
          </span>
          crafter<span className="brand-suffix">/ ui</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#components">Components</a>
          <a href="#make-it-yours">Make it yours</a>
          <a href="/llms.txt" className="agent-link">
            llms.txt <ArrowRight size={13} />
          </a>
        </nav>
        <span className="header-note">Built to be yours.</span>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> THE CRAFTER TOOLBOX{" "}
              <span className="edition">001 / UI</span>
            </div>
            <h1>
              Good defaults.
              <br />
              <span>Your fingerprints.</span>
            </h1>
            <p>
              A small collection of components with the details already
              considered. Shape them once. Make them yours. Take them
              everywhere.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#make-it-yours">
                Make your library <ArrowRight size={16} />
              </a>
              <a className="quiet-link" href="#components">
                Explore the components <ArrowDown size={14} />
              </a>
            </div>
            <div className="hero-footnote">
              Built on shadcn/ui <span>·</span> Source code included{" "}
              <span>·</span> No account needed
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-grid" />
            <div className="specimen specimen-back">
              <div className="specimen-line" />
              <div className="specimen-line short" />
            </div>
            <div className="specimen specimen-front">
              <div className="specimen-top">
                <span className="mini-mark">c.</span>
                <span>YOUR NEXT THING</span>
                <span>↗</span>
              </div>
              <div className="specimen-title">
                Less setup.
                <br />
                More making.
              </div>
              <div className="specimen-bottom">
                <span className="specimen-pill">A little more you</span>
                <span className="specimen-dot" />
              </div>
            </div>
            <span className="art-caption">
              SAME FOUNDATION. YOUR SIGNATURE.
            </span>
            <span className="art-cross">+</span>
          </div>
        </section>
        <div className="section-divider">
          <span>THE COLLECTION</span>
          <span>06 COMPONENTS / ENDLESS STARTING POINTS</span>
        </div>
        <section id="components" className="workspace">
          <aside className="collection-nav">
            <div className="sidebar-title">
              Small pieces.
              <br />
              <span>Thoughtfully finished.</span>
            </div>
            <TextField
              label="Find a component"
              placeholder="Search components…"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
            <div className="component-list">
              {filtered.map((item, index) => (
                <button
                  type="button"
                  key={item.name}
                  className={
                    active === item.name
                      ? "component-link selected"
                      : "component-link"
                  }
                  onClick={() => {
                    setActive(item.name);
                    setTab("preview");
                  }}
                  aria-current={active === item.name ? "true" : undefined}
                >
                  <span className="component-number">0{index + 1}</span>
                  <span>{item.title}</span>
                  {active === item.name && <ArrowRight size={14} />}
                </button>
              ))}
              {!filtered.length && (
                <p className="no-results">No matching components.</p>
              )}
            </div>
            <div className="collection-note">
              <Box size={18} />
              <p>
                Real components.
                <br />
                Editable source.
                <br />
                Your next starting point.
              </p>
            </div>
          </aside>
          <div className="component-detail">
            <div className="detail-heading">
              <div>
                <div className="eyebrow muted">{entry.category}</div>
                <h2>{entry.title}</h2>
                <p>{entry.description}</p>
              </div>
              <Badge variant="outline">Base UI</Badge>
            </div>
            <div className="preview-toolbar">
              <ToggleGroup
                value={[tab]}
                onValueChange={(values) => {
                  if (values[0]) setTab(values[0] as "preview" | "code");
                }}
                aria-label="Example view"
              >
                <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
                <ToggleGroupItem value="code">
                  <Code2 data-icon="inline-start" />
                  Usage
                </ToggleGroupItem>
              </ToggleGroup>
              <Button
                variant="ghost"
                size="icon"
                aria-label={
                  dark
                    ? "Switch preview to light mode"
                    : "Switch preview to dark mode"
                }
                onClick={() => setDark(!dark)}
              >
                {dark ? <Sun /> : <Moon />}
              </Button>
            </div>
            <div
              className={`preview-canvas ${dark ? "dark" : ""}`}
              style={previewStyle}
            >
              {tab === "preview" ? (
                <ComponentPreview key={active} name={active} />
              ) : (
                <div className="usage-block">
                  <code>{`import { ${entry.title.replace(/(?:^|\s)\S/g, (letter) => letter.toUpperCase()).replaceAll(" ", "")} } from "@/components/ui/${entry.name}";\n\n${entry.usage}`}</code>
                  <CopyButton value={entry.usage} label="Copy usage" />
                </div>
              )}
            </div>
            <div className="preview-caption">
              <span>LIVE PREVIEW / {config.name.toUpperCase()}</span>
              <span>Try it. It works.</span>
            </div>
            <div className="detail-bottom">
              <div>
                <h3>The details are the component.</h3>
                <p>
                  {active === "copy-button"
                    ? "A failed clipboard request should never say “Copied”. Success and failure are both part of the interface."
                    : active === "text-field"
                      ? "Labels, descriptions, and errors stay connected to the input. Less markup to repeat, fewer details to miss."
                      : "A concise API for the everyday case, with the source right there when your product needs something different."}
                </p>
              </div>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" />}>
                  How to install <ExternalLink data-icon="inline-end" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Take it into your project</DialogTitle>
                    <DialogDescription>
                      Download your library below. In a shadcn Base UI app,
                      install the exported file with the CLI.
                    </DialogDescription>
                  </DialogHeader>
                  <code className="install-code">
                    bunx --bun shadcn@4.21.0 add /absolute/path/to/{config.slug}
                    -registry/public/r/{active}.json
                  </code>
                  <p className="text-sm text-muted-foreground">
                    The README includes setup, usage, and hosting instructions.
                    Review file conflicts before replacing existing components.
                  </p>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
        <section id="make-it-yours" className="builder-section">
          <div className="builder-heading">
            <div className="eyebrow">A LIBRARY WITH YOUR NAME ON IT</div>
            <h2>Make the defaults yours.</h2>
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
