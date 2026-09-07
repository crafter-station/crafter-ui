import { Badge } from "@/components/ui/badge";
export function StatusIndicator({
  status = "online",
}: {
  status?: "online" | "busy" | "offline";
}) {
  return (
    <Badge variant={status === "online" ? "default" : "secondary"}>
      <span aria-hidden="true">{status === "offline" ? "○" : "●"}</span>
      {status}
    </Badge>
  );
}
