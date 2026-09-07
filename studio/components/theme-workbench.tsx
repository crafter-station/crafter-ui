"use client";
import { Moon, Palette, Sun } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
} from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { patchThemeSchema, tokenNames } from "@/lib/theme-schema";
import {
  exportTheme,
  getServerThemeSnapshot,
  getThemeSnapshot,
  initializeTheme,
  patchTheme,
  resetTheme,
  setThemeMode,
  subscribeTheme,
} from "@/lib/theme-store";

const WorkbenchContext = createContext<(() => void) | null>(null);
export const useTheme = () =>
  useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
export function CustomizeButton() {
  const open = useContext(WorkbenchContext);
  return (
    <Button variant="outline" size="sm" onClick={() => open?.()}>
      <Palette data-icon="inline-start" />
      Customize
    </Button>
  );
}
type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: boolean };
  execute: (input: unknown) => Promise<string>;
};
export type ModelContext = {
  registerTool: (
    tool: Tool,
    options?: { signal: AbortSignal },
  ) => void | Promise<void>;
  unregisterTool?: (name: string) => void;
};
const afterPaint = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
const resetSchema = z
  .object({
    expectedRevision: z.number().int().min(0),
    targetRevision: z.number().int().min(0).optional(),
  })
  .strict();
const emptySchema = z.object({}).strict();

