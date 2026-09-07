"use client";
import { Example } from "@/components/examples/example";
import { Field, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function Preview() {
  return (
    <div className="example-stack">
      <RadioGroupBasic />
    </div>
  );
}
function RadioGroupBasic() {
  return (
    <Example title="Basic">
      <RadioGroup defaultValue="comfortable">
        <Field orientation="horizontal">
          <RadioGroupItem value="default" id="r1" />
          <FieldLabel htmlFor="r1" className="font-normal">
            Default
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="comfortable" id="r2" />
          <FieldLabel htmlFor="r2" className="font-normal">
            Comfortable
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="compact" id="r3" />
          <FieldLabel htmlFor="r3" className="font-normal">
            Compact
          </FieldLabel>
        </Field>
      </RadioGroup>
    </Example>
  );
}
