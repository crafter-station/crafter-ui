import { libraryDesign } from "@/lib/library-design";

export function GET(request: Request) {
  return new Response(
    libraryDesign("Crafter UI", new URL(request.url).origin),
    {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    },
  );
}
