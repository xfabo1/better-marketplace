import { ApiError, apiFetch, toQueryString } from "@/lib/api-client";

// Mirror the backend's PreviewItemDto and ItemFullDetailsDto
export interface PreviewItem {
  id: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string | null;
  condition: string;
  createdAt: string;
}

export interface ItemDetails {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  currency: string;
  category: string | null;
  subcategory: string | null;
  condition: string;
  username: string | null;
  sellerMemberSince: string | null;
  email: string;
  phoneNumber: string;
  placeName: string;
  city: string;
  postalCode: string;
  createdAt: string;
}

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

export async function createItem(itemData: {
  name: string;
  price: number;
  currency: string;
  description: string;
  imageUrl: string;
  locationId: number;
  email: string;
  phoneNumber: string;
  category?: string;
  subcategory?: string;
  condition: string;
}) {
  return apiFetch<number>("/v1/items/item", { method: "POST", body: itemData });
}

export async function updateItem(
  id: string | number,
  updateData: {
    name?: string;
    description?: string;
    currency?: string;
    price?: number;
    location?: string;
    imageUrl?: string;
    email?: string;
    phoneNumber?: string;
  }
) {
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
