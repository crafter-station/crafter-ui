"use client"
import { Button } from "@/components/ui/button"

export default function TwitchLoginButtons() {
  return (
    <div className="flex flex-col gap-4">
      {/* Filled Variant */}
      <div className="flex gap-4">
        <Button
          className="w-full bg-[#9146FF] hover:bg-[#9146FF] text-white hover:brightness-[115%] transition-all"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.03583 5L5.87517 8.11429V24.6857H11.5185V28H14.6398L17.9625 24.6857H22.765L28.4083 19.0571V5H7.03583ZM26.0863 17.9429L22.765 21.2571H16.8018L13.479 24.5714V21.2571H8.67717V7.31429H26.0863V17.9429Z" fill="currentColor" />
            <path d="M22.765 11.8286H20.443V17.4571H22.765V11.8286Z" fill="currentColor" />
            <path d="M16.8018 11.8286H14.4798V17.4571H16.8018V11.8286Z" fill="currentColor" />
          </svg>
          Sign in with Twitch
        </Button>

        <Button
          size="icon"
          className="w-full bg-[#9146FF] hover:bg-[#9146FF] text-white hover:brightness-[115%] transition-all"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.03583 5L5.87517 8.11429V24.6857H11.5185V28H14.6398L17.9625 24.6857H22.765L28.4083 19.0571V5H7.03583ZM26.0863 17.9429L22.765 21.2571H16.8018L13.479 24.5714V21.2571H8.67717V7.31429H26.0863V17.9429Z" fill="currentColor" />
            <path d="M22.765 11.8286H20.443V17.4571H22.765V11.8286Z" fill="currentColor" />
            <path d="M16.8018 11.8286H14.4798V17.4571H16.8018V11.8286Z" fill="currentColor" />
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
            <path fillRule="evenodd" clipRule="evenodd" d="M7.03583 5L5.87517 8.11429V24.6857H11.5185V28H14.6398L17.9625 24.6857H22.765L28.4083 19.0571V5H7.03583ZM26.0863 17.9429L22.765 21.2571H16.8018L13.479 24.5714V21.2571H8.67717V7.31429H26.0863V17.9429Z" fill="#9146FF" />
            <path d="M22.765 11.8286H20.443V17.4571H22.765V11.8286Z" fill="#9146FF" />
            <path d="M16.8018 11.8286H14.4798V17.4571H16.8018V11.8286Z" fill="#9146FF" />
          </svg>
          Sign in with Twitch
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="w-full px-3"
        >
          <svg className="!size-5" viewBox="0 0 32 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.03583 5L5.87517 8.11429V24.6857H11.5185V28H14.6398L17.9625 24.6857H22.765L28.4083 19.0571V5H7.03583ZM26.0863 17.9429L22.765 21.2571H16.8018L13.479 24.5714V21.2571H8.67717V7.31429H26.0863V17.9429Z" fill="#9146FF" />
            <path d="M22.765 11.8286H20.443V17.4571H22.765V11.8286Z" fill="#9146FF" />
            <path d="M16.8018 11.8286H14.4798V17.4571H16.8018V11.8286Z" fill="#9146FF" />
          </svg>
        </Button>
      </div>
    </div>
  )
} 