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
import { useRouter } from "next/navigation";

import { EmailForm } from "./_components/EmailForm";
import { OTPForm } from "./_components/OTPForm";
import { StateFinalizedMessage } from "@/lib/types";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { P } from "../ui/typography";

const SignUpForm = () => {
  const router = useRouter();
  const [email, setEmail] = useQueryState(
    "email",
    parseAsString.withDefault(""),
  );
  const [step, setStep] = useState<0 | 1>(0);
  const [error, setError] = useState<StateFinalizedMessage | null>(null);
  const [success, setSuccess] = useState<StateFinalizedMessage | null>(null);

  const resetStates = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Join us by creating your account. It takes just a few steps.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {step === 0 ? (
          <EmailForm
            defaultEmail={email}
            onEmailSent={(sentEmail) => {
              setEmail(sentEmail);
              setStep(1);
              resetStates();
            }}
            onSuccess={(successMsg) => {
              setSuccess(successMsg);
              setError(null);
            }}
            onError={(errorMsg) => {
              setError(errorMsg);
              setSuccess(null);
            }}
            authType="sign-up"
          />
        ) : (
          <OTPForm
            email={email}
            onSuccess={(successMsg) => {
              setSuccess(successMsg);
              setError(null);

              router.push("/chat/onboarding");
            }}
            onError={(errorMsg) => {
              setError(errorMsg);
              setSuccess(null);
            }}
            onBack={() => {
              setStep(0);
              resetStates();
              setEmail("");
            }}
            authType="sign-up"
          />
        )}

        {}
        {error && (
          <Alert variant="destructive" className="capitalize">
            <AlertCircleIcon />
            <AlertTitle>Unable to process your {error.action}.</AlertTitle>
            <AlertDescription>
              <P>{error.message}</P>
              <ul className="list-inside list-disc text-sm">
                <li>Check your connection.</li>
                <li>Ensure you've provided correct information.</li>
                <li>Try again or contact support if issues persist.</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="capitalize">
            <CheckCircle2Icon />
            <AlertTitle>{success.action} successful</AlertTitle>
            <AlertDescription>{success.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
