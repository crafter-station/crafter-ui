"use client"
import { Button } from "@/components/ui/button"
import { LayoutList, LayoutGrid, ChartGantt } from "lucide-react"

export default function ViewToggleButton() {
  return (
    <div className="inline-flex rounded-md border">
      <Button variant="ghost" className="rounded-none rounded-l-md border-r">
        <LayoutList className="h-4 w-4" />
      </Button>
      <Button variant="ghost" className="rounded-none border-r">
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button variant="ghost" className="rounded-none rounded-r-md">
        <ChartGantt className="h-4 w-4" />
      </Button>
    </div>
  )
} 