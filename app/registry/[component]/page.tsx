import { RegistryComponentView } from "@/components/registry-component-view"

interface ComponentPageProps {
  params: Promise<{ component: string }>
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { component } = await params
  return <RegistryComponentView componentName={component} />
} 