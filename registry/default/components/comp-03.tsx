import { Button } from "@/components/ui/button"

export default function SecondaryButton({ name = "Secondary Button" }) {
  return (
    <Button variant="secondary">
      {name}
    </Button>
  )
} 