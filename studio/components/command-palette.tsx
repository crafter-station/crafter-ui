"use client";

import {
  BookOpen,
  Boxes,
  Component,
  FileCode2,
  Home,
  Palette,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  CommandPalette,
  type CommandPaletteGroup,
  CommandPaletteTrigger as PaletteTrigger,
} from "@/components/ui/command-palette";
import {
  componentHref,
  documentation,
  documentationGroups,
} from "@/lib/documentation";

type CommandPaletteContextValue = {
  open: () => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(
  null,
);

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error(
      "useCommandPalette must be used within CommandPaletteProvider",
    );
  }
  return context;
}

const pages = [
  {
    href: "/",
    title: "Home",
    description: "Library overview and live examples",
    icon: Home,
  },
  {
    href: "/docs",
    title: "Documentation",
    description: "Introduction and getting started",
    icon: BookOpen,
  },
  {
    href: "/components",
    title: "All components",
    description: "Browse the full catalog",
    icon: Boxes,
  },
  {
    href: "/create",
    title: "Style generator",
    description: "Create your own library identity",
    icon: Palette,
  },
  {
    href: "/extract",
    title: "Extract",
    description: "Pull components into a project",
    icon: FileCode2,
  },
  {
    href: "/docs/agents",
    title: "For agents",
    description: "Guidance for coding agents",
    icon: Sparkles,
  },
] as const;

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const groups = useMemo((): CommandPaletteGroup[] => {
    function go(href: string) {
      router.push(href);
    }
    return [
      {
        heading: "Navigate",
        items: pages.map((page) => ({
          id: page.href,
          label: page.title,
          description: page.description,
          icon: <page.icon />,
          onSelect: () => go(page.href),
        })),
      },
      ...documentationGroups.map((group) => ({
        heading:
          group === "Primitives" ? "shadcn / Primitives" : `Crafter / ${group}`,
        items: documentation
          .filter((entry) => entry.level === group)
          .map((entry) => ({
            id: entry.name,
            label: entry.title,
            description: entry.description,
            icon: <Component />,
            badge: entry.family === "crafter" ? "Crafter" : "shadcn",
            keywords: `${entry.family} ${entry.level}`,
            onSelect: () => go(componentHref(entry)),
          })),
      })),
    ];
  }, [router]);

  return (
    <CommandPaletteContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={groups}
        title="Search"
        description="Search pages and components"
        placeholder="Search components, docs, pages…"
      />
    </CommandPaletteContext.Provider>
  );
}

export function CommandPaletteTrigger({
  className,
  label = "Search…",
  compact = false,
  shortcutKey = "k",
}: {
  className?: string;
  label?: string;
  compact?: boolean;
  shortcutKey?: string | false;
}) {
  const { open } = useCommandPalette();
  return (
    <PaletteTrigger
      onOpen={open}
      label={label}
      className={className}
      compact={compact}
      shortcutKey={shortcutKey}
    />
  );
}
