import { Button } from "@/components/ui/button"

export default function NeobrutalistButton({ name = "Neobrutalist" }) {
  return (
    <Button className="border-2 bg-background hover:bg-background text-foreground !border-foreground shadow-[4px_4px_0px_0px_var(--color-foreground)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
      {name}
    </Button>
  )
} 