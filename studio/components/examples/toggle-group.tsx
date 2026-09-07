"use client";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Example } from "@/components/examples/example";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
export default function Preview() {
  return (
    <div className="example-stack">
      <ToggleGroupBasic />
    </div>
  );
}
function ToggleGroupBasic() {
  return (
    <Example title="Basic">
      <ToggleGroup multiple spacing={1}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  );
}
