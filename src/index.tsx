import type { PiletApi } from "@havena/esm-shell-app";
import * as React from "react";
import { AdminHeaderLink } from "./components/links";
import {
  Amenities,
  Appservices,
  AttributeTypes,
  Categories,
  FileUsageRules,
  FinancingOptions,
  OwnershipTypes,
  RelationShipTypes,
  Resources,
} from "./pages";

export function setup(app: PiletApi) {
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
        icon="shieldCheck"
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

  app.registerPage("/dashboard/amenities", Amenities, { layout: "dashboard" });
  app.registerPage("/dashboard/attribute-types", AttributeTypes, {
    layout: "dashboard",
  });
  app.registerPage("/dashboard/categories", Categories, {
    layout: "dashboard",
  });
  app.registerPage("/dashboard/relationship-types", RelationShipTypes, {
    layout: "dashboard",
  });
  app.registerPage("/dashboard/ownership-types", OwnershipTypes, {
    layout: "dashboard",
  });
  app.registerPage("/dashboard/financing-options", FinancingOptions, {
    layout: "dashboard",
  });
  app.registerPage("/dashboard/files/usage-rules", FileUsageRules, {
    layout: "dashboard",
  });

  app.registerMenu(
    ({ onClose }: any) => (
      <AdminHeaderLink
        to="/dashboard/amenities"
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
        to="/dashboard/attribute-types"
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
        to="/dashboard/categories"
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
        to="/dashboard/relationship-types"
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
        to="/dashboard/ownership-types"
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
        to="/dashboard/financing-options"
        label="Financing options"
        icon="tax"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <AdminHeaderLink
        to="/dashboard/files/usage-rules"
        label="File usage rules"
        icon="swipe"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
}
