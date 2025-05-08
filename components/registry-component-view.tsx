"use client"

import { useEffect, useState } from "react"
import { RegistryActions } from "./registry-actions"

interface ComponentData {
  name: string
  title: string
  description: string
  component: React.ComponentType<any>
  meta?: {
    tags?: string[]
  }
  files?: {
    path: string
    type: string
  }[]
}

interface RegistryComponentViewProps {
  componentName: string
}

export function RegistryComponentView({ componentName }: RegistryComponentViewProps) {
  const [component, setComponent] = useState<ComponentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchComponent() {
      try {
        // First fetch the registry item data to get the file path
        const jsonUrl = `/r/${componentName}.json`
        console.log(`Fetching registry data from: ${jsonUrl}`)

        const response = await fetch(jsonUrl)

        if (!response.ok) {
          throw new Error(`Failed to fetch registry data: ${response.status} ${response.statusText}`)
        }

        // Check the content type to ensure we're getting JSON
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text()
          console.error('Received non-JSON response:', text.substring(0, 100) + '...')
          throw new Error(`Expected JSON but got ${contentType || 'unknown content type'}`)
        }

        const data = await response.json()
        console.log('Registry data:', data)

        // Extract the component file path from the registry data
        const filePath = data.files && data.files[0] ? data.files[0].path : ''

        if (!filePath) {
          throw new Error(`No file path found for component ${componentName}`)
        }

        console.log(`Component file path: ${filePath}`)

        // Extract the component file name from the path (e.g., comp-01.tsx)
        const fileNameMatch = filePath.match(/\/([^/]+)\.tsx$/)
        if (!fileNameMatch) {
          throw new Error(`Invalid file path format: ${filePath}`)
        }

        const fileName = fileNameMatch[1]
        console.log(`Importing component from: @/registry/default/components/${fileName}.tsx`)

        // Dynamically import the component
        const mod = await import(`@/registry/default/components/${fileName}.tsx`)
        const ComponentModule = mod.default

        setComponent({
          ...data,
          component: ComponentModule
        })
      } catch (error) {
        console.error("Error loading component:", error)
        setError(error instanceof Error ? error.message : String(error))
      } finally {
        setLoading(false)
      }
    }

    fetchComponent()
  }, [componentName])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-muted-foreground mb-4">
          Failed to load component:
        </p>
        <pre className="bg-muted p-4 rounded-md text-sm overflow-auto max-w-2xl">
          {error}
        </pre>
      </div>
    )
  }

  if (!component) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Component not found</h1>
        <p className="text-muted-foreground">
          Could not find the component you were looking for.
        </p>
      </div>
    )
  }

  const Component = component.component

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{component.title}</h1>
          <p className="text-muted-foreground">{component.description}</p>
        </div>
        <RegistryActions componentName={componentName} />
      </div>

      <div className="mt-8 p-6 border rounded-lg">
        <Component />
      </div>

      {component.meta?.tags && (
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {component.meta.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 