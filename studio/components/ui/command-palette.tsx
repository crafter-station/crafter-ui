"use client";

import { cn } from "cn";
import { Search } from "lucide-react";
import {
  type ReactNode,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export type CommandPaletteItem = {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  badge?: string;
  keywords?: string;
  disabled?: boolean;
  onSelect: () => void;
};

export type CommandPaletteGroup = {
  heading: string;
  items: CommandPaletteItem[];
};

export type CommandPaletteItemRenderContext = {
  close: () => void;
};

function subscribeNever() {
  return () => {};
}

function useModKey() {
  return useSyncExternalStore(
    subscribeNever,
    () => {
      const platform =
        navigator.platform ||
        (navigator as Navigator & { userAgentData?: { platform?: string } })
          .userAgentData?.platform ||
        "";
      return /mac|iphone|ipad|ipod/i.test(platform) ? "⌘" : "Ctrl";
    },
    () => "⌘",
  );
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      "input, textarea, select, [contenteditable='true'], [role='textbox']",
    ),
  );
}

function ShortcutHint({
  shortcutKey,
  mod,
}: {
  shortcutKey: string;
  mod: string;
}) {
  return (
    <KbdGroup aria-label={`${mod} plus ${shortcutKey.toUpperCase()}`}>
      <Kbd>{mod}</Kbd>
      <Kbd>{shortcutKey.toUpperCase()}</Kbd>
    </KbdGroup>
  );
}

/** Default item layout — reuse inside `renderItem` when you only need a partial override. */
export function CommandPaletteItemContent({
  item,
}: {
  item: CommandPaletteItem;
}) {
  return (
    <>
      {item.icon}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-medium">{item.label}</span>
        {item.description ? (
          <span className="truncate text-xs text-muted-foreground">
            {item.description}
          </span>
        ) : null}
      </span>
      {item.badge ? (
        <Badge variant="outline" className="mt-0.5">
          {item.badge}
        </Badge>
      ) : null}
    </>
  );
}

export function CommandPalette({
  groups = [],
  children,
  renderItem,
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  placeholder = "Type a command or search…",
  emptyMessage = "No results found.",
  title = "Command palette",
  description = "Search for a command to run…",
  shortcutKey = "k",
  closeOnSelect = true,
  footer,
  className,
}: {
  groups?: CommandPaletteGroup[];
  /** Extra list content after `groups` — compose with `CommandGroup` / `CommandItem`. */
  children?: ReactNode;
  /** Replace the default item body. Still wrapped in `CommandItem` with select/close wiring. */
  renderItem?: (
    item: CommandPaletteItem,
    context: CommandPaletteItemRenderContext,
  ) => ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  title?: string;
  description?: string;
  /** Pass `false` to disable the global shortcut. Defaults to `k` (⌘K / Ctrl+K). */
  shortcutKey?: string | false;
  /** Close the palette after an item is selected. Defaults to `true`. */
  closeOnSelect?: boolean;
  /** Pass `false` to hide the hint footer, or a custom node. */
  footer?: ReactNode | false;
  className?: string;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const mod = useModKey();

  useEffect(() => {
    if (!shortcutKey) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== shortcutKey.toLowerCase() ||
        !(event.metaKey || event.ctrlKey)
      ) {
        return;
      }
      if (!open && isEditableTarget(event.target)) return;
      event.preventDefault();
      if (openProp === undefined) {
        setUncontrolledOpen((current) => !current);
      } else {
        onOpenChange?.(!openProp);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, open, openProp, shortcutKey]);

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(next);
    else onOpenChange?.(next);
  };

  const close = () => setOpen(false);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={title}
      description={description}
      className={cn("sm:max-w-xl", className)}
    >
      <Command>
        <CommandInput variant="palette" placeholder={placeholder} />
        <CommandList className="max-h-[min(52vh,420px)]">
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          {groups.flatMap((group, index) => {
            if (!group.items.length) return [];
            return [
              ...(index > 0
                ? [<CommandSeparator key={`${group.heading}-sep`} />]
                : []),
              <CommandGroup key={group.heading} heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.label} ${item.description ?? ""} ${item.keywords ?? ""}`}
                    disabled={item.disabled}
                    showCheck={false}
                    className="items-start py-2"
                    onSelect={() => {
                      item.onSelect();
                      if (closeOnSelect) close();
                    }}
                  >
                    {renderItem ? (
                      renderItem(item, { close })
                    ) : (
                      <CommandPaletteItemContent item={item} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>,
            ];
          })}
          {children}
        </CommandList>
        {footer === false
          ? null
          : (footer ?? (
              <div className="flex flex-wrap items-center gap-3 border-t border-border px-3 py-2.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Kbd>↵</Kbd> open
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <KbdGroup>
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                  </KbdGroup>
                  navigate
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Kbd>esc</Kbd> close
                </span>
                {shortcutKey ? (
                  <span className="ml-auto">
                    <ShortcutHint shortcutKey={shortcutKey} mod={mod} />
                  </span>
                ) : null}
              </div>
            ))}
      </Command>
    </CommandDialog>
  );
}

export function CommandPaletteTrigger({
  onOpen,
  label = "Search…",
  className,
  compact = false,
  shortcutKey = "k",
}: {
  onOpen: () => void;
  label?: string;
  className?: string;
  /** Hide the label and shortcut keys — useful in tight headers. */
  compact?: boolean;
  shortcutKey?: string | false;
}) {
  const mod = useModKey();
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open search"
      className={cn(
        "inline-flex h-8 min-w-0 cursor-pointer items-center gap-2 border border-border bg-background px-2.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      <Search className="size-3.5 shrink-0" aria-hidden />
      {!compact ? (
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
      ) : null}
      {!compact && shortcutKey ? (
        <span className="ml-auto">
          <ShortcutHint shortcutKey={shortcutKey} mod={mod} />
        </span>
      ) : null}
    </button>
  );
}
