"use client";

import { useId, useRef, useState } from "react";
import { ActionButton } from "@/components/ui/action-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { TextField } from "@/components/ui/text-field";

export function SettingsCard({
  name = "",
  onSave,
}: {
  name?: string;
  onSave: (name: string) => Promise<void>;
}) {
  const [value, setValue] = useState(name);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const saving = useRef(false);
  const inputId = useId();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (saving.current) return;
        setMessage("");
        if (!value.trim()) {
          setError("Enter a project name.");
          return;
        }
        setError("");
        saving.current = true;
        setPending(true);
        try {
          await onSave(value.trim());
          setMessage("Changes saved.");
        } catch {
          setMessage("Could not save. Please try again.");
        } finally {
          saving.current = false;
          setPending(false);
        }
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Project settings</CardTitle>
          <CardDescription>A home for what you are building.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <TextField
              id={inputId}
              label="Project name"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setError("");
                setMessage("");
              }}
              error={error}
              disabled={pending}
              description="Use a name your team will recognize."
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-3">
          <span role="status" className="text-xs text-muted-foreground">
            {message || "You can change this anytime."}
          </span>
          <ActionButton type="submit" pending={pending} pendingLabel="Saving…">
            Save changes
          </ActionButton>
        </CardFooter>
      </Card>
    </form>
  );
}
