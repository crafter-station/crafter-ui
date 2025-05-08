"use client"

import { Button } from "@/registry/default/ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/default/ui/command"
import { useRouter } from "next/navigation"
import * as React from "react"

export function SearchButton() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Components">
            <CommandItem onSelect={() => router.push("/components/button")}>
              Button
            </CommandItem>
            <CommandItem onSelect={() => router.push("/components/input")}>
              Input
            </CommandItem>
            {/* Add more components */}
          </CommandGroup>
          <CommandGroup heading="Documentation">
            <CommandItem onSelect={() => router.push("/docs/getting-started")}>
              Getting Started
            </CommandItem>
            <CommandItem onSelect={() => router.push("/docs/installation")}>
              Installation
            </CommandItem>
            {/* Add more docs */}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
} 