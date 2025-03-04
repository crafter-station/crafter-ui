"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { DialogContent } from "@/components/ui/dialog"

// Framer Command Menu
const FramerCommandMenu = ({ name }: { name?: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-sm transition-all duration-200"
      >
        <div className="flex items-center justify-center w-4 h-4">
          <svg viewBox="0 0 256 384" width="16" height="32" fill="#fff" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M0 0h256v128H128L0 0Zm0 128h128l128 128H128v128L0 256V128Z" /></svg>
        </div>
        <span className="font-medium">Framer</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 rounded-xl border shadow-2xl bg-black/90 text-white">
          <Command className="rounded-lg border-0 bg-transparent">
            <CommandInput
              placeholder="Type a command or search..."
              className="border-b border-white/10 font-medium text-white placeholder:text-white/50"
            />
            <CommandList className="py-2">
              <CommandEmpty className="text-white/70 py-6 text-center text-sm">
                No results found.
              </CommandEmpty>

              <CommandGroup heading="Suggestions" className="px-2 py-1.5 text-white/70">
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer text-white aria-selected:bg-white/10">
                  <span>New File</span>
                  <CommandShortcut className="ml-auto text-xs text-white/50">⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer text-white aria-selected:bg-white/10">
                  <span>New Window</span>
                  <CommandShortcut className="ml-auto text-xs text-white/50">⇧⌘N</CommandShortcut>
                </CommandItem>
                <CommandSeparator />
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer text-white aria-selected:bg-white/10">
                  <span>Settings</span>
                  <CommandShortcut className="ml-auto text-xs text-white/50">⌘,</CommandShortcut>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Tools" className="px-2 py-1.5 text-white/70">
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer text-white aria-selected:bg-white/10">
                  <span>Search</span>
                  <CommandShortcut className="ml-auto text-xs text-white/50">⌘F</CommandShortcut>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer text-white aria-selected:bg-white/10">
                  <span>Replace</span>
                  <CommandShortcut className="ml-auto text-xs text-white/50">⌘R</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </CommandDialog>
    </div>
  )
}

export default FramerCommandMenu 