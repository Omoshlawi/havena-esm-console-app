import { APIFetchResponse, Auth } from "@hive/esm-core-api";
import { useMemo } from "react";
import { toTitleCase } from "../utils/helpers";

const useResources = () => {
  const statements = {
    ...Auth.pluginOptions.admin.ac.statements,
    ...Auth.pluginOptions.organization.ac.statements,
  };
  const resources = useMemo<
    Array<{ resource: string; actions: Array<string> }>
  >(
    () =>
      Object.keys(statements).map((resource) => ({
        resource: toTitleCase(resource),
        actions: statements[resource]?.map(toTitleCase),
      })),
    [statements]
  );
  return resources;
};

export default useResources;
