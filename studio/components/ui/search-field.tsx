"use client";
import { Search, X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
export function SearchField({
  value,
  onValueChange,
  placeholder = "Search projects…",
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <InputGroup>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Clear search"
            onClick={() => onValueChange("")}
          >
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
