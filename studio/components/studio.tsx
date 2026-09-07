"use client";

import { ArrowRight, Check, Download, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { CodeBlock } from "@/components/code-block";
import { SiteHeader } from "@/components/site-header";
import type { ModelContext } from "@/components/theme-workbench";
import { CustomizeButton, useTheme } from "@/components/theme-workbench";
import { ActionButton } from "@/components/ui/action-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup } from "@/components/ui/field";
import { TextField } from "@/components/ui/text-field";
import { exportCatalog as catalog } from "@/lib/export-catalog";
import {
  defaultConfig,
  type LibraryConfig,
  librarySchema,
} from "@/lib/library-config";
import {
  libraryDocumentSchema,
  parseLibraryDocument,
} from "@/lib/library-document";
import { getThemeSnapshot, replaceTheme } from "@/lib/theme-store";

export function Studio() {
  const sharedTheme = useTheme();
  const [config, setConfig] = useState<LibraryConfig>({
    ...defaultConfig,
    homepage: "http://localhost:4324",
  });
  const customSlug = useRef(false);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState("");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const validation = librarySchema.safeParse(config);
  const current = useRef({ config, revision: 0 });
  const [agentStatus, setAgentStatus] = useState(
    "Use the included skill with your coding agent.",
  );
  const commit = useCallback((next: LibraryConfig) => {
    current.current = { config: next, revision: current.current.revision + 1 };
    setConfig(next);
    setDownloaded(false);
    setMessage("");
  }, []);
  const importDocument = useCallback(
    (input: unknown) => {
      const saved = parseLibraryDocument(input);
      replaceTheme(saved.config.theme, saved.mode);
      customSlug.current = true;
      commit(saved.config);
      return saved;
    },
    [commit],
  );
  useEffect(() => {
    try {
      const saved = localStorage.getItem("crafter-library-v1");
      if (saved) {
        const parsed = parseLibraryDocument(JSON.parse(saved));
        customSlug.current = true;
        commit(parsed.config);
      }
    } catch {
      setMessage(
        "Saved library could not be loaded. Import a saved file to recover it.",
      );
    }
    setReady(true);
  }, [commit]);
  useEffect(() => {
    if (!ready || !validation.success) return;
    try {
      localStorage.setItem(
        "crafter-library-v1",
        JSON.stringify({
          version: 1,
          config: { ...config, theme: sharedTheme.theme },
          mode: sharedTheme.mode,
        }),
      );
    } catch {
      setMessage(
        "Browser storage unavailable. Save a library file to keep your changes.",
      );
    }
  }, [ready, config, sharedTheme.theme, sharedTheme.mode, validation.success]);
  function saveLibrary() {
    const document = {
      version: 1,
      config: { ...config, theme: sharedTheme.theme },
      mode: sharedTheme.mode,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(document, null, 2)], {
        type: "application/json",
      }),
    );
    const link = documentElement(url);
    link.download = `${config.slug}.crafter.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  function documentElement(url: string) {
    const link = document.createElement("a");
    link.href = url;
    return link;
  }
  useEffect(() => {
    if (!ready) return;
    const context =
      (document as Document & { modelContext?: ModelContext }).modelContext ??
      (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!context) return;
    const controller = new AbortController();
    const empty = z.object({}).strict();
    const patch = z
      .object({
        expectedRevision: z.number().int().min(0),
        config: librarySchema
          .pick({ name: true, slug: true, homepage: true, components: true })
          .partial()
          .strict(),
      })
      .strict();
    const definitions = [
      {
        name: "save_library",
        schema: empty,
        readOnly: true,
        description:
          "Return one portable .crafter.json document containing identity, selection, light/dark tokens and preview mode. Save this content to resume later.",
        run: async () => ({
          document: parseLibraryDocument({
            version: 1,
            config: {
              ...current.current.config,
              theme: getThemeSnapshot().theme,
            },
            mode: getThemeSnapshot().mode,
          }),
        }),
      },
      {
        name: "import_library",
        schema: z
          .object({
            expectedRevision: z.number().int().min(0),
            document: libraryDocumentSchema,
          })
          .strict(),
        readOnly: false,
        description:
          "Restore a saved library document into the form and shared theme. Requires current library revision; validates before changing anything.",
        run: async (input: unknown) => {
          const args = z
            .object({
              expectedRevision: z.number(),
              document: libraryDocumentSchema,
            })
            .parse(input);
          if (args.expectedRevision !== current.current.revision)
            throw new Error("Library changed. Read get_library and retry.");
          importDocument(args.document);
          return current.current;
        },
      },
      {
        name: "get_library",
        schema: empty,
        readOnly: true,
        description:
          "Read the library draft, revision and available shadcn and Crafter components. Theme is shared with get_theme. Dependencies are included automatically.",
        run: async () => ({
          ...current.current,
          availableComponents: catalog.map(({ name, title }) => ({
            name,
            title,
          })),
        }),
      },
      {
        name: "configure_library",
        schema: patch,
        readOnly: false,
        description:
          "Update library identity or selected components atomically. Requires expectedRevision from get_library. Use patch_theme for design tokens. Updates the visible form; no filesystem writes.",
        run: async (input: unknown) => {
          const args = patch.parse(input);
          if (args.expectedRevision !== current.current.revision)
            throw new Error("Library changed. Read get_library and retry.");
          if (args.config.slug !== undefined) customSlug.current = true;
          commit(
            librarySchema.parse({ ...current.current.config, ...args.config }),
          );
          return current.current;
        },
      },
      {
        name: "export_library",
        schema: z.object({ includeFiles: z.boolean().optional() }).strict(),
        readOnly: true,
        description:
          "Return a manifest and exportRequest to POST for the ZIP. Use includeFiles=true only when source contents are needed in context. Includes theme.json, DESIGN.md, SKILL.md and app setup. Does not write files.",
        run: async (input: unknown) => {
          const response = await fetch("/api/export?format=json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...current.current.config,
              theme: getThemeSnapshot().theme,
            }),
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error);
          const args = z
            .object({ includeFiles: z.boolean().optional() })
            .parse(input);
          if (args.includeFiles) return result;
          return {
            manifest: Object.entries(
              result.files as Record<string, string>,
            ).map(([path, content]) => ({
              path,
              bytes: new TextEncoder().encode(content).length,
            })),
            exportRequest: {
              url: `${location.origin}/api/export`,
              method: "POST",
              body: result.config,
            },
            next: "POST exportRequest.body as JSON to exportRequest.url, save and unzip the response, then run bun scripts/create-app.ts /absolute/path/to/a-new-app in the extracted folder.",
          };
        },
      },
    ];
    const registered: string[] = [];
    void (async () => {
      try {
        for (const tool of definitions) {
          if (controller.signal.aborted) break;
          await context.registerTool(
            {
              name: tool.name,
              description: tool.description,
              inputSchema: z.toJSONSchema(tool.schema),
              annotations: { readOnlyHint: tool.readOnly },
              execute: async (input) => {
                try {
                  tool.schema.parse(input);
                  const result = await tool.run(input);
                  await new Promise<void>((resolve) =>
                    requestAnimationFrame(() => resolve()),
                  );
                  return JSON.stringify({ ok: true, ...result });
                } catch (error) {
                  return JSON.stringify({
                    ok: false,
                    error:
                      error instanceof Error
                        ? error.message
                        : "Library operation failed",
                  });
                }
              },
            },
            { signal: controller.signal },
          );
          registered.push(tool.name);
          if (controller.signal.aborted) context.unregisterTool?.(tool.name);
        }
        if (!controller.signal.aborted)
          setAgentStatus("Agent ready · 5 library tools + shared theme tools");
      } catch {
        if (!controller.signal.aborted)
          setAgentStatus(
            "WebMCP unavailable. Use the skill or download your library.",
          );
      }
    })();
    return () => {
      controller.abort();
      for (const name of registered) context.unregisterTool?.(name);
    };
  }, [commit, importDocument, ready]);
  function update<K extends keyof LibraryConfig>(
    key: K,
    value: LibraryConfig[K],
  ) {
    if (key === "slug") customSlug.current = true;
    commit({ ...current.current.config, [key]: value });
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
        body: JSON.stringify({ ...config, theme: sharedTheme.theme }),
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
            <div className="eyebrow">MAKE IT YOURS</div>
            <h1>Your library, ready to build.</h1>
            <p>
              Name it, tune the shared theme, and take the source. Your agent
              gets the same controls, a design guide and a creation skill.
            </p>
          </div>
          <a className="create-agent-link" href="#create-agent">
            Set up with your agent ↗
          </a>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Button
              variant="outline"
              disabled={!validation.success}
              onClick={saveLibrary}
            >
              Save library
            </Button>
            <label className="text-sm cursor-pointer border border-input rounded-[var(--radius)] px-3 py-1.5 focus-within:outline-2 focus-within:outline-ring">
              Import library
              <input
                aria-label="Import library"
                type="file"
                accept=".json,application/json"
                className="sr-only"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  try {
                    if (file.size > 65536)
                      throw new Error(
                        "Library file must be smaller than 64 KB.",
                      );
                    importDocument(JSON.parse(await file.text()));
                    setMessage(
                      "Library imported, including light and dark tokens.",
                    );
                  } catch (error) {
                    setMessage(
                      error instanceof Error
                        ? error.message
                        : "Invalid library file.",
                    );
                  }
                  event.target.value = "";
                }}
              />
            </label>
            <span className="text-xs text-muted-foreground">
              Valid changes are saved in this browser.
            </span>
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
                  onChange={(event) => {
                    const name = event.target.value;
                    const slug = name
                      .toLowerCase()
                      .normalize("NFKD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "")
                      .slice(0, 40);
                    commit({
                      ...config,
                      name,
                      slug: customSlug.current ? config.slug : slug,
                    });
                  }}
                />
                <details className="create-advanced">
                  <summary>Registry & publishing details</summary>
                  <div className="two-fields">
                    <TextField
                      label="Registry name"
                      value={config.slug}
                      onChange={(event) => update("slug", event.target.value)}
                    />
                    <TextField
                      label="Hosting URL"
                      value={config.homepage}
                      onChange={(event) =>
                        update("homepage", event.target.value)
                      }
                    />
                  </div>
                </details>
                <div className="grid gap-3">
                  <p className="text-sm text-muted-foreground">
                    Your current theme is applied across the catalog and
                    included in this export.
                  </p>
                  <CustomizeButton />
                </div>
              </FieldGroup>
              <div className="step-label selection-label">
                <span>02</span> Pack your essentials
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {config.components.length} of {catalog.length} shadcn and
                Crafter components selected. Shared dependencies are added
                automatically.
              </p>
              <TextField
                label="Find components"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Search shadcn and Crafter…"
              />
              <div className="flex gap-2 my-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    update(
                      "components",
                      catalog.map((item) => item.name),
                    )
                  }
                >
                  Select all
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    update(
                      "components",
                      catalog
                        .filter((item) => item.family === "crafter")
                        .map((item) => item.name),
                    )
                  }
                >
                  Crafter only
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => update("components", [])}
                >
                  Clear
                </Button>
              </div>
              <fieldset className="component-selection max-h-80 overflow-auto p-1">
                <legend className="sr-only">Components to include</legend>
                {catalog
                  .filter((item) =>
                    `${item.name} ${item.family}`.includes(
                      filter.toLowerCase(),
                    ),
                  )
                  .map((item) => (
                    <label key={item.name} htmlFor={`include-${item.name}`}>
                      <Checkbox
                        id={`include-${item.name}`}
                        checked={config.components.includes(item.name)}
                        onCheckedChange={(checked) =>
                          update(
                            "components",
                            checked
                              ? [...config.components, item.name]
                              : config.components.filter(
                                  (name) => name !== item.name,
                                ),
                          )
                        }
                      />
                      <span>
                        {item.title}
                        <span className="block text-[10px] text-muted-foreground">
                          {item.family}
                        </span>
                      </span>
                    </label>
                  ))}
              </fieldset>
            </div>
            <div className="export-panel">
              <div className="export-preview bg-background text-foreground">
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
                <Card className="mb-5">
                  <CardContent className="grid gap-4">
                    <TextField
                      label="Project name"
                      placeholder="Your next thing"
                    />
                    <TextField
                      label="Contact email"
                      type="email"
                      placeholder="you@example.com"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Badge>In progress</Badge>
                      <Badge variant="secondary">Personal project</Badge>
                    </div>
                  </CardContent>
                </Card>
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
                    customSlug.current = false;
                    commit({
                      ...defaultConfig,
                      homepage: "http://localhost:4324",
                    });
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
          <section id="create-agent" className="create-agent">
            <div className="eyebrow">BUILD WITH YOUR AGENT</div>
            <h2>One brief. Your own starting point.</h2>
            <p>{agentStatus}</p>
            <CodeBlock
              language="bash"
              code={`Open /create in this catalog.
Use get_library, then configure_library to name and select components.
Use get_theme and patch_theme to tune light and dark tokens.
Call export_library, POST its exportRequest to download and unzip the library.
Run bun scripts/create-app.ts /absolute/path/to/my-new-app.\nFollow DESIGN.md for product UI and SKILL.md to maintain my library.`}
            />
            <a href="/docs/agents">Agent setup & token documentation ↗</a>
          </section>
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
