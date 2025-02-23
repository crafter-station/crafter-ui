import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function LinkButton() {
  return (
    <Button variant="link" className="text-[#06c] dark:text-[#2997FF] gap-0">
      <span >Explore what&apos;s new in SwiftUI</span>
      <ChevronRight className="h-4 w-4 translate-y-[0.1rem]" />
    </Button>
  )
} 