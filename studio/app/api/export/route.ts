import { strToU8, zipSync } from "fflate";
import { generateLibrary } from "@/lib/generate-library";
import { librarySchema } from "@/lib/library-config";

export async function POST(request: Request) {
  const body = await request.text();
  if (body.length > 8192)
    return Response.json(
      { error: "Library configuration is too large." },
      { status: 413 },
    );
  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return Response.json(
      { error: "Invalid JSON configuration." },
      { status: 400 },
    );
  }
  const parsed = librarySchema.safeParse(input);
  if (!parsed.success)
    return Response.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  const result = generateLibrary(parsed.data);
  const archive = zipSync(
    Object.fromEntries(
      Object.entries(result.files).map(([path, content]) => [
        `${result.config.slug}-registry/${path}`,
        strToU8(content),
      ]),
    ),
  );
  return new Response(Buffer.from(archive), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${result.config.slug}-registry.zip"`,
      "Cache-Control": "no-store",
    },
  });
}
