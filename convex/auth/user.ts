import { mutation, query } from "../_generated/server";
import { authComponent } from "../auth";
import { v } from "convex/values";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    try {
      const user = await authComponent.getAuthUser(ctx);
      return user;
    } catch {
      return null;
    }
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

export const getUserData = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);

    const userData = await ctx.db
      .query("user_data")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    return { user, userData };
  },
});
