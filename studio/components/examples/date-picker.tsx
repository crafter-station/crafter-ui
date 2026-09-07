"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function Preview() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>
        {date ? date.toLocaleDateString() : "Pick a date"}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => {
            setDate(value);
            if (value) setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
