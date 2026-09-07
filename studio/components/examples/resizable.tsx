"use client";
import { Example } from "@/components/examples/example";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
export default function Preview() {
  return (
    <div className="example-stack">
      <ResizableHorizontal />
    </div>
  );
}
function ResizableHorizontal() {
  return (
    <Example title="Horizontal">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-[200px] rounded-lg border"
      >
        <ResizablePanel defaultSize="25%">
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="75%">
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  );
}
