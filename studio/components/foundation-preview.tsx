"use client";

import { ArrowRight } from "lucide-react";
import { type CSSProperties, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

export function FoundationPreview({
  name,
  themeStyle,
  dark = false,
}: {
  name: string;
  themeStyle?: CSSProperties;
  dark?: boolean;
}) {
  const [count, setCount] = useState(0);
  if (name === "button")
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => setCount(count + 1)}>
          Continue <ArrowRight data-icon="inline-end" />
        </Button>
        <Button variant="secondary" onClick={() => setCount(0)}>
          Reset
        </Button>
        <Button variant="outline" disabled>
          Disabled
        </Button>
        <span role="status" className="text-sm text-muted-foreground">
          {count > 0 ? `${count} clicks` : "Try an action"}
        </span>
      </div>
    );
  if (name === "input")
    return (
      <div className="flex w-full max-w-sm flex-col gap-3">
        <label htmlFor="foundation-input" className="text-sm font-medium">
          Project name
        </label>
        <Input id="foundation-input" placeholder="Something worth making" />
        <Input
          aria-label="Disabled input example"
          placeholder="Disabled input"
          disabled
        />
      </div>
    );
  if (name === "badge")
    return (
      <div className="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    );
  if (name === "card")
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Your workspace</CardTitle>
          <CardDescription>A place for your next idea.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Compose the header, content and footer to fit the task.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => setCount(count + 1)}>
            {count ? "Workspace created" : "Create workspace"}
          </Button>
        </CardFooter>
      </Card>
    );
  if (name === "dialog")
    return (
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open dialog
        </DialogTrigger>
        <DialogContent style={themeStyle} className={dark ? "dark" : undefined}>
          <DialogHeader>
            <DialogTitle>A little focus</DialogTitle>
            <DialogDescription>
              Make room for one decision. Press Escape to return to the preview.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  if (name === "separator")
    return (
      <div className="flex w-full max-w-sm flex-col gap-5">
        <p className="text-sm">Your components</p>
        <Separator />
        <p className="text-sm text-muted-foreground">
          Your defaults, every time.
        </p>
      </div>
    );
  return (
    <div className="flex items-center gap-3">
      <Spinner />
      <span className="text-sm text-muted-foreground">
        Loading your workspace…
      </span>
    </div>
  );
}
