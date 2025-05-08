"use client"
import { Button } from "@/registry/default/ui/button"
import { cn } from "@/registry/default/lib/utils"
import { ArrowRight, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar"

export default function SuggestedTeamsButton() {
  return (
    <Button
      variant="ghost"
      className="w-full justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="relative items-center flex -space-x-4">
          <Avatar className="h-8 w-8 rounded-full border-2 !border-white flex items-center justify-center text-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <Avatar className="h-7 w-7 bg-black text-white rounded-full border-2 !border-white flex items-center justify-center text-xs">
            +2
          </Avatar>
        </div>
        <span>Suggested Teams</span>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform" />
    </Button>
  )
} 