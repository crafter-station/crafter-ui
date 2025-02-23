import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export default function NotificationButton() {
  return (
    <div className="relative">
      <Button size="icon">
        <Bell className="h-4 w-4" />
      </Button>
      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white grid place-items-center">
        3
      </span>
    </div>
  )
} 