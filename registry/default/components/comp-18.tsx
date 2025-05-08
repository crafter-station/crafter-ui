import { Button } from "@/registry/default/ui/button"
import { Check } from "lucide-react"

export default function SuccessButton() {
  return (
    <Button className="bg-emerald-500 hover:bg-emerald-600">
      <Check className="mr-2 h-4 w-4" />
      Success
    </Button>
  )
} 