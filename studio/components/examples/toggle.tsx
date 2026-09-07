"use client";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Example } from "@/components/examples/example";
import { Toggle } from "@/components/ui/toggle";
export default function Preview() {
  return (
    <div className="example-stack">
      <ToggleBasic />
    </div>
  );
}
function ToggleBasic() {
  return (
    <Example title="Basic">
      <div className="flex flex-wrap items-center gap-2">
        <Toggle aria-label="Toggle bold" defaultPressed>
          <BoldIcon />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <ItalicIcon />
        </Toggle>
        <Toggle aria-label="Toggle underline">
          <UnderlineIcon />
        </Toggle>
      </div>
    </Example>
  );
}
