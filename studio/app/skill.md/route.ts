import { librarySkill } from "@/lib/library-skill";
export function GET(request: Request) {
  return new Response(
    librarySkill("Crafter UI", "crafter", new URL(request.url).origin),
    { headers: { "Content-Type": "text/markdown; charset=utf-8" } },
  );
}