export function ThemeWorkbench({ children }: { children: ReactNode }) {
  const state = useTheme();
  const [open, setOpen] = useState(false);
  const [bridge, setBridge] = useState("Checking agent connection…");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  useEffect(() => {
    initializeTheme();
    const context =
      (document as Document & { modelContext?: ModelContext }).modelContext ??
      (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!context) {
      setBridge("Visual editor ready. WebMCP needs a compatible browser.");
      return;
    }
    const controller = new AbortController();
    const definitions = [
      {
        name: "get_theme",
        description:
          "Read the Crafter theme, current revision, preview mode, editable token names and saved revision IDs. Call before patching. No filesystem writes.",
        schema: emptySchema,
        readOnly: true,
        run: () => {
          const s = getThemeSnapshot();
          return {
            theme: s.theme,
            revision: s.revision,
            mode: s.mode,
            tokens: tokenNames,
            history: s.history.map((h) => h.revision),
            docs: "/docs/agents",
            skill: "/skill.md",
          };
        },
      },
      {
        name: "patch_theme",
        description:
          "Apply a batch of validated semantic token changes to light or dark mode using expectedRevision from get_theme. Updates the shared editor and catalog, persists a browser draft, and returns a diff. Does not write repository files. Use font-sans for typography, radius for corners, control-height for density.",
        schema: patchThemeSchema,
        readOnly: false,
        run: patchTheme,
      },
      {
        name: "reset_theme",
        description:
          "Restore the repository baseline, or a targetRevision from the last 20 snapshots. Requires current expectedRevision. Creates a new revision; does not write repository files.",
        schema: resetSchema,
        readOnly: false,
        run: (input: unknown) => {
          const args = resetSchema.parse(input);
          return resetTheme(args.expectedRevision, args.targetRevision);
        },
      },
      {
        name: "export_theme",
        description:
          "Return theme.json and theme.css contents for the current draft. The agent can save the returned files into its authorized repository. Read-only: no download or filesystem write.",
        schema: emptySchema,
        readOnly: true,
        run: exportTheme,
      },
    ];
    let disposed = false;
    const registered: string[] = [];
    void (async () => {
      try {
        for (const definition of definitions) {
          if (disposed) break;
          await context.registerTool(
            {
              name: definition.name,
              description: definition.description,
              inputSchema: z.toJSONSchema(definition.schema),
              annotations: { readOnlyHint: definition.readOnly },
              execute: async (input) => {
                try {
                  definition.schema.parse(input);
                  const result = definition.run(input);
                  await afterPaint();
                  return JSON.stringify({ ok: true, ...result });
                } catch (cause) {
                  return JSON.stringify({
                    ok: false,
                    error:
                      cause instanceof Error
                        ? cause.message
                        : "Theme operation failed",
                    revision: getThemeSnapshot().revision,
                  });
                }
              },
            },
            { signal: controller.signal },
          );
          registered.push(definition.name);
          if (disposed) context.unregisterTool?.(definition.name);
        }
        if (!disposed) setBridge("Agent connected · 4 WebMCP tools");
      } catch (cause) {
        if (!disposed)
          setBridge(
            `WebMCP unavailable: ${cause instanceof Error ? cause.message : "registration failed"}`,
          );
      }
    })();
    return () => {
      disposed = true;
      controller.abort();
      for (const name of registered) context.unregisterTool?.(name);
    };
  }, []);
  function edit(token: string, value: string) {
    try {
      patchTheme({
        expectedRevision: getThemeSnapshot().revision,
        mode: getThemeSnapshot().mode,
        tokens: { [token]: value },
      });
      setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Invalid token");
    }
  }
  function download() {
    const result = exportTheme();
    const url = URL.createObjectURL(
      new Blob([result.files["theme.json"]], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "theme.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <WorkbenchContext.Provider value={() => setOpen(true)}>
      <div className={open ? "theme-editor-open" : undefined}>{children}</div>
      <Sheet
        modal={false}
        open={open}
        onOpenChange={(next, event) => {
          if (event.reason !== "outside-press") setOpen(next);
        }}
      >
        <SheetContent
          className="theme-workbench"
          showCloseButton
          showOverlay={false}
        >
          <SheetHeader>
            <SheetTitle>Make it yours</SheetTitle>
            <SheetDescription>
              One theme. Every component. Edit here or let your agent tune it.
            </SheetDescription>
          </SheetHeader>
          <div className="theme-workbench-body">
            <p className="text-xs text-muted-foreground" role="status">
              {bridge}
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">
                Revision {state.revision}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setThemeMode(state.mode === "light" ? "dark" : "light")
                }
              >
                {state.mode === "light" ? <Moon /> : <Sun />}
                {state.mode === "light" ? "Dark mode" : "Light mode"}
              </Button>
            </div>
            <div className="grid gap-3">
              <TokenField
                token="primary"
                value={state.theme[state.mode].primary ?? ""}
                onChange={edit}
              />
              <TokenField
                token="background"
                value={state.theme[state.mode].background ?? ""}
                onChange={edit}
              />
              <TokenField
                token="foreground"
                value={state.theme[state.mode].foreground ?? ""}
                onChange={edit}
              />
              <TokenField
                token="radius"
                value={state.theme[state.mode].radius ?? ""}
                onChange={edit}
              />
              <TokenField
                token="control-height"
                value={state.theme[state.mode]["control-height"] ?? ""}
                onChange={edit}
              />
              <TokenField
                token="font-sans"
                value={state.theme[state.mode]["font-sans"] ?? ""}
                onChange={edit}
              />
            </div>
            <details>
              <summary className="cursor-pointer text-sm">All tokens</summary>
              <div className="mt-4 grid gap-3">
                <Input
                  aria-label="Filter tokens"
                  placeholder="Find a token…"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
                {tokenNames
                  .filter(
                    (n) =>
                      n.includes(filter) &&
                      ![
                        "primary",
                        "background",
                        "foreground",
                        "radius",
                        "control-height",
                        "font-sans",
                      ].includes(n),
                  )
                  .map((token) => (
                    <TokenField
                      key={token}
                      token={token}
                      value={state.theme[state.mode][token] ?? ""}
                      onChange={edit}
                    />
                  ))}
              </div>
            </details>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <p className="text-xs text-muted-foreground" role="status">
              {state.notice || "Changes stay in this browser until exported."}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={download}>Export theme.json</Button>
              <Button
                variant="outline"
                disabled={!state.history.length}
                onClick={() =>
                  resetTheme(state.revision, state.history.at(-1)?.revision)
                }
              >
                Undo
              </Button>
              <Button
                variant="ghost"
                onClick={() => resetTheme(state.revision)}
              >
                Reset
              </Button>
            </div>
            <a className="doc-text-link" href="/docs/agents">
              Connect your agent ↗
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </WorkbenchContext.Provider>
  );
}
function TokenField({
  token,
  value,
  onChange,
}: {
  token: string;
  value: string;
  onChange: (token: string, value: string) => void;
}) {
  const id = useId();
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  return (
    <div className="grid gap-1.5 text-xs">
      <label htmlFor={id}>{token}</label>
      <div className="flex gap-2">
        {value.startsWith("#") && (
          <input
            className="theme-color"
            type="color"
            aria-label={`${token} color`}
            value={/^#[a-f\d]{6}$/i.test(value) ? value : "#141414"}
            onChange={(e) => onChange(token, e.target.value)}
          />
        )}
        <Input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => {
            if (draft !== value) onChange(token, draft);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onChange(token, draft);
          }}
        />
      </div>
    </div>
  );
}
