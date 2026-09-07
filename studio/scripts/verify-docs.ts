import { componentHref, documentation } from "../lib/documentation";

const origin = process.env.CRAFTER_ORIGIN ?? "http://localhost:4324";
const paths = [
  "/docs",
  "/docs/agents",
  "/components",
  ...documentation.map(componentHref),
];
const results: { path: string; status: number; copyMarkdown: boolean }[] = [];
for (let offset = 0; offset < paths.length; offset += 4) {
  const batch = await Promise.all(
    paths.slice(offset, offset + 4).map(async (path) => {
      const response = await fetch(origin + path);
      const html = await response.text();
      return {
        path,
        status: response.status,
        copyMarkdown: html.includes("Copy Markdown"),
      };
    }),
  );
  results.push(...batch);
}
await Bun.write(
  "evidence/maturity/docs-routes.json",
  JSON.stringify(results, null, 2),
);
if (results.some((result) => result.status !== 200 || !result.copyMarkdown))
  throw new Error("Documentation route verification failed");
console.log(
  `Verified ${results.length} documentation routes with Copy Markdown.`,
);
