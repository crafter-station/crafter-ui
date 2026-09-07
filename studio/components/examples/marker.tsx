"use client";
import {
  ChevronRightIcon,
  CircleUserIcon,
  ClockIcon,
  FileTextIcon,
  GitBranchIcon,
} from "lucide-react";
import { Example } from "@/components/examples/example";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
export default function Preview() {
  return (
    <div className="example-stack">
      <MarkerExample />
    </div>
  );
}
function MarkerExample() {
  return (
    <Example title="Markers" className="gap-8">
      <Marker>
        <MarkerContent>A default marker</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <FileTextIcon />
        </MarkerIcon>
        <MarkerContent>Marker with icon</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Marker with a spinner</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">
          Marker with shimmer effect
        </MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerContent className="shimmer">Thinking...</MarkerContent>
      </Marker>
      <Marker render={<a href="/docs" />}>
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>Marker as a link</MarkerContent>
      </Marker>
      <Marker
        render={
          <button
            type="button"
            onClick={() => toast.add({ title: "You clicked the button" })}
            className="transition-colors hover:text-foreground"
          />
        }
      >
        <MarkerIcon>
          <ClockIcon />
        </MarkerIcon>
        <MarkerContent className="flex-1">
          <div>Marker as a button</div>
        </MarkerContent>
        <MarkerIcon>
          <ChevronRightIcon />
        </MarkerIcon>
      </Marker>
      <Marker>
        <MarkerIcon>
          <CircleUserIcon />
        </MarkerIcon>
        <MarkerContent>Rhea joined the chat</MarkerContent>
      </Marker>
      <Marker className="justify-center">
        <MarkerContent>
          <strong className="font-medium">Olivia Rose</strong> left the chat
        </MarkerContent>
      </Marker>
      <Marker className="flex-col">
        <MarkerIcon>
          <FileTextIcon />
        </MarkerIcon>
        <MarkerContent>Marker with icon at the top</MarkerContent>
      </Marker>
    </Example>
  );
}
