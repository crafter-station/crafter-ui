import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { ComponentDocumentation } from "@/components/component-documentation";
import { documentation } from "@/lib/documentation";

export const dynamicParams = false;
export function generateStaticParams() {
  return documentation.map(({ family, name }) => ({ family, name }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ family: string; name: string }>;
}) {
  const { family, name } = await params;
  const entry = documentation.find(
    (item) => item.family === family && item.name === name,
  );
  return {
    title: `${entry?.title ?? "Component"} | Crafter UI`,
    description: entry?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ family: string; name: string }>;
}) {
  const { family, name } = await params;
  const entry = documentation.find(
    (item) => item.family === family && item.name === name,
  );
  if (!entry) notFound();
  const source = await readFile(
    path.join(process.cwd(), "components/ui", `${entry.name}.tsx`),
    "utf8",
  );
  return (
    <ComponentDocumentation
      key={`${family}/${name}`}
      entry={entry}
      source={source}
    />
  );
}
