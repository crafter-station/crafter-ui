import { categories } from "@/config/components"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          {category.name}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {category.description}
        </p>
      </div>

      <div className="mt-8">
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t",
          category.components.length === 1 && "flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4",
          category.components.length === 2 && "flex flex-col sm:flex-row w-full md:w-2/3 lg:w-2/4",
          category.components.length === 3 && "lg:flex lg:w-3/4",
        )}>
          {category.components.map((component, i) => {
            const Component = component.component

            return (
              <div
                key={i}
                className={cn(
                  "flex-1 bg-card relative p-8 transition-colors",
                  "border-r border-b"
                )}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-center py-3">
                    <Component name={component.name} />
                  </div>
                  <p className="sr-only text-sm text-muted-foreground">
                    {component.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Generate static params for all categories
export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
} 