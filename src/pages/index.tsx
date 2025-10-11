import {
  withNoOrganizationContextRequired,
  withRequireAuth,
} from "@hive/esm-core-components";
import AppServicesPage from "./AppServicesPage";
import ResourcesPage from "./ResourcesPage";
import Amenitiespage from "./Amenitiespage";
import AttributeTypesPage from "./AttributeTypesPage";
import CategoriesPage from "./CategoriesPage";
import RelationshipTypesPage from "./RelationshipTypesPage";
import FinancingOptionsPage from "./FinancingOptionsPage";
import OwnershipTypesPage from "./OwnershipTypesPage";
import ExitOrganizationContext from "../components/ExitOrganizationContext";
import React from "react";

const unauthenticatedAction: any = { type: "redirect", path: "/login" };
const hasOrganizationAction: any = {
  type: "fallback",
  component: <ExitOrganizationContext />,
};

export const Appservices = withRequireAuth(
  withNoOrganizationContextRequired(AppServicesPage, {
    hasOrganizationAction,
  }),
  {
    unauthenticatedAction,
  }
);

export const Resources = withRequireAuth(
  withNoOrganizationContextRequired(ResourcesPage, { hasOrganizationAction }),
  {
    unauthenticatedAction,
  }
);

export const Amenities = withRequireAuth(
  withNoOrganizationContextRequired(Amenitiespage, { hasOrganizationAction }),
  {
    unauthenticatedAction,
  }
);
export const AttributeTypes = withRequireAuth(
  withNoOrganizationContextRequired(AttributeTypesPage, {
    hasOrganizationAction,
  }),
  {
    unauthenticatedAction,
  }
);
export const Categories = withRequireAuth(
  withNoOrganizationContextRequired(CategoriesPage, { hasOrganizationAction }),
  {
    unauthenticatedAction,
  }
);
export const RelationShipTypes = withRequireAuth(
  withNoOrganizationContextRequired(RelationshipTypesPage, {
    hasOrganizationAction,
  }),
  {
    unauthenticatedAction,
  }
);
export const FinancingOptions = withRequireAuth(
  withNoOrganizationContextRequired(FinancingOptionsPage, {
    hasOrganizationAction,
  }),
  {
    unauthenticatedAction,
  }
);
export const OwnershipTypes = withRequireAuth(
  withNoOrganizationContextRequired(OwnershipTypesPage, {
    hasOrganizationAction,
  }),
  {
    unauthenticatedAction,
  }
);
