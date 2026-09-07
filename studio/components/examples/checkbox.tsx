"use client";
import { Example } from "@/components/examples/example";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
export default function Preview() {
  return (
    <div className="example-stack">
      <CheckboxBasic />
    </div>
  );
}
function CheckboxBasic() {
  return (
    <Example title="Basic">
      <Field orientation="horizontal">
        <Checkbox id="terms" />
        <FieldLabel htmlFor="terms">Accept terms and conditions</FieldLabel>
      </Field>
    </Example>
  );
}
