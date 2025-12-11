import { mutation, query } from "../_generated/server";
import { authComponent } from "../auth";
import { v } from "convex/values";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});

export const checkIfUserExists = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = (await ctx.runQuery(authComponent.component.adapter.findOne, {
      model: "user",
      where: [{ field: "email", value: args.email }],
    })) as null | Awaited<ReturnType<typeof authComponent.getAuthUser>>;

    return !!user;
  },
});
