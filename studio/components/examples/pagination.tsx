"use client";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function Preview() {
  const [page, setPage] = useState(1);
  return (
    <div className="grid gap-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${Math.max(1, page - 1)}`}
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.max(1, page - 1));
              }}
            />
          </PaginationItem>
          {[1, 2, 3].map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                href={`?page=${n}`}
                isActive={page === n}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(n);
                }}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href={`?page=${Math.min(3, page + 1)}`}
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.min(3, page + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p role="status" className="text-center text-sm text-muted-foreground">
        Page {page} of 3
      </p>
    </div>
  );
}
