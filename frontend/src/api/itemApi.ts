// Item API client for Better Marketplace
// This file contains functions to interact with the backend item endpoints

const API_BASE_URL = "http://localhost:8080/api/better-marketplace";

// TypeScript interfaces for backend data structures
export interface PreviewItemDto {
  name: string;
  country: "SK" | "CZ";
  postalCode: string;
  placeName: string;
  price: number;
  currency: "CZK" | "EUR";
  category: string;
  condition: string;
}

export interface SearchFilterDto {
  locationId?: number;
  minPrice?: number;
  maxPrice?: number;
  dateAdded?: string; // ISO string
  condition?: string;
  searchText?: string;
  sorting?: "NEWEST" | "OLDEST" | "PRICE_ASC" | "PRICE_DESC";
  maxMeterDistance?: number;
}

export interface SearchItemsParams {
  searchFilter: SearchFilterDto;
  page?: number;
  pageSize?: number;
}

/**
 * Get a specific item by ID
 */
export async function getItemById(id: string | number) {
  try {

    const response = await fetch(`${API_BASE_URL}/v1/items/item/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important for cookies
      mode: "cors", // Explicitly set CORS mode
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Fetching item failed with status ${response.status}:`, errorText);

      if (response.status === 404) {
        throw new Error("item_not_found");
      }

      throw new Error(errorText || "Failed to fetch item");
    }

    const data = await response.json();
    return data;
  } catch (error) {

    // If it's a network error, provide a more user-friendly message
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      const networkError = new Error("Network error: Unable to connect to the server");
      console.error("Network error details:", error);
      throw networkError;
    }

    throw error;
  }
}

/**
 * Create a new item (listing)
 */
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
  condition?: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/items/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important for cookies
      mode: "cors", // Explicitly set CORS mode
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Creating item failed with status ${response.status}:`, errorText);
      throw new Error(errorText || "Failed to create item");
    }

    const data = await response.json();
    console.log("Item created successfully, received ID:", data);
    return data; // This should be the ID of the created item
  } catch (error) {
    console.error("Error creating item:", error);

    // If it's a network error, provide a more user-friendly message
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      const networkError = new Error("Network error: Unable to connect to the server");
      console.error("Network error details:", error);
      throw networkError;
    }

    throw error;
  }
}

/**
 * Update an existing item
 */
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
    condition?: string;
  }
) {
  try {
    console.log(`Updating item with ID ${id} at ${API_BASE_URL}/v1/items/item/${id}`);

    const response = await fetch(`${API_BASE_URL}/v1/items/item/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important for cookies
      mode: "cors", // Explicitly set CORS mode
      body: JSON.stringify(updateData),
    });

    console.log(`Update item response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Updating item failed with status ${response.status}:`, errorText);

      if (response.status === 401) {
        throw new Error("unauthorized");
      }

      throw new Error(errorText || "Failed to update item");
    }

    console.log("Item updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating item:", error);

    // If it's a network error, provide a more user-friendly message
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      const networkError = new Error("Network error: Unable to connect to the server");
      console.error("Network error details:", error);
      throw networkError;
    }

    throw error;
  }
}

/**
 * Search items using the new /v1/items/preview endpoint
 */
export async function searchItems(params: SearchItemsParams): Promise<PreviewItemDto[]> {
  try {
    const { searchFilter, page = 0, pageSize = 9 } = params;
    
    console.log(`Searching items at ${API_BASE_URL}/v1/items/preview`);
    console.log("Search parameters:", { searchFilter, page, pageSize });

    // Build query parameters from search filter
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
      credentials: "include", // Important for cookies
      mode: "cors", // Explicitly set CORS mode
    });

    console.log(`Search items response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Searching items failed with status ${response.status}:`, errorText);
      throw new Error(errorText || "Failed to search items");
    }

    const data = await response.json();
    console.log("Items search successful, received:", data.length, "items");
    return data;
  } catch (error) {
    console.error("Error searching items:", error);

    // If it's a network error, provide a more user-friendly message
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      const networkError = new Error("Network error: Unable to connect to the server");
      console.error("Network error details:", error);
      throw networkError;
    }

    throw error;
  }
}
