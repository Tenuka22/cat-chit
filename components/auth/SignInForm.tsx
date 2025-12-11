"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { useQueryState, parseAsString } from "nuqs";

import { EmailForm } from "./_components/EmailForm";
import { OTPForm } from "./_components/OTPForm";
import { StateFinalizedMessage } from "@/lib/types";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { P, Span } from "../ui/typography";

const SignInForm = () => {
  const [email, setEmail] = useQueryState(
    "email",
    parseAsString.withDefault(""),
  );
  const [step, setStep] = useState<0 | 1>(0);
  const [error, setError] = useState<StateFinalizedMessage | null>(null);
  const [success, setSuccess] = useState<StateFinalizedMessage | null>(null);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          You are just steps away from continuing your dating life.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {step === 0 ? (
          <EmailForm
            defaultEmail={email}
            onEmailSent={(email) => {
              setEmail(email);
              setStep(1);
            }}
            onSuccess={(success) => {
              setError(null);
              setSuccess(success);
            }}
            onError={(error) => {
              setSuccess(null);
              setError(error);
            }}
          />
        ) : (
          <OTPForm
            email={email}
            onSuccess={(success) => {
              setError(null);
              setSuccess(success);
            }}
            onError={(error) => {
              setSuccess(null);
              setError(error);
            }}
            onBack={() => setStep(0)}
          />
        )}

        {error && (
          <Alert variant="destructive" className="capitalize">
            <AlertCircleIcon />
            <AlertTitle>Unable to process through {error.action}.</AlertTitle>
            <AlertDescription>
              <P>{error.message}</P>

              <ul className="list-inside list-disc text-sm">
                <li>
                  <Span>Check your connection.</Span>
                </li>
                <li>
                  <Span>Ensure You&apos;ve provided correct information.</Span>
                </li>
                <li>
                  <Span>Try contacting administration if not proceeding.</Span>
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="capitalize">
            <CheckCircle2Icon />
            <AlertTitle>{success.action} proceeded successfully</AlertTitle>
            <AlertDescription>{success.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SignInForm;
