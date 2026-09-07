"use client";
import { applyThemePatch, completeTheme, themeFiles } from "@/lib/theme-model";
import type { ThemeDocument } from "@/lib/theme-schema";
import initial from "@/theme.json";

const baseline = completeTheme(initial);
const storageKey = "crafter-theme-v1";
const baselineKey = JSON.stringify(baseline);
type Snapshot = {
  revision: number;
  theme: ThemeDocument;
  mode: "light" | "dark";
  ready: boolean;
  history: { revision: number; theme: ThemeDocument }[];
  notice: string;
};
const serverState: Snapshot = {
  revision: 0,
  theme: baseline,
  mode: "light",
  ready: false,
  history: [],
  notice: "",
};
let state = serverState;
const listeners = new Set<() => void>();
export const getThemeSnapshot = () => state;
export const getServerThemeSnapshot = () => serverState;
export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function publish(next: Snapshot) {
  state = next;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(state.theme[state.mode]))
    root.style.setProperty(`--${key}`, value ?? "");
  root.classList.toggle("dark", state.mode === "dark");
  root.style.colorScheme = state.mode;
  try {
    localStorage.setItem(storageKey, JSON.stringify({ ...state, baselineKey }));
  } catch {
    state = {
      ...state,
      notice: "Browser storage unavailable. Export your theme to keep it.",
    };
  }
  for (const listener of listeners) listener();
}
export function initializeTheme() {
  if (state.ready) {
    publish(state);
    return;
  }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (
      saved?.baselineKey === baselineKey &&
      Number.isSafeInteger(saved.revision) &&
      saved.revision >= 0 &&
      ["light", "dark"].includes(saved.mode)
    ) {
      publish({
        ...serverState,
        theme: completeTheme(saved.theme),
        revision: saved.revision,
        mode: saved.mode,
        ready: true,
        history: Array.isArray(saved.history)
          ? saved.history
              .slice(-20)
              .filter((h: { revision: number }) =>
                Number.isSafeInteger(h.revision),
              )
              .map((h: { revision: number; theme: unknown }) => ({
                revision: h.revision,
                theme: completeTheme(h.theme),
              }))
          : [],
      });
      return;
    }
  } catch {}
  publish({ ...serverState, ready: true });
}
function commit(theme: ThemeDocument) {
  publish({
    ...state,
    theme,
    revision: state.revision + 1,
    history: [
      ...state.history,
      { revision: state.revision, theme: state.theme },
    ].slice(-20),
    notice: "Draft saved in this browser",
  });
}
export function patchTheme(input: unknown) {
  const result = applyThemePatch(state.theme, state.revision, input);
  for (const mode of ["light", "dark"] as const)
    for (const [token, value] of Object.entries(result.theme[mode])) {
      const property =
        token === "font-sans"
          ? "font-family"
          : token === "radius"
            ? "border-radius"
            : token === "control-height"
              ? "height"
              : "color";
      if (!CSS.supports(property, value ?? ""))
        throw new Error(`Browser does not support ${token}: ${value}`);
    }
  if (result.diff.length) commit(result.theme);
  return {
    revision: state.revision,
    diff: result.diff,
    persistence: "browser-local draft",
  };
}
export function replaceTheme(input: unknown, mode: "light" | "dark") {
  const theme = completeTheme(input);
  for (const tokens of [theme.light, theme.dark])
    for (const [token, value] of Object.entries(tokens)) {
      const property =
        token === "font-sans"
          ? "font-family"
          : token === "radius"
            ? "border-radius"
            : token === "control-height"
              ? "height"
              : "color";
      if (!CSS.supports(property, value ?? ""))
        throw new Error(`Unsupported theme token: ${token}`);
    }
  commit(theme);
  setThemeMode(mode);
}
export function resetTheme(expectedRevision: number, targetRevision?: number) {
  if (expectedRevision !== state.revision)
    throw new Error("Revision conflict. Call get_theme again.");
  const target =
    targetRevision === undefined
      ? baseline
      : state.history.find((h) => h.revision === targetRevision)?.theme;
  if (!target)
    throw new Error("That revision is no longer in the last 20 snapshots.");
  commit(target);
  return { revision: state.revision, theme: state.theme };
}
export function setThemeMode(mode: "light" | "dark") {
  publish({ ...state, mode });
}
export function exportTheme() {
  return {
    revision: state.revision,
    files: themeFiles(state.theme),
    persistence:
      "Return values only. Write theme.json to the repository or download it; this tool does not write files.",
  };
}
