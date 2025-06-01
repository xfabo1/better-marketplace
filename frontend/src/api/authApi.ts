// Authentication API client for Better Marketplace
// This file contains functions to interact with the backend auth endpoints

const API_BASE_URL = 'http://localhost:8080/api/better-marketplace';

/**
 * Login user with email and password
 */
export async function loginUser(email: string, password: string) {
  try {
    console.log(`Attempting to login with email: ${email} to ${API_BASE_URL}/auth/login`);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      mode: 'cors', // Explicitly set CORS mode
      body: JSON.stringify({ email, password }),
    });

    console.log(`Login response status: ${response.status} ${response.statusText}`);
    
    // Log response headers for debugging
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    console.log('Response headers:', headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Login failed with status ${response.status}:`, errorText);
      
      // Create a more detailed error object
      const error = new Error(errorText || 'Login failed');
      
      // Handle specific error cases
      if (response.status === 401) {
        error.message = 'invalid_credentials';
      }
      
      (error as any).status = response.status;
      (error as any).statusText = response.statusText;
      throw error;
    }

    const data = await response.json();
    console.log('Login successful, received data:', data);
    return data;
  } catch (error) {
    console.error('Login error details:', error);
    
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
    console.log(`Attempting to register user: ${userData.email} to ${API_BASE_URL}/auth/register`);
    
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

    console.log(`Register response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Registration failed with status ${response.status}:`, errorText);
      
      // Handle specific error cases
      if (errorText === 'email_used') {
        throw new Error('email_used');
      } else if (errorText === 'username_used') {
        throw new Error('username_used');
      } else {
        const error = new Error(errorText || 'Registration failed');
        (error as any).status = response.status;
        (error as any).statusText = response.statusText;
        throw error;
      }
    }

    const result = await response.text();
    console.log('Registration successful:', result);
    return result;
  } catch (error) {
    console.error('Registration error details:', error);
    
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
 * Logout the current user
 */
export async function logoutUser() {
  try {
    console.log(`Attempting to logout at ${API_BASE_URL}/auth/logout`);
    
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // Important for cookies
      mode: 'cors', // Explicitly set CORS mode
    });

    console.log(`Logout response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Logout failed with status ${response.status}:`, errorText);
      throw new Error(errorText || 'Logout failed');
    }

    console.log('Logout successful');
    return true;
  } catch (error) {
    console.error('Logout error details:', error);
    throw error;
  }
} 