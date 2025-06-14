// Authentication API client for Better Marketplace
// This file contains functions to interact with the backend auth endpoints

const API_BASE_URL = 'http://localhost:8080/api/better-marketplace';

/**
 * Login user with email and password
 */
export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      mode: 'cors', // Explicitly set CORS mode
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      // Create a more detailed error object
      const error = new Error(errorText || 'Login failed');
      
      // Handle specific error cases
      if (response.status === 401) {
        error.message = 'invalid_credentials';
      }

      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // If it's a network error, provide a more user-friendly message
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw Error('Network error: Unable to connect to the server');
    }
    
    throw error;
  }
}

/**
 * Register a new user
 */
export async function registerUser(userData: {
  username: string;
  email: string;
  password: string;
  country: string;
  displayItemsFromOtherCountry: boolean;
}) {
  try {
    
    // Ensure country is uppercase
    const requestData = {
      ...userData,
      country: userData.country.toUpperCase()
    };
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      mode: 'cors', // Explicitly set CORS mode
      body: JSON.stringify(requestData),
    });


    if (!response.ok) {
      const errorText = await response.text();
      
      // Handle specific error cases
      if (errorText === 'email_used') {
        throw new Error('email_used');
      } else if (errorText === 'username_used') {
        throw new Error('username_used');
      } else {
        throw Error(errorText || 'Registration failed');
      }
    }

    const result = await response.text();
    return result;
  } catch (error) {
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
       throw Error('Network error: Unable to connect to the server');
    }

    throw error;
  }
}

/**
 * Logout the current user
 */
export async function logoutUser() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // Important for cookies
      mode: 'cors', // Explicitly set CORS mode
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Logout failed');
    }

    return true;
} 