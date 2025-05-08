"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/registry/default/ui/button"
import { Input } from "@/registry/default/ui/input"
import { RegistryActions } from "@/components/registry-actions"

interface RegistryItem {
  name: string
  title: string
  description: string
  meta?: {
    tags?: string[]
  }
}

export function RegistryItems() {
  const [searchTerm, setSearchTerm] = useState("")
  const [registryItems, setRegistryItems] = useState<RegistryItem[]>([])

  useEffect(() => {
    async function fetchRegistry() {
      try {
        const response = await fetch('/registry.json')
        const data = await response.json()
        setRegistryItems(data.items || [])
      } catch (error) {
        console.error("Error fetching registry data:", error)
      }
    }

    fetchRegistry()
  }, [])

  const filteredItems = registryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meta?.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
      <div className="mb-8">
        <Input
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.name}
            className="group relative rounded-lg border p-6 hover:shadow-md transition-shadow"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <RegistryActions componentName={item.name} />
            </div>

            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-muted-foreground mb-4">{item.description}</p>

            {item.meta?.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.meta.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted"
                  >
                    {tag}
                  </span>
                ))}
                {item.meta.tags.length > 3 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted">
                    +{item.meta.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            <Link href={`/registry/${item.name}`}>
              <Button variant="outline" className="w-full">
                View Component
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-2">No components found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search term.
          </p>
        </div>
      )}
    </>
  )
} 