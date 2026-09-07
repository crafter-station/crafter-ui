"use client";
import { Example } from "@/components/examples/example";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function Preview() {
  return (
    <div className="example-stack">
      <TooltipBasic />
    </div>
  );
}
function TooltipBasic() {
  return (
    <Example title="Basic">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" className="w-fit" />}>
          Show Tooltip
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </Example>
  );
}
