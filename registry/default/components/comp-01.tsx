import { Button } from "@/registry/default/ui/button"

export default function ButtonDemo({ name = "Primary" }) {
  return (
    <Button>
      {name}
    </Button>
  )
} 