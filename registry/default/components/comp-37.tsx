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
import { DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Supabase Command Menu
const SupabaseCommandMenu = ({ name }: { name?: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border border-[#0A7C4F]/20 dark:border-[#6EE7B7]/20 dark:bg-[#00623A] bg-[#6EE7B7] dark:hover:bg-[#2E7353] hover:bg-[#72E3AD] dark:text-white text-[#242424] shadow-sm transition-all duration-200",
          "border !border-[#36C182] dark:!border-[#148253] hover:!border-[#0a7c4f] dark:hover:!border-[#6ee7b7]"
        )}
      >
        <div className="flex items-center justify-center w-4 h-4">
          <svg viewBox="0 0 109 113" width="16" height="16" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
            <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="white" className="fill-[#242424] dark:fill-white" />
            <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="white" className="fill-[#242424] dark:fill-white" fillOpacity="0.2" />
            <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="white" className="fill-[#242424] dark:fill-white" />
          </svg>
        </div>
        <span className="font-medium">Supabase</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden selection:bg-[#6EE7B7] selection:text-[#242424] p-0 rounded-xl border shadow-2xl max-w-xl bg-[#F9F9F9] dark:bg-[#242424] text-[#1F1F1F] dark:text-white md:max-h-[500px] sm:align-middle !animate-in !slide-in-from-bottom-[0%] !duration-300 data-[state=closed]:!animate-out data-[state=closed]:!slide-out-to-bottom">
          <Command className="rounded-lg border-0 bg-transparent [&_[cmdk-group]]:px-2 [&_[cmdk-group]]:!bg-transparent [&_[cmdk-group-heading]]:!bg-transparent">
            <CommandInput
              placeholder="Type a command or search..."
              className="font-medium placeholder:text-muted-foreground/40 h-12 !py-7 px-4 md:text-xs text-base"
            />
            <CommandList className="overflow-y-auto min-h-[445px] max-h-[initial] overflow-x-hidden bg-transparent">
              <CommandEmpty className="py-6 text-center text-sm text-black/70 dark:text-white/70">
                No results found.
              </CommandEmpty>

              <CommandGroup heading="QUERIES" className="!py-3 !px-2 [&_[cmdk-group-heading]]:text-muted-foreground/30 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:!tracking-wider px-2 py-3 text-xs text-black/50 dark:text-white/50 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-normal overflow-hidden">
                <CommandItem className="rounded-md px-2 py-3 text-sm cursor-pointer group outline-none relative flex">
                  <div className="flex items-center w-full flex-row justify-between">
                    <div className="flex items-center gap-2 mr-2 flex-grow">
                      <div className="text-[#0A7C4F] dark:text-[#6EE7B7] flex justify-center items-center relative" style={{ width: '24px', height: '24px' }}>
                        <svg width="20" height="20" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M23 1.78677L44.2132 23L23 44.2132L1.7868 23L23 1.78677ZM23 0.372559L23.7071 1.07967L44.9203 22.2929L45.6274 23L44.9203 23.7071L23.7071 44.9203L23 45.6274L22.2929 44.9203L1.07969 23.7071L0.372583 23L1.07969 22.2929L22.2929 1.07967L23 0.372559Z" fill="none" stroke="currentColor" strokeWidth="1" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M30 23C30 26.866 26.866 30 23 30C19.134 30 16 26.866 16 23C16 19.134 19.134 16 23 16C26.866 16 30 19.134 30 23ZM31 23C31 27.4183 27.4183 31 23 31C18.5817 31 15 27.4183 15 23C15 18.5817 18.5817 15 23 15C27.4183 15 31 18.5817 31 23Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                      <span className="text-foreground">Run SQL with Supabase AI</span>
                    </div>
                    <div className="ml-auto flex items-center">
                      <span className="text-xs px-2 py-0.5 rounded-full border !border-black/10 dark:!border-white/10 bg-background/10 text-muted-foreground inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 w-3.5 h-3.5">
                          <path d="M6 18h8"></path>
                          <path d="M3 22h18"></path>
                          <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
                          <path d="M9 14h2"></path>
                          <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path>
                          <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
                        </svg>
                        Experimental
                      </span>
                    </div>
                  </div>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-3 text-sm cursor-pointer text-black/70 dark:text-white/70 group outline-none relative flex bg-transparent transition-all">
                  <div className="flex items-center w-full flex-row justify-between">
                    <div className="flex items-center gap-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                      <span>Run SQL</span>
                    </div>
                  </div>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="TABLE EDITOR" className="!pt-0 !pb-3 [&_[cmdk-group-heading]]:text-muted-foreground/30 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:!tracking-wider px-2 pb-3 text-xs text-black/50 dark:text-white/50 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-normal overflow-hidden p-1">
                <CommandItem className="rounded-md px-2 py-3 text-sm cursor-pointer text-black/70 dark:text-white/70 group outline-none relative flex bg-transparent transition-all">
                  <div className="flex items-center w-full flex-row justify-between">
                    <div className="flex items-center gap-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>
                      </svg>
                      <span>View your tables</span>
                    </div>
                  </div>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="DATABASE" className="!pt-0 !pb-3 [&_[cmdk-group-heading]]:text-muted-foreground/30 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:!tracking-wider px-2 pb-3 text-xs text-black/50 dark:text-white/50 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-normal overflow-hidden">
                <CommandItem className="rounded-md px-2 py-3 text-sm cursor-pointer text-black/70 dark:text-white/70 group outline-none relative flex bg-transparent transition-all">
                  <div className="flex items-center w-full flex-row justify-between">
                    <div className="flex items-center gap-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                      <span>View your schemas</span>
                    </div>
                  </div>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-3 text-sm cursor-pointer text-black/70 dark:text-white/70 group outline-none relative flex bg-transparent transition-all">
                  <div className="flex items-center w-full flex-row justify-between">
                    <div className="flex items-center gap-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                        <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                        <path d="M3 12A9 3 0 0 0 21 12"></path>
                      </svg>
                      <span>View and create functions</span>
                    </div>
                  </div>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-3 text-sm cursor-pointer text-black/70 dark:text-white/70 group outline-none relative flex bg-transparent transition-all">
                  <div className="flex items-center w-full flex-row justify-between">
                    <div className="flex items-center gap-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                        <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                        <path d="M3 12A9 3 0 0 0 21 12"></path>
                      </svg>
                      <span>View and create triggers</span>
                    </div>
                  </div>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-3 text-sm cursor-pointer text-black/70 dark:text-white/70 group outline-none relative flex bg-transparent transition-all">
                  <div className="flex items-center w-full flex-row justify-between">
                    <div className="flex items-center gap-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                        <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                        <path d="M3 12A9 3 0 0 0 21 12"></path>
                      </svg>
                      <span>View and create enumerated types</span>
                    </div>
                  </div>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-3 text-sm cursor-pointer text-black/70 dark:text-white/70 group outline-none relative flex bg-transparent transition-all">
                  <div className="flex items-center w-full flex-row justify-between">
                    <div className="flex items-center gap-2 flex-grow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                        <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path>
                      </svg>
                      <span>View your extensions</span>
                    </div>
                  </div>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </CommandDialog>
    </div>
  )
}

export default SupabaseCommandMenu 