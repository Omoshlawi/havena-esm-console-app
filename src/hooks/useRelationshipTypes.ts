import {
  apiFetch,
  APIFetchResponse,
  constructUrl,
  mutate,
} from "@hive/esm-core-api";
import { RelationshipType, RelationshipTypeFormData } from "../types";
import useSWR from "swr";

const addRelationshipType = async (data: RelationshipTypeFormData) => {
  const res = await apiFetch<RelationshipType>("/relationship-types", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateRelationshipType = async (
  id: string,
  data: RelationshipTypeFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<RelationshipType>(`/relationship-types/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteRelationshipType = async (id: string, purge: boolean = false) => {
  const res = await apiFetch<RelationshipType>(`/relationship-types/${id}`, {
    method: "DELETE",
    params: { purge },
  });
  return res.data;
};

const restoreRelationshipType = async (id: string) => {
  const res = await apiFetch<RelationshipType>(
    `/relationship-types/${id}/restore`,
    {
      method: "GET",
    }
  );
  return res.data;
};

export const useRelationshipTypeApi = () => {
  return {
    addRelationshipType,
    updateRelationshipType,
    deleteRelationshipType,
    mutate: () => mutate("/relationship-types"),
    restoreRelationshipType,
  };
};

export const useRelationshipTypes = () => {
  const path = constructUrl("/relationship-types", { includeVoided: true });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: RelationshipType[] }>>(path);
  return {
    relationshipTypes: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
