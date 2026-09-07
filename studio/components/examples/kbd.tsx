"use client";
import { Example } from "@/components/examples/example";
import { Kbd } from "@/components/ui/kbd";
export default function Preview() {
  return (
    <div className="example-stack">
      <KbdBasic />
    </div>
  );
}
function KbdBasic() {
  return (
    <Example title="Basic">
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <Kbd>⌘K</Kbd>
        <Kbd>Ctrl + B</Kbd>
      </div>
    </Example>
  );
}
