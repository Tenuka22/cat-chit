import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const HUMAN_GENDERS = ["male", "female", "other"] as const;

export const CAT_GENDERS = ["male", "female"] as const;

export const LOOKING_FOR = ["kind", "bad"] as const;

export const CAT_PERSONALITIES = [
  "playful",
  "calm",
  "energetic",
  "shy",
] as const;

export const FILE_CATEGORIES = [
  "user_profiles",
  "cat",
  "human",
  "human_and_cat",
] as const;

export const MODERATION_STATUSES = [
  "pending",
  "approved",
  "flagged",
  "rejected",
] as const;

export default defineSchema({
  user_data: defineTable({
    userId: v.id("user"),

    gender: v.optional(v.union(...HUMAN_GENDERS.map((g) => v.literal(g)))),

    bio: v.optional(v.string()),
    dateOfBirth: v.optional(v.float64()),

    location: v.optional(
      v.object({
        city: v.string(),
        state: v.optional(v.string()),
        country: v.string(),
      }),
    ),

    lookingFor: v.optional(
      v.array(v.union(...LOOKING_FOR.map((item) => v.literal(item)))),
    ),

    profileImageId: v.optional(v.id("files")),
    onboardingCompleted: v.boolean(),
    createdAt: v.float64(),
    updatedAt: v.float64(),
  })
    .index("by_user", ["userId"])
    .index("by_onboarding_status", ["onboardingCompleted"]),

  cats: defineTable({
    userId: v.id("user"),
    name: v.string(),
    breed: v.optional(v.string()),

    gender: v.union(...CAT_GENDERS.map((g) => v.literal(g))),

    dateOfBirth: v.optional(v.number()),
    bio: v.optional(v.string()),

    personality: v.optional(
      v.array(v.union(...CAT_PERSONALITIES.map((p) => v.literal(p)))),
    ),

    isNeutered: v.optional(v.boolean()),
    profileImageId: v.optional(v.id("files")),
    createdAt: v.float64(),
    updatedAt: v.float64(),
  })
    .index("by_user", ["userId"])
    .index("by_gender", ["gender"])
    .index("by_breed", ["breed"]),

  files: defineTable({
    userId: v.id("user"),
    showTo: v.union(v.literal("public")),
    storageId: v.id("_storage"),
    fileName: v.string(),

    category: v.optional(v.union(...FILE_CATEGORIES.map((c) => v.literal(c)))),

    relatedEntityId: v.optional(v.union(v.id("user_profiles"), v.id("cats"))),

    moderationStatus: v.optional(
      v.union(...MODERATION_STATUSES.map((m) => v.literal(m))),
    ),

    moderationReason: v.optional(v.string()),
    uploadedAt: v.float64(),
  })
    .index("by_user", ["userId"])
    .index("by_category", ["category"])
    .index("by_moderation_status", ["moderationStatus"])
    .index("by_related_entity", ["relatedEntityId"]),
});
