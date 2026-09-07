import ts from "typescript";

function bindingNames(name: ts.BindingName): string[] {
  return ts.isIdentifier(name)
    ? [name.text]
    : name.elements.flatMap((element) =>
        ts.isBindingElement(element) ? bindingNames(element.name) : [],
      );
}

export function selectDeclarations(
  source: ts.SourceFile,
  requested: ReadonlySet<string> | null,
  pureImports: ReadonlySet<string> = new Set(),
) {
  if (requested === null)
    return { content: source.text, removed: [] as string[] };
  const declarations = new Map<string, ts.Statement>();
  const exported = new Map<string, ts.Statement>();
  const selected = new Set<ts.Statement>();
  for (const statement of source.statements) {
    const modifiers = ts.canHaveModifiers(statement)
      ? ts.getModifiers(statement)
      : undefined;
    const isExported = modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (
      (ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) ||
        ts.isEnumDeclaration(statement)) &&
      statement.name
    ) {
      declarations.set(statement.name.text, statement);
      if (isExported) exported.set(statement.name.text, statement);
    }
    if (
      modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword,
      ) ||
      ts.isExportAssignment(statement)
    )
      exported.set("default", statement);
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations)
        for (const name of bindingNames(declaration.name)) {
          declarations.set(name, statement);
          if (isExported) exported.set(name, statement);
        }
      selected.add(statement);
    }
    if (ts.isImportDeclaration(statement)) {
      if (
        !statement.importClause ||
        !ts.isStringLiteralLike(statement.moduleSpecifier) ||
        !pureImports.has(statement.moduleSpecifier.text)
      )
        selected.add(statement);
      if (statement.importClause?.name)
        declarations.set(statement.importClause.name.text, statement);
      const bindings = statement.importClause?.namedBindings;
      if (bindings && ts.isNamedImports(bindings))
        for (const binding of bindings.elements)
          declarations.set(binding.name.text, statement);
      if (bindings && ts.isNamespaceImport(bindings))
        declarations.set(bindings.name.text, statement);
    }
    if (ts.isImportEqualsDeclaration(statement))
      declarations.set(statement.name.text, statement);
    if (ts.isExportDeclaration(statement)) {
      if (statement.exportClause && ts.isNamedExports(statement.exportClause))
        for (const element of statement.exportClause.elements)
          exported.set(element.name.text, statement);
      else selected.add(statement);
    }
    if (
      !ts.isFunctionDeclaration(statement) &&
      !ts.isInterfaceDeclaration(statement) &&
      !ts.isTypeAliasDeclaration(statement) &&
      !ts.isImportDeclaration(statement) &&
      !ts.isImportEqualsDeclaration(statement) &&
      !ts.isExportDeclaration(statement) &&
      !ts.isExportAssignment(statement)
    )
      selected.add(statement);
  }
  for (const name of requested) {
    const statement = exported.get(name);
    if (statement) selected.add(statement);
    else if (
      !source.statements.some(
        (entry) => ts.isExportDeclaration(entry) && !entry.exportClause,
      )
    )
      return { content: source.text, removed: [] as string[] };
  }
  const scanned = new Set<ts.Statement>();
  while (scanned.size !== selected.size) {
    for (const statement of selected) {
      if (scanned.has(statement)) continue;
      scanned.add(statement);
      if (ts.isImportDeclaration(statement)) continue;
      function visit(node: ts.Node) {
        if (ts.isIdentifier(node)) {
          const dependency = declarations.get(node.text);
          if (dependency) selected.add(dependency);
        }
        ts.forEachChild(node, visit);
      }
      visit(statement);
    }
  }
  return {
    content: source.statements
      .filter((statement) => selected.has(statement))
      .map((statement) => statement.getFullText(source))
      .join("\n"),
    removed: [...exported]
      .filter(([, statement]) => !selected.has(statement))
      .map(([name]) => name),
  };
}
