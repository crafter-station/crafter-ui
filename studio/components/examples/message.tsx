"use client";
import { Example } from "@/components/examples/example";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { Message, MessageContent } from "@/components/ui/message";
export default function Preview() {
  return (
    <div className="example-stack">
      <MessageDefault />
    </div>
  );
}
function MessageDefault() {
  return (
    <Example title="Message">
      <div className="flex w-full max-w-md min-w-0 flex-col gap-10">
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>Deploying to prod real quick.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>It&apos;s a one-line change.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <BubbleGroup>
              <Bubble variant="muted">
                <BubbleContent>
                  It&apos;s always a one-line change 😭. Make sure to run the
                  tests this time.
                </BubbleContent>
              </Bubble>
              <Bubble variant="muted">
                <BubbleContent>Alright, go for it.</BubbleContent>
              </Bubble>
            </BubbleGroup>
          </MessageContent>
        </Message>
      </div>
    </Example>
  );
}
