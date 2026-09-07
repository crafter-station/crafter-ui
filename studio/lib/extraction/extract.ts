import { createHash } from "node:crypto";
import { readFile, realpath, stat } from "node:fs/promises";
import { builtinModules } from "node:module";
import path from "node:path";
import ts from "typescript";
import { selectDeclarations } from "./select-declarations";

export type ExtractionOptions = {
  project: string;
  entries: string[];
  name: string;
  slug: string;
  homepage: string;
};
export type ExtractionIssue = { code: string; file: string; detail: string };
export type ExtractedSource = {
  path: string;
  content: string;
  sha256: string;
  imports: string[];
  exports: string[];
  removedExports: string[];
};
export type ExtractionResult = {
  name: string;
  slug: string;
  homepage: string;
  entries: string[];
  sources: ExtractedSource[];
  dependencies: string[];
  requirements: string[];
  issues: ExtractionIssue[];
};
const supported = /\.(?:[cm]?[jt]sx?|json|svg)$/;
const codeFile = /\.[cm]?[jt]sx?$/;
const builtins = new Set(
  builtinModules.map((name) => name.replace(/^node:/, "")),
);
const posix = (value: string) => value.split(path.sep).join("/");
const packageName = (value: string) =>
  value.startsWith("@")
    ? value.split("/").slice(0, 2).join("/")
    : value.split("/")[0];

