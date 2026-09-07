import {
  mkdir,
  mkdtemp,
  readdir,
  rename,
  rm,
  rmdir,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

export async function writeBundle(
  output: string,
  files: Record<string, string>,
) {
  const destination = path.resolve(output);
  const parent = path.dirname(destination);
  await mkdir(parent, { recursive: true });
  try {
    if ((await readdir(destination)).length)
      throw new Error(
        "Output directory must be empty. Existing files were not changed.",
      );
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT"))
      throw error;
  }
  const staging = await mkdtemp(path.join(parent, ".crafter-ui-export-"));
  try {
    for (const [relative, content] of Object.entries(files)) {
      if (path.isAbsolute(relative) || relative.split(/[\\/]/).includes(".."))
        throw new Error(`Invalid bundle path: ${relative}`);
      const target = path.join(staging, relative);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, content, { flag: "wx" });
    }
    try {
      await rmdir(destination);
    } catch (error) {
      if (
        !(error instanceof Error && "code" in error && error.code === "ENOENT")
      )
        throw error;
    }
    await rename(staging, destination);
  } catch (error) {
    await rm(staging, { recursive: true, force: true });
    throw error;
  }
}
