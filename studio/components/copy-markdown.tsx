"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyMarkdown() {
  const [status, setStatus] = useState("idle");
  async function copy() {
    try {
      const main = document.querySelector(".docs-content");
      if (!main) throw new Error("Documentation unavailable");
      const article = main.querySelector<HTMLElement>("[data-markdown]");
      let markdown = article?.dataset.markdown;
      if (!markdown) {
        const { default: TurndownService } = await import("turndown");
        const converter = new TurndownService({
          headingStyle: "atx",
          codeBlockStyle: "fenced",
        });
        converter.addRule("code", {
          filter: "pre",
          replacement: (_content, node) =>
            `\n\n\`\`\`\n${node.textContent ?? ""}\n\`\`\`\n\n`,
        });
        const clone = main.cloneNode(true) as HTMLElement;
        for (const element of clone.querySelectorAll(
          ".docs-actions, .syntax-toolbar, button, input, [role=status]",
        ))
          element.remove();
        for (const link of clone.querySelectorAll("a[href]"))
          link.setAttribute(
            "href",
            new URL(link.getAttribute("href") ?? "", location.href).href,
          );
        markdown = converter.turndown(clone.innerHTML);
      }
      await navigator.clipboard.writeText(
        `${markdown}\n\nSource: ${location.href}\n`,
      );
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }
  return (
    <div className="docs-actions">
      <Button variant="outline" size="sm" onClick={copy}>
        {status === "copied" ? <Check /> : <Copy />}
        {status === "copied" ? "Copied Markdown" : "Copy Markdown"}
      </Button>
      <span
        role="status"
        className={status === "error" ? "text-xs text-destructive" : "sr-only"}
      >
        {status === "error"
          ? "Could not copy. Check clipboard access and retry."
          : status === "copied"
            ? "Markdown copied"
            : ""}
      </span>
    </div>
  );
}
