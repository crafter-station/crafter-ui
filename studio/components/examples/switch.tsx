"use client";
import { Example } from "@/components/examples/example";
import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
export default function Preview() {
  return (
    <div className="example-stack">
      <SwitchBasic />
    </div>
  );
}
function SwitchBasic() {
  return (
    <Example title="Basic">
      <Field orientation="horizontal">
        <Switch id="switch-basic" />
        <FieldLabel htmlFor="switch-basic">Airplane Mode</FieldLabel>
      </Field>
    </Example>
  );
}
