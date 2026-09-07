"use client";
import { Example } from "@/components/examples/example";
import { Badge } from "@/components/ui/badge";
export default function Preview() {
  return (
    <div className="example-stack">
      <BadgeVariants />
    </div>
  );
}
function BadgeVariants() {
  return (
    <Example title="Variants">
      <div className="flex flex-wrap gap-2 style-sera:gap-6">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    </Example>
  );
}
