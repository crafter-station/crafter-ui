"use client";
import { Example } from "@/components/examples/example";
import { Slider } from "@/components/ui/slider";
export default function Preview() {
  return (
    <div className="example-stack">
      <SliderBasic />
    </div>
  );
}
function SliderBasic() {
  return (
    <Example title="Basic">
      <Slider defaultValue={50} max={100} step={1} />
    </Example>
  );
}
