"use client"

import * as React from "react"
import { useState } from "react"
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

// Vercel Command Menu
const VercelCommandMenu = ({ name }: { name?: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border bg-black hover:bg-gray-900 text-white shadow-sm transition-all duration-200"
      >
        <div className="flex items-center justify-center w-6 h-6">
          <svg width="16" height="16" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white" />
          </svg>
        </div>
        <span className="font-medium">Vercel</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 !rounded-xl border shadow-[var(--text-muted),_0px_1px_1px_rgba(0,0,0,0.02),_0px_8px_16px_-4px_rgba(0,0,0,0.04),_0px_24px_32px_-8px_rgba(0,0,0,0.06)] max-w-[640px] bg-white">
          <div className="relative bg-background flex flex-col overflow-hidden">
            <Command className="border-0 bg-white dark:bg-background">
              <CommandInput
                placeholder="What do you need?"
                className="h-12 border-0 focus:ring-0 text-lg placeholder:text-muted-foreground/50 w-full"
              />

              <CommandList className="overflow-y-auto min-h-[490px] bg-white dark:bg-background">
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </CommandEmpty>

                <CommandGroup heading="Projects" className="px-2 py-1.5 text-sm text-muted-foreground font-medium [&_[cmdk-group-heading]]:text-muted-foreground/70 [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:py-2.5">
                  <CommandItem className="flex items-center gap-3 py-2.5 px-2 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-muted-foreground/70">
                      <rect width="7" height="7" x="3" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="14" rx="1" />
                      <rect width="7" height="7" x="3" y="14" rx="1" />
                    </svg>
                    <span className="font-medium">Search Projects...</span>
                    <div className="flex items-center ml-auto">
                      <div className="flex items-center justify-center border bg-background text-xs p-0.5 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18v-6H5l7-7 7 7h-4v6H9z" /></svg>
                      </div>
                      <div className="flex items-center justify-center border bg-background text-xs py-0.5 px-1.5 rounded ml-1">P</div>
                    </div>
                  </CommandItem>

                  <CommandItem className="flex items-center gap-3 py-2.5 px-2 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/70">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    <span className="font-medium">Create New Project...</span>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Teams" className="px-2 py-1.5 text-sm text-muted-foreground font-medium [&_[cmdk-group-heading]]:text-muted-foreground/70 [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:py-2.5">
                  <CommandItem className="flex items-center gap-3 py-3 px-2 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-muted-foreground/70">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span className="font-medium">Search Teams...</span>
                    <div className="flex items-center ml-auto">
                      <div className="flex items-center justify-center border bg-background text-xs p-0.5 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18v-6H5l7-7 7 7h-4v6H9z" /></svg>
                      </div>
                      <div className="flex items-center justify-center border bg-background text-xs py-0.5 px-1.5 rounded ml-1">T</div>
                    </div>
                  </CommandItem>

                  <CommandItem className="flex items-center gap-3 py-2.5 px-2 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/70">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    <span className="font-medium">Create New Team</span>
                  </CommandItem>

                  <CommandItem className="flex items-center gap-3 py-2.5 px-2 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground bg-accent/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-muted-foreground/70">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      <path d="M12 12h4" />
                    </svg>
                    <span className="font-medium">Copy Invite Link</span>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="General" className="px-2 py-1.5 text-sm text-muted-foreground font-medium [&_[cmdk-group-heading]]:text-muted-foreground/70 [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:py-2.5">
                  <CommandItem className="flex items-center gap-3 py-2.5 px-2 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-muted-foreground/70">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="M20 12h2" />
                      <path d="M2 12h2" />
                    </svg>
                    <span className="font-medium">Change Theme...</span>
                    <div className="flex items-center ml-auto">
                      <div className="flex items-center justify-center border bg-background text-xs py-0.5 px-1.5 rounded">T</div>
                    </div>
                  </CommandItem>

                  <CommandItem className="flex items-center gap-3 py-2.5 px-2 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-muted-foreground/70">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      <path d="M12 12h4" />
                    </svg>
                    <span className="font-medium">Copy Current URL</span>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Navigation" className="px-2 py-1.5 text-sm text-muted-foreground font-medium [&_[cmdk-group-heading]]:text-muted-foreground/70 [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:py-2.5">
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </DialogContent>
      </CommandDialog>
    </div>
  )
}

export default VercelCommandMenu 