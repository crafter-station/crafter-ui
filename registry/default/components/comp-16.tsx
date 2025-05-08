import { Button } from "@/registry/default/ui/button"
import { Printer } from "lucide-react"

export default function PrintButton() {
  return (
    <Button variant="outline" size="sm">
      <Printer className="mr-2 h-4 w-4" />
      Print
      <kbd className="bg-background text-muted-foreground/70 ms-1 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-xs font-medium">
        <span className="text-sm">⌘</span>P
      </kbd>
    </Button>
  )
} 