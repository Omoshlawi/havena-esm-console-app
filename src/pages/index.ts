import { withRequireAuth } from "@hive/esm-core-components";
import AppServicesPage from "./AppServicesPage";
import OrganizationStaffPage from "./OrganizationStaffPage";
import ResourcesPage from "./ResourcesPage";

export const Appservices = withRequireAuth(AppServicesPage, {
  unauthenticatedAction: { type: "redirect", path: "/login" },
});

export const OrganizationStaff = withRequireAuth(OrganizationStaffPage, {
  unauthenticatedAction: { type: "redirect", path: "/login" },
});

export const Resources = withRequireAuth(ResourcesPage, {
  unauthenticatedAction: { type: "redirect", path: "/login" },
});
