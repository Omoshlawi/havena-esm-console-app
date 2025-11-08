import {
  apiFetch,
  APIFetchResponse,
  constructUrl,
  mutate,
} from "@havena/esm-core-api";
import { Category, CategoryFormData } from "../types";
import useSWR from "swr";

const addCategory = async (data: CategoryFormData) => {
  const res = await apiFetch<Category>("/categories", { method: "POST", data });
  return res.data;
};

const updateCategory = async (
  id: string,
  data: CategoryFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<Category>(`/categories/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteCategory = async (id: string, purge: boolean = false) => {
  const res = await apiFetch<Category>(`/categories/${id}`, {
    method: "DELETE",
    params: { purge: `${purge}` },
  });
  return res.data;
};

const restoreCategory = async (id: string) => {
  const res = await apiFetch<Category>(`/categories/${id}/restore`, {
    method: "GET",
  });
  return res.data;
};

export const useCategoryApi = () => {
  return {
    addCategory,
    updateCategory,
    deleteCategory,
    mutate: () => mutate(`/categories`),
    restoreCategory,
  };
};

export const useCategories = () => {
  const path = constructUrl("/categories", { includeVoided: true });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Category[] }>>(path);
  return {
    categories: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
