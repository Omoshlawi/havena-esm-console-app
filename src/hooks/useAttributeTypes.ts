import {
  apiFetch,
  APIFetchResponse,
  constructUrl,
  mutate,
} from "@havena/esm-core-api";
import { AttributeType, AttributeTypeFormData } from "../types";
import useSWR from "swr";

const addAttributeType = async (data: AttributeTypeFormData) => {
  const res = await apiFetch<AttributeType>("/attribute-types", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateAttributeType = async (
  id: string,
  data: AttributeTypeFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<AttributeType>(`/attribute-types/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteAttributeType = async (id: string, purge: boolean = false) => {
  const res = await apiFetch<AttributeType>(`/attribute-types/${id}`, {
    method: "DELETE",
    params: { purge },
  });
  return res.data;
};

const restoreAttributeType = async (id: string) => {
  const res = await apiFetch<AttributeType>(`/attribute-types/${id}/restore`, {
    method: "GET",
  });
  return res.data;
};

export const useAttributeTypeApi = () => {
  return {
    addAttributeType,
    updateAttributeType,
    deleteAttributeType,
    mutate: () => mutate("/attribute-types"),
    restoreAttributeType,
  };
};

export const useAttributeTypes = () => {
  const path = constructUrl("/attribute-types", { includeVoided: true });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: AttributeType[] }>>(path);
  return {
    attributeTypes: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
