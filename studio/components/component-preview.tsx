"use client";

import { ArrowRight, Box, Check, Plus } from "lucide-react";
import { useState } from "react";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { SettingsCard } from "@/components/ui/settings-card";
import { TextField } from "@/components/ui/text-field";
import type { ComponentName } from "@/lib/catalog";

export function ComponentPreview({ name }: { name: ComponentName }) {
  const [pending, setPending] = useState(false);
  const [created, setCreated] = useState(false);
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
