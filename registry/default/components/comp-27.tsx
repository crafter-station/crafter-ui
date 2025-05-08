"use client"
import { Button } from "@/registry/default/ui/button"

export default function TwitterLoginButtons() {
  return (
    <div className="flex flex-col gap-4">
      {/* Filled Variant */}
      <div className="flex gap-4">
        <Button
          className="w-full bg-black text-white dark:text-black dark:bg-white hover:opacity-95 dark:hover:opacity-70 transition-all"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path d="M3.06327 4L13.1016 17.2376L3 28H5.27364L14.1177 18.5771L21.2633 28H29L18.3967 14.018L27.7993 4H25.5256L17.3809 12.678L10.8 4H3.06327ZM6.40675 5.65195H9.96097L25.6561 26.3485H22.1019L6.40675 5.65195Z" fill="currentColor" />
          </svg>
          Sign in with Twitter
        </Button>

        <Button
          size="icon"
          className="w-full px-3 bg-black text-white dark:text-black dark:bg-white hover:opacity-95 dark:hover:opacity-70 transition-all"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path d="M3.06327 4L13.1016 17.2376L3 28H5.27364L14.1177 18.5771L21.2633 28H29L18.3967 14.018L27.7993 4H25.5256L17.3809 12.678L10.8 4H3.06327ZM6.40675 5.65195H9.96097L25.6561 26.3485H22.1019L6.40675 5.65195Z" fill="currentColor" />
          </svg>
        </Button>
      </div>

      {/* Outline Variant */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="w-full"
        >
          <svg className="!size-5 text-black dark:text-white" viewBox="0 0 32 32" fill="none">
            <path d="M3.06327 4L13.1016 17.2376L3 28H5.27364L14.1177 18.5771L21.2633 28H29L18.3967 14.018L27.7993 4H25.5256L17.3809 12.678L10.8 4H3.06327ZM6.40675 5.65195H9.96097L25.6561 26.3485H22.1019L6.40675 5.65195Z" fill="currentColor" />
          </svg>
          Sign in with Twitter
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="w-full px-3"
        >
          <svg className="!size-5 text-black dark:text-white" viewBox="0 0 32 32" fill="none">
            <path d="M3.06327 4L13.1016 17.2376L3 28H5.27364L14.1177 18.5771L21.2633 28H29L18.3967 14.018L27.7993 4H25.5256L17.3809 12.678L10.8 4H3.06327ZM6.40675 5.65195H9.96097L25.6561 26.3485H22.1019L6.40675 5.65195Z" fill="currentColor" />
          </svg>
        </Button>
      </div>
    </div>
  )
} 