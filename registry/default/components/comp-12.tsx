import { Button } from "@/registry/default/ui/button"
import { Download } from "lucide-react"

export default function DownloadButton() {
  return (
    <Button variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Download
    </Button>
  )
} 