export async function extractProject(
  options: ExtractionOptions,
): Promise<ExtractionResult> {
  const project = await realpath(options.project);
  if (
    !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(options.slug) ||
    options.slug.length > 40
  )
    throw new Error(
      "Use a lowercase library slug, with words separated by hyphens.",
    );
  if (!/^[\p{L}\p{N} ._-]{2,60}$/u.test(options.name))
    throw new Error(
      "Use a library name containing letters, numbers, spaces, dots, underscores, or hyphens.",
    );
  const homepage = new URL(options.homepage);
  if (
    !["https:", "http:"].includes(homepage.protocol) ||
    homepage.username ||
    homepage.password ||
    homepage.search ||
    homepage.hash ||
    homepage.pathname !== "/"
  )
    throw new Error("Homepage must be an http(s) origin.");
  if (!options.entries.length || options.entries.length > 30)
    throw new Error("Select between 1 and 30 entry files.");
  const issues: ExtractionIssue[] = [];
  const issue = (code: string, file: string, detail: string) =>
    issues.push({ code, file, detail });
  const configFile = ts.findConfigFile(
    project,
    ts.sys.fileExists,
    "tsconfig.json",
  );
  let compilerOptions: ts.CompilerOptions = {
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    allowJs: true,
    resolveJsonModule: true,
  };
  if (configFile && path.dirname(configFile) === project) {
    const config = ts.readConfigFile(configFile, ts.sys.readFile);
    if (config.error)
      throw new Error(
        ts.flattenDiagnosticMessageText(config.error.messageText, "\n"),
      );
    const parsed = ts.parseJsonConfigFileContent(
      config.config,
      ts.sys,
      project,
    );
    const errors = parsed.errors.filter((error) => error.code !== 18003);
    if (errors.length)
      throw new Error(
        errors
          .map((error) =>
            ts.flattenDiagnosticMessageText(error.messageText, "\n"),
          )
          .join("\n"),
      );
    compilerOptions = { ...compilerOptions, ...parsed.options };
  }
  const manifest = JSON.parse(
    await readFile(path.join(project, "package.json"), "utf8"),
  );
  const declared: Record<string, string> = {
    ...manifest.devDependencies,
    ...manifest.peerDependencies,
    ...manifest.dependencies,
  };
  const dependencies = new Set<string>();
  const requirements = new Set([
    "React application",
    "Review the source project's global styles and providers before publishing",
  ]);
  const files = new Map<string, ExtractedSource>();
  const visiting = new Set<string>();
  const selections = new Map<string, Set<string> | null>();
  let totalBytes = 0;
  const inside = (absolute: string) => {
    const relative = path.relative(project, absolute);
    return (
      relative !== ".." &&
      !relative.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(relative)
    );
  };
  const aliasMatches = (specifier: string) =>
    Object.keys(compilerOptions.paths ?? {}).some((pattern) => {
      const [prefix, suffix] = pattern.split("*");
      return pattern.includes("*")
        ? specifier.startsWith(prefix) && specifier.endsWith(suffix ?? "")
        : specifier === pattern;
    });
  async function resolveLocal(specifier: string, importer: string) {
    const resolution = ts.resolveModuleName(
      specifier,
      importer,
      compilerOptions,
      ts.sys,
    ).resolvedModule;
    if (resolution && !resolution.isExternalLibraryImport)
      return resolution.resolvedFileName;
    const candidates: string[] = [];
    if (specifier.startsWith("."))
      candidates.push(path.resolve(path.dirname(importer), specifier));
    const aliasRoot =
      compilerOptions.baseUrl ??
      (typeof compilerOptions.pathsBasePath === "string"
        ? compilerOptions.pathsBasePath
        : project);
    for (const [pattern, replacements] of Object.entries(
      compilerOptions.paths ?? {},
    ).sort(
      ([first], [second]) =>
        second.split("*")[0].length - first.split("*")[0].length,
    )) {
      const [prefix, suffix = ""] = pattern.split("*");
      const matches = pattern.includes("*")
        ? specifier.startsWith(prefix) && specifier.endsWith(suffix)
        : specifier === pattern;
      if (matches)
        for (const replacement of replacements)
          candidates.push(
            path.resolve(
              aliasRoot,
              replacement.replace(
                "*",
                pattern.includes("*")
                  ? specifier.slice(
                      prefix.length,
                      specifier.length - suffix.length,
                    )
                  : "",
              ),
            ),
          );
    }
    for (const candidate of candidates) {
      for (const suffix of [
        "",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".json",
        "/index.tsx",
        "/index.ts",
        "/index.jsx",
        "/index.js",
      ]) {
        try {
          if ((await stat(candidate + suffix)).isFile())
            return candidate + suffix;
        } catch {}
      }
    }
    return undefined;
  }
  async function visit(
    requested: string,
    symbols: string[] | null = null,
  ): Promise<string | undefined> {
    let absolute: string;
    try {
      absolute = await realpath(requested);
    } catch {
      issue(
        "missing-file",
        posix(path.relative(project, requested)),
        "File does not exist.",
      );
      return;
    }
    const relative = posix(path.relative(project, absolute));
    if (
      !inside(absolute) ||
      relative
        .split("/")
        .some(
          (part) =>
            part.startsWith(".") ||
            ["node_modules", "dist", "build"].includes(part),
        )
    ) {
      issue(
        "outside-source",
        relative,
        "Only source files inside the selected project can be exported.",
      );
      return;
    }
    const alreadySeen = visiting.has(absolute);
    if (alreadySeen) {
      const previous = selections.get(absolute);
      if (
        previous === null ||
        symbols?.every((symbol) => previous?.has(symbol))
      )
        return relative;
      selections.set(
        absolute,
        symbols === null ? null : new Set([...(previous ?? []), ...symbols]),
      );
    } else {
      visiting.add(absolute);
      selections.set(absolute, symbols === null ? null : new Set(symbols));
    }
    if (!supported.test(relative)) {
      issue(
        "unsupported-file",
        relative,
        "This file needs an explicit asset or stylesheet strategy before extraction.",
      );
      return;
    }
    const size = (await stat(absolute)).size;
    if (
      visiting.size > 100 ||
      size > 512_000 ||
      totalBytes + (alreadySeen ? 0 : size) > 2_000_000
    ) {
      issue(
        "size-limit",
        relative,
        "Select a smaller component graph (100 files / 2 MB maximum).",
      );
      return;
    }
    if (!alreadySeen) totalBytes += size;
    const sourceText = await readFile(absolute, "utf8");
    const originalAst = ts.createSourceFile(
      relative,
      sourceText,
      ts.ScriptTarget.Latest,
      true,
      relative.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    const pureImports = new Set<string>();
    for (const statement of originalAst.statements) {
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteralLike(statement.moduleSpecifier)
      ) {
        const resolved = await resolveLocal(
          statement.moduleSpecifier.text,
          absolute,
        );
        if (resolved?.endsWith(".json"))
          pureImports.add(statement.moduleSpecifier.text);
      }
    }
    const selection = codeFile.test(relative)
      ? selectDeclarations(
          originalAst,
          selections.get(absolute) ?? null,
          pureImports,
        )
      : { content: sourceText, removed: [] };
    const original = selection.content;
    const imports: string[] = [];
    const exports: string[] = [];
    const edits: { start: number; end: number; value: string }[] = [];
    const source: ExtractedSource = {
      path: relative,
      content: original,
      sha256: createHash("sha256").update(sourceText).digest("hex"),
      imports,
      exports,
      removedExports: selection.removed,
    };
    files.set(relative, source);
    if (!codeFile.test(relative)) return relative;
    const ast = ts.createSourceFile(
      relative,
      original,
      ts.ScriptTarget.Latest,
      true,
      relative.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    const specifiers: ts.StringLiteralLike[] = [];
    function walk(node: ts.Node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteralLike(node.moduleSpecifier)
      )
        specifiers.push(node.moduleSpecifier);
      if (
        ts.isImportEqualsDeclaration(node) &&
        ts.isExternalModuleReference(node.moduleReference) &&
        node.moduleReference.expression &&
        ts.isStringLiteralLike(node.moduleReference.expression)
      )
        specifiers.push(node.moduleReference.expression);
      if (
        ts.isCallExpression(node) &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(node.expression) &&
            node.expression.text === "require"))
      ) {
        if (node.arguments.length && ts.isStringLiteralLike(node.arguments[0]))
          specifiers.push(node.arguments[0]);
        else
          issue(
            "dynamic-import",
            relative,
            "A computed import cannot be resolved automatically. Replace it with explicit imports or extract a smaller entry.",
          );
      }
      if (
        ts.isImportTypeNode(node) &&
        ts.isLiteralTypeNode(node.argument) &&
        ts.isStringLiteralLike(node.argument.literal)
      )
        specifiers.push(node.argument.literal);
      if (
        ts.isPropertyAccessExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "process" &&
        node.name.text === "env"
      )
        issue(
          "environment",
          relative,
          "This source reads process.env. Move environment-dependent behavior behind component props before exporting.",
        );
      if (
        ts.isJsxAttribute(node) &&
        ["src", "poster"].includes(node.name.getText(ast)) &&
        node.initializer &&
        ts.isStringLiteral(node.initializer) &&
        node.initializer.text.startsWith("/")
      )
        issue(
          "public-asset",
          relative,
          `Public asset ${node.initializer.text} must be provided by the consumer. Import it explicitly or expose it as a prop.`,
        );
      if (
        ts.isNewExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "URL"
      )
        issue(
          "url-asset",
          relative,
          "new URL asset resolution needs a reviewed asset strategy. Use explicit imports or component props.",
        );
      ts.forEachChild(node, walk);
    }
    for (const statement of ast.statements)
      if (
        ts.isExpressionStatement(statement) &&
        ts.isStringLiteral(statement.expression) &&
        statement.expression.text === "use server"
      )
        issue(
          "server-directive",
          relative,
          "This module exports server actions. Extract its UI separately.",
        );
    walk(ast);
    for (const statement of ast.statements) {
      const modifiers = ts.canHaveModifiers(statement)
        ? ts.getModifiers(statement)
        : undefined;
      if (
        modifiers?.some(
          (modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword,
        ) ||
        ts.isExportAssignment(statement)
      )
        exports.push("default");
      else if (
        modifiers?.some(
          (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
        )
      ) {
        if (
          (ts.isFunctionDeclaration(statement) ||
            ts.isClassDeclaration(statement) ||
            ts.isInterfaceDeclaration(statement) ||
            ts.isTypeAliasDeclaration(statement)) &&
          statement.name
        )
          exports.push(statement.name.text);
        if (ts.isVariableStatement(statement))
          for (const declaration of statement.declarationList.declarations)
            if (ts.isIdentifier(declaration.name))
              exports.push(declaration.name.text);
      }
      if (
        ts.isExportDeclaration(statement) &&
        statement.exportClause &&
        ts.isNamedExports(statement.exportClause)
      )
        exports.push(
          ...statement.exportClause.elements.map(
            (element) => element.name.text,
          ),
        );
    }
    for (const node of specifiers) {
      const specifier = node.text;
      if (
        specifier.includes("?") ||
        specifier.includes("!") ||
        /^(https?:|data:)/.test(specifier)
      ) {
        issue(
          "loader-import",
          relative,
          `Import ${specifier} requires a loader or remote dependency. Resolve it before export.`,
        );
        continue;
      }
      const resolved = await resolveLocal(specifier, absolute);
      if (resolved) {
        let symbols: string[] | null = null;
        const parent = node.parent;
        if (ts.isImportDeclaration(parent) && parent.importClause) {
          const bindings = parent.importClause.namedBindings;
          if (!bindings || ts.isNamedImports(bindings))
            symbols = [
              ...(parent.importClause.name ? ["default"] : []),
              ...(bindings && ts.isNamedImports(bindings)
                ? bindings.elements.map(
                    (binding) =>
                      binding.propertyName?.text ?? binding.name.text,
                  )
                : []),
            ];
        }
        if (
          ts.isExportDeclaration(parent) &&
          parent.exportClause &&
          ts.isNamedExports(parent.exportClause)
        )
          symbols = parent.exportClause.elements.map(
            (binding) => binding.propertyName?.text ?? binding.name.text,
          );
        const target = await visit(resolved, symbols);
        if (!target) continue;
        imports.push(target);
        let replacement = posix(path.relative(path.dirname(relative), target));
        if (codeFile.test(target))
          replacement = replacement.replace(/(?:\.d)?\.[cm]?[jt]sx?$/, "");
        if (!replacement.startsWith(".")) replacement = `./${replacement}`;
        edits.push({
          start: node.getStart(ast),
          end: node.end,
          value: JSON.stringify(replacement),
        });
        continue;
      }
      if (
        specifier.startsWith(".") ||
        specifier.startsWith("/") ||
        aliasMatches(specifier) ||
        specifier.startsWith("#")
      ) {
        issue(
          "unresolved-import",
          relative,
          `Cannot resolve ${specifier} with this project's tsconfig.`,
        );
        continue;
      }
      const name = packageName(specifier);
      if (
        specifier.startsWith("node:") ||
        builtins.has(name) ||
        name === "server-only"
      ) {
        issue(
          "server-dependency",
          relative,
          `${specifier} ties this component to a server environment. Extract a UI boundary first.`,
        );
        continue;
      }
      if (["react", "react-dom", "next"].includes(name)) {
        requirements.add(
          name === "next"
            ? "Next.js application"
            : `${name} ${declared[name] ?? "compatible with the source"}`,
        );
        continue;
      }
      const version = declared[name];
      if (!version) {
        issue(
          "undeclared-package",
          relative,
          `Declare ${name} in package.json before extraction.`,
        );
        continue;
      }
      if (/^(workspace:|file:|link:|portal:|git|https?:|npm:)/.test(version)) {
        issue(
          "local-package",
          relative,
          `${name} (${version}) is not a portable registry dependency. Publish it or include its source explicitly.`,
        );
        continue;
      }
      dependencies.add(`${name}@${version}`);
    }
    for (const edit of edits.sort((a, b) => b.start - a.start))
      source.content =
        source.content.slice(0, edit.start) +
        edit.value +
        source.content.slice(edit.end);
    return relative;
  }
  const entries: string[] = [];
  for (const entry of options.entries) {
    const file = await visit(path.resolve(project, entry));
    if (file && !entries.includes(file)) entries.push(file);
  }
  return {
    name: options.name,
    slug: options.slug,
    homepage: homepage.origin,
    entries,
    sources: [...files.values()].sort((a, b) => a.path.localeCompare(b.path)),
    dependencies: [...dependencies].sort(),
    requirements: [...requirements].sort(),
    issues,
  };
}

