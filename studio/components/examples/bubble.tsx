"use client";
import { Example } from "@/components/examples/example";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
export default function Preview() {
  return (
    <div className="example-stack">
      <BubbleSizes />
    </div>
  );
}
function BubbleSizes() {
  return (
    <Example title="Sizes">
      <div className="flex w-full max-w-md flex-col gap-8">
        <Bubble>
          <BubbleContent>This is a one line bubble.</BubbleContent>
        </Bubble>
        <Bubble>
          <BubbleContent>
            This bubble has multiple lines. It should wrap to the next line and
            you should see a different radius on the corners.
          </BubbleContent>
        </Bubble>
        <Bubble>
          <BubbleContent>
            <p>This bubble has multiple lines.</p>
            <p>
              It should wrap to the next line and you should see a different
              radius on the corners.
            </p>
            <p>Here is some more text to see how it wraps.</p>
          </BubbleContent>
        </Bubble>
      </div>
    </Example>
  );
}
