"use client"

import { useState } from "react"
import OpenInV0 from "@/components/open-in-v0"
import { Button } from "@/registry/default/ui/button"
import { Check, Copy, ExternalLink } from "lucide-react"
import { cn } from "@/registry/default/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/default/ui/tooltip"
import { ShadcnLogo } from "./shadcn-logo"
import { ComponentCategory } from "@/config/components"

interface ComponentActionsProps {
  componentName: string
  categoryName: string
}

export function ComponentActions({ componentName, categoryName }: ComponentActionsProps) {
  const [copied, setCopied] = useState(false)
  const fullName = `${componentName}-${categoryName}`

  const handleCopy = () => {
    const command = `npx shadcn@latest add https://crafter-ui.vercel.app/r/${fullName}.json`
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex gap-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 rounded-fullbg-transparent"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="size-4 text-green-500" />
              ) : (
                <ShadcnLogo className="size-2" />
              )}
              <span className="sr-only">Shadcn CLI command</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Shadcn CLI command</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <OpenInV0 componentSource={`https://crafter-ui.vercel.app/r/${fullName}.json`} />
    </div>
  )
} 