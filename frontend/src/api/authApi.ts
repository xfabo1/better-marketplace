const API_BASE_URL = "http://localhost:8080/api/better-marketplace";

/**
 * Login user with email and password
 */
export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({ email, password }),
    });

    const apiResponse: { statusCode: number; message: string; body: any } = await response.json();
    if (!response.ok) {
      throw new Error(apiResponse.message);
    }

    return apiResponse.body;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error("network_error_server");
    }

    if (error instanceof SyntaxError) {
      throw new Error("server_error");
    }

    throw error;
  }
}

/**
 * Register a new user
 */
export async function registerUser(
  userData: {
    username: string;
    email: string;
    password: string;
    country: string;
    displayItemsFromOtherCountry: boolean;
  },
) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(userData),
    });

    const apiResponse: { statusCode: number; message: string; body: any } = await response.json();
    if (!response.ok) {
      throw new Error(apiResponse.message);
    }

    return apiResponse.body;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error("network_error_server");
    }

    if (error instanceof SyntaxError) {
      throw new Error("server_error");
    }

    throw error;
  }
}

/**
 * Logout the current user
 */
export async function logoutUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
    });

    const apiResponse: { statusCode: number; message: string; body: any } = await response.json();
    if (!response.ok) {
      throw new Error(apiResponse.message);
    }

    return apiResponse.body;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error("network_error_server");
    }

    if (error instanceof SyntaxError) {
      throw new Error("server_error");
    }

    throw error;
  }
}
