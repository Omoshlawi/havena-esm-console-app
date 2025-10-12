import { z } from "zod";

// IconSchema
const IconSchema = z.object({
  name: z.string().min(1, "Required"),
  family: z.string().min(1, "Required"),
});
// Amenity
export const AmenitySchema = z.object({
  name: z.string().min(1, "Required"),
  icon: IconSchema,
});

// Category
export const CategorySchema = z.object({
  name: z.string().min(1, "Required"),
  icon: IconSchema,
});

// RelationshipType
export const RelationshipTypeSchema = z.object({
  description: z.string().min(1, "Required").optional(),
  aIsToB: z.string().min(1, "Required"),
  bIsToA: z.string().min(1, "Required"),
});

// Attribute types
export const AttributeTypeSchema = z.object({
  name: z.string().min(1, "Required"),
  icon: IconSchema,
});

export const OwnershipTypeSchema = z.object({
  name: z.string().nonempty("required"),
  description: z.string().optional(),
});

export const FinancingOptionSchema = z.object({
  name: z.string().nonempty("required"),
  description: z.string().optional(),
});

export const FileUsageScopeSchema = z.object({
  modelName: z.string().nonempty(),
  purpose: z.string().nonempty(),
  description: z.string().optional(),
});

export const FileUsageRuleSchema = z.object({
  scopeId: z.string().uuid(),
  maxFiles: z.coerce.number().positive(),
});
