import { z } from "zod";
import { librarySchema } from "@/lib/library-config";
import { themeDocumentSchema } from "@/lib/theme-schema";

export const libraryDocumentSchema = z
  .object({
    version: z.literal(1),
    config: librarySchema.extend({ theme: themeDocumentSchema }).strict(),
    mode: z.enum(["light", "dark"]),
  })
  .strict();
export function parseLibraryDocument(input: unknown) {
  return libraryDocumentSchema.parse(input);
}
