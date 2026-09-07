"use client";
import { ArrowUpRightIcon } from "lucide-react";
import { Example } from "@/components/examples/example";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
export default function Preview() {
  return (
    <div className="example-stack">
      <EmptyBasic />
    </div>
  );
}
function EmptyBasic() {
  return (
    <Example title="Basic">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button render={<a href="/docs" />} nativeButton={false}>
              Create project
            </Button>
            <Button variant="outline">Import project</Button>
          </div>
          <Button
            variant="link"
            render={<a href="/docs" />}
            className="text-muted-foreground"
            nativeButton={false}
          >
            Learn more <ArrowUpRightIcon />
          </Button>
        </EmptyContent>
      </Empty>
    </Example>
  );
}
