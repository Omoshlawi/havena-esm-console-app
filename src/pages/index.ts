import { withRequireAuth } from "@hive/esm-core-components";
import AppServicesPage from "./AppServicesPage";
import OrganizationStaffPage from "./OrganizationStaffPage";
import ResourcesPage from "./ResourcesPage";
import Amenitiespage from "./Amenitiespage";
import AttributeTypesPage from "./AttributeTypesPage";
import CategoriesPage from "./CategoriesPage";
import RelationshipTypesPage from "./RelationshipTypesPage";
import FinancingOptionsPage from "./FinancingOptionsPage";
import OwnershipTypesPage from "./OwnershipTypesPage";

const unauthenticatedAction: any = { type: "redirect", path: "/login" };

export const Appservices = withRequireAuth(AppServicesPage, {
  unauthenticatedAction,
});

export const OrganizationStaff = withRequireAuth(OrganizationStaffPage, {
  unauthenticatedAction,
});

export const Resources = withRequireAuth(ResourcesPage, {
  unauthenticatedAction,
});

export const Amenities = withRequireAuth(Amenitiespage, {
  unauthenticatedAction,
});
export const AttributeTypes = withRequireAuth(AttributeTypesPage, {
  unauthenticatedAction,
});
export const Categories = withRequireAuth(CategoriesPage, {
  unauthenticatedAction,
});
export const RelationShipTypes = withRequireAuth(RelationshipTypesPage, {
  unauthenticatedAction,
});
export const FinancingOptions = withRequireAuth(FinancingOptionsPage, {
  unauthenticatedAction,
});
export const OwnershipTypes = withRequireAuth(OwnershipTypesPage, {
  unauthenticatedAction,
});
