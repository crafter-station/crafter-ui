"use client";
import { Example } from "@/components/examples/example";
import { Spinner } from "@/components/ui/spinner";
export default function Preview() {
  return (
    <div className="example-stack">
      <SpinnerBasic />
    </div>
  );
}
function SpinnerBasic() {
  return (
    <Example title="Basic">
      <div className="flex items-center gap-6">
        <Spinner />
        <Spinner className="size-6" />
      </div>
    </Example>
  );
}
