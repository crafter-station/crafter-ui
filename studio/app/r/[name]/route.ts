import { generateLibrary } from "@/lib/generate-library";
import { defaultConfig } from "@/lib/library-config";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const library = generateLibrary(defaultConfig);
  const file = library.files[`public/r/${name}`];
  if (!file)
    return Response.json({ error: "Component not found." }, { status: 404 });
  return new Response(file, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
