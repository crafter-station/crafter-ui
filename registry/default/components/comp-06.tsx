"use client"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { useState } from "react"

export default function BookmarkButton({ name = "Save" }) {
  const [saved, setSaved] = useState(false)

  return (
    <Button
      variant="outline"
      className={`group transition-all ${saved ? "bg-muted text-muted-foreground hover:bg-muted-foreground/30" : ""}`}
      onClick={() => setSaved(!saved)}
    >
      <Bookmark
        className={`h-4 w-4 ${saved ? "fill-current animate-scale" : ""}`}
      />
      <span>
        {saved ? "Saved" : name}
      </span>
    </Button>
  )
} 