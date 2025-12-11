"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { ButtonGroup } from "@/components/ui/button-group";
import { ChevronRight, Globe } from "lucide-react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth/client";
import { AUTH_ERRORS, mapAuthErrors } from "@/lib/auth/errors";
import { StateFinalizedMessage } from "@/lib/types";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { log } from "@/lib/logger/client";

const emailSchema = z.object({
  email: z.string().email("User email must be a valid email. Please check!"),
});

export function EmailForm({
  defaultEmail,
  onEmailSent,
  onError,
  onSuccess,
}: {
  defaultEmail: string;
  onEmailSent: (email: string) => void;
  onError: (error: StateFinalizedMessage) => void;
  onSuccess: (success: StateFinalizedMessage) => void;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: { email: defaultEmail },
    validators: { onSubmit: emailSchema },
    onSubmit: async ({ value }) => {
      const action = "email otp sending";
      try {
        setLoading(true);
        const { data, error } = await authClient.emailOtp.sendVerificationOtp({
          email: value.email,
          type: "sign-in",
        });

        if (data?.success) {
          onEmailSent(value.email);
          onSuccess({
            action,
            message: "Successfully send the email to your inbox.",
          });
        } else {
          log.withMetadata({ error }).error(action.toUpperCase());
          onError(mapAuthErrors(action, error?.code));
        }
      } catch (error) {
        log.withMetadata({ error }).error(action.toUpperCase());
        onError(mapAuthErrors(action, undefined));
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <FieldSet>
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field
                  data-invalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                >
                  <FieldLabel>Email Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="john.doe@example.com"
                    autoComplete="email"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <ButtonGroup orientation="vertical" className="w-full gap-3">
          <Button disabled={loading} type="submit" size="lg" className="w-full">
            Send OTP Code
            {loading ? <Spinner /> : <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button type="button" variant="outline" size="lg" className="w-full">
            <Globe className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </ButtonGroup>
      </FieldSet>
    </form>
  );
}
