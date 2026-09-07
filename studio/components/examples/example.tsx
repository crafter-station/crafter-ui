import type { ReactNode } from "react";
export function Example({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
  [key: string]: unknown;
}) {
  return (
    <section className="example-section">
      <h2 className="text-xs text-muted-foreground">{title}</h2>
      <div className="example-content">{children}</div>
    </section>
  );
}
