import { Button } from "@/registry/default/ui/button"
import { Tag } from "lucide-react"

export default function PropertyButton() {
  return (
    <Button
      variant="outline"
      className="rounded-full bg-background hover:bg-muted"
      size="sm"
    >
      <Tag className="mr-1 h-3 w-3" />
      Property
    </Button>
  )
} 