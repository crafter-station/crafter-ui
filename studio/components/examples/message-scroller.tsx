"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
export default function Preview() {
  const [count, setCount] = useState(15);
  return (
    <MessageScrollerProvider>
      <div className="grid w-full gap-3">
        <div className="h-64 border">
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent>
                {Array.from({ length: count }, (_, i) => i + 1).map(
                  (number) => (
                    <MessageScrollerItem key={number}>
                      <p className="border-b p-4 text-sm">
                        Update {number}: building something worth making.
                      </p>
                    </MessageScrollerItem>
                  ),
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </div>
        <Button variant="outline" onClick={() => setCount(count + 1)}>
          Add message
        </Button>
      </div>
    </MessageScrollerProvider>
  );
}
