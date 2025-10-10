import type { PiletApi } from "@hive/esm-shell-app";
import * as React from "react";
import {
  AdminHeaderLink,
  OrganizationContextHeaderLink,
} from "./components/links";
import { Appservices, OrganizationStaff, Resources } from "./pages";

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
}
