"use client"
import { Button } from "@/registry/default/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export default function CopyButton({ name = "Copy" }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="secondary"
      className="relative group"
      onClick={handleCopy}
    >
      <div className="flex items-center">
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4 text-green-500 animate-scale" />
            <span className="animate-fade-in">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            {name}
          </>
        )}
      </div>
    </Button>
  )
} 