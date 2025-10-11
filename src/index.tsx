import type { PiletApi } from "@hive/esm-shell-app";
import * as React from "react";
import {
  AdminHeaderLink,
  OrganizationContextHeaderLink,
} from "./components/links";
import {} from "zod/v4";
import {
  Amenities,
  Appservices,
  AttributeTypes,
  Categories,
  FinancingOptions,
  OrganizationStaff,
  OwnershipTypes,
  RelationShipTypes,
  Resources,
} from "./pages";

export function setup(app: PiletApi) {
  app.registerPage("/dashboard/staff", OrganizationStaff, {
    layout: "dashboard",
  });
  app.registerPage("/dashboard/resources", Resources, {
    layout: "dashboard",
  });
  app.registerPage("/dashboard/app-services", Appservices, {
    layout: "dashboard",
  });
  app.registerMenu(
    ({ onClose }: any) => (
      <AdminHeaderLink
        to="/dashboard/resources"
        label="Resources"
        onClose={onClose ?? (() => {})}
        icon="database"
      />
    ),
    {
      type: "admin",
      order: 2,
    }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <AdminHeaderLink
        to="/dashboard/app-services"
        label="App services"
        onClose={onClose ?? (() => {})}
        icon="server2"
      />
    ),
    {
      type: "admin",
      order: 1,
    }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <OrganizationContextHeaderLink
        to="/dashboard/staff"
        label="Staffs"
        onClose={onClose ?? (() => {})}
        icon="usersGroup"
      />
    ),
    {
      type: "admin",
      order: 5,
    }
  );

  app.registerPage("/dasboard/amenities", Amenities, { layout: "dashboard" });
  app.registerPage("/dasboard/attribute-types", AttributeTypes, {
    layout: "dashboard",
  });
  app.registerPage("/dasboard/categories", Categories, {
    layout: "dashboard",
  });
  app.registerPage("/dasboard/relationship-types", RelationShipTypes, {
    layout: "dashboard",
  });
  app.registerPage("/dasboard/ownership-types", OwnershipTypes, {
    layout: "dashboard",
  });
  app.registerPage("/dasboard/financing-options", FinancingOptions, {
    layout: "dashboard",
  });

  app.registerMenu(
    ({ onClose }: any) => (
      <AdminHeaderLink
        to="/dasboard/amenities"
        label="Amenities"
        icon="tournament"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <AdminHeaderLink
        to="/dasboard/attribute-types"
        label="Attribute Types"
        icon="tree"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <AdminHeaderLink
        to="/dasboard/categories"
        label="Categories"
        icon="category"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <AdminHeaderLink
        to="/dasboard/relationship-types"
        label="Relationship types"
        icon="sitemap"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <AdminHeaderLink
        to="/dasboard/ownership-types"
        label="Ownership types"
        icon="userHexagon"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <AdminHeaderLink
        to="/dasboard/financing-options"
        label="Financing options"
        icon="tax"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
}
