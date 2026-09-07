"use client";
import { Example } from "@/components/examples/example";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
export default function Preview() {
  return (
    <div className="example-stack">
      <ButtonGroupBasic />
    </div>
  );
}
function ButtonGroupBasic() {
  return (
    <Example title="Basic">
      <div className="flex flex-col gap-4">
        <ButtonGroup>
          <Button variant="outline">Button</Button>
          <Button variant="outline">Another Button</Button>
        </ButtonGroup>
      </div>
    </Example>
  );
}
