import { z } from "zod";

import {
  AmenitySchema,
  AttributeTypeSchema,
  CategorySchema,
  FileUsageRuleSchema,
  FileUsageScopeSchema,
  FinancingOptionSchema,
  OwnershipTypeSchema,
  RelationshipTypeSchema,
} from "../utils/validation";

export interface AttributeType {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Icon {
  name: string;
  family: string;
}

export interface Category {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RelationshipType {
  id: string;
  description: any;
  aIsToB: string;
  bIsToA: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Amenity {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Operation = "Create" | "Read" | "Update" | "Delete";
export interface AppService {
  id: string;
  name: string;
  version: string;
  timestamp: string;
  tags: string[];
  endpoints: Endpoint[];
}

export interface Endpoint {
  host: string;
  port: number;
  protocol: string;
}

export interface OwnershipType {
  id: string;
  name: string;
  description?: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface FinancingOption {
  id: string;
  name: string;
  description?: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface FileUsageScope {
  id: string;
  modelName: string;
  purpose: string;
  description: string;
  voided: boolean;
  createdAt: string;
}

export interface FileUsageRule {
  id: string
  scopeId: string
  maxFiles: number
  voided: boolean
  createdAt: string
}


export type AmenityFormData = z.infer<typeof AmenitySchema>;
export type CategoryFormData = z.infer<typeof CategorySchema>;
export type RelationshipTypeFormData = z.infer<typeof RelationshipTypeSchema>;
export type AttributeTypeFormData = z.infer<typeof AttributeTypeSchema>;
export type OwnershipTypeFormData = z.infer<typeof OwnershipTypeSchema>;
export type FinancingOptionsFormData = z.infer<typeof FinancingOptionSchema>;
export type FileUsageScopeFormData = z.infer<typeof FileUsageScopeSchema>;
export type FileUsageRuleFormData = z.infer<typeof FileUsageRuleSchema>;
