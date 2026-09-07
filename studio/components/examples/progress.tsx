"use client";
import { Example } from "@/components/examples/example";
import { Progress } from "@/components/ui/progress";
export default function Preview() {
  return (
    <div className="example-stack">
      <ProgressValues />
    </div>
  );
}
function ProgressValues() {
  return (
    <Example title="Progress Bar">
      <div className="flex w-full flex-col gap-4">
        <Progress value={0} />
        <Progress value={25} className="w-full" />
        <Progress value={50} />
        <Progress value={75} />
        <Progress value={100} />
      </div>
    </Example>
  );
}
