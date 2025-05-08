"use client"
import { Button } from "@/registry/default/ui/button"
import { cn } from "@/registry/default/lib/utils"
import { Globe } from "lucide-react"
import { useState } from "react"

export default function SearchModeButton() {
  const [isActive, setIsActive] = useState(true)

  return (
    <Button
      variant="outline"
      className={cn(
        "gap-2 rounded-full transition-colors",
        isActive && "bg-[#DAEEFF] hover:bg-[#BDDCF4] text-[#0385FF] hover:text-[#0385FF] hover:border-[#BDDCF4] !border-transparent dark:bg-[#294A6D] dark:text-[#48AAFF] dark:hover:bg-[#1A416A]"
      )}
      onClick={() => setIsActive(!isActive)}
    >
      <Globe className="h-4 w-4" />
      Search
    </Button>
  )
} 