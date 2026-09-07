"use client";
import { Example } from "@/components/examples/example";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
export default function Preview() {
  return (
    <div className="example-stack">
      <NativeSelectBasic />
    </div>
  );
}
function NativeSelectBasic() {
  return (
    <Example title="Basic">
      <NativeSelect>
        <NativeSelectOption value="">Select a fruit</NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        <NativeSelectOption value="grapes" disabled>
          Grapes
        </NativeSelectOption>
        <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
      </NativeSelect>
    </Example>
  );
}
