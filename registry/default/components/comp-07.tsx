import { Button } from "@/registry/default/ui/button"
import { Pencil } from "lucide-react"

export default function IconButtonWithText() {
  return (
    <Button
      className="bg-[#C2E7FE] text-[#001D35] hover:bg-[#BDDCF4] hover:text-[#001D35] hover:border-[#BDDCF4] !border-transparent rounded-xl">
      <Pencil className="h-4 w-4" />
      Compose
    </Button>
  )
} 