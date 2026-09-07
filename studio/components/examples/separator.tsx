"use client";
import { Example } from "@/components/examples/example";
import { Separator } from "@/components/ui/separator";
export default function Preview() {
  return (
    <div className="example-stack">
      <SeparatorHorizontal />
    </div>
  );
}
function SeparatorHorizontal() {
  return (
    <Example title="Horizontal">
      <div className="flex flex-col gap-4 text-sm style-lyra:text-xs/relaxed">
        <div className="flex flex-col gap-1">
          <div className="leading-none font-medium">shadcn/ui</div>
          <div className="text-muted-foreground">
            The Foundation for your Design System
          </div>
        </div>
        <Separator />
        <div>
          A set of beautifully designed components that you can customize,
          extend, and build on.
        </div>
      </div>
    </Example>
  );
}
