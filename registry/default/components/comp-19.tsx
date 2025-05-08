import { Button } from "@/registry/default/ui/button"
import { AlertCircle } from "lucide-react"

export default function WarningButton() {
  return (
    <Button className="bg-amber-500 hover:bg-amber-600">
      <AlertCircle className="mr-2 h-4 w-4" />
      Warning
    </Button>
  )
} 