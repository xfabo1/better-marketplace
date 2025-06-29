// Item API client for Better Marketplace
// This file contains functions to interact with the backend item endpoints
// Import removed as sortOptions is not used in this file
import { ApiResponse, SearchItemsResponse, ItemFullDetailsDto, SearchItemsParams} from "@/types/types";

const API_BASE_URL = "http://localhost:8080/api/better-marketplace";

/**
 * Get a specific item by ID
 */
export async function getItemById(id: string | number, t: (key: string) => string) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/items/item/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    const apiResponse: ApiResponse<ItemFullDetailsDto> = await response.json();
    
    if (apiResponse.statusCode !== 200) {
      if (apiResponse.statusCode === 404) {
        throw new Error(t("item_not_found"));
      }
      throw new Error(apiResponse.message || t("failed_fetch_item"));
    }

    return apiResponse.body;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error(t("network_error_server"));
    }

    if (error instanceof SyntaxError) {
      throw new Error(t("server_error"));
    }

    throw error;
  }
}

/**
 * Create a new item (listing)
 */
export async function createItem(formData: FormData, t: (key: string) => string) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/items/item`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: formData,
    });

    const apiResponse: ApiResponse<number> = await response.json();
    
    if (apiResponse.statusCode !== 200) {
      throw new Error(apiResponse.message || t("failed_create_item"));
    }

    return apiResponse.body;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error(t("network_error_server"));
    }

    if (error instanceof SyntaxError) {
      throw new Error(t("server_error"));
    }

    throw error;
  }
}

/**
 * Update an existing item
 */
export async function updateItem(
  id: string | number,
  formData: FormData,
  t: (key: string) => string
) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/items/item/${id}`, {
      method: "PUT",
      credentials: "include",
      mode: "cors",
      body: formData,
    });

    const apiResponse: ApiResponse<boolean> = await response.json();
    
    if (apiResponse.statusCode !== 200) {
      throw new Error(apiResponse.message || t("failed_update_item"));
    }

    return apiResponse.body;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error(t("network_error_server"));
    }

    if (error instanceof SyntaxError) {
      throw new Error(t("server_error"));
    }

    throw error;
  }
}

/**
 * Search items using the new /v1/items/preview endpoint
 */
export async function searchItems(params: SearchItemsParams, t: (key: string) => string): Promise<SearchItemsResponse> {
  try {
    const { searchFilter, page = 0, pageSize = 9 } = params;

    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("pageSize", pageSize.toString());

    if (searchFilter.locationId !== undefined) {
      queryParams.append("locationId", searchFilter.locationId.toString());
    }
    if (searchFilter.minPrice !== undefined) {
      queryParams.append("minPrice", searchFilter.minPrice.toString());
    }
    if (searchFilter.maxPrice !== undefined) {
      queryParams.append("maxPrice", searchFilter.maxPrice.toString());
    }
    if (searchFilter.dateAdded !== undefined) {
      queryParams.append("dateAdded", searchFilter.dateAdded);
    }
    if (searchFilter.condition !== undefined) {
      queryParams.append("condition", searchFilter.condition);
    }
    if (searchFilter.searchText !== undefined) {
      queryParams.append("searchText", searchFilter.searchText);
    }
    if (searchFilter.sorting !== undefined) {
      queryParams.append("sorting", searchFilter.sorting);
    }
    if (searchFilter.maxMeterDistance !== undefined) {
      queryParams.append("maxMeterDistance", searchFilter.maxMeterDistance.toString());
    }

    const response = await fetch(`${API_BASE_URL}/v1/items/preview?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    const apiResponse: ApiResponse<SearchItemsResponse> = await response.json();
    
    if (apiResponse.statusCode !== 200) {
      throw new Error(apiResponse.message || t("failed_search_items"));
    }

    return apiResponse.body;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error(t("network_error_server"));
    }

    if (error instanceof SyntaxError) {
      throw new Error(t("server_error"));
    }

    throw error;
  }
}
