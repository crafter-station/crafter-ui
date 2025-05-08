import { RegistryComponentView } from "@/components/registry-component-view"

interface ComponentPageProps {
  params: { component: string }
}

export default function ComponentPage({ params }: ComponentPageProps) {
  return <RegistryComponentView componentName={params.component} />
} 