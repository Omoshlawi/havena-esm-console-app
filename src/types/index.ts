import { z } from "zod";
import {
  OrganizationMembershipSchema,
  OrganizationSchema,
  PrivilegeSchema,
  ResourceSchema,
  RolePrivilegeSchema,
  RoleSchema,
} from "../utils/validation";

export interface Organization {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
}

export type OrganizationFormData = z.infer<typeof OrganizationSchema>;
export type PrivilegeFormData = z.infer<typeof PrivilegeSchema>;
export type RoleFormData = z.infer<typeof RoleSchema>;
export type RolePrivilegeFormData = z.infer<typeof RolePrivilegeSchema>;
export type ResourceFormData = z.infer<typeof ResourceSchema>;
export type OrganizationMembershipFormData = z.infer<
  typeof OrganizationMembershipSchema
>;
export type UserFormData = {};

export interface Resource {
  id: string;
  name: string;
  description: string;
  dataPoints: string[];
  createdAt: string;
  updatedAt: string;
  voided: boolean;
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
