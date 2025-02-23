import { Button } from "@/components/ui/button"

export default function DisabledButton() {
  return (
    <Button
      className="border !border-muted-foreground/20 disabled:bg-muted disabled:text-muted-foreground"
      disabled>
      Disabled Button
    </Button>
  )
} 