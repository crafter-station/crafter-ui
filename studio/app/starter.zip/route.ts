import { strToU8, zipSync } from "fflate";
import { generateLibrary } from "@/lib/generate-library";
import { defaultConfig } from "@/lib/library-config";
import theme from "@/theme.json";
export function GET(request: Request) {
  const library = generateLibrary({
    ...defaultConfig,
    homepage: new URL(request.url).origin,
    theme,
  });
  const archive = zipSync(
    Object.fromEntries(
      Object.entries(library.files).map(([path, content]) => [
        `crafter-registry/${path}`,
        strToU8(content),
      ]),
    ),
  );
  return new Response(Buffer.from(archive), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="crafter-registry.zip"',
      "Cache-Control": "no-store",
    },
  });
}
