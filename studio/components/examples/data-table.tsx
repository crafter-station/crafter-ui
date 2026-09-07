"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = [
  { name: "Crafter UI", status: "Active" },
  { name: "Petdex", status: "Review" },
  { name: "Lab Bench", status: "Draft" },
];
export default function Preview() {
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(true);
  return (
    <div className="grid w-full gap-4">
      <Input
        aria-label="Filter projects"
        placeholder="Filter projects…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead aria-sort={asc ? "ascending" : "descending"}>
              <Button variant="ghost" onClick={() => setAsc(!asc)}>
                Project {asc ? "↑" : "↓"}
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows
            .filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) =>
              asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
            )
            .map((r) => (
              <TableRow key={r.name}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
