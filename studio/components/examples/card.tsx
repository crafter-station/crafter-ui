"use client";
import { Example } from "@/components/examples/example";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Preview() {
  return (
    <div className="example-stack">
      <CardDefault />
    </div>
  );
}
function CardDefault() {
  return (
    <Example title="Default Size">
      <Card size="default" className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>
            This card uses the default size variant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The card component supports a size prop that defaults to
            &quot;default&quot; for standard spacing and sizing.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Action
          </Button>
        </CardFooter>
      </Card>
    </Example>
  );
}
