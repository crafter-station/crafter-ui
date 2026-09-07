"use client";

import { ArrowRight, Box, Check, Plus } from "lucide-react";
import { useState } from "react";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { EmptyState } from "@/components/ui/empty-state";
import { KeyboardShortcut } from "@/components/ui/keyboard-shortcut";
import { MemberItem } from "@/components/ui/member-item";
import { NotificationPreferences } from "@/components/ui/notification-preferences";
import { ProjectCard } from "@/components/ui/project-card";
import { SearchField } from "@/components/ui/search-field";
import { SectionHeading } from "@/components/ui/section-heading";
import { SettingsCard } from "@/components/ui/settings-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { TextField } from "@/components/ui/text-field";
import type { ComponentName } from "@/lib/catalog";

export function ComponentPreview({ name }: { name: ComponentName }) {
  const [pending, setPending] = useState(false);
  const [created, setCreated] = useState(false);
  const [query, setQuery] = useState("");
  if (name === "status-indicator")
    return (
      <div className="flex gap-3">
        <StatusIndicator />
        <StatusIndicator status="busy" />
        <StatusIndicator status="offline" />
      </div>
    );
  if (name === "keyboard-shortcut") return <KeyboardShortcut />;
  if (name === "search-field")
    return (
      <div className="grid w-full gap-3">
        <SearchField value={query} onValueChange={setQuery} />
        <p role="status" className="text-sm text-muted-foreground">
          {query ? `Searching for ${query}` : "Type to search"}
        </p>
      </div>
    );
  if (name === "member-item")
    return (
      <MemberItem
        name="Alex Rivera"
        email="alex@example.com"
        memberRole="Owner"
      />
    );
  if (name === "project-card")
    return (
      <div className="grid w-full gap-3">
        <ProjectCard
          name="Crafter UI"
          description="A library with your fingerprints."
          onOpen={() => setCreated(true)}
        />
        {created && (
          <p role="status" className="text-sm">
            Project opened. Your workspace is ready.
          </p>
        )}
      </div>
    );
  if (name === "notification-preferences")
    return (
      <NotificationPreferences
        onSave={async () => {
          await new Promise((resolve) => setTimeout(resolve, 600));
        }}
      />
    );
  if (name === "action-button")
    return (
      <div className="flex flex-wrap items-center gap-3">
        <ActionButton
          pending={pending}
          pendingLabel="Creating…"
          onClick={async () => {
            setPending(true);
            await new Promise((resolve) => setTimeout(resolve, 900));
            setPending(false);
            setCreated(true);
          }}
        >
          {created ? (
            <Check data-icon="inline-start" />
          ) : (
            <Plus data-icon="inline-start" />
          )}
          {created ? "Project created" : "Create project"}
        </ActionButton>
        <Button variant="outline" onClick={() => setCreated(false)}>
          Reset
        </Button>
        <span role="status" className="sr-only">
          {created ? "Project created" : ""}
        </span>
      </div>
    );
  if (name === "copy-button")
    return (
      <div className="copy-demo">
        <code>bun run dev</code>
        <CopyButton value="bun run dev" />
      </div>
    );
  if (name === "text-field")
    return (
      <div className="w-full max-w-sm">
        <TextField
          label="Project name"
          placeholder="Something worth making"
          description="A small idea is a good place to start."
        />
      </div>
    );
  if (name === "empty-state")
    return (
      <EmptyState
        icon={<Box />}
        title={
          created ? "Your first project is ready" : "Room for your next idea"
        }
        description={
          created
            ? "Keep making things."
            : "Every good project starts with a blank canvas."
        }
        action={
          <Button variant="outline" onClick={() => setCreated(!created)}>
            {created ? "Start again" : "Create a project"}
            <ArrowRight data-icon="inline-end" />
          </Button>
        }
      />
    );
  if (name === "section-heading")
    return (
      <div className="w-full">
        <SectionHeading
          title="Your workspace"
          description="A little less setup. A lot more making."
          action={
            <CopyButton
              value="https://ui.crafter.run"
              label="Copy workspace link"
              copiedLabel="Link copied"
            />
          }
        />
      </div>
    );
  return (
    <div className="w-full">
      <SettingsCard
        name="Weekend project"
        onSave={async () => {
          await new Promise((resolve) => setTimeout(resolve, 800));
        }}
      />
    </div>
  );
}
