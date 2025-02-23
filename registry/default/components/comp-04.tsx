import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"

export default function LoadingButton() {
  return (
    <Button
      className="border !border-muted-foreground/20 disabled:bg-muted disabled:text-muted-foreground"
      disabled>
      <Loader className="h-4 w-4 animate-spin" />
      Please wait
    </Button>
  )
} 