import { emailOTPClient } from "better-auth/client/plugins";
import { StateFinalizedMessage } from "../types";
import { authClient } from "./client";

type EmailOTPErrors = keyof ReturnType<
  typeof emailOTPClient
>["$InferServerPlugin"]["$ERROR_CODES"];

type BasicErrors = keyof typeof authClient.$ERROR_CODES;

export const AUTH_ERRORS: Record<
  BasicErrors | EmailOTPErrors,
  StateFinalizedMessage
> = {
  INVALID_EMAIL: {
    message: "Please enter a valid email address.",
    action: "email validation",
  },
  USER_NOT_FOUND: {
    message: "User not found.",
    action: "user lookup",
  },
  FAILED_TO_CREATE_USER: {
    message: "Failed to create user. Please try again.",
    action: "creating user",
  },
  FAILED_TO_CREATE_SESSION: {
    message: "Failed to create session. Please try again.",
    action: "creating session",
  },
  FAILED_TO_UPDATE_USER: {
    message: "Failed to update user.",
    action: "updating user",
  },
  FAILED_TO_GET_SESSION: {
    message: "Unable to fetch session.",
    action: "fetching session",
  },
  INVALID_PASSWORD: {
    message: "Invalid password. Please try again.",
    action: "password validation",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    message: "Incorrect email or password.",
    action: "credentials check",
  },
  USER_ALREADY_HAS_PASSWORD: {
    message: "Password is already set for this account.",
    action: "password setup",
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    message: "This social account is already linked to another user.",
    action: "social linking",
  },
  PROVIDER_NOT_FOUND: {
    message: "Authentication provider not found.",
    action: "provider lookup",
  },
  INVALID_TOKEN: {
    message: "Invalid or expired token.",
    action: "token validation",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    message: "This ID token format is not supported.",
    action: "token validation",
  },
  FAILED_TO_GET_USER_INFO: {
    message: "Unable to fetch user information from provider.",
    action: "provider user info retrieval",
  },
  USER_EMAIL_NOT_FOUND: {
    message: "No email was provided by this account.",
    action: "email lookup",
  },
  EMAIL_NOT_VERIFIED: {
    message: "Your email address is not verified.",
    action: "email verification",
  },
  PASSWORD_TOO_SHORT: {
    message: "Password is too short.",
    action: "password validation",
  },
  PASSWORD_TOO_LONG: {
    message: "Password is too long.",
    action: "password validation",
  },
  USER_ALREADY_EXISTS: {
    message: "A user with this email already exists.",
    action: "user creation",
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    message: "This email is already in use. Please use a different one.",
    action: "email registration",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    message: "Email address cannot be updated for this account.",
    action: "email update",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    message: "Credential-based account not found.",
    action: "credential lookup",
  },
  SESSION_EXPIRED: {
    message: "Your session has expired. Please sign in again.",
    action: "session validation",
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    message: "You cannot unlink your last authentication method.",
    action: "account unlinking",
  },
  ACCOUNT_NOT_FOUND: {
    message: "Account not found.",
    action: "account lookup",
  },
  OTP_EXPIRED: {
    message: "Your OTP has expired. Please request a new one.",
    action: "otp verification",
  },
  INVALID_OTP: {
    message: "The OTP you entered is incorrect.",
    action: "otp validation",
  },
  TOO_MANY_ATTEMPTS: {
    message: "Too many failed attempts. Please try again later.",
    action: "otp rate limit",
  },
} satisfies Record<
  keyof typeof authClient.$ERROR_CODES | EmailOTPErrors,
  StateFinalizedMessage
>;

export const mapAuthErrors = (fallbackAction: string, code?: string) => {
  const error = AUTH_ERRORS[code as keyof typeof AUTH_ERRORS];

  return (
    error ?? {
      message:
        "Unknown Error occured, Please contact the admin panel for further information.",
      action: fallbackAction,
    }
  );
};
