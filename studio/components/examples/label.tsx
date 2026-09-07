"use client";
import { Example } from "@/components/examples/example";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
export default function Preview() {
  return (
    <div className="example-stack">
      <LabelWithCheckbox />
    </div>
  );
}
function LabelWithCheckbox() {
  return (
    <Example title="With Checkbox">
      <Field orientation="horizontal">
        <Checkbox id="label-demo-terms" />
        <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
      </Field>
    </Example>
  );
}
