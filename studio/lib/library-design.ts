export function libraryDesign(name: string, homepage: string) {
  return `# Design with ${name}

Use this guide for UI work in an existing project. Preserve its framework, tooling and product requirements. This document describes the design language; it does not ask you to scaffold an app or redesign unrelated screens.

## Start with the task

Identify what the person needs to understand or do. Make that action and its supporting information easy to find. Choose the composition before selecting components. A settings page needs clear groups and labels; an inbox needs a scannable list and readable detail; a dashboard needs meaningful comparisons.

Use the existing shell and navigation. Keep a shared alignment grid across headings, controls, content and footers. Avoid placing every paragraph inside a card. Cards group an independent object or task; spacing can group related content without adding a border.

## Hierarchy and density

Use a compact header, restrained headings and readable body text. Reserve large display typography for a genuine introduction, not routine app screens. Use the project's type scale consistently. Use monospace for code or identifiers, not all supporting copy.

Start spacing from a 4px rhythm: 4–8px within a control group, 12–16px between related fields and 24–32px between sections. These are composition defaults, not overrides of component tokens. Make related items closer than unrelated items.

Align controls by their actual bounds. Buttons in one action row share height, padding and baseline. Put helper text below the row rather than beneath only one button. Give a primary action visual priority; secondary actions should remain quieter.

Good: two aligned actions, one primary, with a shared explanation below.
Avoid: buttons of different heights, disconnected labels and a tall header that crowds the task.

## Surfaces and tokens

Use semantic tokens from the installed theme: background/foreground, card/card-foreground, muted/muted-foreground, primary/primary-foreground, secondary/secondary-foreground and destructive. Pair foregrounds with their intended surface.

Crafter's baseline is monochrome, compact and sharply edged, with fine borders and minimal elevation. In a derived library, its theme.json is authoritative for palette, radius, typography and control-height. Never reintroduce Crafter's baseline over that library's chosen tokens.

Use one subtle border to establish an input boundary. Preserve visible keyboard focus through the component's focus treatment; avoid stacking extra outlines and shadows. Use elevation for overlapping surfaces such as popovers, rather than on every container.

Good: a semantic muted surface with readable secondary text.
Avoid: arbitrary gray values, low-contrast disabled-looking labels or thick double focus borders.

## Compose the library

Discover available components and source examples at ${homepage}/llms.txt. Reuse their APIs before adding a custom implementation. The component implementation uses React 19, Tailwind 4 and shadcn Base UI; check compatibility when installing code into an existing project.

Atoms express one focused control or value: button, field, badge, status.
Molecules combine controls around a small interaction: search field, member item, project card.
Organisms complete a workflow: settings group, notification preferences, an inbox or project form.

Choose boundaries by responsibility. Do not create a new component merely to wrap one visual detail. Keep product-specific compositions in the app; contribute reusable patterns to the shared library.

Install only missing components from ${homepage}/r/<component>.json with the project's tooling. Review existing components before replacing them. The shared theme is available at ${homepage}/r/theme.json.

## Forms and actions

Use persistent labels, not placeholders as labels. Keep field descriptions beside the relevant input, and errors directly associated with the field. Explain how to correct an error. Use appropriate input types and autocomplete.

Choose explicit action labels such as “Save changes” or “Create project”. Show pending state without changing button geometry. Prevent accidental duplicate submission. Confirm completion in context and keep user input when an operation fails.

Good: a stable Save changes button with pending and success feedback.
Avoid: vague action labels, layout shifts or resetting a failed form.

## States and accessibility

Design loading, empty, error, success and disabled states with the same care as populated screens. Empty states explain what belongs here and offer a relevant next action. Skeletons should reflect the eventual layout.

Use semantic controls, accessible names and a logical heading hierarchy. Support keyboard navigation and visible focus. Dialogs need a title, sensible initial focus and focus restoration. Never rely on color alone to communicate status.

## Light, dark and responsive behavior

Use the light and dark semantic token sets, including syntax-* tokens for code. Do not invert colors mechanically. Inspect popovers, dialogs, borders, charts, disabled controls and code blocks in both modes.

On smaller screens, preserve reading order, stack action groups when necessary and keep touch targets usable. Compact visuals must not make controls hard to operate. Let code and wide tables scroll within their containers, never the whole page. Do not automatically turn every interaction into a drawer; choose a mobile treatment that fits its task.

## Check the finished screen

Verify the main action, keyboard focus, long labels, realistic data, narrow layouts and both themes. Check alignment and spacing in the rendered screen. Use the project's existing checks and browser tools. A successful build does not establish visual balance.

## Further reading

Component inventory: ${homepage}/llms.txt
Component catalog: ${homepage}/components
Create a separate design system: ${homepage}/create
Creation and maintenance workflow: ${homepage}/skill.md
`;
}
