"use client"
import { Button } from "@/registry/default/ui/button"

export default function MicrosoftLoginButtons() {
  return (
    <div className="flex flex-col gap-4">
      {/* Filled Variant */}
      <div className="flex gap-4">
        <Button
          className="w-full bg-[#2F2F2F] hover:bg-[#2F2F2F] text-white hover:brightness-[115%] transition-all"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path d="M15.5 15.5H4V4H15.5V15.5Z" fill="#F25022" />
            <path d="M28 15.5H16.5V4H28V15.5Z" fill="#7FBA00" />
            <path d="M15.5 28H4V16.5H15.5V28Z" fill="#00A4EF" />
            <path d="M28 28H16.5V16.5H28V28Z" fill="#FFB900" />
          </svg>
          Sign in with Microsoft
        </Button>

        <Button
          size="icon"
          className="w-full bg-[#2F2F2F] hover:bg-[#2F2F2F] text-white hover:brightness-[115%] transition-all"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path d="M15.5 15.5H4V4H15.5V15.5Z" fill="#F25022" />
            <path d="M28 15.5H16.5V4H28V15.5Z" fill="#7FBA00" />
            <path d="M15.5 28H4V16.5H15.5V28Z" fill="#00A4EF" />
            <path d="M28 28H16.5V16.5H28V28Z" fill="#FFB900" />
          </svg>
        </Button>
      </div>

      {/* Outline Variant */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="w-full"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path d="M15.5 15.5H4V4H15.5V15.5Z" fill="#F25022" />
            <path d="M28 15.5H16.5V4H28V15.5Z" fill="#7FBA00" />
            <path d="M15.5 28H4V16.5H15.5V28Z" fill="#00A4EF" />
            <path d="M28 28H16.5V16.5H28V28Z" fill="#FFB900" />
          </svg>
          Sign in with Microsoft
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="w-full px-3"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path d="M15.5 15.5H4V4H15.5V15.5Z" fill="#F25022" />
            <path d="M28 15.5H16.5V4H28V15.5Z" fill="#7FBA00" />
            <path d="M15.5 28H4V16.5H15.5V28Z" fill="#00A4EF" />
            <path d="M28 28H16.5V16.5H28V28Z" fill="#FFB900" />
          </svg>
        </Button>
      </div>
    </div>
  )
} 