import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusIndicator } from "@/components/ui/status-indicator";
export function ProjectCard({
  name,
  description,
  progress = 40,
  onOpen,
}: {
  name: string;
  description: string;
  progress?: number;
  onOpen: () => void;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <StatusIndicator status="busy" />
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <span className="text-xs text-muted-foreground">
          {progress}% complete
        </span>
        <Progress aria-label="Project completion" value={progress} />
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={onOpen}>
          Open project
        </Button>
      </CardFooter>
    </Card>
  );
}
