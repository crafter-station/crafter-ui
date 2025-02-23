import { Button } from "@/components/ui/button"
import { SendHorizontal } from "lucide-react"

export default function IconOnlyButton() {
  return (
    <Button variant="outline" className="rounded-lg">
      <SendHorizontal className="h-4 w-4" />
    </Button>
  )
} 
