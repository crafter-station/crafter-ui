"use client";
import { Example } from "@/components/examples/example";
import { Input } from "@/components/ui/input";
export default function Preview() {
  return (
    <div className="example-stack">
      <InputBasic />
    </div>
  );
}
function InputBasic() {
  return (
    <Example title="Basic">
      <Input type="email" placeholder="Email" />
    </Example>
  );
}
