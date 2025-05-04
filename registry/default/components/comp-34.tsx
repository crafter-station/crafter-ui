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

// Raycast Command Menu
const RaycastCommandMenu = ({ name }: { name?: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border bg-gradient-to-b from-white to-gray-100 hover:from-gray-50 hover:to-gray-200 shadow-sm transition-all duration-200"
      >
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7 18.079V21L0 14L1.46 12.54L7 18.081V18.079ZM9.921 21H7L14 28L15.46 26.54L9.921 21ZM26.535 15.462L27.996 14L13.996 0L12.538 1.466L18.077 7.004H14.73L10.864 3.146L9.404 4.606L11.809 7.01H10.129V17.876H20.994V16.196L23.399 18.6L24.859 17.14L20.994 13.274V9.927L26.535 15.462ZM7.73 6.276L6.265 7.738L7.833 9.304L9.294 7.844L7.73 6.276ZM20.162 18.708L18.702 20.17L20.268 21.738L21.73 20.276L20.162 18.708ZM4.596 9.41L3.134 10.872L7 14.738V11.815L4.596 9.41ZM16.192 21.006H13.268L17.134 24.872L18.596 23.41L16.192 21.006Z" fill="#FF6363" />
        </svg>
        <span className="font-medium text-black">Raycast</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden bg-accent/85 dark:bg-background/85 backdrop-blur-lg p-0 rounded-2xl border shadow-[0_20px_35px_rgba(0,0,0,0.25)] shadow-black/40 max-w-[750px]">
          <div className="relative flex bg-transparent flex-col overflow-hidden">
            <Command className="rounded-lg bg-transparent h-full">
              <CommandInput
                placeholder="Search for apps and commands..."
                className="h-12 border-0 focus:ring-0 text-base placeholder:text-muted-foreground/50 w-full"
              />

              <CommandList className="overflow-y-auto max-h-full py-2">
                <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                  No results found.
                </CommandEmpty>

                <CommandGroup heading="Suggestions" className="px-2 py-1.5 text-sm [&_[cmdk-group-heading]]:text-muted-foreground/70 [&_[cmdk-group-heading]]:font-semibold">
                  <CommandItem className="aria-selected:bg-muted aria-selected:text-muted-foreground rounded-md py-3 px-2 cursor-pointer flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md bg-[#292A2D] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 64 64" fill="none">
                          <path d="M0.403013 37.3991L26.6009 63.597C13.2225 61.3356 2.66442 50.7775 0.403013 37.3991Z" fill="white"></path>
                          <path d="M0 30.2868L33.7132 64C35.7182 63.8929 37.6742 63.6013 39.5645 63.142L0.85799 24.4355C0.398679 26.3259 0.10713 28.2818 0 30.2868Z" fill="white"></path>
                          <path d="M2.53593 19.4042L44.5958 61.4641C46.1277 60.8066 47.598 60.0331 48.9956 59.1546L4.84543 15.0044C3.96691 16.402 3.19339 17.8723 2.53593 19.4042Z" fill="white"></path>
                          <path d="M7.69501 11.1447C13.5677 4.32093 22.2677 0 31.9769 0C49.6628 0 64 14.3372 64 32.0231C64 41.7323 59.6791 50.4323 52.8553 56.305L7.69501 11.1447Z" fill="white"></path>
                        </svg>
                      </div>
                      <span className="font-medium text-sm">Linear</span>
                    </div>
                    <CommandShortcut className="ml-auto tracking-tight font-medium text-sm text-muted-foreground/70">Application</CommandShortcut>
                  </CommandItem>

                  <CommandItem className="aria-selected:bg-muted aria-selected:text-muted-foreground rounded-md py-3 px-2 cursor-pointer flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md bg-[#292A2D] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="14" height="14">
                          <path fill="#e64a19" d="M26,17h-8c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h8V17z"></path>
                          <path fill="#7c4dff" d="M25,31h-7c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7V31z"></path>
                          <path fill="#66bb6a" d="M18,45L18,45c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7v7C25,41.866,21.866,45,18,45z"></path>
                          <path fill="#ff7043" d="M32,17h-7V3h7c3.866,0,7,3.134,7,7v0C39,13.866,35.866,17,32,17z"></path>
                          <circle cx="32" cy="24" r="7" fill="#29b6f6"></circle>
                        </svg>
                      </div>
                      <span className="font-medium text-sm">Figma</span>
                    </div>
                    <CommandShortcut className="ml-auto tracking-tight font-medium text-sm text-muted-foreground/70">Application</CommandShortcut>
                  </CommandItem>

                  <CommandItem className="aria-selected:bg-muted aria-selected:text-muted-foreground rounded-md py-3 px-2 cursor-pointer flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="14" height="14">
                          <path fill="#33d375" d="M33,8c0-2.209-1.791-4-4-4s-4,1.791-4,4c0,1.254,0,9.741,0,11c0,2.209,1.791,4,4,4s4-1.791,4-4 C33,17.741,33,9.254,33,8z"></path>
                          <path fill="#33d375" d="M43,19c0,2.209-1.791,4-4,4c-1.195,0-4,0-4,0s0-2.986,0-4c0-2.209,1.791-4,4-4S43,16.791,43,19z"></path>
                          <path fill="#40c4ff" d="M8,14c-2.209,0-4,1.791-4,4s1.791,4,4,4c1.254,0,9.741,0,11,0c2.209,0,4-1.791,4-4s-1.791-4-4-4 C17.741,14,9.254,14,8,14z"></path>
                          <path fill="#40c4ff" d="M19,4c2.209,0,4,1.791,4,4c0,1.195,0,4,0,4s-2.986,0-4,0c-2.209,0-4-1.791-4-4S16.791,4,19,4z"></path>
                          <path fill="#e91e63" d="M14,39.006C14,41.212,15.791,43,18,43s4-1.788,4-3.994c0-1.252,0-9.727,0-10.984 c0-2.206-1.791-3.994-4-3.994s-4,1.788-4,3.994C14,29.279,14,37.754,14,39.006z"></path>
                          <path fill="#e91e63" d="M4,28.022c0-2.206,1.791-3.994,4-3.994c1.195,0,4,0,4,0s0,2.981,0,3.994c0,2.206-1.791,3.994-4,3.994 S4,30.228,4,28.022z"></path>
                          <path fill="#ffc107" d="M39,33c2.209,0,4-1.791,4-4s-1.791-4-4-4c-1.254,0-9.741,0-11,0c-2.209,0-4,1.791-4,4s1.791,4,4,4 C29.258,33,37.746,33,39,33z"></path>
                          <path fill="#ffc107" d="M28,43c-2.209,0-4-1.791-4-4c0-1.195,0-4,0-4s2.986,0,4,0c2.209,0,4,1.791,4,4S30.209,43,28,43z"></path>
                        </svg>
                      </div>
                      <span className="font-medium text-sm">Slack</span>
                    </div>
                    <CommandShortcut className="ml-auto tracking-tight font-medium text-sm text-muted-foreground/70">Application</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Commands" className="px-2 py-1.5 text-sm [&_[cmdk-group-heading]]:text-muted-foreground/70 [&_[cmdk-group-heading]]:font-semibold">
                  <CommandItem className="aria-selected:bg-muted aria-selected:text-muted-foreground rounded-md py-3 px-2 cursor-pointer flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center bg-gradient-to-br from-[#FA5B5B] to-[#DB3131] rounded-md">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.07512 2.75H4.75C3.64543 2.75 2.75 3.64543 2.75 4.75V12.25C2.75 13.3546 3.64543 14.25 4.75 14.25H11.25C12.3546 14.25 13.25 13.3546 13.25 12.25V4.75C13.25 3.64543 12.3546 2.75 11.25 2.75H9.92488M9.88579 3.02472L9.5934 4.04809C9.39014 4.75952 8.73989 5.25 8 5.25V5.25C7.26011 5.25 6.60986 4.75952 6.4066 4.04809L6.11421 3.02472C5.93169 2.38591 6.41135 1.75 7.07573 1.75H8.92427C9.58865 1.75 10.0683 2.3859 9.88579 3.02472Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                      <span className="font-medium text-sm">Clipboard History</span>
                    </div>
                    <CommandShortcut className="ml-auto tracking-tight font-medium text-sm text-muted-foreground/70">Application</CommandShortcut>
                  </CommandItem>

                  <CommandItem className="aria-selected:bg-muted aria-selected:text-muted-foreground rounded-md py-3 px-2 cursor-pointer flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center bg-gradient-to-br from-[#78C9B1] to-[#255A50] rounded-md">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.73762 6.19288L2.0488 11.2217C1.6504 11.649 1.6504 12.3418 2.0488 12.769L3.13083 13.9295C3.52923 14.3568 4.17515 14.3568 4.57355 13.9295L9.26238 8.90071M6.73762 6.19288L7.0983 5.80605C7.4967 5.37877 7.4967 4.686 7.0983 4.25872L6.01627 3.09822L6.37694 2.71139C7.57213 1.42954 9.50991 1.42954 10.7051 2.71139L13.9512 6.19288C14.3496 6.62017 14.3496 7.31293 13.9512 7.74021L12.8692 8.90071C12.4708 9.328 11.8248 9.328 11.4265 8.90071L11.0658 8.51388C10.6674 8.0866 10.0215 8.0866 9.62306 8.51388L9.26238 8.90071M6.73762 6.19288L9.26238 8.90071" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                      <span className="font-medium text-sm">Import Extension</span>
                    </div>
                    <CommandShortcut className="ml-auto tracking-tight font-medium text-sm text-muted-foreground/70">Command</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>

              {/* Footer */}
              <div className="border-t mt-auto p-2 flex items-center justify-between">
                <div className="flex items-center">
                  <svg width="20" height="20" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 mr-2 text-muted-foreground/50">
                    <path fillRule="evenodd" clipRule="evenodd" d="M934.302 511.971L890.259 556.017L723.156 388.902V300.754L934.302 511.971ZM511.897 89.5373L467.854 133.583L634.957 300.698H723.099L511.897 89.5373ZM417.334 184.275L373.235 228.377L445.776 300.923H533.918L417.334 184.275ZM723.099 490.061V578.209L795.641 650.755L839.74 606.652L723.099 490.061ZM697.868 653.965L723.099 628.732H395.313V300.754L370.081 325.987L322.772 278.675L278.56 322.833L325.869 370.146L300.638 395.379V446.071L228.097 373.525L183.997 417.627L300.638 534.275V634.871L133.59 467.925L89.4912 512.027L511.897 934.461L555.996 890.359L388.892 723.244H489.875L606.516 839.892L650.615 795.79L578.074 723.244H628.762L653.994 698.011L701.303 745.323L745.402 701.221L697.868 653.965Z" fill="currentColor"></path>
                  </svg>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-xs font-semibold mr-2">Open Application</span>
                    <kbd className="px-1.5 py-1 flex items-center justify-center text-xs bg-muted rounded border text-muted-foreground/70">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-corner-down-left"><polyline points="9 10 4 15 9 20" /><path d="M20 4v7a4 4 0 0 1-4 4H4" /></svg>
                    </kbd>
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs font-semibold text-muted-foreground/70 mr-2">Actions</span>
                    <div className="flex">
                      <kbd className="px-1.5 py-0.5 flex items-center justify-center text-xs bg-muted rounded border text-muted-foreground/70 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-command"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></svg>
                      </kbd>
                      <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border text-muted-foreground/70">K</kbd>
                    </div>
                  </div>
                </div>
              </div>
            </Command>
          </div>
        </DialogContent>
      </CommandDialog>
    </div>
  )
}

export default RaycastCommandMenu 