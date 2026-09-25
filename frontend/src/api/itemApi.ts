// The backend is on a different origin (port 8080), so requests need credentials: "include" to send the auth cookie
const API_BASE_URL = "http://localhost:8080/api/better-marketplace";

export async function getItems() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch items");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      const networkError = new Error("Network error: Unable to connect to the server");
      throw networkError;
    }

    throw error;
  }
}

export async function getItemById(id: string | number) {
  try {

    const response = await fetch(`${API_BASE_URL}/v1/items/item/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
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

    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      const networkError = new Error("Network error: Unable to connect to the server");
      console.error("Network error details:", error);
      throw networkError;
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
}) {
  try {
    console.log(`Creating new item at ${API_BASE_URL}/v1/items/item`);

    const response = await fetch(`${API_BASE_URL}/v1/items/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(itemData),
    });

    console.log(`Create item response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Creating item failed with status ${response.status}:`, errorText);
      throw new Error(errorText || "Failed to create item");
    }

    const data = await response.json();
    console.log("Item created successfully, received ID:", data);
    return data;
  } catch (error) {
    console.error("Error creating item:", error);

    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      const networkError = new Error("Network error: Unable to connect to the server");
      console.error("Network error details:", error);
      throw networkError;
    }

    throw error;
  }
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
    console.log(`Updating item with ID ${id} at ${API_BASE_URL}/v1/items/item/${id}`);

    const response = await fetch(`${API_BASE_URL}/v1/items/item/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
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

    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      const networkError = new Error("Network error: Unable to connect to the server");
      console.error("Network error details:", error);
      throw networkError;
    }

    throw error;
  }
}
