"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }
  return (
    <div className="inline-flex flex-col items-start gap-1">
      <Button type="button" variant="outline" onClick={copy}>
        {status === "copied" ? (
          <Check data-icon="inline-start" />
        ) : (
          <Copy data-icon="inline-start" />
        )}
        {status === "copied" ? copiedLabel : label}
      </Button>
      <span
        role="status"
        className={status === "error" ? "text-xs text-destructive" : "sr-only"}
      >
        {status === "error"
          ? "Could not copy. Select and copy the text manually."
          : status === "copied"
            ? copiedLabel
            : ""}
      </span>
    </div>
  );
}
