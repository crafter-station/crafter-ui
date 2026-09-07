"use client";
import { Example } from "@/components/examples/example";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
export default function Preview() {
  return (
    <div className="example-stack">
      <ToastBasic />
    </div>
  );
}
function ToastBasic() {
  return (
    <Example title="Basic" className="items-center justify-center">
      <Button
        variant="outline"
        className="w-fit"
        onClick={() =>
          toast.add({
            title: "Event created",
            description: "Sunday, December 3 at 9:00 AM",
          })
        }
      >
        Show Toast
      </Button>
    </Example>
  );
}
