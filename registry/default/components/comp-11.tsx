"use client"
import { Button } from "@/registry/default/ui/button"
import { AudioLines } from "lucide-react"
import { useState } from "react"

export default function VoiceModeButton() {
  const [isActive, setIsActive] = useState(false)

  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="icon"
      className="rounded-full transition-colors"
      onClick={() => setIsActive(!isActive)}
    >
      <AudioLines className={`h-4 w-4 ${isActive ? "animate-pulse" : ""}`} />
      <span className="sr-only">Toggle voice mode</span>
    </Button>
  )
} 