import {
  HeaderLink,
  withRequiredOrganizationContext,
  withRequireAuth,
} from "@hive/esm-core-components";
import React from "react";

export const OrganizationContextHeaderLink = withRequiredOrganizationContext(
  HeaderLink,
  { noOrganizationAction: { type: "hide" } }
);

export const AdminHeaderLink = withRequireAuth(HeaderLink, {
  unauthenticatedAction: { type: "hide" },
});
