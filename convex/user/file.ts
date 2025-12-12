import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { authComponent } from "../auth";
import { ConvexError } from "convex/values";

import { FILE_CATEGORIES, MODERATION_STATUSES } from "../schema";

export const generateServerUrlFn = query({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError({
        message: "File not found",
        code: "NOT_FOUND",
      });
    }

    if (file.showTo !== "public") {
      const user = await authComponent.getAuthUser(ctx);

      if (!user || file.userId !== user._id) {
        throw new ConvexError({
          message: "You don't have permission to access this file.",
          code: "UNAUTHORIZED",
        });
      }
    }

    const fileUrl = await ctx.storage.getUrl(file.storageId);
    if (!fileUrl) {
      throw new ConvexError({
        message: "Failed to generate file URL.",
        code: "STORAGE_ERROR",
      });
    }

    return { fileUrl };
  },
});

export const addNewFileFn = mutation({
  args: {
    storageId: v.id("_storage"),
    key: v.string(),
    fileName: v.string(),

    showTo: v.union(v.literal("public")),

    category: v.optional(v.union(...FILE_CATEGORIES.map((c) => v.literal(c)))),

    relatedEntityId: v.optional(v.union(v.id("user_profiles"), v.id("cats"))),
  },

  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new ConvexError({
        message: "User not authenticated.",
        code: "UNAUTHORIZED",
      });
    }

    try {
      const inserted = await ctx.db.insert("files", {
        storageId: args.storageId,
        userId: user._id,
        showTo: args.showTo,
        fileName: args.fileName,
        category: args.category ?? undefined,
        relatedEntityId: args.relatedEntityId ?? undefined,
        moderationStatus:
          "pending" satisfies (typeof MODERATION_STATUSES)[number],
        uploadedAt: Date.now(),
      });

      return { fileId: inserted };
    } catch (err) {
      throw new ConvexError({
        message: "Failed to insert file into database.",
        code: "DB_ERROR",
        details: err instanceof Error ? err.message : String(err),
      });
    }
  },
});

export const generateUploadUrlFn = mutation({
  args: {},
  handler: async ({ storage }) => {
    try {
      return await storage.generateUploadUrl();
    } catch (err) {
      throw new ConvexError({
        message: "Failed to generate upload URL.",
        code: "STORAGE_ERROR",
        details: err instanceof Error ? err.message : String(err),
      });
    }
  },
});

export const removeFileFn = mutation({
  args: { fileId: v.id("files") },

  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new ConvexError({
        message: "Unauthorized.",
        code: "UNAUTHORIZED",
      });
    }

    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError({
        message: "File not found.",
        code: "NOT_FOUND",
      });
    }

    if (file.userId !== user._id) {
      throw new ConvexError({
        message: "You don't have permission to delete this file.",
        code: "FORBIDDEN",
      });
    }

    // Delete storage (best-effort)
    try {
      await ctx.storage.delete(file.storageId);
    } catch (err) {
      // We do not fail for storage delete errors — best effort.
      console.warn("Storage delete failed:", err);
    }

    // Delete DB entry
    try {
      await ctx.db.delete(args.fileId);
    } catch (err) {
      throw new ConvexError({
        message: "Error deleting file from database.",
        code: "DB_ERROR",
        details: err instanceof Error ? err.message : String(err),
      });
    }

    return {
      fileId: args.fileId,
      storageId: file.storageId,
    };
  },
});
