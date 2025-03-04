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

// Linear Command Menu
const LinearCommandMenu = ({ name }: { name?: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border bg-[#5E6AD2] hover:bg-[#4F58C2] text-white shadow-sm transition-all duration-200"
      >
        <div className="flex items-center justify-center w-6 h-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 100 100"><path fill="#FFFFFF" d="M1.225 61.523c-.222-.949.908-1.546 1.597-.857l36.512 36.512c.69.69.092 1.82-.857 1.597-18.425-4.323-32.93-18.827-37.252-37.252ZM.002 46.889a.99.99 0 0 0 .29.76L52.35 99.71c.201.2.478.307.76.29 2.37-.149 4.695-.46 6.963-.927.765-.157 1.03-1.096.478-1.648L2.576 39.448c-.552-.551-1.491-.286-1.648.479a50.067 50.067 0 0 0-.926 6.962ZM4.21 29.705a.988.988 0 0 0 .208 1.1l64.776 64.776c.289.29.726.375 1.1.208a49.908 49.908 0 0 0 5.185-2.684.981.981 0 0 0 .183-1.54L8.436 24.336a.981.981 0 0 0-1.541.183 49.896 49.896 0 0 0-2.684 5.185Zm8.448-11.631a.986.986 0 0 1-.045-1.354C21.78 6.46 35.111 0 49.952 0 77.592 0 100 22.407 100 50.048c0 14.84-6.46 28.172-16.72 37.338a.986.986 0 0 1-1.354-.045L12.659 18.074Z" /></svg>
        </div>
        <span className="font-medium">Linear</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 rounded-lg border shadow-[0px_9px_48px_rgba(0,0,0,0.088),0px_6px_24px_rgba(0,0,0,0.11),0px_1px_1px_rgba(0,0,0,0.044)] max-w-[640px]">
          <div className="relative flex flex-col overflow-hidden">
            <Command className="border-0">
              <CommandInput
                placeholder="Type a command or search..."
                className="h-12 border-0 focus:ring-0 text-base w-full"
              />

              <CommandList className="overflow-y-auto max-h-[400px] py-2 px-2">
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </CommandEmpty>

                <CommandGroup heading="Issue" className="py-3 !p-0 text-xs text-muted-foreground font-medium [&_[cmdk-group-heading]]:text-muted-foreground/70">
                  <CommandItem className="rounded-md py-3 !px-4 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground flex items-center">
                    <div className="flex items-center gap-3 flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                      <span className="font-medium">Create new issue...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center justify-center border !border-muted-foreground/10 bg-background dark:bg-muted text-xs py-0.5 px-1.5 rounded">
                        <span>C</span>
                      </div>
                    </div>
                  </CommandItem>

                  <CommandItem className="rounded-md py-3 !px-4 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground flex items-center">
                    <div className="flex items-center gap-3 flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                      <span className="font-medium">Create issue in fullscreen...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center justify-center border !border-muted-foreground/10 bg-background dark:bg-muted text-xs py-0.5 px-1.5 rounded">
                        <span>V</span>
                      </div>
                    </div>
                  </CommandItem>

                  <CommandItem className="rounded-md py-3 !px-4 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground flex items-center">
                    <div className="flex items-center gap-3 flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                      <span className="font-medium">Create new issue from template...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center justify-center border !border-muted-foreground/10 bg-background dark:bg-muted text-xs p-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3h6l6 18h6" />
                          <path d="M14 3h7" />
                        </svg>
                      </div>
                      <div className="flex items-center justify-center border !border-muted-foreground/10 bg-background dark:bg-muted text-xs py-0.5 px-1.5 rounded">
                        <span>C</span>
                      </div>
                    </div>
                  </CommandItem>

                  <CommandItem className="rounded-md py-3 !px-4 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground flex items-center">
                    <div className="flex items-center gap-3 flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                      </svg>
                      <span className="font-medium">Create new label...</span>
                    </div>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Document" className="py-2 !p-0 text-xs text-muted-foreground font-medium [&_[cmdk-group-heading]]:text-muted-foreground/70">
                  <CommandItem className="rounded-md py-3 !px-4 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground flex items-center">
                    <div className="flex items-center gap-3 flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span className="font-medium">Create document in...</span>
                    </div>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Project" className="py-2 !p-0 text-xs text-muted-foreground font-medium [&_[cmdk-group-heading]]:text-muted-foreground/70">
                  <CommandItem className="rounded-md py-3 !px-4 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground flex items-center">
                    <div className="flex items-center gap-3 flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M3 9h18" />
                        <path d="M9 21V9" />
                      </svg>
                      <span className="font-medium">Create new project...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center justify-center border !border-muted-foreground/10 bg-background dark:bg-muted text-xs py-0.5 px-1.5 rounded">
                        <span>P</span>
                      </div>
                      <span className="text-xs text-muted-foreground">then</span>
                      <div className="flex items-center justify-center border !border-muted-foreground/10 bg-background dark:bg-muted text-xs py-0.5 px-1.5 rounded">
                        <span>C</span>
                      </div>
                    </div>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </DialogContent>
      </CommandDialog>
    </div>
  )
}

export default LinearCommandMenu