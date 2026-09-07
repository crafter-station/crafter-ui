"use client";
import { Example } from "@/components/examples/example";
import { Textarea } from "@/components/ui/textarea";
export default function Preview() {
  return (
    <div className="example-stack">
      <TextareaBasic />
    </div>
  );
}
function TextareaBasic() {
  return (
    <Example title="Basic">
      <Textarea placeholder="Type your message here." />
    </Example>
  );
}
