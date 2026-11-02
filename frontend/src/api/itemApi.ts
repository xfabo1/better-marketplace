import { ApiError, apiFetch, toQueryString } from "@/lib/api-client";
import type { CreateItemRequest, ItemDetails, PreviewItem, UpdateItemRequest } from "@/types/item";

export type ItemSearchParams = {
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  condition?: string;
  category?: string;
  subcategory?: string;
  sort?: string;
  pageSize?: number;
};

export async function getItems(params: ItemSearchParams = {}) {
  return apiFetch<PreviewItem[]>(`/v1/items${toQueryString(params)}`);
}

export async function getItemById(id: string | number) {
  try {
    return await apiFetch<ItemDetails>(`/v1/items/item/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw new ApiError(404, "item_not_found");
    }
    throw error;
  }
}

export async function createItem(itemData: CreateItemRequest) {
  return apiFetch<number>("/v1/items/item", { method: "POST", body: itemData });
}

export async function updateItem(id: string | number, updateData: UpdateItemRequest) {
  try {
    await apiFetch(`/v1/items/item/${id}`, { method: "PUT", body: updateData, responseType: "none" });
    return true;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw new ApiError(401, "unauthorized");
    }
    throw error;
  }
}
