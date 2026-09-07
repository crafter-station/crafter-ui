"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { CopyMarkdown } from "@/components/copy-markdown";
import { SiteHeader } from "@/components/site-header";
import {
  componentHref,
  documentation,
  documentationGroups,
} from "@/lib/documentation";

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const entries = documentation.filter((entry) =>
    `${entry.title} ${entry.family} ${entry.level}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className="site-shell docs-site">
      <SiteHeader />
      <button
        type="button"
        className="docs-menu"
        aria-expanded={open}
        aria-controls="library-sidebar"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close navigation" : "Browse components"}
      </button>
      <div className="docs-layout">
        <aside
          id="library-sidebar"
          className={`docs-sidebar ${open ? "is-open" : ""}`}
        >
          <label className="docs-search">
            <Search size={14} />
            <input
              aria-label="Search library components"
              placeholder="Find a component…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <nav aria-label="Library documentation">
            <div className="docs-nav-group">
              <p>GET STARTED</p>
              <Link
                onClick={() => setOpen(false)}
                href="/docs"
                aria-current={pathname === "/docs" ? "page" : undefined}
              >
                Introduction
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/components"
                aria-current={pathname === "/components" ? "page" : undefined}
              >
                All components <span>{documentation.length}</span>
              </Link>
              <Link onClick={() => setOpen(false)} href="/create">
                Style generator ↗
              </Link>
              <Link onClick={() => setOpen(false)} href="/docs/agents">
                For agents
              </Link>
            </div>
            {documentationGroups.map((group) => {
              const matches = entries.filter((entry) => entry.level === group);
              return (
                matches.length > 0 && (
                  <details
                    className="docs-nav-group"
                    key={group}
                    open={
                      Boolean(query) ||
                      group !== "Primitives" ||
                      pathname.includes("/shadcn/")
                    }
                  >
                    <summary>
                      {group === "Primitives"
                        ? "SHADCN / PRIMITIVES"
                        : `CRAFTER / ${group.toUpperCase()}`}
                      <span>{matches.length}</span>
                    </summary>
                    {matches.map((entry) => (
                      <Link
                        onClick={() => setOpen(false)}
                        key={entry.name}
                        href={componentHref(entry)}
                        aria-current={
                          pathname === componentHref(entry) ? "page" : undefined
                        }
                      >
                        {entry.title}
                        {entry.family === "crafter" && (
                          <span className="custom-indicator">C</span>
                        )}
                      </Link>
                    ))}
                  </details>
                )
              );
            })}
            {!entries.length && (
              <p className="no-results">No components match “{query}”.</p>
            )}
          </nav>
          <a href="/llms.txt" className="sidebar-agent">
            For your agent ↗ <span>llms.txt</span>
          </a>
        </aside>
        <main id="main" className="docs-content">
          <CopyMarkdown key={pathname} />
          {children}
        </main>
      </div>
    </div>
  );
}
