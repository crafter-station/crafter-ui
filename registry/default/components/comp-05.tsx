import { Button } from "@/registry/default/ui/button"
import { Trash } from "lucide-react"

export default function DestructiveButton({ name = "Delete Item" }) {
  return (
    <Button variant="destructive">
      <Trash className="h-4 w-4" />
      {name}
    </Button>
  )
} 