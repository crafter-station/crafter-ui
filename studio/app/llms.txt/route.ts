import { generateLibrary } from "@/lib/generate-library";
import { defaultConfig } from "@/lib/library-config";

export function GET() {
  return new Response(generateLibrary(defaultConfig).files["public/llms.txt"], {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
