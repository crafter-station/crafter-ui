"use client";
import { Example } from "@/components/examples/example";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
export default function Preview() {
  return (
    <div className="example-stack">
      <HoverCardSides />
    </div>
  );
}
const HOVER_CARD_SIDES = [
  "inline-start",
  "left",
  "top",
  "bottom",
  "right",
  "inline-end",
] as const;
function HoverCardSides() {
  return (
    <Example title="Sides" containerClassName="col-span-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {HOVER_CARD_SIDES.map((side) => (
          <HoverCard key={side}>
            <HoverCardTrigger
              delay={100}
              closeDelay={100}
              render={<Button variant="outline" className="capitalize" />}
            >
              {side.replace("-", " ")}
            </HoverCardTrigger>
            <HoverCardContent side={side}>
              <div className="flex flex-col style-vega:gap-2 style-nova:gap-1.5 style-lyra:gap-1 style-maia:gap-2 style-mira:gap-1 style-luma:gap-2">
                <h4 className="font-medium">Hover Card</h4>
                <p>
                  This hover card appears on the {side.replace("-", " ")} side
                  of the trigger.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </Example>
  );
}
