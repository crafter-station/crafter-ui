"use client";
import { RefreshCwIcon } from "lucide-react";
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
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export default function Preview() {
  return (
    <div className="example-stack">
      <InputOTPForm />
    </div>
  );
}
function InputOTPForm() {
  return (
    <Example title="Form">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Verify your login</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:{" "}
            <span className="font-medium">m@example.com</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="otp-verification">
                  Verification code
                </FieldLabel>
                <Button variant="outline" size="xs">
                  <RefreshCwIcon data-icon="inline-start" />
                  Resend Code
                </Button>
              </div>
              <InputOTP maxLength={6} id="otp-verification" required>
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:text-xl style-vega:*:data-[slot=input-otp-slot]:h-16 style-vega:*:data-[slot=input-otp-slot]:w-12 style-nova:*:data-[slot=input-otp-slot]:h-12 style-nova:*:data-[slot=input-otp-slot]:w-11 style-lyra:*:data-[slot=input-otp-slot]:h-12 style-lyra:*:data-[slot=input-otp-slot]:w-11 style-maia:*:data-[slot=input-otp-slot]:h-16 style-maia:*:data-[slot=input-otp-slot]:w-12 style-mira:*:data-[slot=input-otp-slot]:h-12 style-mira:*:data-[slot=input-otp-slot]:w-11 style-luma:*:data-[slot=input-otp-slot]:h-16 style-luma:*:data-[slot=input-otp-slot]:w-12">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:text-xl style-vega:*:data-[slot=input-otp-slot]:h-16 style-vega:*:data-[slot=input-otp-slot]:w-12 style-nova:*:data-[slot=input-otp-slot]:h-12 style-nova:*:data-[slot=input-otp-slot]:w-11 style-lyra:*:data-[slot=input-otp-slot]:h-12 style-lyra:*:data-[slot=input-otp-slot]:w-11 style-maia:*:data-[slot=input-otp-slot]:h-16 style-maia:*:data-[slot=input-otp-slot]:w-12 style-mira:*:data-[slot=input-otp-slot]:h-12 style-mira:*:data-[slot=input-otp-slot]:w-11 style-luma:*:data-[slot=input-otp-slot]:h-16 style-luma:*:data-[slot=input-otp-slot]:w-12">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                <a href="/docs">
                  I no longer have access to this email address.
                </a>
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Verify
          </Button>
          <div className="text-sm text-muted-foreground">
            Having trouble signing in?{" "}
            <a
              href="/docs"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Contact support
            </a>
          </div>
        </CardFooter>
      </Card>
    </Example>
  );
}
