// Make this a server component - it will use client components for interactivity
import Link from "next/link"
import { Input } from "@/registry/default/ui/input"
import { Button } from "@/registry/default/ui/button"
import { RegistryItems } from "@/components/registry-items"

export default function RegistryPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">CrafterUI Registry</h1>
        <p className="text-muted-foreground">
          Browse and use our component library in your projects.
        </p>
      </div>

      <RegistryItems />
    </div>
  )
} 