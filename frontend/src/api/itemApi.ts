// Item API client for Better Marketplace
// This file contains functions to interact with the backend item endpoints

const API_BASE_URL = 'http://localhost:8080/api/better-marketplace';

/**
 * Get all items (listings)
 */
export async function getItems() {
  try {
    
    const response = await fetch(`${API_BASE_URL}/v1/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      mode: 'cors', // Explicitly set CORS mode
    });

    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Fetching items failed with status ${response.status}:`, errorText);
      throw new Error(errorText || 'Failed to fetch items');
    }

    const data = await response.json();
    console.log('Items fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    
    // If it's a network error, provide a more user-friendly message
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      const networkError = new Error('Network error: Unable to connect to the server');
      console.error('Network error details:', error);
      throw networkError;
    }
    
    throw error;
  }
}

/**
 * Get a specific item by ID
 */
export async function getItemById(id: string | number) {
  try {
    console.log(`Fetching item with ID ${id} from ${API_BASE_URL}/v1/items/item/${id}`);
    
    const response = await fetch(`${API_BASE_URL}/v1/items/item/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      mode: 'cors', // Explicitly set CORS mode
    });

    console.log(`Get item response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Fetching item failed with status ${response.status}:`, errorText);
      
      if (response.status === 404) {
        throw new Error('item_not_found');
      }
      
      throw new Error(errorText || 'Failed to fetch item');
    }

    const data = await response.json();
    console.log('Item fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching item:', error);
    
    // If it's a network error, provide a more user-friendly message
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      const networkError = new Error('Network error: Unable to connect to the server');
      console.error('Network error details:', error);
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
}) {
  try {
    console.log(`Creating new item at ${API_BASE_URL}/v1/items/item`);
    
    const response = await fetch(`${API_BASE_URL}/v1/items/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      mode: 'cors', // Explicitly set CORS mode
      body: JSON.stringify(itemData),
    });

    console.log(`Create item response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Creating item failed with status ${response.status}:`, errorText);
      throw new Error(errorText || 'Failed to create item');
    }

    const data = await response.json();
    console.log('Item created successfully, received ID:', data);
    return data; // This should be the ID of the created item
  } catch (error) {
    console.error('Error creating item:', error);
    
    // If it's a network error, provide a more user-friendly message
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      const networkError = new Error('Network error: Unable to connect to the server');
      console.error('Network error details:', error);
      throw networkError;
    }
    
    throw error;
  }
}

/**
 * Update an existing item
 */
export async function updateItem(id: string | number, updateData: {
  name?: string;
  description?: string;
  currency?: string;
  price?: number;
  location?: string;
  imageUrl?: string;
  email?: string;
  phoneNumber?: string;
}) {
  try {
    console.log(`Updating item with ID ${id} at ${API_BASE_URL}/v1/items/item/${id}`);
    
    const response = await fetch(`${API_BASE_URL}/v1/items/item/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      mode: 'cors', // Explicitly set CORS mode
      body: JSON.stringify(updateData),
    });

    console.log(`Update item response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Updating item failed with status ${response.status}:`, errorText);
      
      if (response.status === 401) {
        throw new Error('unauthorized');
      }
      
      throw new Error(errorText || 'Failed to update item');
    }

    console.log('Item updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating item:', error);
    
    // If it's a network error, provide a more user-friendly message
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      const networkError = new Error('Network error: Unable to connect to the server');
      console.error('Network error details:', error);
      throw networkError;
    }
    
    throw error;
  }
} 