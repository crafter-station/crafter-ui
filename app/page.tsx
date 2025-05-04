import { Button } from "@/components/ui/button"
import { categories } from "@/config/components"
import { Search } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function Page() {
  const groupedCategories = {
    "All": categories,
    "Atoms": categories.filter(c => c.type === "atom"),
    "Molecules": categories.filter(c => c.type === "molecule"),
    "Organisms": categories.filter(c => c.type === "organism"),
    "Templates": categories.filter(c => c.type === "template"),
    "Pages": categories.filter(c => c.type === "page"),
  }

  // Helper function to group categories by type for "All" view
  const getCategoriesByType = (items: typeof categories) => {
    const types = ["atom", "molecule", "organism", "template", "page"] as const
    return types.reduce((acc, type) => {
      const typeItems = items.filter(item => item.type === type)
      if (typeItems.length > 0) {
        acc[type] = typeItems
      }
      return acc
    }, {} as Record<string, typeof categories>)
  }

  // Helper function to get total component count
  const getTotalComponentCount = (items: typeof categories) => {
    return items.reduce((total, item) => total + item.count, 0)
  }

  return (
    <div className="container py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Craft with confidence and speed.
        </h1>
        <p className="mt-4 text-muted-foreground">
          A comprehensive collection of shadcn/ui components organized using atomic design principles, from foundational elements to complete pages.
        </p>
        <div className="relative mt-8">
          <Button
            variant="outline"
            className="relative h-9 w-full justify-start rounded-md border px-3 text-sm"
          >
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Search components...</span>
            <kbd className="pointer-events-none absolute right-2 top-[50%] translate-y-[-50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
              ⌘K
            </kbd>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="All" className="mt-12">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <TabsList className="bg-background h-auto -space-x-px p-0 shadow-xs w-max justify-start">
            {Object.entries(groupedCategories).map(([type, items]) => (
              <TabsTrigger
                key={type}
                value={type}
                className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e [&>[data-badge]]:!ml-2 data-[state=active]:[&>[data-badge]]:!bg-primary data-[state=active]:[&>[data-badge]]:!text-primary-foreground"
              >
                {type}
                <Badge
                  variant="outline"
                  data-badge=""
                >
                  {getTotalComponentCount(items)}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {Object.entries(groupedCategories).map(([type, items]) => (
          <TabsContent key={type} value={type} className="mt-8">
            {type === "All" ? (
              // Special layout for "All" tab
              <div className="space-y-16">
                {Object.entries(getCategoriesByType(items)).map(([categoryType, categoryItems]) => (
                  <section key={categoryType}>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-lg font-medium capitalize">{categoryType}s</h2>
                      <span className="text-sm text-muted-foreground">
                        {categoryItems.length} categorie{categoryItems.length === 1 ? "s" : "s"}
                      </span>
                    </div>
                    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t",
                      categoryItems.length === 1 && "flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4",
                      categoryItems.length === 2 && "flex flex-col sm:flex-row w-full md:w-2/3 lg:w-2/4",
                      categoryItems.length === 3 && "lg:flex lg:w-3/4",
                    )}>
                      {categoryItems.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/components/${category.slug}`}
                          className={cn(
                            "group flex-1 bg-card relative p-4 hover:bg-muted/50 transition-colors",
                            "border-r border-b"
                          )}
                        >
                          <div className="space-y-3">
                            <div className="relative bg-muted/40">
                              <img
                                src={`/thumbs/${category.slug}.webp`}
                                alt={`${category.name} components`}
                                className="object-cover aspect-[4/3] dark:hidden"
                              />
                              <img
                                src={`/thumbs/${category.slug}-dark.webp`}
                                alt={`${category.name} components dark`}
                                className="object-cover aspect-[4/3] hidden dark:block"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {category.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {category.count} Components
                              </p>
                              {category.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {category.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              // Regular layout for other tabs
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-medium">{type}</h2>
                  <span className="text-sm text-muted-foreground">
                    {items.length} categories
                  </span>
                </div>
                <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t",
                  items.length === 0 && "!border-t-transparent",
                  items.length === 1 && "flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4",
                  items.length === 2 && "flex flex-col sm:flex-row w-full md:w-2/3 lg:w-2/4",
                  items.length === 3 && "lg:flex lg:w-3/4",
                )}>
                  {items.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/components/${category.slug}`}
                      className={cn(
                        "group bg-card relative p-4 hover:bg-muted/50 transition-colors",
                        "border-r border-b"
                      )}
                    >
                      <div className="space-y-3">
                        <div className="aspect-[4/3] relative bg-muted/40">
                          <img
                            src={`/thumbs/${category.slug}.webp`}
                            alt={`${category.name} components`}
                            className="object-cover dark:hidden"
                          />
                          <img
                            src={`/thumbs/${category.slug}-dark.webp`}
                            alt={`${category.name} components dark`}
                            className="object-cover hidden dark:block"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {category.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {category.count} Components
                          </p>
                          {category.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
