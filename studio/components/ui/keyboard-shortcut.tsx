import { Kbd, KbdGroup } from "@/components/ui/kbd";
export function KeyboardShortcut({
  keys = ["⌘", "K"],
  label = "Search",
}: {
  keys?: string[];
  label?: string;
}) {
  return (
    <span className="inline-flex items-center gap-3 text-sm">
      <span>{label}</span>
      <KbdGroup aria-label={keys.join(" plus ")}>
        {keys.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </KbdGroup>
    </span>
  );
}
