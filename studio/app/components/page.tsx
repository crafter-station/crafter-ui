import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  componentHref,
  documentation,
  documentationGroups,
} from "@/lib/documentation";
export const metadata = { title: "Components | Crafter UI" };
export default function Page() {
  return (
    <article className="component-index">
      <div className="eyebrow">THE LIBRARY</div>
      <h1>
        Small pieces.
        <br />
        Bigger possibilities.
      </h1>
      <p className="doc-lead">
        Start with shadcn primitives. Reach for Crafter when the same
        composition keeps showing up in your product.
      </p>
      {documentationGroups.map((group) => (
        <section className="index-group" key={group}>
          <div className="index-group-heading">
            <h2>{group === "Primitives" ? "shadcn" : group}</h2>
            <span>
              {group === "Primitives" ? "THE FOUNDATION" : "CRAFTER COMPONENTS"}
            </span>
          </div>
          <div className="component-index-grid">
            {documentation
              .filter((item) => item.level === group)
              .map((entry) => (
                <Link href={componentHref(entry)} key={entry.name}>
                  <div>
                    <h3>{entry.title}</h3>
                    <ArrowUpRight size={16} />
                  </div>
                  <p>{entry.description}</p>
                  <span>
                    {entry.family === "shadcn"
                      ? "Base UI primitive"
                      : entry.level.slice(0, -1)}
                  </span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </article>
  );
}
