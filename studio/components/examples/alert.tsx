"use client";
import { Example } from "@/components/examples/example";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function Preview() {
  return (
    <div className="example-stack">
      <AlertExample1 />
    </div>
  );
}
function AlertExample1() {
  return (
    <Example title="Basic">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
        <Alert>
          <AlertTitle>Success! Your changes have been saved.</AlertTitle>
        </Alert>
        <Alert>
          <AlertTitle>Success! Your changes have been saved.</AlertTitle>
          <AlertDescription>
            This is an alert with title and description.
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertDescription>
            This one has a description only. No title. No icon.
          </AlertDescription>
        </Alert>
      </div>
    </Example>
  );
}
