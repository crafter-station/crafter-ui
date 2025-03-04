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

// Claude Command Menu
const ClaudeCommandMenu = ({ name }: { name?: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border bg-gradient-to-r from-[#ed825f] to-[#D97757] hover:from-[#e27c5b] hover:to-[#cd7153] text-white shadow-sm transition-all duration-200"
      >
        <div className="flex items-center justify-center w-6 h-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="256" height="257" preserveAspectRatio="xMidYMid" viewBox="0 0 256 257"><path fill="#FFFFFF" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z" /></svg>
        </div>
        <span className="font-medium">Claude</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 rounded-xl border shadow-2xl bg-[#F9F9F9]">
          <Command className="rounded-lg border-0 bg-transparent">
            <CommandInput
              placeholder="Type a command or search..."
              className="border-b border-[#EAEAEA] font-medium"
            />
            <CommandList className="py-2">
              <CommandEmpty className="text-muted-foreground py-6 text-center text-sm">
                No results found.
              </CommandEmpty>

              <CommandGroup heading="Suggestions" className="px-2 py-1.5">
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-[#EAEAEA]">
                  <span>New File</span>
                  <CommandShortcut className="ml-auto text-xs text-muted-foreground">⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-[#EAEAEA]">
                  <span>New Window</span>
                  <CommandShortcut className="ml-auto text-xs text-muted-foreground">⇧⌘N</CommandShortcut>
                </CommandItem>
                <CommandSeparator />
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-[#EAEAEA]">
                  <span>Settings</span>
                  <CommandShortcut className="ml-auto text-xs text-muted-foreground">⌘,</CommandShortcut>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Tools" className="px-2 py-1.5">
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-[#EAEAEA]">
                  <span>Search</span>
                  <CommandShortcut className="ml-auto text-xs text-muted-foreground">⌘F</CommandShortcut>
                </CommandItem>
                <CommandItem className="rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-[#EAEAEA]">
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

export default ClaudeCommandMenu 