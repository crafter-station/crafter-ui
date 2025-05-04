import { categories } from "@/config/components"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

interface CategoryPageProps {
  params: Promise<{ slug: string }>

}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }
  console.log({ category })

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
          category.layout === "column" && "grid grid-cols-1 border-l border-t",
          category.layout === "default" && "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t",
          category.layout !== "column" && category.components.length === 1 && "flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4",
          category.layout !== "column" && category.components.length === 2 && "flex flex-col sm:flex-row w-full md:w-2/3 lg:w-2/4",
          category.layout !== "column" && category.components.length === 3 && "lg:flex lg:w-3/4",
        )}>
          {category.components.map((component, i) => {
            const Component = component.component

            return (
              <div
                key={i}
                className={cn(
                  "flex-1 bg-card relative p-8 transition-colors",
                  "border-r border-b",
                  category.layout === "column" && "p-12"
                )}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-center py-3">
                    <Component name={component.name} />
                  </div>
                  <p className={cn(
                    "text-sm text-muted-foreground text-center mt-4",
                    category.layout !== "column" && "sr-only"
                  )}>
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