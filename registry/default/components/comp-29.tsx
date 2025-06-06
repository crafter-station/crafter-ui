"use client"
import { Button } from "@/registry/default/ui/button"

export default function FacebookLoginButtons() {
  return (
    <div className="flex flex-col gap-4">
      {/* Filled Variant */}
      <div className="flex gap-4">
        <Button
          className="w-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C9.4 4 4 9.42714 4 16.0603C4 22.0121 8.404 26.9568 14.08 28V19.4372H11.08V16.0603H14.08V13.407C14.08 10.392 16 8.70352 18.76 8.70352C19.6 8.70352 20.56 8.82412 21.4 8.94472V12.0201H19.84C18.4 12.0201 18.04 12.7437 18.04 13.7085V16.0603H21.22L20.68 19.4372H18.04V27.9879C23.71 26.9387 28 22.0121 28 16.0603C28 9.42714 22.6 4 16 4Z" fill="currentColor" />
          </svg>
          Login with Facebook
        </Button>

        <Button
          className="w-full px-3 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
          size="icon"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C9.4 4 4 9.42714 4 16.0603C4 22.0121 8.404 26.9568 14.08 28V19.4372H11.08V16.0603H14.08V13.407C14.08 10.392 16 8.70352 18.76 8.70352C19.6 8.70352 20.56 8.82412 21.4 8.94472V12.0201H19.84C18.4 12.0201 18.04 12.7437 18.04 13.7085V16.0603H21.22L20.68 19.4372H18.04V27.9879C23.71 26.9387 28 22.0121 28 16.0603C28 9.42714 22.6 4 16 4Z" fill="currentColor" />
          </svg>
        </Button>
      </div>

      {/* Outline Variant */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="w-full"
        >
          <svg className="!size-5 text-[#1877F2]" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C9.4 4 4 9.42714 4 16.0603C4 22.0121 8.404 26.9568 14.08 28V19.4372H11.08V16.0603H14.08V13.407C14.08 10.392 16 8.70352 18.76 8.70352C19.6 8.70352 20.56 8.82412 21.4 8.94472V12.0201H19.84C18.4 12.0201 18.04 12.7437 18.04 13.7085V16.0603H21.22L20.68 19.4372H18.04V27.9879C23.71 26.9387 28 22.0121 28 16.0603C28 9.42714 22.6 4 16 4Z" fill="url(#paint0_linear_177_3289)"></path>
            <defs>
              <linearGradient id="paint0_linear_177_3289" x1="16" y1="27.2824" x2="16" y2="4" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0062E0" />
                <stop offset="1" stopColor="#19AFFF" />
              </linearGradient>
            </defs>
          </svg>
          Login with Facebook
        </Button>

        <Button
          variant="outline"
          className="w-full px-3"
          size="icon"
        >
          <svg className="!size-5 text-[#1877F2]" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C9.4 4 4 9.42714 4 16.0603C4 22.0121 8.404 26.9568 14.08 28V19.4372H11.08V16.0603H14.08V13.407C14.08 10.392 16 8.70352 18.76 8.70352C19.6 8.70352 20.56 8.82412 21.4 8.94472V12.0201H19.84C18.4 12.0201 18.04 12.7437 18.04 13.7085V16.0603H21.22L20.68 19.4372H18.04V27.9879C23.71 26.9387 28 22.0121 28 16.0603C28 9.42714 22.6 4 16 4Z" fill="url(#paint0_linear_177_3289)"></path>
            <defs>
              <linearGradient id="paint0_linear_177_3289" x1="16" y1="27.2824" x2="16" y2="4" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0062E0" />
                <stop offset="1" stopColor="#19AFFF" />
              </linearGradient>
            </defs>
          </svg>
        </Button>
      </div>
    </div>
  )
} 