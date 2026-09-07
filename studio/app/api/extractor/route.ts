import { strToU8, zipSync } from "fflate";
import { extractorBundle } from "@/lib/extractor-bundle";

export function GET() {
  const archive = zipSync(
    Object.fromEntries(
      Object.entries(extractorBundle()).map(([path, content]) => [
        `crafter-ui-extractor/${path}`,
        strToU8(content),
      ]),
    ),
  );
  return new Response(Buffer.from(archive), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="crafter-ui-extractor.zip"',
      "Cache-Control": "no-store",
    },
  });
}
