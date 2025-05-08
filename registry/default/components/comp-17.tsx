import { Button } from "@/registry/default/ui/button"
import { Share2 } from "lucide-react"

export default function ShareButton() {
  return (
    <Button variant="secondary" size="sm">
      Share
      <Share2 className="ml-2 h-4 w-4" />
    </Button>
  )
} 