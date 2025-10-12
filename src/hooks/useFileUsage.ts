import {
  apiFetch,
  APIFetchResponse,
  constructUrl,
  mutate,
} from "@hive/esm-core-api";
import useSWR from "swr";
import {
  FileUsageRule,
  FileUsageRuleFormData,
  FileUsageScope,
  FileUsageScopeFormData,
} from "../types";

export const useFileUsageScope = () => {
  const path = constructUrl("/files/usage-scope", { includeVoided: true });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<FileUsageScope> }>>(path);
  return {
    scope: data?.data?.results ?? [],
    error,
    isLoading,
    mutate,
  };
};

export const useFileUsageRules = (params: Record<string, any> = {}) => {
  const path = constructUrl("/files/usage-rules", {
    includeVoided: true,
    ...params,
  });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<FileUsageRule> }>>(path);
  return {
    rules: data?.data?.results ?? [],
    error,
    isLoading,
    mutate,
  };
};

const addFileUsageScope = async (data: FileUsageScopeFormData) => {
  const res = await apiFetch<FileUsageScope>("/files/usage-scope", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateFileUsageScope = async (
  id: string,
  data: FileUsageScopeFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<FileUsageScope>(`/files/usage-scope/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteFileUsageScope = async (id: string, purge: boolean = false) => {
  const res = await apiFetch<FileUsageScope>(`/files/usage-scope/${id}`, {
    method: "DELETE",
    params: { purge: `${purge}` },
  });
  return res.data;
};

const restoreFileUsageScope = async (id: string) => {
  const res = await apiFetch<FileUsageScope>(
    `/files/usage-scope/${id}/restore`,
    {
      method: "GET",
    }
  );
  return res.data;
};

export const useFileUsageScopeApi = () => {
  return {
    addFileUsageScope,
    updateFileUsageScope,
    deleteFileUsageScope,
    mutate: () => mutate(`/files/usage-scope`),
    restoreFileUsageScope,
  };
};

const addFileUsageRule = async (data: FileUsageRuleFormData) => {
  const res = await apiFetch<FileUsageRule>("/files/usage-rules", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateFileUsageRule = async (
  id: string,
  data: FileUsageRuleFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<FileUsageRule>(`/files/usage-rules/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteFileUsageRule = async (id: string, purge: boolean = false) => {
  const res = await apiFetch<FileUsageRule>(`/files/usage-rules/${id}`, {
    method: "DELETE",
    params: { purge: `${purge}` },
  });
  return res.data;
};

const restoreFileUsageRule = async (id: string) => {
  const res = await apiFetch<FileUsageRule>(
    `/files/usage-rules/${id}/restore`,
    {
      method: "GET",
    }
  );
  return res.data;
};

export const useFileUsageRuleApi = () => {
  return {
    addFileUsageRule,
    updateFileUsageRule,
    deleteFileUsageRule,
    mutate: () => mutate(`/files/usage-rules`),
    restoreFileUsageRule,
  };
};
