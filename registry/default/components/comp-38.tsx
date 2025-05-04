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

// Perplexity Command Menu
const PerplexityCommandMenu = ({ name }: { name?: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border bg-[#20808d] hover:bg-[#418189] text-white shadow-sm transition-all duration-200"
      >
        <div className="flex items-center justify-center w-6 h-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48">
            <path
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M24 4.5v39M13.73 16.573v-9.99L24 16.573m0 14.5L13.73 41.417V27.01L24 16.573m0 0l10.27-9.99v9.99" />
            <path
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.73 31.396H9.44V16.573h29.12v14.823h-4.29" />
            <path
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M24 16.573L34.27 27.01v14.407L24 31.073" />
          </svg>
        </div>
        <span className="font-medium">Perplexity</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 rounded-xl border shadow-2xl bg-[#F7F7F8]">
          <Command className="rounded-lg border-0 bg-transparent">
            <CommandInput
              placeholder="Type a command or search..."
              className="border-b border-border/20 font-medium"
            />
            <CommandList className="py-2">
              <CommandEmpty className="text-muted-foreground py-6 text-center text-sm">
                No results found.
              </CommandEmpty>

              <CommandGroup heading="Suggestions" className="px-2 py-1.5">
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-[#EBEBEF]">
                  <span>New File</span>
                  <CommandShortcut className="ml-auto text-xs text-muted-foreground">⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-[#EBEBEF]">
                  <span>New Window</span>
                  <CommandShortcut className="ml-auto text-xs text-muted-foreground">⇧⌘N</CommandShortcut>
                </CommandItem>
                <CommandSeparator />
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-[#EBEBEF]">
                  <span>Settings</span>
                  <CommandShortcut className="ml-auto text-xs text-muted-foreground">⌘,</CommandShortcut>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Tools" className="px-2 py-1.5">
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-[#EBEBEF]">
                  <span>Search</span>
                  <CommandShortcut className="ml-auto text-xs text-muted-foreground">⌘F</CommandShortcut>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-[#EBEBEF]">
                  <span>Replace</span>
                  <CommandShortcut className="ml-auto text-xs text-muted-foreground">⌘R</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </CommandDialog>
    </div>
  )
}

export default PerplexityCommandMenu 