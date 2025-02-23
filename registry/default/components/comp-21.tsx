"use client"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

export default function FilterButton() {
  return (
    <Button variant="outline" className="group gap-1">
      <div className="relative">
        <SlidersHorizontal className="h-4 w-4" />
        <div className="absolute transition-all -top-1 -right-1 h-2.5 w-2.5 border-2 !border-card rounded-full bg-[#6D78D5] group-hover:!border-accent" />
      </div>
      Display
    </Button>
  )
} 