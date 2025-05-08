"use client"
import { Button } from "@/registry/default/ui/button"
import { useState } from "react"

export default function ToggleButton() {
  const [isActive, setIsActive] = useState(false)

  return (
    <Button
      variant={isActive ? "default" : "outline"}
      className="w-[120px] transition-all"
      onClick={() => setIsActive(!isActive)}
    >
      {isActive ? "Enabled" : "Disabled"}
    </Button>
  )
} 