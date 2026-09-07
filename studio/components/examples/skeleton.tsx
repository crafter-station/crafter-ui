"use client";
import { Example } from "@/components/examples/example";
import { Skeleton } from "@/components/ui/skeleton";
export default function Preview() {
  return (
    <div className="example-stack">
      <SkeletonAvatar />
    </div>
  );
}
function SkeletonAvatar() {
  return (
    <Example title="Avatar">
      <div className="flex w-full items-center gap-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </Example>
  );
}
