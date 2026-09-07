"use client";
import * as React from "react";
import { Example } from "@/components/examples/example";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
export default function Preview() {
  return (
    <div className="example-stack">
      <CalendarSingle />
    </div>
  );
}
function CalendarSingle() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  );
  return (
    <Example title="Single">
      <Card className="mx-auto w-fit p-0">
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown"
          />
        </CardContent>
      </Card>
    </Example>
  );
}
