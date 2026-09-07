import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
export function MemberItem({
  name,
  memberRole = "Member",
  email,
}: {
  name: string;
  memberRole?: string;
  email: string;
}) {
  return (
    <div className="flex w-full items-center gap-3">
      <Avatar>
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{email}</p>
      </div>
      <Badge variant="outline">{memberRole}</Badge>
    </div>
  );
}
