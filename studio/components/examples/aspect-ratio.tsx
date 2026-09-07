"use client";
import { Example } from "@/components/examples/example";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export default function Preview() {
  return (
    <div className="example-stack">
      <AspectRatio16x9 />
    </div>
  );
}
function AspectRatio16x9() {
  return (
    <Example title="16:9" className="items-center justify-center">
      <AspectRatio
        ratio={16 / 9}
        className="rounded-lg bg-muted style-luma:rounded-3xl"
      >
        <div className="flex size-full items-center justify-center text-3xl font-semibold">
          16:9
        </div>
      </AspectRatio>
    </Example>
  );
}
