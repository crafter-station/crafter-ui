"use client";
import { useState } from "react";
import { ActionButton } from "@/components/ui/action-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
export function NotificationPreferences({
  onSave,
}: {
  onSave: (value: { updates: boolean; activity: boolean }) => Promise<void>;
}) {
  const [updates, setUpdates] = useState(true);
  const [activity, setActivity] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stay in the loop</CardTitle>
        <CardDescription>Choose what reaches your inbox.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="notification-updates">
                Product updates
              </FieldLabel>
              <FieldDescription>New features and releases.</FieldDescription>
            </FieldContent>
            <Switch
              id="notification-updates"
              checked={updates}
              onCheckedChange={setUpdates}
            />
          </Field>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="notification-activity">
                Team activity
              </FieldLabel>
              <FieldDescription>Progress from your workspace.</FieldDescription>
            </FieldContent>
            <Switch
              id="notification-activity"
              checked={activity}
              onCheckedChange={setActivity}
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <ActionButton
          pending={pending}
          pendingLabel="Saving…"
          onClick={async () => {
            setPending(true);
            setMessage("");
            try {
              await onSave({ updates, activity });
              setMessage("Preferences saved");
            } catch {
              setMessage("Could not save. Try again.");
            } finally {
              setPending(false);
            }
          }}
        >
          Save preferences
        </ActionButton>
        <span role="status" className="text-xs text-muted-foreground">
          {message}
        </span>
      </CardFooter>
    </Card>
  );
}
