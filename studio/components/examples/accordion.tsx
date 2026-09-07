"use client";
import { Example } from "@/components/examples/example";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function Preview() {
  return (
    <div className="example-stack">
      <AccordionBasic />
    </div>
  );
}
function AccordionBasic() {
  const items = [
    {
      value: "item-1",
      trigger: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      value: "item-2",
      trigger: "Is it styled?",
      content:
        "Yes. It comes with default styles that matches the other components' aesthetic.",
    },
    {
      value: "item-3",
      trigger: "Is it animated?",
      content:
        "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ];
  return (
    <Example title="Basic">
      <Accordion className="mx-auto max-w-lg">
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Example>
  );
}
