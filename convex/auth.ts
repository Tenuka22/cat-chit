import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

const siteUrl = process.env.SITE_URL!;

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false },
) => {
  return betterAuth({
    logger: {
      disabled: optionsOnly,
      level: "debug",
    },
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: false,
      requireEmailVerification: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    advanced: { cookiePrefix: "cat-chit" },
    plugins: [
      convex(),
      emailOTP({
        sendVerificationOTP: async ({ email, otp, type }) => {
          if (type === "sign-in") {
            console.log(`Sign In emailOTP Sent, ${email}: ${otp}`);
          } else if (type === "email-verification") {
            console.log(`Email verification emailOTP Sent, ${email}: ${otp}`);
          } else {
            console.log(`Email password reset emailOTP Sent, ${email}: ${otp}`);
          }
        },
      }),
    ],
  });
};
