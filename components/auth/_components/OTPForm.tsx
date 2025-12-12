"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { ButtonGroup } from "@/components/ui/button-group";
import { ChevronRight, MailMinus } from "lucide-react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth/client";
import { mapAuthErrors } from "@/lib/auth/errors";
import { StateFinalizedMessage } from "@/lib/types";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { log } from "@/lib/logger/client";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "Auth OTP must be exactly 6 digits. Check again!" })
    .regex(/^\d+$/, { message: "OTP must contain only digits" }),
});

export function OTPForm({
  email,
  onSuccess,
  onError,
  onBack,
  authType,
}: {
  email: string;
  onError: (error: StateFinalizedMessage) => void;
  onBack: () => void;
  onSuccess: (success: StateFinalizedMessage) => void;
  authType: "sign-in" | "sign-up";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: { otp: "" },
    validators: { onSubmit: otpSchema },
    onSubmit: async ({ value }) => {
      const action = `${authType} OTP verification`;

      try {
        setLoading(true);
        const { data, error } = await authClient.signIn.emailOtp({
          email,
          otp: value.otp,
        });

        if (data?.token) {
          onSuccess({
            action,
            message: `Successfully verified OTP for ${authType}. You will be redirected shortly.`,
          });

          setTimeout(() => router.push("/"), 300);
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

  const buttonText =
    authType === "sign-up" ? "Verify & Sign Up" : "Verify & Sign In";

  return (
    <div className="space-y-6">
      <div className="text-center text-sm text-muted-foreground">
        We sent a 6-digit code to{" "}
        <span className="font-medium text-foreground">{email}</span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <FieldSet>
          <FieldGroup>
            <form.Field name="otp">
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
                    <div className="flex items-center justify-center gap-2 flex-col ">
                      <FieldLabel>Enter OTP</FieldLabel>

                      <InputOTP
                        maxLength={6}
                        id={field.name}
                        name={field.name}
                        disabled={loading}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e)}
                        aria-invalid={isInvalid}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </div>
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <ButtonGroup orientation="vertical" className="w-full gap-3">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {buttonText}
              {loading ? (
                <Spinner />
              ) : (
                <ChevronRight className="ml-2 h-4 w-4" />
              )}{" "}
            </Button>
            <Button type="button" variant="ghost" onClick={onBack}>
              Back to email change <MailMinus className="ml-2 h-4 w-4" />
            </Button>
          </ButtonGroup>
        </FieldSet>
      </form>
    </div>
  );
}
