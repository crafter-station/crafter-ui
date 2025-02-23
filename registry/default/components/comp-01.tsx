import { Button } from "@/components/ui/button"

export default function ButtonDemo({ name = "Primary" }) {
  return (
    <Button>
      {name}
    </Button>
  )
} 