"use client"

import { useState } from "react"
import OpenInV0 from "@/components/open-in-v0"
import { Button } from "@/registry/default/ui/button"
import { Check, Copy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/default/ui/tooltip"

interface RegistryActionsProps {
  componentName: string
}

export function RegistryActions({ componentName }: RegistryActionsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const command = `npx shadcn@latest add https://crafterui.vercel.app/r/${componentName}.json`
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 border rounded-full bg-background"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy install command</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs">Copy install command</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <OpenInV0 componentSource={`https://crafterui.vercel.app/r/${componentName}.json`} />
    </div>
  )
} 