export function extractionReport(result: ExtractionResult) {
  return {
    name: result.name,
    slug: result.slug,
    ready: result.issues.length === 0,
    entries: result.entries,
    files: result.sources.map(({ content: _content, ...file }) => file),
    dependencies: result.dependencies,
    requirements: result.requirements,
    issues: result.issues,
  };
}

export function extractionBundle(
  result: ExtractionResult,
): Record<string, string> {
  if (result.issues.length)
    throw new Error(
      "Resolve the extraction issues before generating an installable bundle.",
    );
  const json = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`;
  const files = result.sources.map((source) => ({
    path: `registry/${result.slug}/${source.path}`,
    target: `@components/${result.slug}/${source.path}`,
    type: "registry:file" as const,
    content: source.content,
  }));
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: result.slug,
    type: "registry:block",
    title: result.name,
    description: `Components extracted into ${result.name}.`,
    dependencies: result.dependencies,
    files,
  };
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: result.slug,
    homepage: result.homepage,
    items: [
      { ...item, files: files.map(({ content: _content, ...file }) => file) },
    ],
  };
  const bundle: Record<string, string> = {
    "registry.json": json(registry),
    [`public/r/${result.slug}.json`]: json(item),
    "public/r/registry.json": json(registry),
    "extraction-report.json": json(extractionReport(result)),
  };
  for (const file of files) bundle[file.path] = file.content;
  bundle["package.json"] = json({
    name: `${result.slug}-registry`,
    private: true,
    scripts: {
      build: "bunx --bun shadcn@4.21.0 build registry.json --output public/r",
    },
  });
  bundle["vercel.json"] = json({
    framework: null,
    outputDirectory: "public",
    buildCommand: "bun run build",
  });
  const usage = result.entries
    .map(
      (entry) =>
        `- ${entry}: import from your components alias plus \`${result.slug}/${entry.replace(/(?:\.d)?\.[cm]?[jt]sx?$/, "")}\`. Exports: ${result.sources.find((source) => source.path === entry)?.exports.join(", ") || "inspect source"}.`,
    )
    .join("\n");
  bundle["README.md"] =
    `# ${result.name}\n\nExtracted locally from explicitly selected source files. Original source files are unchanged.\n\n## Install\n\nIn an initialized shadcn project:\n\n\`\`\`sh\nbunx --bun shadcn@4.21.0 add /absolute/path/to/this-registry/public/r/${result.slug}.json\n\`\`\`\n\nThe components are placed in a ${result.slug}/ folder under your configured components directory. Relative imports preserve the extracted graph without source-project aliases.\n\n## Requirements\n\n${result.requirements.map((requirement) => `- ${requirement}`).join("\n")}\n\n## Entrypoints\n\n${usage}\n\n## Rebuild and host\n\nEdit the extracted source and run \`bun run build\`. Serve public/ on your static host. After deploying at ${result.homepage}, install ${result.homepage}/r/${result.slug}.json.\n\nReview extraction-report.json and the source project's license before publishing. The tool does not infer ownership, copy an entire application's global stylesheet, or claim that a successful import graph proves matching visuals.\n`;
  bundle["public/llms.txt"] =
    `# ${result.name}\n\n${usage}\n\nRequirements:\n${result.requirements.join("\n")}\n`;
  return bundle;
}
